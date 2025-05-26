export interface LookupOption {
  value: string;
  label: string;
}

export interface GetLookupsResponse {
  clients: LookupOption[];
  status: LookupOption[];
  billingRateTimePeriods: LookupOption[];
  projectManagers: LookupOption[];
}

export interface NewProjectRequest {
  name: string;
  clientId: string;
  code: string;
  status: string;
  projectManager: string;
  billingRateTimePeriod: string;
  startDate: string;
  endDate: string;
  totalContract: number;
  approvedBudget: number;
  allocatedBudget: number;
  billingType: "Fixed Bid" | "Time and Material" | "Non-Billable";
}

export interface ProjectListItem {
  id: string;
  name: string;
  code: string;
  clientId: number;
  status: number;
  ProjectManager: number;
  billingRateTimePeriod: number;
  startDate: string;
  endDate: string;
  totalContract: number;
  approvedBudget: number;
  allocatedBudget: number;
  billingType: number;
  manager: {
    first_name: string;
    last_name: string;
  };
}

export interface LookupOption {}
export interface GetLookupsResponse {}
export interface NewProjectRequest {}
export type NewProjectResponse = NewProjectRequest & { id: string };
