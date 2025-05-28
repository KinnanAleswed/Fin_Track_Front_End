import React from 'react'
import SideNavbarAdmin from "../../components/layouts/side-navbar-admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menue'
import { Pencil, ChevronDown } from 'lucide-react'
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useGetMasterLookupQuery } from '../../redux/MasterLookupApi';

const LookupList = () => {
  const navigate = useNavigate();
  const { data: masterLookups = [], isLoading, error } = useGetMasterLookupQuery(); 

  return (
    <div className="flex gap-8">
      <SideNavbarAdmin />
      <div className="flex-1 w-full overflow-x-auto">
        <div className="p-6 bg-white rounded-xl">
          <div className="flex justify-end mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#1988D9] text-white px-4 py-2 rounded-md hover:bg-[#1572b6] flex items-center gap-2">
                Add New Lookup <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className='w-48'>
                <DropdownMenuItem onClick={() => navigate("/administration/lookup-list/add-new-master-lookup")}>
                  Master Lookup
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/administration/lookup-list/add-new-detailed-lookup")}>
                  Detail Lookup
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Failed to load lookup list.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr className="text-left text-sm font-semibold text-black">
                    <th className="py-3 px-4">Value</th>
                    <th className="py-3 px-4">Description (EN)</th>
                    <th className="py-3 px-4">Is Active</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {masterLookups.map((item: any ) => (
                    <tr key={item.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4">{item.value}</td>
                      <td className="py-3 px-4">{item.description_EN}</td>
                      <td className="py-3 px-4">{item.isActive ? "Yes" : "No"}</td>
                      <td className="py-3 px-4 text-center">
                       <Button
                          variant="outline"
                          className="rounded-full border border-[#eaf6fb] p-1 text-[#28a5d6] hover:bg-[#eaf6fb]"
                          onClick={() => navigate(`/administration/lookup-list/add-new-master-lookup/edit/${item.Id}`)}>
                          <Pencil className="h-4 w-4 text-[#A1A1AA]" />
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

export default LookupList;
