export type NewMasterLookup = {
    value: string;
     description_AR: string;
    description_EN: string;
     isActive:number;
      createdBy:number;
      comments: string;
     Id: number;
      modifiedBy: number; 
}
export type NewMasterLookupResponde = NewMasterLookup &{id :number}