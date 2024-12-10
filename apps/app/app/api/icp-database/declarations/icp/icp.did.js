export const idlFactory = ({ IDL }) => {
  const QuikDBError = IDL.Variant({
    'EncryptionError' : IDL.Text,
    'ItemNotFound' : IDL.Text,
    'GeneralError' : IDL.Text,
    'ValidationError' : IDL.Text,
    'DataGroupNotFound' : IDL.Text,
    'ProjectNotFound' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Text, 'err' : QuikDBError });
  const Time = IDL.Int;
  const DataGroup = IDL.Record({
    'databaseId' : IDL.Nat,
    'name' : IDL.Text,
    'createdAt' : Time,
    'createdBy' : IDL.Principal,
    'groupId' : IDL.Nat,
    'projectId' : IDL.Nat,
  });
  const Result_7 = IDL.Variant({
    'ok' : IDL.Opt(DataGroup),
    'err' : QuikDBError,
  });
  const Database = IDL.Record({
    'databaseId' : IDL.Nat,
    'name' : IDL.Text,
    'createdAt' : Time,
    'createdBy' : IDL.Principal,
    'projectId' : IDL.Nat,
  });
  const Result_6 = IDL.Variant({
    'ok' : IDL.Opt(Database),
    'err' : QuikDBError,
  });
  const Project = IDL.Record({
    'name' : IDL.Text,
    'createdAt' : Time,
    'createdBy' : IDL.Principal,
    'description' : IDL.Text,
    'projectId' : IDL.Nat,
  });
  const Result_5 = IDL.Variant({
    'ok' : IDL.Opt(Project),
    'err' : QuikDBError,
  });
  const Item = IDL.Record({
    'key' : IDL.Text,
    'value' : IDL.Vec(IDL.Nat8),
    'createdAt' : Time,
    'updatedAt' : Time,
  });
  const Result_4 = IDL.Variant({ 'ok' : Item, 'err' : QuikDBError });
  const Result_2 = IDL.Variant({ 'ok' : DataGroup, 'err' : QuikDBError });
  const Result_1 = IDL.Variant({ 'ok' : Database, 'err' : QuikDBError });
  const Result = IDL.Variant({ 'ok' : Project, 'err' : QuikDBError });
  return IDL.Service({
    'createBatchItems' : IDL.Func(
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Nat8)))],
        [Result_3],
        [],
      ),
    'createDataGroup' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Text, IDL.Text],
        [Result_7],
        [],
      ),
    'createDatabase' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Text, IDL.Text],
        [Result_6],
        [],
      ),
    'createProject' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_5], []),
    'deleteItem' : IDL.Func([IDL.Text], [Result_3], []),
    'generateId' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Text], ['query']),
    'getBatchItems' : IDL.Func(
        [IDL.Vec(IDL.Text)],
        [IDL.Vec(Result_4)],
        ['query'],
      ),
    'getDataGroups' : IDL.Func([], [IDL.Vec(DataGroup)], ['query']),
    'getDatabases' : IDL.Func([], [IDL.Vec(Database)], ['query']),
    'getItem' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'getProjects' : IDL.Func([], [IDL.Vec(Project)], ['query']),
    'listAllKeys' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'putItem' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [Result_3], []),
    'updateDataGroup' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text], [Result_2], []),
    'updateDatabase' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text], [Result_1], []),
    'updateProject' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
