import { axiosInstance } from "../lib/axiosInstance";
import { endPoint } from "./helper/apiEndPoint";
import type { Loginformvalue, signupformvalue } from "../type/interface/auth.interface";

type InquiryPayload = {
    name?: string;
    email?: string;
    phoneNo?: string;
    messageText: string;
};

export const apiService = {
    auth: {
        register: (data: signupformvalue) => axiosInstance.post(endPoint.auth.signup, data),
        verifyEmail: (data: { email: string; otp: string }) => axiosInstance.post(endPoint.auth.verifyEmail, data),
        login: (data: Loginformvalue) => axiosInstance.post(endPoint.auth.login, data),
        forgotPassword: (data: { email: string }) => axiosInstance.post(endPoint.auth.forgotPassword, data),
        resetPassword: (data: { email: string; otp: string; newPassword: string }) =>
            axiosInstance.post(endPoint.auth.resetPassword, data)
    },
    properties: {
        getAll: () => axiosInstance.get(endPoint.properties.list),
        getById: (id: string) => axiosInstance.get(endPoint.properties.propertyById(id)),
        create: (formData: FormData) => axiosInstance.post(endPoint.properties.create, formData),
        update: (id: string, formData: FormData) => axiosInstance.put(endPoint.properties.update(id), formData),
        remove: (id: string) => axiosInstance.delete(endPoint.properties.remove(id)),
        toggleLike: (id: string) => axiosInstance.post(endPoint.properties.toggleLike(id))
    },
    users: {
        getProfile: (id: string) => axiosInstance.get(endPoint.users.profileById(id)),
        updateProfile: (formData: FormData) => axiosInstance.put(endPoint.users.updateProfile, formData),
        toggleFavorite: (propertyId: string) => axiosInstance.post(endPoint.users.toggleFavorite(propertyId)),
        getFavorites: () => axiosInstance.get(endPoint.users.favorites),
        getMyNotifications: () => axiosInstance.get(endPoint.users.myNotifications),
        markNotificationAsRead: (id: string) => axiosInstance.patch(endPoint.users.readNotification(id)),
        markAllNotificationsAsRead: () => axiosInstance.patch(endPoint.users.readAllNotifications)
    },
    client: {
        submitPropertyInquiry: (propertyId: string, data: InquiryPayload) =>
            axiosInstance.post(endPoint.client.propertyInquiry(propertyId), data)
    },
    agent: {
        getDashboardSummary: () => axiosInstance.get(endPoint.agent.dashboardSummary),
        getInquiryLeads: (page?: number, searchName?: string) =>
            axiosInstance.get(endPoint.agent.inquiryLeads(page, searchName)),
        updateInquiryAction: (inquiryId: string, action: "approved" | "disapproved") =>
            axiosInstance.patch(endPoint.agent.inquiryAction(inquiryId), { action }),
        deleteInquiry: (inquiryId: string) => axiosInstance.delete(endPoint.agent.deleteInquiry(inquiryId))
    },
    chat: {
        search: (search?: string) => axiosInstance.get(endPoint.chat.search(search)),
        history: (userId: string) => axiosInstance.get(endPoint.chat.history(userId)),
        send: (receiverId: string, messageText: string) => axiosInstance.post(endPoint.chat.send, { receiverId, messageText })
    }
};
