import { useState, useEffect, type ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import userDashboardImageLogo from "../../assets/images/userDashboardImages/logo.png";
import { getProfileById, logout, updateProfile } from "../../store/slices/auth.slice";
import {
  useAppDispatch,
  useAppSeletor,
} from "../../services/helper/reduxstore";
import userImage from "../../assets/images/userDashboardImages/userImage.png";
import {
  LayoutDashboard,
  CalendarDays,
  LogOut,
  User,
  School,
  BellRing,
  UserPen,
  Camera
} from "lucide-react";
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
  SidebarProps,
} from "../../type/interface/userDashboard/userDashboard.interface";

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSeletor((state) => state.auth);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
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
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(bufferImageData.data))
          );
          return `data:${contentType};base64,${base64String}`;
        } catch (error) {
          console.error("Error processing buffer-shaped profile picture:", error);
        }
      } else if (Array.isArray(imageData)) {
        try {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(imageData))
          );
          return `data:${contentType};base64,${base64String}`;
        } catch (error) {
          console.error("Error processing profile picture buffer:", error);
        }
      }
    }
    return userImage;
  };

  // Synchronize avatar preview properly on state load and updates
  useEffect(() => {
    // Only parse background image buffer streams if the user hasn't explicitly staged a new file upload locally
    if (!profileFile) {
      setImagePreview(getAvatarSource());
    }
  }, [user, profileFile]);

  // Handle garbage collection cleanups for local blob URL memory leak prevention
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    const userId = user?.id // Cover both id field architectures safely
    if (userId) {
      dispatch(getProfileById({ userId }));
    }
  }, [dispatch]);
  

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
      // Reset local file changes when modal opens fresh
      setProfileFile(null);
      setImagePreview(getAvatarSource());
    }
  }, [user, isModalOpen, reset]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileFile(file);
      
      // Revoke older local preview links to free browser memory pipeline allocations
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
      const response = await dispatch(updateProfile({data: formData})).unwrap();
      if (response) {
        toast.success(response.message || "Profile updated successfully!");
        if (response.user?.profilePic) {
          setImagePreview(response.user.profilePic);
        }
        setProfileFile(null); // Clear active selected file state reference
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Profile upload error:", error);
      toast.error("Failed to update profile parameters");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 sm:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        id="separator-sidebar"
        className={`bg-[#14213D] text-white fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full px-5 py-4 overflow-y-auto">
          <ul className="space-y-5 font-medium">
            <li>
              <NavLink
                to="/"
                onClick={onClose}
                className="flex justify-center items-center px-2 py-1.5 text-white rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              >
                <img src={userDashboardImageLogo} alt="logo" className="w-24 h-26" />
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center p-4 rounded-xl group transition-colors duration-200 ${
                    isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                  }`
                }
              >
                <LayoutDashboard className="ms-3 w-6 h-6 shrink-0" strokeWidth={2} />
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/savedProperties"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center p-4 rounded-xl group transition-colors duration-200 ${
                    isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                  }`
                }
              >
                <School className="ms-3 w-6 h-6 shrink-0" strokeWidth={2} />
                <span className="ms-3">Saved Properties</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/myInquiries"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center p-4 rounded-xl group transition-colors duration-200 ${
                    isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                  }`
                }
              >
                <User className="ms-3 w-6 h-6 shrink-0" strokeWidth={2} />
                <span className="ms-3">My Inquiries</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/myBookings"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center p-4 rounded-xl group transition-colors duration-200 ${
                    isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                  }`
                }
              >
                <CalendarDays className="ms-3 w-6 h-6 shrink-0" strokeWidth={2} />
                <span className="ms-3">My Bookings</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/notifications"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center p-4 rounded-xl group transition-colors duration-200 ${
                    isActive ? "bg-[#FCA311] text-[#F8FEFF]" : "bg-[#EEEEEE] text-[#1E1E1E] hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                  }`
                }
              >
                <BellRing className="ms-3 w-6 h-6 shrink-0" strokeWidth={2} />
                <span className="ms-3">Notifications</span>
              </NavLink>
            </li>
          </ul>

          <ul className="relative space-y-4 font-medium border-t border-slate-700/40 pt-4 mt-4">
            <li>
              <div className="w-full flex justify-evenly items-center p-2 bg-[#EEEEEE] text-[#1E1E1E] rounded-xl">
                <img src={getAvatarSource()} alt="userImage" className="w-8 h-8 rounded-full object-cover" />
                <span className="truncate max-w-[110px]">{user?.name || "User"}</span>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-1 text-[#1E1E1E] hover:text-[#FCA311] focus:outline-none transition-colors"
                >
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}></i>
                </button>
              </div>
            </li>

            {isDropdownOpen && (
              <div className="absolute bottom-16 left-0 w-full bg-[#EEEEEE] text-[#1E1E1E] rounded-xl shadow-xl border border-slate-200 z-50">
                <ul className="w-full text-sm font-medium p-1">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(true);
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 w-full p-3 rounded-xl transition-colors duration-150 text-left hover:bg-[#FCA311] hover:text-[#F8FEFF]"
                    >
                      <UserPen className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}

            <li>
              <button
                onClick={() => {
                  onClose();
                  dispatch(logout());
                }}
                className="flex items-center w-full p-4 bg-[#EEEEEE] text-[#1E1E1E] rounded-xl hover:bg-[#FCA311] hover:text-[#F8FEFF] group transition-colors duration-200"
              >
                <LogOut className="ms-3 w-6 h-6 shrink-0" strokeWidth={2} />
                <span className="ms-3 font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <Dialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <div className="bg-[#F8FEFF] rounded-2xl p-2 font-sans">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle 
              style={{ 
                fontFamily: "serif", 
                fontWeight: 600, 
                color: "#14213D",
                fontSize: "1.5rem"
              }}
            >
              Edit Profile Details
            </DialogTitle>

            <DialogContent dividers className="space-y-4">
              <div className="flex flex-col items-center justify-center mb-4 relative group">
                <div className="relative w-24 h-24 rounded-full border-2 border-[#14213D] overflow-hidden">
                  <img 
                    src={imagePreview || userImage} 
                    alt="Avatar Preview" 
                    className="w-full h-full object-cover"
                  />
                  <label 
                    htmlFor="profile-image-upload" 
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                  >
                    <Camera className="w-6 h-6" />
                  </label>
                </div>
                <input 
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={loading}
                />
                <span className="text-xs text-[#14213D]/60 mt-1">Click image to change profile photo</span>
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
                className="px-5 py-2.5 rounded-xl border border-[#14213D] text-[#14213D] bg-transparent font-semibold text-sm hover:bg-slate-100 transition-all duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#14213D] text-white font-semibold text-sm hover:bg-[#FCA311] hover:text-[#1E1E1E] transition-all duration-200 shadow"
              >
                {loading ? "updating..." : "Save Changes"}
              </button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </>
  ); 
}
