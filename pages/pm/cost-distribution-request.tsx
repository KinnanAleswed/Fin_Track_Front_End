import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Columns2 } from "lucide-react";
import SideNavbarTravel from '../../components/layouts/side-navbar-travel'
import { useState } from "react";
import CostSplitSheet from "./cost-split";
import type{costDistributionRequest} from "../../redux/types/costTypes";



  const Requests = [
  {
    type: "Travel Request",
    number: "34354354",
    pmName: "Ammar",
    projectName: "ABC Project",
    projectStatus: "Active",
    authorizationStatus: "Approved",
    city: "Dubai",
  },
  {
    type: "Travel Request",
    number: "34354354",
    pmName: "Basil",
    projectName: "XYZ Project",
    projectStatus: "In-active",
    authorizationStatus: "Approved",
    city: "Jaddah",
  },
  {
    type: "Travel Request",
    number: "34354354",
    pmName: "Ammar",
    projectName: "ABC Project",
    projectStatus: "In-active",
    authorizationStatus: "Approved",
    city: "Dubai",
  },
  {
    type: "Travel Request",
    number: "34354354",
    pmName: "Basil",
    projectName: "XYZ Project",
    projectStatus: "In-active",
    authorizationStatus: "Approved",
    city: "Jaddah",
  },
];

const CostDistributionRequest = () => {

 

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="bg-blue-100 text-blue-600">Active</Badge>;
    case "In-active":
      return <Badge className="bg-purple-100 text-purple-600">In-active</Badge>;
    default:
      return null;
  }
};
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<costDistributionRequest | null>(null);

  const handleSplitClick = (request: costDistributionRequest) => {
    setSelectedRequest(request);
    setIsSheetOpen(true);
  };

  return (
    <div className="flex gap-8">
      <SideNavbarTravel />
      <div className="flex-1 w-full overflow-x-auto">
        <Card className="rounded-xl shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Type</TableHead>
                <TableHead>Request Number</TableHead>
                <TableHead>PM Name</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Project Status</TableHead>
                <TableHead>Authorization Status</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Requests.map((req, idx) => (
                <TableRow key={idx}>
                  <TableCell>{req.type}</TableCell>
                  <TableCell>{req.number}</TableCell>
                  <TableCell>{req.pmName}</TableCell>
                  <TableCell>{req.projectName}</TableCell>
                  <TableCell>{getStatusBadge(req.projectStatus)}</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-100 text-emerald-600">Approved</Badge>
                  </TableCell>
                  <TableCell>{req.city}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-gray-100"
                      title="Split Cost"
                      onClick={() => handleSplitClick(req)}
                    >
                      <Columns2 className="w-4 h-4 text-gray-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      {selectedRequest && (
        <CostSplitSheet
          isOpen={isSheetOpen}
          setIsOpen={setIsSheetOpen}
          request={selectedRequest}
        />
      )}
    </div>
  );
};

export default CostDistributionRequest
