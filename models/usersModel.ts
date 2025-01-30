export interface UsersModel {
    createdAt: string;
    fullName: string;
    id: string;
    email:string;
    image: { image: string };
    mobileNumber: string;
    name: { ar: string; en: string };
    userBlock: { status: boolean };
}
