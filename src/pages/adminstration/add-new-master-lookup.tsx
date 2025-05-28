import React, { useEffect, useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  useAddMasterLookupMutation,
  useUpdateMasterLookupMutation,
  useGetMasterLookupQuery,
} from "../../redux/MasterLookupApi";
import { useNavigate, useParams } from "react-router-dom";

function AddNewMasterLookup() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    value: "",
    description_AR: "",
    description_EN: "",
    isActive: 1,
    createdBy: 1,
    comments: "",
     modifiedBy: 1
  });

  const isEditMode = Boolean(id);
  const {
    data: lookupData,
    isLoading: isFetching,
    isSuccess,
    // isError,
    // error,
  } = useGetMasterLookupQuery(undefined, {
    skip: !isEditMode,
  });

  const [addMasterLookup, { isLoading: isAdding }] = useAddMasterLookupMutation();
  const [updateMasterLookup, { isLoading: isUpdating }] = useUpdateMasterLookupMutation();

  // Fill form with existing data when editing
  useEffect(() => {
    if (isEditMode && isSuccess && lookupData && id) {
      const found = lookupData.find((item) => String(item.Id) === id);
      if (found) {
        setFormData({
          value: found.value ?? "",
          description_AR: found.description_AR ?? "",
          description_EN: found.description_EN ?? "",
          isActive: found.isActive ?? 1,
          createdBy: found.createdBy ?? 1,
          comments: found.comments ?? "",
          modifiedBy: found.createdBy ?? 1
        });
      }
    }
  }, [isEditMode, isSuccess, lookupData, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isActive: checked ? 1 : 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       if (isEditMode && id) {
        // For updates, ensure we send the correct ID case and include modifiedBy
        await updateMasterLookup({ 
          id: Number(id),
          ...formData,
          modifiedBy: 1 
        }).unwrap();
      } else {
        
        const { modifiedBy, ...createData } = formData;
        await addMasterLookup(createData).unwrap();
      }
      navigate("/administration/lookup-list");
    } catch (err) {
      console.error("Error saving master lookup:", err);
      alert("Failed to save master lookup.");
    }
  };

  if (isEditMode && isFetching) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="border rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold">
        {isEditMode ? "Edit Master Lookup" : "Add New Master Lookup"}
      </h2>

      <div className="space-y-1">
        <Label htmlFor="value">
          Lookup<span className="text-red-500">*</span>
        </Label>
        <Input
          id="value"
          name="value"
          placeholder="Enter lookup name"
          value={formData.value}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="description_EN">
          Value (English)<span className="text-red-500">*</span>
        </Label>
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
        <Label htmlFor="description_AR">
          Value (Arabic)<span className="text-red-500">*</span>
        </Label>
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
        <Button type="submit" variant="default" disabled={isAdding || isUpdating}>
          {isAdding || isUpdating
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
            ? "Update"
            : "Add"}
        </Button>
      </div>
    </form>
  );
}

export default AddNewMasterLookup;
