import Result "mo:base/Result";
import ErrorTypes "ErrorTypes";

module {
    /// Reusable function to handle Result.Result types.
    ///
    /// # Arguments
    ///
    /// * `result` - The result to be processed.
    ///
    /// # Returns
    ///
    /// The processed result as either `#ok` or `#err` wrapped in the appropriate type.
    private func _handleResult<T>(result: Result.Result<T, ErrorTypes.QuikDBError>): Result.Result<T, ErrorTypes.QuikDBError> {
        switch (result) {
            case (#ok(value)) {
                return #ok(value);
            };
            case (#err(error)) {
                return #err(error);
            };
        }
    };
}
