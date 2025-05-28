import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const projectOptions = [
  { label: "Project Alpha", value: "alpha" },
  { label: "Project Beta", value: "beta" },
];
const typeOptions = [
  { label: "Transportation", value: "transportation" },
  { label: "Food", value: "food" },
  { label: "Accommodation", value: "accommodation" },
];
const receiptOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const fieldConfigs = [
  {
    id: "project",
    label: "My Project List",
    type: "select",
    options: projectOptions,
  },
  {
    id: "description",
    label: "Description",
    type: "text",
  },
  {
    id: "date",
    label: "Date Incurred",
    type: "date",
  },
  {
    id: "amount",
    label: "Amount",
    type: "number",
  },
  {
    id: "type",
    label: "Type",
    type: "select",
    options: typeOptions,
  },
  {
    id: "receipts",
    label: "Receipts",
    type: "select",
    options: receiptOptions,
  },
];

const initialFormState = fieldConfigs.reduce(
  (acc, curr) => ({ ...acc, [curr.id]: "" }),
  {}
);

const AddExpenseForm: React.FC = () => {
  const [formData, setFormData] =
    React.useState<Record<string, string>>(initialFormState);

  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='max-w-8xl mx-auto px-8'>
      <div className='flex items-center mb-6'>
        <h2 className='text-2xl font-semibold text-[#00608d]'>
          Add New Expense
        </h2>
        <div className='flex-1 h-px bg-gray-300 ml-4'></div>
      </div>
      <div className='bg-white border border-gray-200 rounded-lg shadow-sm px-7 py-6'>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-x-8 gap-y-7 p-3'>
            {fieldConfigs.map((field) => (
              <div key={field.id}>
                <Label
                  htmlFor={field.id}
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  {field.label}
                  <span className='text-red-500'>*</span>
                </Label>
                {field.type === "select" ? (
                  <Select
                    value={formData[field.id]}
                    onValueChange={(v) => handleChange(field.id, v)}
                  >
                    <SelectTrigger
                      id={field.id}
                      className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
                    >
                      <SelectValue placeholder='' />
                    </SelectTrigger>
                    <SelectContent>
                      {(field.options || []).map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    className='h-10 w-full bg-gray-50 border border-gray-200 rounded text-gray-900'
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className='flex justify-end space-x-4 mt-10'>
        <Button
          variant='outline'
          type='button'
          onClick={() => navigate(-1)}
          className='w-28'
        >
          Cancel
        </Button>
        <Button type='submit' className='w-28'>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
