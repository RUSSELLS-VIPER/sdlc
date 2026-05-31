import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";
import { endPoint } from "../../services/helper/apiEndPoint";
import type {PropertyItem } from "../../type/type/property/property";
import type { InitialUserState } from "../../type/interface/user/user.interface";



export const initialState: InitialUserState = {
  profile: null,
  favouritesPropertyIds: [],
  loading: false,
  error: null,
  wishList: []
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
        );
      });
  },
});

export default userSlice.reducer;
