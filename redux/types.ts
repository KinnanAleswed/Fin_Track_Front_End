export interface NewProjectRequest {
  name: string;
  code: string;
  status: string;
  billingRateTimePeriod: string;
  startDate: string;
  endDate: string;
  totalContract: number;
  approvedBudget: number;
  allocatedBudget: number;
  billingType: string;
  clientId?: string;
}

export type NewProjectResponse = NewProjectRequest & { id: string };
