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
  string | undefined,
  { state: RootState }
>("flowchart/fetchNodes", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://67ed62a74387d9117bbd700c.mockapi.io/workflow/flowchart${
        id ? `/${id}` : ""
      }`
    );
    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();

    // If response is an object (i.e., single node with id), wrap it in an array
    if (id && typeof data === "object" && !Array.isArray(data)) {
      return [data]; // Wrap it into an array
    }

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateFlowchartNode = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("flowchart/updateNode", async (node, { rejectWithValue }) => {
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
    return rejectWithValue(error.message);
  }
});

// Async thunk to delete a node
export const deleteFlowchartNode = createAsyncThunk<
  string,
  any,
  { state: RootState }
>("flowchart/deleteNode", async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://67ed62a74387d9117bbd700c.mockapi.io/workflow/flowchart/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete node");
    }

    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addFlowchartNode = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("flowchart/addNode", async (nodeData, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://67ed62a74387d9117bbd700c.mockapi.io/workflow/flowchart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nodeData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add node");
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Slice
const flowchartSlice = createSlice({
  name: "flowchart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlowchartNodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlowchartNodes.fulfilled, (state, action) => {
        state.loading = false;
        // state.nodes = action.payload;
        state.nodes = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
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
        state.nodes.push(action.payload); // Add new node to state
      })
      .addCase(addFlowchartNode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateFlowchartNode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFlowchartNode.fulfilled, (state, action) => {
        state.loading = false;

        // Find the index of the updated node in state.nodes
        const index = state.nodes.findIndex(
          (node: any) => node.id === action.payload.id
        );

        if (index !== -1) {
          // Replace the existing node with the updated node
          state.nodes[index] = {
            ...state.nodes[index],
            ...action.payload.payload,
          };
        }
      })
      .addCase(updateFlowchartNode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteFlowchartNode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFlowchartNode.fulfilled, (state, action) => {
        state.loading = false;
        state.nodes = state.nodes.filter(
          (node: any) => node.id !== action.payload
        );
      })
      .addCase(deleteFlowchartNode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default flowchartSlice.reducer;
