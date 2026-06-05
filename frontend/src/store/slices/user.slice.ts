import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";
import { endPoint } from "../../services/helper/apiEndPoint";
import type {PropertyItem } from "../../type/type/property/property";
import type { InitialUserState } from "../../type/interface/user/user.interface";
import { toast } from "sonner";



export const initialState: InitialUserState = {
  profile: null,
  favouritesPropertyIds: [],
  loading: false,
  error: null,
  wishList: [],
  agent: [],
  agentId: null
};

export const toggleLikeUnlike = createAsyncThunk(
  "property/liketoggle",
  async (propertyId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endPoint.users.toggleFavorite(propertyId),
      );
      return { propertyId, data: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getWishList = createAsyncThunk(
  "property/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endPoint.users.favorites);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);


export const getAgent = createAsyncThunk(
  "get/agent",
  async(_, {rejectWithValue})=> {
    try {
      const response = await axiosInstance.get(endPoint.users.allAgents);
      return response.data
      
    } catch (error) {
      return rejectWithValue(error)
      
    }

  }
)

export const agentById = createAsyncThunk(
  "agent/id",
  async({agentId}:{agentId:string | undefined}, {rejectWithValue} )=>{
    if(!agentId){
      toast.success("Agent id is required")
      return
    }
    try {
      const response = await axiosInstance.get(endPoint.users.agentById(agentId))
      return response.data
      
    } catch (error) {
      return rejectWithValue(error)
      
    }

  }
)



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleLikeUnlike.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { data, propertyId } = action.payload;
        if (data && data.isLiked === true) {
          if (!state.favouritesPropertyIds.includes(propertyId)) {
            state.favouritesPropertyIds.push(propertyId);
          }
        } else if (data && data.isLiked === false) {
          state.favouritesPropertyIds = state.favouritesPropertyIds.filter(
            (id) => id !== propertyId,
          );
        }
      })
      .addCase(toggleLikeUnlike.rejected, (state, action) => {
        state.error = (action.error as string) ?? "Failed to toggle like";
      })
      .addCase(getWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const payload = action.payload;
        console.log("action", action.payload);
        state.wishList = action.payload
        const favoritesArray = Array.isArray(payload)
          ? payload
          : payload?.favorites || payload?.data || [];

        // Map everything cleanly to an array of pure string IDs
        state.favouritesPropertyIds = favoritesArray.map((item:PropertyItem) =>
          String(item._id),
        )
      })
      .addCase(getAgent.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgent.fulfilled, (state, action)=>{
        // console.log("action agent", action.payload.agents)
        state.loading = false;
        state.error = null;
        state.agent = action.payload.agents;
      })
      .addCase(getAgent.rejected, (state, action)=>{
        state.error = action.payload as string || "Failed to fetch agent";
        state.loading = false
      })
      .addCase(agentById.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(agentById.fulfilled, (state, action)=>{
        console.log("action agent", action.payload)
        state.loading = false;
        state.error = null;
        state.agentId = action.payload;
      })
      .addCase(agentById.rejected, (state, action)=>{
        state.error = action.payload as string || "Failed to fetch agent";
        state.loading = false
      })
      
  },
});

export default userSlice.reducer;
