import React, { useEffect, useState } from "react";
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
import {
  useCreateDetailedLookupMutation,
  useUpdateDetailedLookupMutation,
  useGetDetailedLookupsQuery,
  useGetDetailedLookupByIdQuery,
} from "../../redux/DetailedLookupApi";
import { useGetMasterLookupQuery } from "../../redux/MasterLookupApi";
import { Toaster, toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

function AddNewDetailedLookup() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    masterId: "",
    description_AR: "",
    description_EN: "",
    isActive: 1,
    createdBy: 1,
    comments: "",
  });

  const [error, setError] = useState<string | null>(null);

  const [addDetailedLookup, { isLoading }] = useCreateDetailedLookupMutation();
  const [updateDetailedLookup, { isLoading: isUpdating }] = useUpdateDetailedLookupMutation();
  const { data: masterLookups = [], isLoading: isLoadingLookups } = useGetMasterLookupQuery();

  const { data: existingDetail , isSuccess : isDetailFetched } = useGetDetailedLookupByIdQuery(
    id ? Number(id) : undefined,
    {
      skip: !id,
    }
  );

  const { data: detailedLookups = [] } = useGetDetailedLookupsQuery(
    formData.masterId ? Number(formData.masterId) : undefined,
    {
      skip: !formData.masterId,
    }
  );

  // Fill form data in edit mode
  useEffect(() => {
    if (isEditMode && existingDetail && isDetailFetched) {
      setFormData({
        masterId: existingDetail.Master_ID.toString(),
        description_AR: existingDetail.Value_AR,
        description_EN: existingDetail.Value_EN,
        isActive: existingDetail.isActive,
        createdBy: existingDetail.createdBy,
        comments: existingDetail.comments ?? "",
      });
    }
  }, [isEditMode, existingDetail, isDetailFetched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      masterId: value,
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
    setError(null);

    // check for duplicates
    if (detailedLookups && formData.masterId) {
      const duplicate = detailedLookups.find(
        (item) =>
          (item.Value_EN === formData.description_EN ||
            item.Value_AR === formData.description_AR) &&
          (!isEditMode || item.Id.toString() !== id)
      );
      if (duplicate) {
        setError("There is an already existing record with the same values.");
        return;
      }
    }

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
      if (isEditMode && id) {
        await updateDetailedLookup({ id: Number(id), ...payload }).unwrap();
        // toast.success("Detailed lookup updated successfully!");
        navigate(-1)
      } else {
        await addDetailedLookup(payload).unwrap();
        toast.success("Detailed lookup added successfully!");
        setFormData((prev) => ({
          ...prev,
          description_AR: "",
          description_EN: "",
          comments: "",
        }));
      }

    } catch (err) {
      console.error("Error saving detailed lookup:", err);
      toast.error("Make sure you filled all the required fields.",
        {className: "bg-red-500 text-white"});
    }
  };

  if (isLoadingLookups) {
    return <div className="p-4">Loading lookups...</div>;
  }

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} className="border rounded-md p-4 space-y-4">
        <h2 className="text-xl font-semibold">
          {isEditMode ? "Edit Detailed Lookup" : "Add New Detailed Lookup"}
        </h2>

        {error && <div className="text-red-600 font-medium">{error}</div>}

        <div className="space-y-1">
          <Label htmlFor="value">Lookup<span className="text-red-500">*</span></Label>
          <Select value={formData.masterId} onValueChange={handleSelectChange}>
            <SelectTrigger className="min-h-[44px] text-base">
              <SelectValue placeholder="Select lookup name" />
            </SelectTrigger>
            <SelectContent>
              {masterLookups.length === 0 ? (
                <div className="p-2 text-gray-400">No lookups found</div>
              ) : (
                masterLookups.map(
                  (lookup) =>
                    lookup &&
                    lookup.Id !== undefined &&
                    lookup.Id !== null && (
                      <SelectItem
                        key={lookup.Id.toString()}
                        value={lookup.Id.toString()}
                        disabled={lookup.isActive !== 1}
                        className={lookup.isActive !== 1 ? "text-gray-400" : ""}
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
            className="bg-white min-h-[100px]"
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
          <Button type="submit" variant="default" disabled={isLoading || isUpdating}>
            {isLoading || isUpdating
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Update"
              : "Add"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddNewDetailedLookup;
