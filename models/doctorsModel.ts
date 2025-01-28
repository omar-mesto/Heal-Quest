export interface DoctorsModel {
    createdAt: string;
    fullName: string;
    id: string;
    image: { image: string };
    mobileNumber: string;
    name: { ar: string; en: string };
    userBlock: { status: boolean };
}
