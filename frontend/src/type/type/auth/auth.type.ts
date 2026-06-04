export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: string;
    profilePic?: string | {
        contentType: string;
        data: string
    }
    phoneNo?: string
    city?:string
    locality?: string
    district?: string
};

export type AuthInitialState = {
    loading: boolean;
    error: string | null;
    token: string | null;
    user: AuthUser | null;
    role: string | null
    message: string | null;
};

export type VerifyEmailForm = {
  email: string;
  otp: string;
};
