export interface IUser {
    emailId: string;
    password: string;
}

export class User implements IUser {
    constructor(public emailId: string, public password: string) {}
}
