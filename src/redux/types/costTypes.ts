export type costDistributionRequest={
    type: string;
    number: string;
    pmName: string;
    projectName: string;
    projectStatus: string;
    authorizationStatus: string;
    city: string;

}
export type CostSplitSheetProps  ={
   isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  request: costDistributionRequest;
}

export type CostSplitRequest = {
    number : string;
    projectName: string;
    projectStatus: string;
    pmName: string;
}