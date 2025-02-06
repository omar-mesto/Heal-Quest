export interface PlacesModel {
    id: string;
    adress:string;
    name: { ar: string; en: string };
    placeContact:string;
    images: [{ data : string }];
}
