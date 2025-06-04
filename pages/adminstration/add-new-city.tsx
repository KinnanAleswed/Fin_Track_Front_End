import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Textarea } from "../../components/ui/textarea";
import { useCreateCityMutation, useUpdateCityMutation, useGetCityByIdQuery } from "../../redux/cityApi";
import { useGetCountriesQuery } from "../../redux/countriesApi";
import { toast, Toaster } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const AddNewCity = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    locationName: "",
    code: "",
    countryId: "",
    descriptionAR: "",
    descriptionEN: "",
    isActive: 1,
    createdBy: 1,
  });

  const [createCity, { isLoading: isCreating }] = useCreateCityMutation();
  const [updateCity, { isLoading: isUpdating }] = useUpdateCityMutation();
  const { data: countries, isLoading: isCountriesLoading } = useGetCountriesQuery();
  const { data: existingCity, isSuccess: isCityFetched } = useGetCityByIdQuery(id ? Number(id) : undefined, {
    skip: !id,
  });

  useEffect(() => {
    if (isEditMode && existingCity && isCityFetched) {
      setFormData({
        locationName: existingCity.City,
        code: existingCity.Code,
        countryId: existingCity.Country_ID.toString(),
        descriptionAR: existingCity.Description_AR || "",
        descriptionEN: existingCity.Description_EN || "",
        isActive: existingCity.isActive,
        createdBy: existingCity.createdBy,
      });
    }
  }, [isEditMode, existingCity, isCityFetched]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, countryId: value }));
  };

  const handleActiveChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked ? 1 : 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.code) {
      toast.error("City code is required", {
        className: "bg-red-500 text-white",
      });
      return;
    }
    if (!formData.locationName) {
      toast.error("City name is required", {
        className: "bg-red-500 text-white",
      });
      return;
    }
    if (!formData.countryId) {
      toast.error("Country is required", {
        className: "bg-red-500 text-white",
      });
      return;
    }

    const payload = {
      City: formData.locationName,
      Code: formData.code,
      Country_ID: parseInt(formData.countryId, 10),
      isActive: formData.isActive,
      createdBy: formData.createdBy,
      Description_AR: formData.descriptionAR,
      Description_EN: formData.descriptionEN,
    };

    try {
      if (isEditMode && id) {
        await updateCity({ id: Number(id), ...payload }).unwrap();
        toast.success("City updated successfully", {
          className: "bg-green-500 text-white",
        });
        navigate(-1);
      } else {
        await createCity(payload).unwrap();
        toast.success("City added successfully", {
          className: "bg-green-500 text-white",
        });
        // Reset form
        setFormData((prev)=>({
          ...prev,
          code:"",
          locationName:"",
          descriptionAR: "",
          descriptionEN: ""
        }))

        
      }
    } catch (err) {
      console.error("Failed to save city:", err);
      if (isEditMode === true){
        toast.error("Make sure you updated the fields with new information.", {
        className: "bg-red-500 text-white",
      });
    }else{
      toast.error("Make sure you filled all the required fields.", {
        className: "bg-red-500 text-white",
      });
    }
    }
        
      
      
  };

  const countryList: Array<{ ID: number; Country: string; isActive: number }> = Array.isArray(countries) ? countries : [];

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ className: "my-toast" }} />
      <form onSubmit={handleSubmit} className="border rounded-md p-4 space-y-4 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold">
          {isEditMode ? "Edit City" : "Add New City"}
        </h2>

        <div className="space-y-1">
          <Label htmlFor="country">Country<span className="text-red-500">*</span></Label>
          <Select
            onValueChange={handleCountryChange}
            value={formData.countryId}
            disabled={isCountriesLoading}
          >
            <SelectTrigger className="min-h-[44px] text-base">
              <SelectValue
                placeholder={isCountriesLoading ? "Loading countries..." : "Select country"}
              />
            </SelectTrigger>
            <SelectContent>
              {countryList.map((country) => (
                <SelectItem key={country.ID}
                 value={country.ID.toString()}
                 disabled={country.isActive !== 1}
                className={country.isActive !== 1 ? "text-gray-400" : ""}
               >
                  {country.Country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="locationName">City Name<span className="text-red-500">*</span></Label>
            <Input
              id="locationName"
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              required
              placeholder="Unique city name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="code">Code<span className="text-red-500">*</span></Label>
            <Input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="Unique city code"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="descriptionAR">Description (Arabic)</Label>
          <Textarea
            id="descriptionAR"
            name="descriptionAR"
            value={formData.descriptionAR}
            onChange={handleChange}
            rows={3}
            placeholder="اكتب الوصف هنا (اختياري)"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="descriptionEN">Description (English)</Label>
          <Textarea
            id="descriptionEN"
            name="descriptionEN"
            value={formData.descriptionEN}
            onChange={handleChange}
            rows={3}
            placeholder="Type description here (Optional)"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isActive"
            checked={formData.isActive === 1}
            onCheckedChange={handleActiveChange}
          />
          <Label htmlFor="isActive">Active</Label>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isCreating || isUpdating || isCountriesLoading}>
            {isCreating || isUpdating
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
              ? "Update City"
              : "Save City"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddNewCity;


