import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SchemaState { // Ensure SchemaState is explicitly exported
  selectedSchema: string | null;
  schema: any[];
  schemaData: any[];
  schemaIndexes: string[];
  schemaAttributes: any[];
  loading: boolean;
}

const initialState: SchemaState = {
  selectedSchema: null,
  schema: [],
  schemaData: [],
  schemaIndexes: [],
  schemaAttributes: [],
  loading: false,
};

const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setSelectedSchema(state, action: PayloadAction<string | null>) {
      state.selectedSchema = action.payload;
    },
    setSchema(state, action: PayloadAction<any[]>) {
      state.schema = action.payload;
    },
    setSchemaData(state, action: PayloadAction<any[]>) {
      state.schemaData = action.payload;
    },
    setSchemaIndexes(state, action: PayloadAction<string[]>) {
      state.schemaIndexes = action.payload;
    },
    setSchemaAttributes(state, action: PayloadAction<any[]>) {
      state.schemaAttributes = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setSelectedSchema,
  setSchema,
  setSchemaData,
  setSchemaIndexes,
  setSchemaAttributes,
  setLoading,
} = schemaSlice.actions;

export default schemaSlice.reducer;
