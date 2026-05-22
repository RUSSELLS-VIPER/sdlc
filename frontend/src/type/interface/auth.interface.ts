export interface signupformvalue {
    name:string;
    email:string;
    password:string;
    role:"user" | "agent" | "admin";
    terms: boolean
}
export interface Loginformvalue{
    email:string;
    password:string;
    
}

export interface ForgotPasswordValue {
    email: string;
}

export interface ResetPasswordValue {
    email: string;
    otp: string;
    newPassword: string;
}
