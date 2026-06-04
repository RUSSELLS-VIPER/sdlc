import { useState, useEffect, type ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import type { AgentSidebarProps } from "../../type/interface/agent/agent-dashboard.interface";
import logo from "../../assets/images/agent-dashboard-images/logo.png";
import agent1 from "../../assets/images/agent-dashboard-images/agent-1.jpg";
import {
  useAppDispatch,
  useAppSeletor,
} from "../../services/helper/reduxstore";
import { getProfileById, logout, updateProfile } from "../../store/slices/auth.slice";
import { Camera, UserPen } from "lucide-react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { toast } from "sonner";
import type {
  MongoBinaryData,
  LegacyBufferData,
  ProfileFormData,
} from "../../type/interface/userDashboard/userDashboard.interface";

const Sidebar: React.FC<AgentSidebarProps> = ({ isOpen, onMenuClose }) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSeletor((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      city: "",
      district: "",
      locality: "",
    },
  });

  const arrayBufferToBase64 = (arr: number[]): string => {
    let binary = "";
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(arr[i]);
    }
    return btoa(binary);
  };

  // Safe converter logic parsing database buffers into viewable components
  const getAvatarSource = (): string => {
    if (user?.profilePic) {
      if (typeof user.profilePic === "string") {
        return user.profilePic;
      }

      const contentType = user.profilePic.contentType;
      const imageData = user.profilePic.data;

      if (imageData && typeof imageData === "object" && "$binary" in imageData) {
        const binaryImageData = imageData as MongoBinaryData;
        const embeddedBase64 = binaryImageData.$binary?.base64;
        if (embeddedBase64) {
          return `data:${contentType};base64,${embeddedBase64}`;
        }
      } else if (
        imageData &&
        typeof imageData === "object" &&
        "type" in imageData &&
        (imageData as LegacyBufferData).type === "Buffer" &&
        Array.isArray((imageData as LegacyBufferData).data)
      ) {
        try {
          const bufferImageData = imageData as LegacyBufferData;
          const base64String = arrayBufferToBase64(bufferImageData.data);
          return `data:${contentType};base64,${base64String}`;
        } catch (error) {
          console.error("Error processing buffer-shaped profile picture:", error);
        }
      } else if (Array.isArray(imageData)) {
        try {
          const base64String = arrayBufferToBase64(imageData);
          return `data:${contentType};base64,${base64String}`;
        } catch (error) {
          console.error("Error processing profile picture buffer:", error);
        }
      }
    }
    return agent1;
  };

  // Synchronize avatar preview properly on state load and updates
  useEffect(() => {
    if (!profileFile) {
      setImagePreview(getAvatarSource());
    }
  }, [user, profileFile]);

  // Clean up blob URL allocation to prevent browser memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Dispatch profile fetch call on component mount
  useEffect(() => {
    const userId = user?.id;
    if (userId) {
      dispatch(getProfileById({ userId }));
    }
  }, [dispatch]);

  // Synchronize form state values when modal opens
  useEffect(() => {
    if (user && isModalOpen) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phoneNo: user.phoneNo ? String(user.phoneNo) : "",
        city: user.city || "",
        district: user.district || "",
        locality: user.locality || "",
      });
      setProfileFile(null);
      setImagePreview(getAvatarSource());
    }
  }, [user, isModalOpen, reset]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileFile(file);

      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phoneNo", data.phoneNo || "");
    formData.append("city", data.city || "");
    formData.append("district", data.district || "");
    formData.append("locality", data.locality || "");

    if (profileFile) {
      formData.append("image", profileFile);
    }

    try {
      const response = await dispatch(updateProfile({ data: formData })).unwrap();
      if (response) {
        toast.success(response.message || "Profile updated successfully!");
        if (response.user?.profilePic) {
          setImagePreview(response.user.profilePic);
        }
        setProfileFile(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile parameters");
    }
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`bg-[#161a2b] text-gray-300 w-64 h-full fixed inset-y-0 left-0 lg:relative lg:translate-x-0 z-50 flex flex-col p-6 shadow-xl shrink-0 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center w-full justify-center">
            <NavLink to="/" className="w-[74px] h-[92px]">
              <img src={logo} alt="Infinity Horizon Logo" className="object-cover" />
            </NavLink>
          </div>
          <button
            onClick={onMenuClose}
            id="menu-close"
            className="text-2xl lg:hidden focus:outline-none text-gray-400 hover:text-white absolute right-4 top-6"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto hide-scrollbar">
          <NavLink
            to="/agent/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-colors font-bold ${
                isActive
                  ? "bg-white text-[#161a2b] shadow-sm"
                  : "hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <i className="fas fa-th-large text-lg w-5 text-center"></i>
            <span className="text-sm">Dashboard</span>
          </NavLink>

          <NavLink
            to="/agent/inquiry"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-white text-[#161a2b] shadow-sm font-bold"
                  : "hover:bg-white/10 hover:text-white font-medium text-sm"
              }`
            }
          >
            <i className="fas fa-headset text-lg w-5 text-center"></i>
            <span className="text-sm">Customer Inquiry</span>
          </NavLink>

          <NavLink
            to="/agent/manage-properties"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-white text-[#161a2b] shadow-sm font-bold"
                  : "hover:bg-white/10 hover:text-white font-medium text-sm"
              }`
            }
          >
            <i className="fas fa-building text-lg w-5 text-center"></i>
            <span className="text-sm">Manage Properties</span>
          </NavLink>

          <NavLink
            to="/agent/chats"
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-white text-[#161a2b] shadow-sm font-bold"
                  : "hover:bg-white/10 hover:text-white font-medium text-sm"
              }`
            }
          >
            <i className="fas fa-comments text-lg w-5 text-center"></i>
            <span className="text-sm">Chats</span>
          </NavLink>
        </nav>

        <div className="mt-6 space-y-4">
          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-white p-4 rounded-xl flex items-center justify-between gap-3 shadow-md cursor-pointer hover:bg-gray-100 transition-all group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={getAvatarSource()}
                alt={user?.name || "Agent"}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="overflow-hidden">
                <p className="font-bold text-[#161a2b] text-sm truncate">
                  {user?.name || "Agent"}
                </p>
                <p className="text-xs text-[#161a2b] font-medium opacity-80 truncate capitalize">
                  {user?.role || "Agent"}
                </p>
              </div>
            </div>
            <UserPen className="w-4 h-4 text-gray-400 group-hover:text-[#161a2b] transition-colors shrink-0" />
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="w-full flex items-center justify-center gap-2 bg-white/10 text-gray-300 py-3 rounded-xl hover:bg-white/20 hover:text-white transition-colors font-medium text-sm"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile background backdrop overlay */}
      <div
        onClick={onMenuClose}
        id="mobile-overlay"
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${isOpen ? "" : "hidden"}`}
      ></div>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <div className="bg-[#F8FEFF] rounded-2xl p-2 font-sans">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle
              style={{
                fontFamily: "serif",
                fontWeight: 600,
                color: "#161a2b",
                fontSize: "1.5rem",
              }}
            >
              Edit Profile Details
            </DialogTitle>

            <DialogContent dividers className="space-y-4">
              <div className="flex flex-col items-center justify-center mb-4 relative group">
                <div className="relative w-24 h-24 rounded-full border-2 border-[#161a2b] overflow-hidden">
                  <img
                    src={imagePreview || agent1}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                  <label
                    htmlFor="agent-profile-image-upload"
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                  >
                    <Camera className="w-6 h-6" />
                  </label>
                </div>
                <input
                  id="agent-profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                <span className="text-xs text-[#161a2b]/60 mt-1">
                  Click image to change profile photo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name cannot be empty" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      fullWidth
                      variant="outlined"
                      disabled={loading}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email cannot be empty" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="outlined"
                      disabled={loading}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  )}
                />

                <Controller
                  name="phoneNo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      disabled={loading}
                      variant="outlined"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  )}
                />

                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="City"
                      disabled={loading}
                      fullWidth
                      variant="outlined"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  )}
                />

                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="District"
                      fullWidth
                      disabled={loading}
                      variant="outlined"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  )}
                />

                <Controller
                  name="locality"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Locality"
                      fullWidth
                      disabled={loading}
                      variant="outlined"
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  )}
                />
              </div>
            </DialogContent>

            <DialogActions className="p-4 gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-[#161a2b] text-[#161a2b] bg-transparent font-semibold text-sm hover:bg-slate-100 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-[#161a2b] text-white font-semibold text-sm hover:bg-slate-800 transition-all duration-200 shadow"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default Sidebar;