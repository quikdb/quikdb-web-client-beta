import Time "mo:base/Time";
import Principal "mo:base/Principal";
import ErrorTypes "./error.module";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";

module Authentication {

    public type PermissionsDetails = {
        asignee : Text;
        canReadDatabase : Bool;
        canWriteDatabase : Bool;
        canCreateCanister : Bool;
        canUpdateCanister : Bool;
        canDeleteCanister : Bool;
        canReadProject : Bool;
        canUpdateProject : Bool;
        canDeleteProject : Bool;
        canReadDataGroup : Bool;
        canUpdateDataGroup : Bool;
        canDeleteDataGroup : Bool;
        canReadGroupItems : Bool;
        canUpdateGroupItems : Bool;
        canDeleteGroupItems : Bool;
        isAdmin : Bool;
        readsOnly : Bool;
        readsAndWrites : Bool;
    };

    public type OwnerDetails = {
        canisterId : Text;
        canisterUrl : Text;
        name : Text;
        createdBy : Principal;
        createdAt : Time.Time;
    };

    // Stable storage for permissions, stored as an array of principal-permission pairs
    stable var permissionsArray : [(Principal, PermissionsDetails)] = [];

    // Temporary in-memory map, loaded from stable storage at runtime
    var permissionsMap : HashMap.HashMap<Principal, PermissionsDetails> = HashMap<Principal, PermissionsDetails>();

    // Load permissions from stable array into HashMap
    public func loadPermissions() {
        permissionsMap.clear();
        for ((principal, details) in permissionsArray.vals()) {
            permissionsMap.put(principal, details);
        };
    };

    // Initializes owner with admin permissions and saves to persistent storage
    public func initOwner(_token : OwnerDetails) : async Text {
        let adminPermissions = PermissionsDetails {
            asignee = _token.name;
            canReadDatabase = true;
            canWriteDatabase = true;
            canCreateCanister = true;
            canUpdateCanister = true;
            canDeleteCanister = true;
            canReadProject = true;
            canUpdateProject = true;
            canDeleteProject = true;
            canReadDataGroup = true;
            canUpdateDataGroup = true;
            canDeleteDataGroup = true;
            canReadGroupItems = true;
            canUpdateGroupItems = true;
            canDeleteGroupItems = true;
            isAdmin = true;
            readsOnly = false;
            readsAndWrites = true;
        };

        permissionsArray := permissionsArray # [(_token.createdBy, adminPermissions)];
        loadPermissions();  // Refresh permissionsMap with new data
        return "Owner initialized with admin permissions";
    };

    public func setPermissions(_orgId : Nat, _userId : Principal, _role : Text) : async Result.Result<(), ErrorTypes.QuikDBError> {
        // Step 1: Check if _userId is not anonymous
        if (Principal.isAnonymous(_userId)) {
            return #err(#ValidationError("Unauthorized: Anonymous caller cannot set permissions"));
        };

        // Step 2: Verify _userId's authority to assign roles
        let userPermissionsOpt = permissionsMap.get(_userId);
        switch (userPermissionsOpt) {
            case (?permissions) {
                if permissions.isAdmin == false {
                    return #err(#ValidationError("Unauthorized: Caller does not have authority to assign roles"));
                };
            };
            case (null) {
                return #err(#ValidationError("Unauthorized: Caller permissions not found"));
            };
        };

        // Step 3: Implement further logic for setting permissions
        // ...

        return #ok(());
    };
};
