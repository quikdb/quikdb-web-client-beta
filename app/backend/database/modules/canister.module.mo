import Principal "mo:base/Principal";

module CanisterManagement {

    // Stable variable to store canister controllers
    stable var canisterControllers : [(Nat, [Principal])] = [];

    // Helper function to check if caller is a controller
    private func isController(_canisterId: Nat, caller: Principal) : Bool {
        switch (canisterControllers.find(func (item) { item.0 == _canisterId })) {
            case null { false };
            case ?(_, controllers) { controllers.contains(caller) };
        }
    };

    // Adds a controller to a canister
    public func addCanisterController(_canisterId: Nat, _controllerId: Principal): async Text {
        // Authenticate the caller
        if (!isController(_canisterId, msg.caller)) {
            return "Error: Unauthorized access. Caller is not a controller.";
        };

        // Check if the controller ID is valid
        if (_controllerId == Principal.fromText("2vxsx-fae")) {
            return "Error: Invalid controller ID (anonymous not allowed).";
        };

        // Update the list of controllers
        switch (canisterControllers.find(func (item) { item.0 == _canisterId })) {
            case null {
                canisterControllers := canisterControllers # [(_canisterId, [_controllerId])];
            };
            case ?(id, controllers) {
                if (!controllers.contains(_controllerId)) {
                    canisterControllers := canisterControllers.filter(func (item) { item.0 != id });
                    canisterControllers := canisterControllers # [(id, controllers # [_controllerId])];
                } else {
                    return "Error: Controller already exists.";
                };
            };
        };

        return "Controller added successfully.";
    };

    // Removes a controller from a canister
    public func removeCanisterController(_canisterId: Nat, _controllerId: Principal): async Text {
        // Authenticate the caller
        if (!isController(_canisterId, msg.caller)) {
            return "Error: Unauthorized access. Caller is not a controller.";
        };

        // Find the canister and update the list of controllers
        switch (canisterControllers.find(func (item) { item.0 == _canisterId })) {
            case null { return "Error: Canister not found."; };
            case ?(id, controllers) {
                if (!controllers.contains(_controllerId)) {
                    return "Error: Controller does not exist.";
                };

                // Prevent removal of the last controller
                if (controllers.size() == 1) {
                    return "Error: Cannot remove the only controller.";
                };

                // Update the controllers list
                let updatedControllers = controllers.filter(func (controller) { controller != _controllerId });
                canisterControllers := canisterControllers.filter(func (item) { item.0 != id });
                canisterControllers := canisterControllers # [(id, updatedControllers)];
            };
        };

        return "Controller removed successfully.";
    };

    // Lists controllers for a specific canister
    public func listCanisterControllers(_canisterId: Nat): async [Principal] {
        switch (canisterControllers.find(func (item) { item.0 == _canisterId })) {
            case null { return []; };
            case ?(_, controllers) { return controllers; };
        }
    }
}
