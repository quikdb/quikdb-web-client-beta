declare module 'lodash.merge' {
  function merge<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
  export = merge;
}
