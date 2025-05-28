import React, { useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useCreateDetailedLookupMutation } from "../../redux/DetailedLookupApi";
import { useGetMasterLookupQuery } from "../../redux/MasterLookupApi";
import { useNavigate } from "react-router-dom";

function AddNewDetailedLookup() {
  const [formData, setFormData] = useState({
    masterId: "", 
    description_AR: "",
    description_EN: "",
    isActive: 1,
    createdBy: 1,
    comments: "",
  });

  const [addDetailedLookup, { isLoading }] = useCreateDetailedLookupMutation();
  const { data = [], isLoading: isLoadingLookups } = useGetMasterLookupQuery(); 
  // console.log("Master Lookups:", data);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      masterId: value, // keep as string in state
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isActive: checked ? 0 : 1,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      Master_ID: Number(formData.masterId),
      Code: formData.description_EN,
      Value_EN: formData.description_EN,
      Value_AR: formData.description_AR,
      isActive: formData.isActive,
      createdBy: formData.createdBy,
      comments: formData.comments,
    };

    try {
      await addDetailedLookup(payload).unwrap();
      setFormData({
        masterId: "",
        description_AR: "",
        description_EN: "",
        isActive: 1,
        createdBy: 1,
        comments: "",
      });
      navigate("/administration/lookup-list");
    } catch (err) {
      console.error("Error adding detailed lookup:", err);
      alert("Failed to add detailed lookup.");
    }
  };

  if (isLoadingLookups) {
    return <div className="p-4">Loading lookups...</div>;
  }
// console.log("Master Lookups:", data);
// if (data.length > 0) {
//   console.log("First item:", data[0]);
// }
  return (
    <form onSubmit={handleSubmit} className="border rounded-md p-4 space-y-4">
      <div className="space-y-1">
        <Label htmlFor="value">Lookup<span className="text-red-500">*</span></Label>
        <Select value={formData.masterId} onValueChange={handleSelectChange}>
          <SelectTrigger className="min-h-[44px] text-base">
            <SelectValue placeholder="Select lookup name" />
          </SelectTrigger>
          <SelectContent>
            {data.length === 0 ? (
              <div className="p-2 text-gray-400">No lookups found</div>
            ) : (
              data.map(
                (lookup) =>
                  lookup &&
                  lookup.Id !== undefined &&
                  lookup.Id !== null && (
                    <SelectItem
                      key={lookup.Id.toString()}
                      value={lookup.Id.toString()}
                    >
                      {lookup.description_EN}
                    </SelectItem>
                  )
              )
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="description_EN">Value (English)<span className="text-red-500">*</span></Label>
        <Input
          id="description_EN"
          name="description_EN"
          placeholder="Type English value"
          className="min-h-[44px] text-base"
          value={formData.description_EN}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description_AR">Value (Arabic)<span className="text-red-500">*</span></Label>
        <Input
          id="description_AR"
          name="description_AR"
          placeholder="اكتب القيمة هنا"
          className="min-h-[44px] text-base"
          dir="rtl"
          value={formData.description_AR}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="comments">Comments</Label>
        <Textarea
          id="comments"
          name="comments"
          placeholder="type in your comment here ......"
          className="bg-muted min-h-[100px]"
          value={formData.comments}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="Disabled"
          checked={formData.isActive === 0}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="Disabled">Disabled</Label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="default" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </div>
    </form>
  );
}

export default AddNewDetailedLookup;
