import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import {
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useGetCountriesQuery,
} from "../../redux/countriesApi";

function AddLocationForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    Country: "",
    Code: "",
    Description_EN: "",
    Description_AR: "",
    isActive: 1,
    isGCC: 1,
  });
  const [error, setError] = useState<string | null>(null);

  const { data: countries, isSuccess, isLoading } = useGetCountriesQuery();
  const [createCountry, { isLoading: isCreating }] = useCreateCountryMutation();
  const [updateCountry, { isLoading: isUpdating }] = useUpdateCountryMutation();

  useEffect(() => {
    
    if (isEditMode && isSuccess && countries && id) {
      const existing = countries.find((item) => String(item.ID) === id);
      if (existing) {
        setFormData({
          Country: existing.Country ?? "",
          Code: existing.Code ?? "",
          Description_EN: existing.Description_EN ?? "",
          Description_AR: existing.Description_AR ?? "",
          isActive: existing.isActive ?? 1,
          isGCC: existing.isGCC ?? 1,
        });
      }
    }
  }, [isEditMode, isSuccess, countries, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isActive: checked ? 0 : 1,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isGCC: e.target.value === "GCC" ? 1 : 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.Country || !formData.Code) {
      setError("Country and Code are required.");
      return;
    }

    try {
      if (isEditMode && id) {
        await updateCountry({ id: Number(id), ...formData }).unwrap();
      } else {
        await createCountry(formData).unwrap();
      }
      navigate("/administration/location-list");
    } catch (err) {
      console.error("Error submitting location:", err);
      setError("An error occurred. Please check your input and try again.");
    }
  };

  if (isEditMode && isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="border rounded-md p-4 space-y-4">
      <h2 className="text-xl font-semibold">
        {isEditMode ? "Edit Location" : "Add New Location"}
      </h2>

      {error && <div className="text-red-600 font-medium">{error}</div>}

      <div className="space-y-1">
        <Label htmlFor="Country">Country<span className="text-red-500">*</span></Label>
        <Input
          id="Country"
          name="Country"
          value={formData.Country}
          onChange={handleChange}
          placeholder="Enter country name"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="Code">Code<span className="text-red-500">*</span></Label>
        <Input
          id="Code"
          name="Code"
          value={formData.Code}
          onChange={handleChange}
          placeholder="Country code"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="Description_EN">Description (EN)</Label>
        <Textarea
          id="Description_EN"
          name="Description_EN"
          value={formData.Description_EN}
          onChange={handleChange}
          placeholder="Type English description"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="Description_AR">Description (AR)</Label>
        <Textarea
          id="Description_AR"
          name="Description_AR"
          value={formData.Description_AR}
          onChange={handleChange}
          dir="rtl"
          placeholder="الوصف باللغة العربية"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isActive"
          checked={formData.isActive === 0}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="isActive">Disabled</Label>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="gcc"
            name="isGCC"
            value="GCC"
            checked={formData.isGCC === 1}
            onChange={handleRadioChange}
          />
          <Label htmlFor="gcc">GCC</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="non-gcc"
            name="isGCC"
            value="Non-GCC"
            checked={formData.isGCC === 0}
            onChange={handleRadioChange}
          />
          <Label htmlFor="non-gcc">Non-GCC</Label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="default" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating
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

export default AddLocationForm;
