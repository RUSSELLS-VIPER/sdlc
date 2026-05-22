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
