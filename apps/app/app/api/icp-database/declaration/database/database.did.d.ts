import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Field { 'name' : string, 'fieldType' : string }
export interface Record { 'id' : string, 'fields' : Array<[string, string]> }
export type Result = { 'ok' : boolean } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<Record> } |
  { 'err' : string };
export interface Schema {
  'schemaName' : string,
  'createdAt' : bigint,
  'fields' : Array<Field>,
  'indexes' : Array<string>,
}
export interface _SERVICE {
  'createSchema' : ActorMethod<[string, Array<Field>, Array<string>], Result>,
  'deleteData' : ActorMethod<[string, string], Result>,
  'deleteSchema' : ActorMethod<[string], Result>,
  'getOwner' : ActorMethod<[], Principal>,
  'getRecordById' : ActorMethod<[string, string], [] | [Record]>,
  'getSchema' : ActorMethod<[string], [] | [Schema]>,
  'initOwner' : ActorMethod<[Principal], boolean>,
  'insertData' : ActorMethod<[string, Record], Result>,
  'queryByIndex' : ActorMethod<[string, string, string], [] | [Array<string>]>,
  'searchByIndex' : ActorMethod<[string, string, string], Result_1>,
  'searchByMultipleFields' : ActorMethod<
    [string, Array<[string, string]>],
    Result_1
  >,
  'updateData' : ActorMethod<[string, string, Array<[string, string]>], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
