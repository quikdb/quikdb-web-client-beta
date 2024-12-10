 import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";


actor QuikDB {
  private var owner: Principal = Principal.fromText("2vxsx-fae");

  type Field = {
    name: Text;
    fieldType: Text;
  };

  type Schema = {
    schemaName: Text;
    fields: [Field];
    indexes: [Text]; // User-defined indexes (up to 2 fields)
    createdAt: Int;
  };

  type Result<T, E> = {
    #ok: T;
    #err: E;
  };

  type Record = {
    id: Text;
    fields: [(Text, Text)];  // Array of (fieldName, value) pairs
  };
    // Initialization function (custom "constructor")
    public func initOwner(initOwner: Principal): async Bool {
        if (Principal.isAnonymous(owner)) { // Ensure it can only be initialized once
            owner := initOwner;
            return true;
        } else {
            return false; // Already initialized
        };
    };

    // Getter function for the owner
        public query func getOwner(): async Principal {
            owner;
        };

  // Initialize an empty TrieMap for schemas and indexes
  private let schemas = TrieMap.TrieMap<Text, Schema>(Text.equal, Text.hash);
  private let indexes = TrieMap.TrieMap<Text, TrieMap.TrieMap<Text, [Text]>>(Text.equal, Text.hash);
  private let records = TrieMap.TrieMap<Text, TrieMap.TrieMap<Text, Record>>(Text.equal, Text.hash);
  
  

  public shared func createSchema(
    schemaName: Text,
    customFields: [Field],
    userDefinedIndexes: [Text]
  ) : async Result<Bool, Text> {
    Debug.print("Received createSchema request:");
    Debug.print("Schema Name: " # schemaName);

    // Check if the schema already exists
    if (schemas.get(schemaName) != null) {
      return #err("A schema with this name already exists!");
    };

    // Validate user-defined indexes
    if (userDefinedIndexes.size() > 2) {
      return #err("You can define up to 2 indexes only.");
    };

    // Add default fields
    let defaultFields: [Field] = [
      { name = "creation_timestamp"; fieldType = "timestamp" },
      { name = "update_timestamp"; fieldType = "timestamp" }
    ];

    // Combine default fields with user-provided fields
    let allFields = Array.append(customFields, defaultFields);

    // Convert arrays to iterators for loops
    for (index in userDefinedIndexes.vals()) {
      var isValidIndex = false;
      label indexCheck for (field in allFields.vals()) {
        if (field.name == index) {
          isValidIndex := true;
          break indexCheck;
        };
      };
      if (not isValidIndex) {
        return #err("Index '" # index # "' is not a valid field in the schema.");
      };
    };

    // Create a new schema
    let newSchema: Schema = {
      schemaName = schemaName;
      fields = allFields;
      indexes = userDefinedIndexes;
      createdAt = Time.now();
    };

    // Insert the schema into the TrieMap
    schemas.put(schemaName, newSchema);

    // Initialize empty indexes
    for (index in userDefinedIndexes.vals()) {
      indexes.put(schemaName # "." # index, TrieMap.TrieMap<Text, [Text]>(Text.equal, Text.hash));
    };
     // Initialize empty record storage for the schema
    records.put(schemaName, TrieMap.TrieMap<Text, Record>(Text.equal, Text.hash));
 Debug.print("Schema '" # schemaName # "' created successfully ✅ ");
    return #ok(true);
  };

  public shared query func getSchema(schemaName: Text) : async ?Schema {
    schemas.get(schemaName);
  };
  public shared func deleteSchema(schemaName: Text): async Result<Bool, Text> {
    // Check if the schema exists
    let schemaOpt = schemas.get(schemaName);
    switch (schemaOpt) {
      case null {
        return #err("Schema '" # schemaName # "' does not exist!");
      };
      case (?schema) {
        // Remove all associated indexes
        for (index in schema.indexes.vals()) {
          let indexKey = schemaName # "." # index;
          let removedIndexOpt = indexes.remove(indexKey);
          switch (removedIndexOpt) {
            case null {
              Debug.print("⚠️ Index '" # indexKey # "' was not found during deletion.");
            };
            case (?_removedIndex) {
              Debug.print("✅ Index '" # indexKey # "' deleted successfully.");
            };
          };
        };

        // Remove all associated records
        let removedRecordsOpt = records.remove(schemaName);
        switch (removedRecordsOpt) {
          case null {
            Debug.print("⚠️ Records for schema '" # schemaName # "' were not found during deletion.");
          };
          case (?_removedRecords) {
            Debug.print("✅ Records for schema '" # schemaName # "' deleted successfully.");
          };
        };

        // Finally, remove the schema itself
        let removedSchemaOpt = schemas.remove(schemaName);
        if (removedSchemaOpt == null) {
          return #err("Unexpected error: Schema '" # schemaName # "' could not be removed.");
        } else {
          Debug.print("✅ Schema '" # schemaName # "' deleted successfully.");
          return #ok(true);
        };
      };
    };
  };
  // Insert data into the schema and update indexes
  public shared func insertData(schemaName: Text, record: Record) : async Result<Bool, Text> {
      // Convert Record to TrieMap internally for field validation
      let recordMap = TrieMap.fromEntries<Text, Text>(record.fields.vals(), Text.equal, Text.hash);

      // Check if schema exists
      let schema = schemas.get(schemaName);
      switch (schema) {
        case null {
          return #err("Schema not found!");
        };
        case (?schema) {
          // Validate fields
          for (field in schema.fields.vals()) {
            if (recordMap.get(field.name) == null) {
              return #err("Field '" # field.name # "' is missing in the record.");
            };
          };

          // Use record.id directly
          let recordId = record.id;

          // Store the record in the records TrieMap
          let schemaRecords = records.get(schemaName);
          switch (schemaRecords) {
            case null {
              return #err("Record storage for schema not initialized properly.");
            };
            case (?schemaRecords) {
              schemaRecords.put(recordId, record);
            };
          };

          // Update indexes
          for (index in schema.indexes.vals()) {
            let indexKey = schemaName # "." # index;
            let indexMap = indexes.get(indexKey);
            switch (indexMap) {
              case null {
                return #err("Index '" # index # "' not initialized properly.");
              };
              case (?indexMap) {
                let fieldValue = recordMap.get(index);
                switch (fieldValue) {
                  case null {
                    return #err("Field '" # index # "' is missing in the record.");
                  };
                  case (?fieldValue) {
                    let records = indexMap.get(fieldValue);
                    switch (records) {
                      case null {
                        // Insert the actual record ID
                        indexMap.put(fieldValue, [recordId]);
                      };
                      case (?records) {
                        // Append the new record ID to existing list
                        indexMap.put(fieldValue, Array.append(records, [recordId]));
                      };
                    };
                  };
                };
              };
            };
          };

          return #ok(true);
        };
      };
  };
  public shared func updateData(
    schemaName: Text,
    recordId: Text,
    updatedFields: [(Text, Text)]
  ) : async Result<Bool, Text> {
    // Fetch the schema
    let schemaOpt = schemas.get(schemaName);
    switch (schemaOpt) {
      case null {
        return #err("Schema not found!");
      };
      case (?schema) {
        // Get the existing record
        let schemaRecordsOpt = records.get(schemaName);
        switch (schemaRecordsOpt) {
          case null {
            return #err("Record storage for schema not initialized properly.");
          };
          case (?schemaRecords) {
            let existingRecordOpt = schemaRecords.get(recordId);
            switch (existingRecordOpt) {
              case null {
                return #err("Record with ID '" # recordId # "' not found!");
              };
              case (?existingRecord) {
                // Convert Record fields to TrieMap for easier updates
                var recordMap = TrieMap.fromEntries<Text, Text>(existingRecord.fields.vals(), Text.equal, Text.hash);

                // Apply updates
                for (fieldUpdate in updatedFields.vals()) {
                  let (fieldName, newValue) = fieldUpdate;
                  // Validate if the field exists in the schema
                let fieldOpt: ?Field = Array.find(schema.fields, func(field: Field): Bool { field.name == fieldName });
                switch (fieldOpt) {
                  case null {
                    return #err("Field '" # fieldName # "' does not exist in the schema!");
                  };
                  case (?_) {
                    recordMap.put(fieldName, newValue);
                  };
                };

                };

                // Update the `update_timestamp` field
                recordMap.put("update_timestamp", Int.toText(Time.now()));

                // Remove record from outdated index values
              for (index in schema.indexes.vals()) { 
                  let indexKey = schemaName # "." # index;
                  let indexMapOpt = indexes.get(indexKey);
                  switch (indexMapOpt) {
                    case null {};
                    case (?indexMap) {
                      let oldValueOpt = Array.find<(Text, Text)>(existingRecord.fields, func(field: (Text, Text)): Bool { field.0 == index });
                      switch (oldValueOpt) {
                        case null {};
                        case (?oldValue) {
                          let updatedIndexRecordsOpt = indexMap.get(oldValue.1);
                          switch (updatedIndexRecordsOpt) {
                            case null {};
                            case (?updatedIndexRecords) {
                               let filteredRecords = Array.filter<Text>(updatedIndexRecords, func(rId: Text): Bool { rId != recordId });
                              indexMap.put(oldValue.1, filteredRecords);
                            };
                          };
                        };
                      };
                    };
                  };
                };

                // Add record to updated index values
                for (index in schema.indexes.vals()) {
                  let indexKey = schemaName # "." # index;
                  let indexMapOpt = indexes.get(indexKey);
                  switch (indexMapOpt) {
                    case null {};
                    case (?indexMap) {
                      let newValueOpt = recordMap.get(index);
                      switch (newValueOpt) {
                        case null {};
                        case (?newValue) {
                          let indexedRecordsOpt = indexMap.get(newValue);
                          switch (indexedRecordsOpt) {
                            case null {
                              indexMap.put(newValue, [recordId]);
                            };
                            case (?indexedRecords) {
                              indexMap.put(newValue, Array.append(indexedRecords, [recordId]));
                            };
                          };
                        };
                      };
                    };
                  };
                };

                // Commit the updated record back to `schemaRecords`
                schemaRecords.put(recordId, { id = recordId; fields = Iter.toArray(recordMap.entries()) });

                return #ok(true);
              };
            };
          };
        };
      };
    };
  };
  // Search by multiple fields (e.g., age and color)
  public shared func searchByMultipleFields(schemaName: Text, filters: [(Text, Text)]) : async Result<[Record], Text> {
    if (filters.size() == 0) {
      return #err("No filters provided.");
    };

    var resultIds: ?[Text] = null;

    // Iterate through each filter and perform search
    for (filter in filters.vals()) {
      let (indexName, value) = filter;
      let matchingIdsOpt = await queryByIndex(schemaName, indexName, value);
      switch (matchingIdsOpt) {
        case null {
          Debug.print("ℹ️ No matching records found for " # indexName # " = " # value);
          return #err("No matching records found for " # indexName # " = " # value);
        };
        case (?matchingIds) {
          // Debug.print("🔍 Found " # matchingIds.size().toText() # " matching records for " # indexName # " = " # value);
          if (resultIds == null) {
            resultIds := ?matchingIds;
          } else {
            // Perform intersection of current results with the new matching IDs
            resultIds := switch (resultIds) {
              case (?ids) {
                let intersection = Array.filter<Text>(ids, func(id: Text): Bool {
                  Array.find<Text>(matchingIds, func(mid: Text): Bool { mid == id }) != null
                });
                if (intersection.size() == 0) {
                  Debug.print("⚠️ No records remain after applying filter " # indexName # " = " # value);
                  return #err("No matching records found after applying filter " # indexName # " = " # value);
                };
                Debug.print("🔗 Intersection result for " # indexName # " = " # value # ": " # debug_show(intersection));
                ?intersection
              };
              case null {
                ?matchingIds
              };
            };
          };
        };
      };
    };

    // Retrieve records based on the intersected result IDs
    switch (resultIds) {
      case null {
        return #err("No matching records found after applying all filters.");
      };
      case (?ids) {
        var matchingRecords: [Record] = [];
        for (recordId in ids.vals()) {
          let recordOpt = await getRecordById(schemaName, recordId);
          switch (recordOpt) {
            case (?record) { matchingRecords := Array.append(matchingRecords, [record]); };
            case null {
              Debug.print("⚠️ Record with ID " # recordId # " could not be found.");
            };
          };
        };
        Debug.print("✅ Final matching records: " # debug_show(matchingRecords));
        return #ok(matchingRecords);
      };
    };
  };
 // Query data using an index
  public query func queryByIndex(schemaName: Text, indexName: Text, value: Text) : async ?[Text] {
      let indexKey = schemaName # "." # indexName;
      Debug.print("🔍 Querying index key: " # indexKey # " for value: " # value);

      let indexMap = indexes.get(indexKey);
      switch (indexMap) {
        case null {
          Debug.print("❌ Index not found for key: " # indexKey);
          return null;
        };
        case (?indexMap) {
          let result = indexMap.get(value);
          Debug.print("✅ Query result for value " # value # ": " # debug_show(result));
          return result;
        };
      };
  };

  // Search functionality based on indexed fields
  public shared func searchByIndex(schemaName: Text, indexName: Text, value: Text) : async Result<[Record], Text> {
    // Use queryByIndex to get matching record IDs
    let matchingRecordIdsOpt = await queryByIndex(schemaName, indexName, value);
    switch (matchingRecordIdsOpt) {
      case null {
        return #err("No matching records found.");
      };
      case (?matchingRecordIds) {
        var matchingRecords: [Record] = [];
        for (recordId in matchingRecordIds.vals()) {
          let recordOpt = await getRecordById(schemaName, recordId);
          switch (recordOpt) {
            case (?record) { matchingRecords := Array.append(matchingRecords, [record]); };
            case null {};
          };
        };
        return #ok(matchingRecords);
      };
    };
  };
  // Delete a record
  public shared func deleteData(schemaName: Text, recordId: Text) : async Result<Bool, Text> {
    // Check if the schema exists
    let schemaOpt = schemas.get(schemaName);
    switch (schemaOpt) {
      case null {
        return #err("Schema not found!");
      };
      case (?schema) {
        // Get the records for the schema
        let schemaRecordsOpt = records.get(schemaName);
        switch (schemaRecordsOpt) {
          case null {
            return #err("No records found for schema.");
          };
          case (?schemaRecords) {
            // Get the record to delete
            let recordOpt = schemaRecords.get(recordId);
            switch (recordOpt) {
              case null {
                return #err("Record with ID '" # recordId # "' not found!");
              };
              case (?record) {
                // Remove the record from schema records
                // Remove the record from schema records
                ignore schemaRecords.remove(recordId);
                records.put(schemaName, schemaRecords);

                // Remove the record from the indexes
                for (index in schema.indexes.vals()) {
                  let indexKey = schemaName # "." # index;
                  let indexMapOpt = indexes.get(indexKey);
                  switch (indexMapOpt) {
                    case null {
                      Debug.print("⚠️ Index '" # index # "' not found during deletion.");
                    };
                    case (?indexMap) {
                      let fieldValueOpt = Array.find<(Text, Text)>(record.fields, func(field: (Text, Text)) : Bool { field.0 == index });
                      switch (fieldValueOpt) {
                        case null {
                          Debug.print("⚠️ Field '" # index # "' not found in record during deletion.");
                        };
                        case (?fieldValue) {
                          let value = fieldValue.1;
                          let recordsListOpt = indexMap.get(value);
                          switch (recordsListOpt) {
                            case null {
                              Debug.print("⚠️ No records found in index for value '" # value # "'.");
                            };
                            case (?recordsList) {
                              let updatedRecords = Array.filter<Text>(recordsList, func(rId) { rId != recordId });
                              if (updatedRecords.size() == 0) {
                                ignore indexMap.remove(value);
                              } else {
                                indexMap.put(value, updatedRecords);
                              };
                              indexes.put(indexKey, indexMap);
                            };
                          };
                        };
                      };
                    };
                  };
                };
                return #ok(true);
              };
            };
          };
        };
      };
    };
  };
   // Helper function to get record by ID
  public shared query func getRecordById(schemaName: Text, recordId: Text) : async ?Record {
    let schemaRecords = records.get(schemaName);
    switch (schemaRecords) {
      case null {
        return null;
      };
      case (?schemaRecords) {
        return schemaRecords.get(recordId);
      };
    };
  };

  public shared query func listSchemas(): async [Text] {
  Iter.toArray(schemas.keys())
  };
};