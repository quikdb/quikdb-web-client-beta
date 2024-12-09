import Array "mo:base/Array";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";

module {
    public type Transaction = {
        id: Nat;
        userId: Principal;
        amount: Nat;
        transactionType: TransactionType;
        timestamp: Time.Time;
    };

    public type TransactionType = {
        #credit;
        #debit;
    };

    public type UserCredit = {
        userId: Principal;
        balance: Nat;
    };

    public class IncentiveManager() {
        private var transactions : [Transaction] = [];
        private var userCredits : [UserCredit] = [];
        private var nextTransactionId : Nat = 0;

        // Helper functions
        private func findUserCredit(userId: Principal) : ?UserCredit {
            Array.find<UserCredit>(userCredits, func(credit) { credit.userId == userId })
        };

        private func updateUserCredit(newCredit: UserCredit) {
            let buffer = Buffer.Buffer<UserCredit>(userCredits.size());
            for (credit in userCredits.vals()) {
                if (credit.userId != newCredit.userId) {
                    buffer.add(credit);
                };
            };
            buffer.add(newCredit);
            userCredits := Buffer.toArray(buffer);
        };

        private func recordTransaction(userId: Principal, amount: Nat, txType: TransactionType) {
            let newTransaction : Transaction = {
                id = nextTransactionId;
                userId = userId;
                amount = amount;
                transactionType = txType;
                timestamp = Time.now();
            };

            let buffer = Buffer.Buffer<Transaction>(transactions.size() + 1);
            for (tx in transactions.vals()) {
                buffer.add(tx);
            };
            buffer.add(newTransaction);
            transactions := Buffer.toArray(buffer);
            nextTransactionId += 1;
        };

        // Add credits to user's account
        public func addCredits(userId: Principal, amount: Nat) : Result.Result<Nat, Text> {
            if (amount == 0) {
                return #err("Amount must be greater than 0");
            };

            let currentCredit = switch (findUserCredit(userId)) {
                case null {
                    let newCredit = {
                        userId = userId;
                        balance = amount;
                    };
                    updateUserCredit(newCredit);
                    newCredit;
                };
                case (?credit) {
                    let newCredit = {
                        userId = userId;
                        balance = credit.balance + amount;
                    };
                    updateUserCredit(newCredit);
                    newCredit;
                };
            };

            recordTransaction(userId, amount, #credit);
            #ok(currentCredit.balance)
        };

        // Get user's credit balance
        public func getCreditBalance(userId: Principal) : Result.Result<Nat, Text> {
            switch (findUserCredit(userId)) {
                case null { #err("User not found") };
                case (?credit) { #ok(credit.balance) };
            }
        };

        // Deduct credits from user's account
        public func deductCredits(userId: Principal, amount: Nat) : Result.Result<Nat, Text> {
            if (amount == 0) {
                return #err("Amount must be greater than 0");
            };

            switch (findUserCredit(userId)) {
                case null { #err("User not found") };
                case (?credit) {
                    if (credit.balance < amount) {
                        return #err("Insufficient balance");
                    };

                    let newCredit = {
                        userId = userId;
                        balance =0;
                    };
                    updateUserCredit(newCredit);
                    recordTransaction(userId, amount, #debit);
                    #ok(newCredit.balance)
                };
            }
        };

        // Get transaction history for a user
        public func getTransactionHistory(userId: Principal) : [Transaction] {
            Array.filter<Transaction>(
                transactions,
                func(tx) { tx.userId == userId }
            )
        };

        // Additional helper functions

        // Get all transactions within a time range
        public func getTransactionsByTimeRange(startTime: Time.Time, endTime: Time.Time) : [Transaction] {
            Array.filter<Transaction>(
                transactions,
                func(tx) { tx.timestamp >= startTime and tx.timestamp <= endTime }
            )
        };

        // Get total credits issued
        public func getTotalCreditsIssued() : Nat {
            var total : Nat = 0;
            for (tx in transactions.vals()) {
                switch (tx.transactionType) {
                    case (#credit) { total += tx.amount };
                    case (_) {};
                };
            };
            total
        };

        // Get total credits deducted
        public func getTotalCreditsDeducted() : Nat {
            var total : Nat = 0;
            for (tx in transactions.vals()) {
                switch (tx.transactionType) {
                    case (#debit) { total += tx.amount };
                    case (_) {};
                };
            };
            total
        };

        // Get all user balances
        public func getAllUserBalances() : [UserCredit] {
            userCredits
        };
    };
} 