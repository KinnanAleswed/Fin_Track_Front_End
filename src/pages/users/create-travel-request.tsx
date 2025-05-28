import { Label } from "../../../src/components/ui/label";
import { Input } from "../../../src/components/ui/input";
import { Button } from "../../../src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../src/components/ui/select";
import { Checkbox } from "../../../src/components/ui/checkbox";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const inputClass = "h-10 w-full border-[#e7e7e8]";

const durationCalculation = (start: string, end: string) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
};

const CreateNewTravelRequest = () => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [expenses, setExpenses] = useState({
    hotel: true,
    perDiem: false,
    taxis: false,
    visa: false,
  });

  const handleExpenseChange = (
    key: keyof typeof expenses,
    checked: boolean
  ) => {
    setExpenses((prev) => ({ ...prev, [key]: checked }));
  };

  const duration = durationCalculation(departure, returnDate);

  return (
    <>
      <div className='flex items-center mb-3'>
        <h2 className='text-lg font-semibold text-[#00608d] mr-2'>
          Travel Request
        </h2>
        <div className='flex-grow border-t border-gray-300' />
      </div>
      <div className='border rounded-md px-8 py-6'>
        <div className='grid grid-cols-2 gap-6 '>
          {/* Row 1 */}
          <div>
            <Label htmlFor='projectName'>
              Project Name<span className='text-[#e11d48]'>*</span>
            </Label>
            <Select>
              <SelectTrigger id='projectName' className={inputClass}>
                <SelectValue placeholder='Select project name' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Project A'>Project A</SelectItem>
                <SelectItem value='Project B'>Project B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='projectResource'>
              Project Resource<span className='text-[#e11d48]'>*</span>
            </Label>
            <Select>
              <SelectTrigger id='projectResource' className={inputClass}>
                <SelectValue placeholder='Select resource' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Resource A'>Resource A</SelectItem>
                <SelectItem value='Resource B'>Resource B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Row 2 */}
          <div>
            <Label htmlFor='departure'>
              Departure<span className='text-[#e11d48]'>*</span>
            </Label>
            <Input
              id='departure'
              type='date'
              className={inputClass}
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='return'>
              Return<span className='text-[#e11d48]'>*</span>
            </Label>
            <Input
              id='return'
              type='date'
              className={inputClass}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
          {/* Row 3 */}
          <div>
            <Label htmlFor='destination'>
              Destination<span className='text-[#e11d48]'>*</span>
            </Label>
            <Select>
              <SelectTrigger id='destination' className={inputClass}>
                <SelectValue placeholder='Select destination' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Destination A'>Destination A</SelectItem>
                <SelectItem value='Destination B'>Destination B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor='city'>
              City<span className='text-[#e11d48]'>*</span>
            </Label>
            <Select>
              <SelectTrigger id='city' className={inputClass}>
                <SelectValue placeholder='Select city' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='City A'>City A</SelectItem>
                <SelectItem value='City B'>City B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Duration */}
        <div className='mt-4'>
          <span className='text-sm font-medium'>Duration</span>
          <div className='text-base mt-1'>
            {departure && returnDate
              ? duration > 0
                ? `${duration} Days`
                : "Return date must be after departure"
              : "-"}
          </div>
        </div>
        {/* Expenses Information */}
        <div className='mt-4'>
          <span className='text-sm font-medium'>
            Expenses Information<span className='text-[#e11d48]'>*</span>
          </span>
          <div className='flex flex-row flex-wrap gap-6 mt-2 items-center'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <Checkbox
                checked={expenses.hotel}
                onCheckedChange={(v) => handleExpenseChange("hotel", !!v)}
              />
              <span className='text-sm'>Hotel Stays (If Applicable)</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <Checkbox
                checked={expenses.perDiem}
                onCheckedChange={(v) => handleExpenseChange("perDiem", !!v)}
              />
              <span className='text-sm'>Per Diem</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <Checkbox
                checked={expenses.taxis}
                onCheckedChange={(v) => handleExpenseChange("taxis", !!v)}
              />
              <span className='text-sm'>Taxis (Airport and Other)</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
              <Checkbox
                checked={expenses.visa}
                onCheckedChange={(v) => handleExpenseChange("visa", !!v)}
              />
              <span className='text-sm'>Visa Requirement</span>
            </label>
          </div>
        </div>
      </div>
      <div className='flex justify-end gap-1 mt-8'>
        <Button
          variant='outline'
          className='mr-2 w-28'
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button variant='default' className='mr-2 w-28'>
          Add
        </Button>
      </div>
    </>
  );
};

export default CreateNewTravelRequest;
