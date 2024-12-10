import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface DataGroup {
  'databaseId' : bigint,
  'name' : string,
  'createdAt' : Time,
  'createdBy' : Principal,
  'groupId' : bigint,
  'projectId' : bigint,
}
export interface Database {
  'databaseId' : bigint,
  'name' : string,
  'createdAt' : Time,
  'createdBy' : Principal,
  'projectId' : bigint,
}
export interface Item {
  'key' : string,
  'value' : Uint8Array | number[],
  'createdAt' : Time,
  'updatedAt' : Time,
}
export interface Project {
  'name' : string,
  'createdAt' : Time,
  'createdBy' : Principal,
  'description' : string,
  'projectId' : bigint,
}
export type QuikDBError = { 'EncryptionError' : string } |
  { 'ItemNotFound' : string } |
  { 'GeneralError' : string } |
  { 'ValidationError' : string } |
  { 'DataGroupNotFound' : string } |
  { 'ProjectNotFound' : string };
export type Result = { 'ok' : Project } |
  { 'err' : QuikDBError };
export type Result_1 = { 'ok' : Database } |
  { 'err' : QuikDBError };
export type Result_2 = { 'ok' : DataGroup } |
  { 'err' : QuikDBError };
export type Result_3 = { 'ok' : string } |
  { 'err' : QuikDBError };
export type Result_4 = { 'ok' : Item } |
  { 'err' : QuikDBError };
export type Result_5 = { 'ok' : [] | [Project] } |
  { 'err' : QuikDBError };
export type Result_6 = { 'ok' : [] | [Database] } |
  { 'err' : QuikDBError };
export type Result_7 = { 'ok' : [] | [DataGroup] } |
  { 'err' : QuikDBError };
export type Time = bigint;
export interface _SERVICE {
  'createBatchItems' : ActorMethod<
    [Array<[string, Uint8Array | number[]]>],
    Result_3
  >,
  'createDataGroup' : ActorMethod<
    [bigint, bigint, bigint, string, string],
    Result_7
  >,
  'createDatabase' : ActorMethod<[bigint, bigint, string, string], Result_6>,
  'createProject' : ActorMethod<[string, string, string], Result_5>,
  'deleteItem' : ActorMethod<[string], Result_3>,
  'generateId' : ActorMethod<[string, bigint], string>,
  'getBatchItems' : ActorMethod<[Array<string>], Array<Result_4>>,
  'getDataGroups' : ActorMethod<[], Array<DataGroup>>,
  'getDatabases' : ActorMethod<[], Array<Database>>,
  'getItem' : ActorMethod<[string], Result_4>,
  'getProjects' : ActorMethod<[], Array<Project>>,
  'listAllKeys' : ActorMethod<[], Array<string>>,
  'putItem' : ActorMethod<[string, Uint8Array | number[]], Result_3>,
  'updateDataGroup' : ActorMethod<[bigint, string, string], Result_2>,
  'updateDatabase' : ActorMethod<[bigint, string, string], Result_1>,
  'updateProject' : ActorMethod<[bigint, string, string, string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
