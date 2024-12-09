// Organization and Project Management Module
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Blob "mo:base/Blob";

module {
    // Define a custom hash function for Nat
    public func customNatHash(n: Nat): Hash.Hash {
        // Convert Nat to Text and hash it
        let text = Nat.toText(n);
        return Text.hash(text);
    };

    public type Organization = {
        id: Text;
        name: Text;
        owner: Principal;
        members: [Principal];
        created_at: Time.Time;
        details: ?Blob;
    };

    public type Role = {
        userId: Principal;
        role: Blob;
    };

    public type Project = {
        id: Nat;
        orgId: Text;
        details: Blob;
        created_at: Time.Time;
    };

    public class OrganizationManager() {
        private var organizations : [Organization] = [];
        private var projects : [Project] = [];
        private var nextProjectId : Nat = 0;

        private func findOrganization(id: Text) : ?Organization {
            Array.find<Organization>(organizations, func(org) { org.id == id })
        };

        private func updateOrganization(newOrg: Organization) {
            let buffer = Buffer.Buffer<Organization>(organizations.size());
            for (org in organizations.vals()) {
                if (org.id != newOrg.id) {
                    buffer.add(org);
                };
            };
            buffer.add(newOrg);
            organizations := Buffer.toArray(buffer);
        };

        public func createOrganization(id: Text, name: Text, owner: Principal, details: ?Blob) : Result.Result<Organization, Text> {
            switch (findOrganization(id)) {
                case (?_) { #err("Organization ID already exists") };
                case null {
                    let newOrg : Organization = {
                        id = id;
                        name = name;
                        owner = owner;
                        members = [owner];
                        created_at = Time.now();
                        details = details;
                    };

                    let buffer = Buffer.Buffer<Organization>(organizations.size() + 1);
                    for (org in organizations.vals()) {
                        buffer.add(org);
                    };
                    buffer.add(newOrg);
                    organizations := Buffer.toArray(buffer);

                    #ok(newOrg)
                };
            }
        };

        public func addMemberToOrganization(orgId: Text, newMember: Principal,  caller: Principal) : Result.Result<Organization, Text> {
            switch (findOrganization(orgId)) {
                case null { #err("Organization not found") };
                case (?org) {
                    if (org.owner != caller) {
                        return #err("Only the organization owner can add members");
                    };

                    let memberExists = Array.find<Principal>(org.members, func(m) { m == newMember });
                    switch (memberExists) {
                        case (?_) { #err("Member already exists in organization") };
                        case null {
                            let memberBuffer = Buffer.Buffer<Principal>(org.members.size() + 1);
                            for (member in org.members.vals()) {
                                memberBuffer.add(member);
                            };
                            memberBuffer.add(newMember);

                            let updatedOrg : Organization = {
                                id = org.id;
                                name = org.name;
                                owner = org.owner;
                                members = Buffer.toArray(memberBuffer);
                                created_at = org.created_at;
                                details = org.details;
                            };

                            updateOrganization(updatedOrg);
                            #ok(updatedOrg)
                        };
                    }
                };
            }
        };

        public func removeMemberFromOrganization(orgId: Text, memberToRemove: Principal) : Result.Result<Organization, Text> {
            switch (findOrganization(orgId)) {
                case null { #err("Organization not found") };
                case (?org) {
                    if (org.owner == memberToRemove) {
                        return #err("Cannot remove the owner from the organization");
                    };

                    let memberBuffer = Buffer.Buffer<Principal>(org.members.size());
                    var memberFound = false;

                    for (member in org.members.vals()) {
                        if (member != memberToRemove) {
                            memberBuffer.add(member);
                        } else {
                            memberFound := true;
                        };
                    };

                    if (not memberFound) {
                        return #err("Member not found in organization");
                    };

                    let updatedOrg : Organization = {
                        id = org.id;
                        name = org.name;
                        owner = org.owner;
                        members = Buffer.toArray(memberBuffer);
                        created_at = org.created_at;
                        details = org.details;
                    };

                    updateOrganization(updatedOrg);
                    #ok(updatedOrg)
                };
            }
        };

        public func getOrganization(id: Text) : Result.Result<Organization, Text> {
            switch (findOrganization(id)) {
                case null { #err("Organization not found") };
                case (?org) { #ok(org) };
            }
        };

        public func getAllOrganizations() : [Organization] {
            organizations
        };

        public func isMemberOfOrganization(orgId: Text, memberId: Principal) : Bool {
            switch (findOrganization(orgId)) {
                case null { false };
                case (?org) {
                    switch (Array.find<Principal>(org.members, func(m) { m == memberId })) {
                        case null { false };
                        case (?_) { true };
                    }
                };
            }
        };

        public func updateOrganizationName(orgId: Text, newName: Text, caller: Principal) : Result.Result<Organization, Text> {
            switch (findOrganization(orgId)) {
                case null { #err("Organization not found") };
                case (?org) {
                    if (org.owner != caller) {
                        return #err("Only the organization owner can update the name");
                    };

                    let updatedOrg : Organization = {
                        id = org.id;
                        name = newName;
                        owner = org.owner;
                        members = org.members;
                        created_at = org.created_at;
                        details = org.details;
                    };

                    updateOrganization(updatedOrg);
                    #ok(updatedOrg)
                };
            }
        };

        public func addProject(orgId: Text, details: Blob, caller: Principal) : Result.Result<Project, Text> {
            switch (findOrganization(orgId)) {
                case null { #err("Organization not found") };
                case (?org) {
                    if (not isMemberOfOrganization(orgId, caller)) {
                        return #err("Caller is not a member of the organization");
                    };

                    let newProject : Project = {
                        id = nextProjectId;
                        orgId = orgId;
                        details = details;
                        created_at = Time.now();
                    };

                    let buffer = Buffer.Buffer<Project>(projects.size() + 1);
                    for (proj in projects.vals()) {
                        buffer.add(proj);
                    };
                    buffer.add(newProject);
                    projects := Buffer.toArray(buffer);
                    nextProjectId += 1;

                    #ok(newProject)
                };
            }
        };

        public func editOrganization(orgId: Text, newName: Text, newDetails: ?Blob, caller: Principal) : Result.Result<Organization, Text> {
            switch (findOrganization(orgId)) {
                case null { #err("Organization not found") };
                case (?org) {
                    if (org.owner != caller) {
                        return #err("Only the organization owner can edit details");
                    };

                    let updatedOrg : Organization = {
                        id = org.id;
                        name = newName;
                        owner = org.owner;
                        members = org.members;
                        created_at = org.created_at;
                        details = newDetails;
                    };

                    updateOrganization(updatedOrg);
                    #ok(updatedOrg)
                };
            }
        };

        public func deleteOrganization(orgId: Text, caller: Principal) : Result.Result<(), Text> {
            switch (findOrganization(orgId)) {
                case null { #err("Organization not found") };
                case (?org) {
                    if (org.owner != caller) {
                        return #err("Only the organization owner can delete the organization");
                    };

                    let buffer = Buffer.Buffer<Organization>(organizations.size());
                    for (existingOrg in organizations.vals()) {
                        if (existingOrg.id != orgId) {
                            buffer.add(existingOrg);
                        };
                    };
                    organizations := Buffer.toArray(buffer);

                    // Also delete associated projects
                    let projBuffer = Buffer.Buffer<Project>(projects.size());
                    for (proj in projects.vals()) {
                        if (proj.orgId != orgId) {
                            projBuffer.add(proj);
                        };
                    };
                    projects := Buffer.toArray(projBuffer);

                    #ok(())
                };
            }
        };

        public func getOrganizationProjects(orgId: Text) : [Project] {
            Array.filter<Project>(
                projects,
                func(proj) { proj.orgId == orgId }
            )
        };

        public func getOrganizationsForUser(userId: Principal) : [Organization] {
            Array.filter<Organization>(
                organizations,
                func(org) {
                    Array.find<Principal>(org.members, func(m) { m == userId }) != null
                }
            )
        };
    };
};