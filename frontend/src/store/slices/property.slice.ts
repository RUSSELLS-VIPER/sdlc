import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";
import { endPoint } from "../../services/helper/apiEndPoint";
import { getErrorMessage } from "../../services/helper/global.helper";
import type {
  PropertyItem,
  PropertyState,
} from "../../type/type/property/property";
import { toggleLikeUnlike } from "./user.slice";


type PropertyListParams = {
    projectStatus?: "Completed" | "Ongoing";
};

type CreatePropertyPayload = FormData;
type CreatePropertyResponse =
  | { message?: string; property?: PropertyItem }
  | PropertyItem;

const initialState: PropertyState = {
  loading: false,
  error: null,
  items: [],
  itemById: null
};

export const getProperties = createAsyncThunk(
  "property/list",
  async (params: PropertyListParams | undefined, { rejectWithValue }) => {
    try {
      const searchParams = new URLSearchParams();
      if (params?.projectStatus) {
        searchParams.set("projectStatus", params.projectStatus);
      }

      const url = searchParams.toString()
        ? `${endPoint.properties.list}?${searchParams.toString()}`
        : endPoint.properties.list;

      const response = await axiosInstance.get(url);
      const payload = response.data as
        | PropertyItem[]
        | { properties?: PropertyItem[]; data?: PropertyItem[] };
      if (Array.isArray(payload)) {
        return payload;
      }
      if (Array.isArray(payload?.properties)) {
        return payload.properties;
      }
      if (Array.isArray(payload?.data)) {
        return payload.data;
      }
      return [];
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const createProperties = createAsyncThunk(
  "property/create",
  async (data: CreatePropertyPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endPoint.properties.create,
        data,
      );
      const payload = response.data as CreatePropertyResponse;
      if (
        payload &&
        typeof payload === "object" &&
        "property" in payload &&
        payload.property
      ) {
        return payload.property;
      }
      return payload as PropertyItem;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);


export const getPropertyById = createAsyncThunk(
  "propertyById",
  async({id}: {id: string | undefined}, {rejectWithValue})=>{
    if(!id){
      return rejectWithValue("Profile id is required")
    }
    try {

      const response = await axiosInstance.get(endPoint.properties.propertyById(id))
      return response.data
      
    } catch (error) {
      return rejectWithValue(error)
      
    }

  }
)



const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ?? "Unable to fetch properties";
      })
      .addCase(createProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload && (action.payload as PropertyItem)._id) {
          state.items.push(action.payload as PropertyItem);
        }
      })
      .addCase(createProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error as string) ?? "Failed to create properties";
      })
      .addCase(toggleLikeUnlike.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // console.log(action.payload)
        const { data, propertyId } = action.payload;
        console.log("data", data, "propertyId", propertyId);

        state.items = state.items.map((item) => {
        if (item._id !== propertyId) {
            return item;
        }
        const currentLikes = item.likesCount ?? 0;
        let newLikesCount = currentLikes;

        if (data && data.isLiked === true) {
            newLikesCount = currentLikes + 1;
        } else if (data && data.isLiked === false) {
            newLikesCount = Math.max(0, currentLikes - 1);
        }
        return {
            ...item,
            likesCount: newLikesCount
        };
    });
      })
      .addCase(toggleLikeUnlike.rejected, (state, action) => {
        state.error = (action.error as string) ?? "Failed to toggle like";
      })
      .addCase(getPropertyById.pending, (state)=>{
        state.loading = true;
        state.error = null

      })
      .addCase(getPropertyById.fulfilled, (state, action)=>{
        state.loading = false;
        state.error = null;
        state.itemById = action.payload
      })
      .addCase(getPropertyById.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.error as string || "Failed to fetch PropertyById"
      })
  },
});

export default propertySlice.reducer;
