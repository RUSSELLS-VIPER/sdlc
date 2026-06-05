export const endPoint = {
    auth: {
        signup: "/api/auth/register",
        verifyEmail: "/api/auth/verify-email",
        login: "/api/auth/login",
        forgotPassword: "/api/auth/forgot-password",
        resetPassword: "/api/auth/reset-password"
    },
    properties: {
        list: "/api/properties",
        propertyById: (id: string) => `/api/properties/${id}`,
        create: "/api/properties",
        update: (id: string) => `/api/properties/${id}`,
        remove: (id: string) => `/api/properties/${id}`,
        toggleLike: (id: string) => `/api/properties/${id}/like`,
        
    },
    users: {
        toggleFavorite: (propertyId: string) => `/api/users/favorites/${propertyId}`,
        profileById: (id: string | undefined) => `/api/users/profile/${id}`,
        updateProfile: "/api/users/profile/update",
        favorites: "/api/users/favorites/my-list",
        myNotifications: "/api/users/my-notifications",
        readNotification: (id: string) => `/api/users/notifications/${id}/read`,
        readAllNotifications: "/api/users/notifications/read-all",
        allAgents: "/api/users/agents",
        agentById: (agentId:string)=> `/api/users/agent/${agentId}/properties`
    },
    client: {
        propertyInquiry: (propertyId: string) => `/api/client/property/${propertyId}/inquiry`
    },
    agent: {
        dashboardSummary: "/api/agent/dashboard-summary",
        inquiryLeads: (page = 1, searchName = "") =>
            `/api/agent/agent/leads?page=${page}${searchName ? `&search=${encodeURIComponent(searchName)}` : ""}`,
        inquiryAction: (inquiryId: string) => `/api/agent/inquiry/${inquiryId}/action`,
        deleteInquiry: (inquiryId: string) => `/api/agent/inquiry/${inquiryId}`
    },
    chat: {
        search: (search = "") => `/api/users/search-user-to-chat?search=${encodeURIComponent(search)}`,
        history: (userId: string) => `/api/users/history/${userId}`,
        send: "/api/users/chat/send"
    }
};
