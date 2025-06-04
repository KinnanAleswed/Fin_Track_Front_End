import SideNavbarAdmin from "../../components/layouts/side-navbar-admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menue";
import { SquarePen, ChevronDown, Eye } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetCountriesQuery } from "../../redux/countriesApi";

const LocationList = () => {
  const navigate = useNavigate();
  const { data: countries = [], isLoading, error } = useGetCountriesQuery();

  return (
    <div className="flex gap-8">
      <SideNavbarAdmin />
      <div className="flex-1 w-full overflow-x-auto">
        <div className="p-6 bg-white rounded-xl">
         <h2 className="text-blue-600 font-semibold mb-4">Location List</h2>
          <div className="flex justify-end mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#1988D9] text-white px-4 py-2 rounded-md hover:bg-[#1572b6] flex items-center gap-2">
                Add New Location<ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/administration/location-list/add-new-country")}>
                  Country
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/administration/location-list/add-new-city")}>
                  City
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load location list.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr className="text-left text-sm font-semibold text-black">
                    <th className="py-3 px-4">Country Name</th>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {countries.map((country: any) => (
                    <tr key={country.id} className="border-b last:border-b-0 hover:bg-gray-50">
                          <td className="py-3 px-4">{country.Country}</td>
                          <td className="py-3 px-4">{country.Code}</td>
                      <td className="py-3 px-4">
                        {country.isActive === 1
                          ? "Enabled"
                          : "Disabled"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Button
                          variant="outline"
                          className="rounded-full border border-[#eaf6fb] p-1 text-[#28a5d6] hover:bg-[#eaf6fb]"
                         onClick={() => navigate(`/administration/add-new-country/${country.ID}`)}
                        >
                          <SquarePen className="h-4 w-4 text-[#28a5d6]" />
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full border border-[#eaf6fb] p-1 text-[#28a5d6] hover:bg-[#eaf6fb] ml-2"
                          onClick={() => navigate(`/administration/location-list/city-list/${country.ID}`)}
                        >
                          <Eye className="h-4 w-4 text-[#A1A1AA]" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationList;
