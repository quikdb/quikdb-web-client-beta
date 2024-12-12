import QuikDB "canister:database";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Array "mo:base/Array";



actor TestQuikDB {
type Field = { name: Text; fieldType: Text };
type Record = { id: Text; fields: [(Text, Text)] };
  // Test function for createSchema and getSchema
    public func testCreateSchema(): async Text {
        let _ = await QuikDB.deleteSchema("Student");
    
        let studentFields = [
        { name = "name"; fieldType = "string" },
        { name = "age"; fieldType = "integer" },
        { name = "color"; fieldType = "string" },
        ];

        let createResult = await QuikDB.createSchema("Student", studentFields, ["age"]);

        switch (createResult) {
        case (#ok(true)) {
            Debug.print("✅ Schema 'Student' created successfully.");
        };
        case (#ok(false)) {
            Debug.print("❌ Schema creation returned false");
            return "Test Failed: Schema creation returned false";
        };
        case (#err(errMsg)) {
            Debug.print("❌ Failed to create schema: " # errMsg);
            return "Test Failed: " # errMsg;
        };
        };

        let retrievedSchema = await QuikDB.getSchema("Student");

        switch (retrievedSchema) {
        case (?schema) {
            Debug.print("✅ Retrieved Schema: " # debug_show(schema));
            if (schema.schemaName == "Student" and schema.fields.size() == 5) {
            return "Test Passed: Schema creation and retrieval successful.";
            } else {
            return "Test Failed: Schema data mismatch.";
            };
        };
        case null {
            return "Test Failed: Could not retrieve created schema.";
        };
        };
    };

    public func testInsertData() : async Bool {
        // Insert a record into the "Student" schema
        // Note that "id" is separate from the fields, which matches the updated insertData logic.
        let record: Record = {
            id = "student1";
            fields = [
            ("name", "Alice"),
            ("age", "20"),
            ("color", "blue"),
            ("creation_timestamp", "1234567890"),
            ("update_timestamp", "1234567890")
            ];
        };

        let result = await QuikDB.insertData("Student", record);
        
        switch (result) {
            case (#ok(true)) {
            Debug.print("✅ Data inserted successfully.");

            // Since the "Student" schema is indexed by "age", we can query "age" = "20"
            let queryResult = await QuikDB.queryByIndex("Student", "age", "20");
            switch (queryResult) {
                case null {
                Debug.print("❌ No data found for age=20");
                return false;
                };
                case (?ids) {
                // Check if the inserted record is returned in the query result
                if (Array.find<Text>(ids, func(x) { x == "student1" }) != null) {
                    Debug.print("✅ Found 'student1' in the index for age=20.");
                    Debug.print("✅ Record data that was just inserted: " # debug_show(record));
                    return true;
                } else {
                    Debug.print("❌ 'student1' not found by querying age=20");
                    return false;
                };
                };
            };
            };
            case (#ok(false)) {
            Debug.print("❌ Insert data returned false");
            return false;
            };
            case (#err(errMsg)) {
            Debug.print("❌ Error while inserting data: " # errMsg);
            return false;
            };
        };
        };


// Test function to query already saved data
    public func testQuerySavedData() : async Bool {
    // Insert a couple of records into the "Student" schema
    let record1: Record = {
        id = "student1";
        fields = [
        ("name", "Alice"),
        ("age", "20"),
        ("color", "blue"),
        ("creation_timestamp", "1234567890"),
        ("update_timestamp", "1234567890")
        ];
    };
    
    let record2: Record = {
        id = "student2";
        fields = [
        ("name", "Bob"),
        ("age", "30"),
        ("color", "red"),
        ("creation_timestamp", "1234567890"),
        ("update_timestamp", "1234567890")
        ];
    };

    // Insert both records
    switch (await QuikDB.insertData("Student", record1)) {
        case (#ok(_)) {
        Debug.print("✅ Inserted 'student1' successfully.");
        };
        case (#err(errMsg)) {
        Debug.print("❌ Failed to insert 'student1': " # errMsg);
        return false;
        };
    };

    switch (await QuikDB.insertData("Student", record2)) {
        case (#ok(_)) {
        Debug.print("✅ Inserted 'student2' successfully.");
        };
        case (#err(errMsg)) {
        Debug.print("❌ Failed to insert 'student2': " # errMsg);
        return false;
        };
    };

    // Query for records by age 30
    let queryResult = await QuikDB.queryByIndex("Student", "age", "30");

    Debug.print("ℹ️ Query results for age=30: " # debug_show(queryResult));

    switch (queryResult) {
        case null {
        Debug.print("❌ No records found for age=30");
        return false;
        };
        case (?ids) {
        // Check if the record with ID "student2" is returned for age 30
        let found = Array.find<Text>(ids, func(id) { id == "student2" }) != null;
        if (found) {
            Debug.print("✅ 'student2' found in query results for age=30.");
        } else {
            Debug.print("❌ 'student2' not found in query results for age=30.");
        };
        return found;
        };
    };
    };


    // Test function to query by index after inserting data
    public func testQueryByIndex() : async Bool {
    let record: Record = {
        id = "student2";
        fields = [
        ("name", "Bob"),
        ("age", "30"),
        ("color", "red"),
        ("creation_timestamp", "1234567890"),
        ("update_timestamp", "1234567890")
        ];
    };

    // Insert the record
    switch (await QuikDB.insertData("Student", record)) {
        case (#ok(_)) {
        Debug.print("✅ Inserted 'student2' successfully.");
        };
        case (#err(errMsg)) {
        Debug.print("❌ Failed to insert 'student2': " # errMsg);
        return false;
        };
    };

    // Query by age (index)
    let ageQueryResult = await QuikDB.queryByIndex("Student", "age", "30");

    Debug.print("ℹ️ Query results for age=30: " # debug_show(ageQueryResult));

    switch (ageQueryResult) {
        case null {
        Debug.print("❌ No records found for age=30");
        return false;
        };
        case (?ids) {
        // Check if 'student2' is returned for age=30
        let found = Array.find<Text>(ids, func(id) { id == "student2" }) != null;
        if (found) {
            Debug.print("✅ 'student2' found in query results for age=30.");
        } else {
            Debug.print("❌ 'student2' not found in query results for age=30.");
        };
        return found;
        };
    };
    };
    public func testSearchByIndex() : async Text {
    // First, create the "Student" schema if not already created
    let studentFields = [
        { name = "name"; fieldType = "string" },
        { name = "age"; fieldType = "integer" },
        { name = "color"; fieldType = "string" }
    ];

    // Ensure schema is created
    let createResult = await QuikDB.createSchema("Student", studentFields, ["age"]);
    switch (createResult) {
        case (#err(errMsg)) {
        Debug.print("⚠️ Schema creation skipped: " # errMsg); // Likely the schema already exists
        };
        case (#ok(_)) {
        Debug.print("✅ Schema 'Student' ensured for testing.");
        };
    };

    // Insert a record into the schema
    let record: Record = {
        id = "student2";
        fields = [
        ("name", "Bob"),
        ("age", "30"),
        ("color", "red"),
        ("creation_timestamp", "1234567890"),
        ("update_timestamp", "1234567890")
        ];
    };

    let insertResult = await QuikDB.insertData("Student", record);
    switch (insertResult) {
        case (#err(errMsg)) {
        return "Test Failed: Record insertion failed with error: " # errMsg;
        };
        case (#ok(true)) {
        Debug.print("✅ Record inserted successfully.");
        };
        case (#ok(false)) {
        return "Test Failed: Record insertion returned false.";
        };
    };

    // Perform search by index
    let searchResult = await QuikDB.searchByIndex("Student", "age", "30");
    switch (searchResult) {
        case (#err(errMsg)) {
        return "Test Failed: Search failed with error: " # errMsg;
        };
        case (#ok(matchingRecords)) {
        Debug.print("✅ Search completed successfully. Matching records: " # debug_show(matchingRecords));

        // Explicitly check if the inserted record is in the search results
        let found = Array.find<Record>(
            matchingRecords,
            func(record: Record) : Bool {
            record.id == "student2"
            }
        );

        if (found != null) {
            return "Test Passed: Record found in search results.";
        } else {
            return "Test Failed: Record not found in search results.";
        };
        };
    };
    };
 // Test function for updateData
    public  func testUpdateData() : async Text {
        // Insert a record for testing
        let record: Record = {
        id = "student1";
        fields = [
            ("name", "Alice"),
            ("age", "20"),
            ("color", "blue"),
            ("creation_timestamp", "1234567890"),
            ("update_timestamp", "1234567890")
        ];
        };

        // Insert the record
        switch (await QuikDB.insertData("Student", record)) {
        case (#ok(_)) {
            Debug.print("✅ Inserted 'student1' successfully.");
        };
        case (#err(errMsg)) {
            Debug.print("❌ Failed to insert 'student1': " # errMsg);
            return "Test Failed: " # errMsg;
        };
        };

        // Update the record's age and color
        let updatedFields: [(Text, Text)] = [
        ("age", "21"),
        ("color", "green")
        ];

        // Perform the update
    switch (await QuikDB.updateData("Student", "student1", updatedFields)) {
            case (#ok(true)) {
            Debug.print("✅ Updated 'student1' successfully.");
            };
            case (#ok(false)) {
            return "Test Failed: Update returned false."; // Handle #ok(false) case
            };
            case (#err(errMsg)) {
            Debug.print("❌ Failed to update 'student1': " # errMsg);
            return "Test Failed: " # errMsg;
            };
    };
        // Retrieve the updated record
        let updatedRecordOpt = await QuikDB.getRecordById("Student", "student1");
        switch (updatedRecordOpt) {
        case null {
            return "Test Failed: Could not retrieve updated record.";
        };
        case (?updatedRecord) {
            Debug.print("✅ Retrieved updated record: " # debug_show(updatedRecord));
            let ageOpt = Array.find<(Text, Text)>(updatedRecord.fields, func(field) { field.0 == "age" });
            let colorOpt = Array.find<(Text, Text)>(updatedRecord.fields, func(field) { field.0 == "color" });

            switch (ageOpt, colorOpt) {
            case (?age, ?color) {
                if (age.1 == "21" and color.1 == "green") {
                return "Test Passed: Record updated successfully.";
                } else {
                return "Test Failed: Record fields do not match expected values.";
                };
            };
            case _ {
                return "Test Failed: Updated fields not found.";
            };
            };
        };
        };
    };
    public  func testDeleteData() : async Text {
        let _ = await QuikDB.deleteSchema("Student");
        // Create schema
        let studentFields = [
        { name = "name"; fieldType = "string" },
        { name = "age"; fieldType = "integer" },
        { name = "color"; fieldType = "string" }
        ];
        switch (await QuikDB.createSchema("Student", studentFields, ["age", "color"])) {
        case (#ok(_)) {
            Debug.print("✅ Schema 'Student' created successfully.");
        };
        case (#err(errMsg)) {
            Debug.print("❌ Failed to create schema: " # errMsg);
            return "Test Failed: " # errMsg;
        };
        };

        // Insert some records for testing
        let record: Record = {
        id = "student1";
        fields = [
            ("name", "John"),
            ("age", "30"),
            ("color", "blue"),
            ("creation_timestamp", "1234567890"),
            ("update_timestamp", "1234567890")
        ];
        };
        switch (await QuikDB.insertData("Student", record)) {
        case (#ok(_)) {
            Debug.print("✅ Inserted 'student1' successfully.");
        };
        case (#err(errMsg)) {
            Debug.print("❌ Failed to insert 'student1': " # errMsg);
            return "Test Failed: " # errMsg;
        };
        };

        // Perform deletion of the record
        // let _ = await QuikDB.deleteData("Student", "student1");
        switch (await QuikDB.deleteData("Student", "student1")) {
            case (#ok(true)) {
            Debug.print("✅ Deleted 'student1' successfully.");
            };
            case (#ok(false)) {
            return "Test Failed: Deletion returned false."; // Handle #ok(false) case
            };
            case (#err(errMsg)) {
            Debug.print("❌ Failed to delete 'student1': " # errMsg);
            return "Test Failed: " # errMsg;
            };
        };

        // Verify deletion
        let verifyResult = await QuikDB.getRecordById("Student", "student1");
        switch (verifyResult) {
        case null {
            Debug.print("✅ Verified 'student1' has been deleted.");
            return "Test Passed: 'student1' was successfully deleted.";
        };
        case (?_) {
            return "Test Failed: 'student1' still exists after deletion.";
        };
        };
    };
    // Test function for searchByMultipleFields
    public  func testSearchByMultipleFields() : async Text {


        let _ = await QuikDB.deleteSchema("Student");
        // First, create the "Student" schema if not already created
        let studentFields = [
            { name = "name"; fieldType = "string" },
            { name = "age"; fieldType = "integer" },
            { name = "color"; fieldType = "string" }
        ];

    // Ensure schema is created
    let createResult = await QuikDB.createSchema("Student", studentFields, ["age", "color"]);
    switch (createResult) {
        case (#err(errMsg)) {
        Debug.print("⚠️ Schema creation skipped: " # errMsg); // Likely the schema already exists
        };
        case (#ok(_)) {
        Debug.print("✅ Schema 'Student' ensured for testing.");
        };
    };


        // Insert some records for testing
        let record1: Record = {
        id = "student1";
        fields = [
            ("name", "Alice"),
            ("age", "30"),
            ("color", "blue"),
            ("creation_timestamp", "1234567890"),
            ("update_timestamp", "1234567890")
        ];
        };
        let record2: Record = {
        id = "student2";
        fields = [
            ("name", "Bob"),
            ("age", "30"),
            ("color", "red"),
            ("creation_timestamp", "1234567890"),
            ("update_timestamp", "1234567890")
        ];
        };
        let record3: Record = {
        id = "student3";
        fields = [
            ("name", "Charlie"),
            ("age", "25"),
            ("color", "blue"),
            ("creation_timestamp", "1234567890"),
            ("update_timestamp", "1234567890")
        ];
        };

        // Insert records
        switch (await QuikDB.insertData("Student", record1)) {
        case (#ok(_)) {
            Debug.print("✅ Inserted 'student1' successfully.");
        };
        case (#err(errMsg)) {
            Debug.print("❌ Failed to insert 'student1': " # errMsg);
            return "Test Failed: " # errMsg;
        };
        };

        switch (await QuikDB.insertData("Student", record2)) {
        case (#ok(_)) {
            Debug.print("✅ Inserted 'student2' successfully.");
        };
        case (#err(errMsg)) {
            Debug.print("❌ Failed to insert 'student2': " # errMsg);
            return "Test Failed: " # errMsg;
        };
        };

        switch (await QuikDB.insertData("Student", record3)) {
        case (#ok(_)) {
            Debug.print("✅ Inserted 'student3' successfully.");
        };
        case (#err(errMsg)) {
            Debug.print("❌ Failed to insert 'student3': " # errMsg);
            return "Test Failed: " # errMsg;
        };
        };

        // Perform search by multiple fields (age = "30" and color = "blue")
        let searchFilters: [(Text, Text)] = [
        ("age", "30"),
        ("color", "blue")
        ];

        let searchResult = await QuikDB.searchByMultipleFields("Student", searchFilters);
        switch (searchResult) {
        case (#ok(records)) {
            Debug.print("✅ Search results for age=30 and color=blue: " # debug_show(records));
            if (Array.find<Record>(records, func(record) { record.id == "student1" }) != null) {
            return "Test Passed: 'student1' found in search results for age=30 and color=blue.";
            } else {
            return "Test Failed: 'student1' not found in search results for age=30 and color=blue.";
            };
        };
        case (#err(errMsg)) {
            Debug.print("❌ Search failed: " # errMsg);
            return "Test Failed: " # errMsg;
        };
        };
    };

};
