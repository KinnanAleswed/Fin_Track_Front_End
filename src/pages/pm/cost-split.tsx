import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import React from "react";
import type { CostSplitSheetProps , CostSplitRequest } from "../../redux/types/costTypes";

const CostSplitSheet: React.FC<CostSplitSheetProps> = ({ isOpen, setIsOpen, request }) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full max-w-[70vw] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] overflow-auto">
        <SheetHeader>
          <SheetTitle>Split Cost Request</SheetTitle>
          <SheetDescription> 
            Review and modify cost allocation details.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm p-10">
            <div>
              <Label>Allocation Request ID</Label>
              <p>{request.number}</p>
            </div>
            <div>
              <Label>Original Project Name</Label>
              <p>{request.projectName}</p>
            </div>
            <div>
              <Label>Original Request Number</Label>
              <p>{request.number}</p>
            </div>
            <div>
              <Label>Original Request Cost</Label>
              <p>200 AED</p>
            </div>
          </div>

          <div>
            <div className="w-full">
              <Label htmlFor="projectName" className="text-sm mb-1">Project Name</Label>
              <Select>
                <SelectTrigger className="w-full p-4">
                  <SelectValue placeholder="Select project name" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ABC Project">ABC Project</SelectItem>
                    <SelectItem value="XYZ Project">XYZ Project</SelectItem>
                </SelectContent>
              </Select>
            </div>

          <div className="border rounded-md p-10 text-sm ">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Request Number</Label>
                <p>{request.number}</p>
              </div>
              <div>
                <Label>Project Name</Label>
                <p>{request.projectName}</p>
              </div>
              <div>
                <Label>Cost Allocation Percentage</Label>
                <p>50%</p>
              </div>
              <div>
                <Label>Project Status</Label>
                <p>{request.projectStatus}</p>
              </div>
              <div>
                <Label>PM Name</Label>
                <p>{request.pmName}</p>
              </div>
              <div>
                <Label>Allocation Request ID</Label>
                <p>{request.number}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Save as Draft</Button>
            <Button variant="default">Send for Approval</Button>
          </div>
        </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CostSplitSheet;
