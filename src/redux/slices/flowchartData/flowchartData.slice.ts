// flowchart.slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// Initial state
const initialState: any = {
  nodes: [],
  loading: false,
  error: null,
};

// Async thunk example (fetch nodes)
export const fetchFlowchartNodes = createAsyncThunk<
  any[],
  any,
  { state: RootState }
>("flowchart/fetchNodes", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://67ed62a74387d9117bbd700c.mockapi.io/workflow/flowchart/${
        id ? id : ""
      }`
    );
    if (!response.ok) throw new Error("Failed to fetch");

    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addFlowchartNode = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("flowchart/addNode", async (node, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://67ed62a74387d9117bbd700c.mockapi.io/workflow/flowchart/${node.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(node.payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add node");
    }

    return node;
  } catch (error: any) {
    console.error("Error adding node:", error.message); // Log the error
    return rejectWithValue(error.message);
  }
});

// Slice
const flowchartSlice = createSlice({
  name: "flowchart",
  initialState,
  reducers: {
    // removeNode: (state, action: PayloadAction<string>) => {
    //   state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlowchartNodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlowchartNodes.fulfilled, (state, action) => {
        state.loading = false;
        state.nodes = action.payload;
      })
      .addCase(fetchFlowchartNodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addFlowchartNode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFlowchartNode.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addFlowchartNode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { removeNode } = flowchartSlice.actions;
export default flowchartSlice.reducer;
