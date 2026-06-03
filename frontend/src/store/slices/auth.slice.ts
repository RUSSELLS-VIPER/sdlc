import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";
import { endPoint } from "../../services/helper/apiEndPoint";
import { getErrorMessage } from "../../services/helper/global.helper";
import type {
  ForgotPasswordValue,
  Loginformvalue,
  ResetPasswordValue,
  signupformvalue,
} from "../../type/interface/auth.interface";
import type {
  AuthInitialState,
  AuthUser,
} from "../../type/type/auth/auth.type";

const token = localStorage.getItem("token") ?? null;
const role = localStorage.getItem("role") ?? null;
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : null;

const initialState: AuthInitialState = {
  loading: false,
  error: null,
  role: role,
  token: token,
  user: user,
  message: null,
};

export const signUp = createAsyncThunk(
  "auth/signup",
  async (data: signupformvalue, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoint.auth.signup, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: Loginformvalue, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoint.auth.login, data);
      return response.data as { token: string; user: AuthUser };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endPoint.auth.verifyEmail,
        data,
      );
      return response.data as { message: string };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: ForgotPasswordValue, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endPoint.auth.forgotPassword,
        data,
      );
      return response.data as {
        message: string;
        email?: string;
        emailSent?: boolean;
        otp?: string;
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: ResetPasswordValue, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endPoint.auth.resetPassword,
        data,
      );
      return response.data as { message: string };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateProfile = createAsyncThunk(
  "profile/update",
  async ({ data }: { data: FormData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        endPoint.users.updateProfile,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getProfileById = createAsyncThunk(
  "profile/get",
  async ({ userId }: { userId: string | undefined }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${endPoint.users.profileById(userId)}`,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.message = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.message = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      window.location.href = "/login";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message ?? "Signup successful";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Signup failed";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        state.message = "Login successful";
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("role", action.payload.user.role);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Login failed";
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Email verification failed";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to send OTP";
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to reset password";
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        const updatedFields = action.payload?.user ?? action.payload;
        const profilePicData = action.payload?.profilePic ?? updatedFields?.profilePic;
        
        const updatedUser = {
          ...state.user,
          ...updatedFields,
          ...(profilePicData ? { profilePic: profilePicData } : {}),
        };

        state.user = updatedUser;
        state.message = "Profile Updated Successfully!";
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update profile";
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        const structuralUser = action.payload?.user ?? action.payload;
        const profilePicData = action.payload?.profilePic ?? structuralUser?.profilePic;

        const fullyHydratedUser = {
          ...state.user,
          ...structuralUser,
          ...(profilePicData ? { profilePic: profilePicData } : {}),
        };

        state.user = fullyHydratedUser;
        localStorage.setItem("user", JSON.stringify(fullyHydratedUser));
      });
      // Duplicate .rejected and .fulfilled cases completely removed from here
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;