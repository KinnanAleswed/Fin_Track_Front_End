import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Eye, Check } from 'lucide-react';
import SideNavbarTravel from '../../components/layouts/side-navbar-travel';
const mockData = [
  { id: '12342342348', name: 'Ammar', project: 'ABC', city: 'Dubai', status: 'Pending Approval', requester: 'Ahmad' },
  { id: '6546456489', name: 'Ammar', project: 'ABC', city: 'Ajman', status: 'Pending Approval', requester: 'Maher' },
  { id: '12342342348', name: 'Hazem', project: 'ABC', city: 'Dubai', status: 'Pending Approval', requester: 'Ahmad' },
  { id: '6546456489', name: 'Hazem', project: 'ABC', city: 'Ajman', status: 'Pending Approval', requester: 'Maher' },
];


const statusClass = (status: string) =>
  status === 'Pending Approval'
    ? 'bg-[#eaf6fb] text-[#28a5d6] px-3 py-1 rounded-full text-xs font-medium'
    : '';

const TravelRequestApproval = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-8">
      <SideNavbarTravel />
      <div className="flex-1 w-full overflow-x-auto">
        <div className="p-6 bg-white rounded-xl">
          <div className="flex justify-end mb-4">
            <Button onClick={() => navigate('/travel-and-expense-management/new-travel-request')}>Create New Travel Request</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="text-left text-sm font-semibold text-black">
                  <th className="py-3 px-4">Request</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Requester Name</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="py-3 px-4">{row.id}</td>
                    <td className="py-3 px-4">{row.name}</td>
                    <td className="py-3 px-4">{row.project}</td>
                    <td className="py-3 px-4">{row.city}</td>
                    <td className="py-3 px-4">
                      <span className={statusClass(row.status)}>{row.status}</span>
                    </td>
                    <td className="py-3 px-4">{row.requester}</td>
                    <td className="py-3 px-4 flex gap-3 items-center">
                      <button title="View" className="rounded-full border border-[#eaf6fb] p-1 text-[#28a5d6] hover:bg-[#eaf6fb]">
                        <Eye size={18} />
                      </button>
                      <button title="Approve" className="rounded-full border border-[#eafbe7] p-1 text-[#3bb77e] hover:bg-[#eafbe7]">
                        <Check size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelRequestApproval;
