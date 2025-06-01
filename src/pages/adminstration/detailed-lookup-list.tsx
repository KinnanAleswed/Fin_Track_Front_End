import {useGetDetailedLookupsByMasterIdQuery} from '../../redux/DetailedLookupApi'
import {useParams} from "react-router-dom";
import {Button} from '../../components/ui/button';
import {SquarePen} from 'lucide-react';
import {useNavigate} from 'react-router-dom';



const DetailedLookupList = () => {
  const {masterLookupId} = useParams();
  const id = Number(masterLookupId);
  const isValidId = !isNaN(id) && id > 0;
  const { data: detailedLookups = [], isLoading, error } = useGetDetailedLookupsByMasterIdQuery(id,{
    skip: !isValidId
  }); 
  console.log("Fetched detailed lookups:", detailedLookups);
 const navigate = useNavigate();
  return (
    <>
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
              {detailedLookups.map((item: any) => (
                <tr key={item.Code} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-3 px-4">{item.Code}</td>
                  <td className="py-3 px-4">{item.Value_EN}</td>
                  <td className="py-3 px-4">{item.isActive ? "Yes" : "No"}</td>
                  <td className="py-3 px-4 text-center">
                   <Button
                     variant="outline"
                     className="rounded-full border border-[#eaf6fb] p-1 text-[#28a5d6] hover:bg-[#eaf6fb]"
                      onClick={() => navigate(`/administration/detailed-lookup/${item.Id}`)}>
                      <SquarePen className="h-4 w-4 rounded-2xl text-[#28a5d6] " />
                   </Button>
                      
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default DetailedLookupList;