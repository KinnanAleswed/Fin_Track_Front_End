import { useGetCitiesByCountryIdQuery } from '../../redux/cityApi';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { SquarePen } from 'lucide-react';

const CityList = () => {
  const { countryId } = useParams();
  const id = Number(countryId);
  const isValidId = !isNaN(id) && id > 0;

  const {
    data: cities = [],
    isLoading,
    error,
  } = useGetCitiesByCountryIdQuery(id, {
    skip: !isValidId,
  });

  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load city list.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="text-left text-sm font-semibold text-black">
                <th className="py-3 px-4">City Name</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city: any) => (
                <tr key={city.ID} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-3 px-4">{city.City}</td>
                  <td className="py-3 px-4">{city.Code ?? '-'}</td>
                  <td className={city.isActive===1?"w-6 h-2 font-bold not-italic leading-normal text-center text-blue-500":"w-6 h-2 font-bold not-italic leading-normal text-center text-purple-800 "}>{city.isActive === 1 ? 'Enabled' : 'Disabled'}</td>
                  <td className="py-3 px-4 text-center">
                    <Button
                      variant="outline"
                      className="rounded-full border border-[#eaf6fb] p-1 text-[#28a5d6] hover:bg-[#eaf6fb]"
                      onClick={() => navigate(`/administration/location-list/add-new-city/${city.ID}`)}
                    >
                      <SquarePen className="h-4 w-4 rounded-2xl text-[#28a5d6]" />
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
};

export default CityList;
