export interface placeServicesModel {
    id: string;
    createdAt: string;
    services: [{name:{ar:string,en:string}}];
    places:[{name:{ar:string,en:string}}];
    descraption: string;
    rating:number;
    totalprice: number;
}
