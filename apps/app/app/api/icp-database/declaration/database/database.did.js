export const idlFactory = ({ IDL }) => {
  const Field = IDL.Record({ 'name' : IDL.Text, 'fieldType' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  const Record = IDL.Record({
    'id' : IDL.Text,
    'fields' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
  });
  const Schema = IDL.Record({
    'schemaName' : IDL.Text,
    'createdAt' : IDL.Int,
    'fields' : IDL.Vec(Field),
    'indexes' : IDL.Vec(IDL.Text),
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Vec(Record), 'err' : IDL.Text });
  return IDL.Service({
    'createSchema' : IDL.Func(
        [IDL.Text, IDL.Vec(Field), IDL.Vec(IDL.Text)],
        [Result],
        [],
      ),
    'deleteData' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'deleteSchema' : IDL.Func([IDL.Text], [Result], []),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'getRecordById' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Opt(Record)],
        ['query'],
      ),
    'getSchema' : IDL.Func([IDL.Text], [IDL.Opt(Schema)], ['query']),
    'initOwner' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'insertData' : IDL.Func([IDL.Text, Record], [Result], []),
    'queryByIndex' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [IDL.Opt(IDL.Vec(IDL.Text))],
        ['query'],
      ),
    'searchByIndex' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [Result_1], []),
    'searchByMultipleFields' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        [Result_1],
        [],
      ),
    'updateData' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
