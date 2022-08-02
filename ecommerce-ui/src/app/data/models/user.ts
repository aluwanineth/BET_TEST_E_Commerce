export interface Data {
    id: string;
    email: string;
    jwToken: string;
    refreshToken: string;
}

export interface User {
    succeeded: boolean;
    message: string;
    errors?: any;
    data: Data;
}


