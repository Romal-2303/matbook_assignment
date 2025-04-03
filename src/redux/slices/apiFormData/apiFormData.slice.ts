import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormDataState {
  method: string;
  url: string;
  header: string;
  body: string;
  email: string;
}

const initialState: FormDataState = {
  method: "",
  url: "",
  header: "",
  body: "",
  email: "",
};

const apiFormDataSlice = createSlice({
  name: "apiFormData",
  initialState,
  reducers: {
    setApiFormData: (state, action: PayloadAction<Partial<FormDataState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { setApiFormData, resetForm } = apiFormDataSlice.actions;
export default apiFormDataSlice.reducer;
