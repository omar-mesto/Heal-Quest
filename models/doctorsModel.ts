export interface DoctorsModel {  
    id: string;  
    fullName: string;
    mobileNumber:string;  
    image:{image:string};
    userBlock:{status:boolean};
    createdAt:string;
    name: { en: string; ar: string };  
  }