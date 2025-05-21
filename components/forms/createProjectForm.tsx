import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddProjectMutation,
  useGetProjectManagersQuery,
} from "../../api/projectApi";

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

const inputClass = "h-10 w-full border-[#e7e7e8]";

const CreateProjectForm = () => {
  const navigate = useNavigate();
  const [addProject, { isLoading }] = useAddProjectMutation();
  const { data: projectManagers, isLoading: isPMLoading } =
    useGetProjectManagersQuery();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    status: "",
    billingRateTimePeriod: "",
    startDate: "",
    endDate: "",
    totalContract: "",
    approvedBudget: "",
    allocatedBudget: "",
    billingType: "Fixed Bid",
    managerId: "",
    clientId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (id: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        totalContract: Number(formData.totalContract),
        approvedBudget: Number(formData.approvedBudget),
        allocatedBudget: Number(formData.allocatedBudget),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      console.log("Submitting payload:", payload);

      await addProject(payload).unwrap();
      navigate("/projects");
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  return (
    <>
      <div className='flex items-center mb-3'>
        <h2 className='text-lg font-semibold text-[#00608d] mr-2'>
          Add New Project
        </h2>
        <div className='flex-grow border-t border-gray-300' />
      </div>

      <div className='border rounded-md px-8 py-6'>
        <div className='grid grid-cols-2 gap-6'>
          {/* Row 1 */}
          <div>
            <Label htmlFor='name'>Name*</Label>
            <Input
              id='name'
              className={inputClass}
              placeholder='Enter project name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='client'>Client *</Label>
            <Select
              onValueChange={(val) => handleSelectChange("clientId", val)}
            >
              <SelectTrigger id='client' className={inputClass}>
                <SelectValue placeholder='Select client' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='a3f47b22-9e3c-4b1d-8f67-2d6e95a9e5a1'>
                  Client A
                </SelectItem>
                <SelectItem value='d27f8a10-1b4f-49c2-b7d1-1f4e8e3c9a5b'>
                  Client B
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 2 */}
          <div>
            <Label htmlFor='code'>Code *</Label>
            <Input
              id='code'
              className={inputClass}
              placeholder='Enter code'
              value={formData.code}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='status'>Status *</Label>
            <Select onValueChange={(val) => handleSelectChange("status", val)}>
              <SelectTrigger id='status' className={inputClass}>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Active'>Active</SelectItem>
                <SelectItem value='On Hold'>On Hold</SelectItem>
                <SelectItem value='Completed'>Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 3 */}
          <div>
            <Label htmlFor='pm'>Project Manager *</Label>
            <Select
              onValueChange={(val) => handleSelectChange("managerId", val)}
            >
              <SelectTrigger id='pm' className={inputClass}>
                <SelectValue
                  placeholder={
                    isPMLoading ? "Loading..." : "Select project manager"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {projectManagers?.map((pm) => (
                  <SelectItem key={pm.id} value={pm.id}>
                    {pm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor='billing'>Billing Rate Time Period *</Label>
            <Select
              onValueChange={(val) =>
                handleSelectChange("billingRateTimePeriod", val)
              }
            >
              <SelectTrigger id='billing' className={inputClass}>
                <SelectValue placeholder='Select billing rate' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Hourly'>Hourly</SelectItem>
                <SelectItem value='Daily'>Daily</SelectItem>
                <SelectItem value='Monthly'>Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 4 */}
          <div>
            <Label htmlFor='startDate'>Project Start Date *</Label>
            <Input
              id='startDate'
              type='date'
              className={inputClass}
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='endDate'>Project End Date *</Label>
            <Input
              id='endDate'
              type='date'
              className={inputClass}
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          {/* Row 5 */}
          <div>
            <Label htmlFor='totalContract'>Total Contract Value *</Label>
            <Input
              id='totalContract'
              className={inputClass}
              placeholder='Enter value'
              value={formData.totalContract}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor='approvedBudget'>Approved Budget Value *</Label>
            <Input
              id='approvedBudget'
              className={inputClass}
              placeholder='Enter value'
              value={formData.approvedBudget}
              onChange={handleChange}
            />
          </div>

          {/* Row 6 */}
          <div className='col-span-2'>
            <Label htmlFor='allocatedBudget'>Allocated Budget Value *</Label>
            <Input
              id='allocatedBudget'
              className={inputClass}
              placeholder='Enter value'
              value={formData.allocatedBudget}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Radio Groups */}
        <div className='mt-6 space-y-6'>
          <div>
            <Label>Billing Type *</Label>
            <RadioGroup
              defaultValue={formData.billingType}
              onValueChange={(val) => handleRadioChange("billingType", val)}
              className='flex space-x-6 mt-2'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='Fixed Bid' id='fixed' />
                <Label htmlFor='fixed'>Fixed Bid</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='Time and Material' id='tm' />
                <Label htmlFor='tm'>Time and Material</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='Non-Billable' id='non' />
                <Label htmlFor='non'>Non-Billable</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Submit + Cancel */}
      <div className='flex justify-end gap-1 mt-8'>
        <Button
          variant='outline'
          className='mr-2 w-28'
          onClick={() => navigate("/projects")}
        >
          Cancel
        </Button>
        <Button
          variant='default'
          className='mr-2 w-28'
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </div>
    </>
  );
};

export default CreateProjectForm;
