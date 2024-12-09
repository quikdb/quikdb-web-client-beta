// import Principal "mo:base/Principal";
// import Crypto "mo:base/Crypto";

// module ExternalIntegration {

//   public type ConnectionDetails = {
//     id: Nat;
//     displayName: Text;
//     connectionString: Text;
//     encryptedCredentials: Blob;
//     createdBy: Principal;
//   };

//   // Stable variable to store database connections
//   stable var databaseConnections: [ConnectionDetails] = [];
//   stable var connectionCounter: Nat = 0;

//   // Add Database Connection
//   public shared func addDatabaseConnection(
//     _displayName: Text,
//     _connectionString: Text,
//     _credentials: Text // JSON formatted credentials
//   ): async Nat {
//     // Step 1: Authenticate the caller
//     if (msg.caller != Principal.fromText("your-admin-principal-id")) {
//       return (-1 : Nat); // Error: Unauthorized access
//     };

//     // Step 2: Encrypt credentials
//     let encryptedCredentials = Crypto.sha256(Crypto.fromText(_credentials)); // Basic hashing for example, replace with secure encryption

//     // Step 3: Create a new connection entry
//     let connectionId = connectionCounter;
//     let newConnection: ConnectionDetails = {
//       id = connectionId;
//       displayName = _displayName;
//       connectionString = _connectionString;
//       encryptedCredentials = encryptedCredentials;
//       createdBy = msg.caller;
//     };

//     // Step 4: Store the connection details and increment the counter
//     databaseConnections := databaseConnections # [newConnection];
//     connectionCounter += 1;

//     // Step 5: Return the Connection ID
//     return connectionId;
//   };

//   // Function to list all database connections
//   public shared func listDatabaseConnections(): async [ConnectionDetails] {
//     return databaseConnections;
//   };

//   // Function to remove a database connection
//   public shared func removeDatabaseConnection(_connectionId: Nat): async Text {
//     // Authenticate the caller
//     if (msg.caller != Principal.fromText("your-admin-principal-id")) {
//       return "Error: Unauthorized access";
//     };

//     // Remove the connection by filtering
//     databaseConnections := databaseConnections.filter(func (conn) { conn.id != _connectionId });
//     return "Database connection removed successfully.";
//   };

//   // Function to query data via API gateway
//   public shared func queryDatabase(_connectionId: Nat, _query: Text): async Text {
//     // Implementation Note:
//     // This function would call the API gateway you set up to execute the query.
//     // IC currently doesn't support direct network calls, so you would need a bridge server.
//     return "Query result (placeholder)";
//   };
// }
