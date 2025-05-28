// src/components/projects/CreateProjectForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
 useGetDetailedLookupsQuery,
  useAddProjectMutation,
} from "../../redux/projectApi";

import type {
  GetLookupsResponse,
  NewProjectRequest,
} from "../../redux/types/projecttypes";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const CreateProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { data: lookups, isLoading: lookupsLoading } =  useGetDetailedLookupsQuery();
  const [addProject, { isLoading: isSaving }] = useAddProjectMutation();

  const [formData, setFormData] = useState<NewProjectRequest>({
    name: "",
    clientId: "",
    code: "",
    status: "",
    projectManager: "",
    billingRateTimePeriod: "",
    startDate: "",
    endDate: "",
    totalContract: 0,
    approvedBudget: 0,
    allocatedBudget: 0,
    billingType: "Fixed Bid",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : (value as any),
    }));
  };

  const handleSelect = (field: keyof NewProjectRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value as any,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addProject({
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      }).unwrap();
      navigate("/projects List");
    } catch (err) {
      console.error(err);
    }
  };

  if (lookupsLoading) return <div>Loading...</div>;
  if (!lookups) return <div>Error loading form data.</div>;

  const { clients, status, billingRateTimePeriods, projectManagers } =
    lookups as GetLookupsResponse;

  return (
    <div className='max-w-8xl mx-auto px-8'>
      <div className='flex items-center mb-6'>
        <h2 className='text-2xl font-semibold text-[#00608d]'>
          Add New Project
        </h2>
        <div className='flex-1 h-px bg-gray-300 ml-4'></div>
      </div>

      <div className='bg-white border border-gray-200 rounded-lg shadow-sm p-7'>
        <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
          <div>
            <Label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Name<span className='text-red-500'>*</span>
            </Label>
            <Input
              id='name'
              placeholder=''
              className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor='clientId'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Client<span className='text-red-500'>*</span>
            </Label>
            <Select onValueChange={(v) => handleSelect("clientId", v)}>
              <SelectTrigger
                id='clientId'
                className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              >
                <SelectValue placeholder='' />
              </SelectTrigger>
              <SelectContent>
                {clients.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor='code'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Code<span className='text-red-500'>*</span>
            </Label>
            <Input
              id='code'
              placeholder=''
              className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              value={formData.code}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor='status'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Status<span className='text-red-500'>*</span>
            </Label>
            <Select onValueChange={(v) => handleSelect("status", v)}>
              <SelectTrigger
                id='status'
                className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              >
                <SelectValue placeholder='' />
              </SelectTrigger>
              <SelectContent>
                {status.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor='projectManager'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Project Manager<span className='text-red-500'>*</span>
            </Label>
            <Select onValueChange={(v) => handleSelect("projectManager", v)}>
              <SelectTrigger
                id='projectManager'
                className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              >
                <SelectValue placeholder='' />
              </SelectTrigger>
              <SelectContent>
                {projectManagers.map((pm) => (
                  <SelectItem key={pm.value} value={pm.value}>
                    {pm.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor='billingRateTimePeriod'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Billing Rate Time Period<span className='text-red-500'>*</span>
            </Label>
            <Select
              onValueChange={(v) => handleSelect("billingRateTimePeriod", v)}
            >
              <SelectTrigger
                id='billingRateTimePeriod'
                className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              >
                <SelectValue placeholder='' />
              </SelectTrigger>
              <SelectContent>
                {billingRateTimePeriods.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor='startDate'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Project Start Date<span className='text-red-500'>*</span>
            </Label>
            <Input
              id='startDate'
              type='date'
              className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor='endDate'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Project End Date<span className='text-red-500'>*</span>
            </Label>
            <Input
              id='endDate'
              type='date'
              className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor='totalContract'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Total Contract Value<span className='text-red-500'>*</span>
            </Label>
            <Input
              id='totalContract'
              type='number'
              className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              value={formData.totalContract.toString()}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label
              htmlFor='approvedBudget'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Approved Budget Value<span className='text-red-500'>*</span>
            </Label>
            <Input
              id='approvedBudget'
              type='number'
              className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              value={formData.approvedBudget.toString()}
              onChange={handleChange}
            />
          </div>

          <div className='col-span-2'>
            <Label
              htmlFor='allocatedBudget'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Allocated Budget Value<span className='text-red-500'>*</span>
            </Label>
            <Input
              id='allocatedBudget'
              type='number'
              className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
              value={formData.allocatedBudget.toString()}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='mt-8'>
          <Label className='block text-sm font-medium text-gray-700 mb-1'>
            Billing Type<span className='text-red-500'>*</span>
          </Label>
          <RadioGroup
            defaultValue={formData.billingType}
            onValueChange={(val) => handleSelect("billingType", val)}
            className='flex space-x-6'
          >
            {["Fixed Bid", "Time and Material", "Non-Billable"].map((type) => (
              <div key={type} className='flex items-center space-x-2'>
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className='text-sm text-gray-700'>
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className='flex justify-end space-x-4 mt-10'>
          <Button
            variant='outline'
            onClick={() => navigate("/projects List")}
            className='w-28'
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving} className='w-28'>
            {isSaving ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectForm;
