import React from "react";
import { Button } from "../../components/ui/button";
import { Eye, MoreVertical } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "../../api/projectApi";

const ListOfProject = () => {
  const navigate = useNavigate();
  const { data: projects, error, isLoading } = useGetProjectsQuery();

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Failed to load projects.</div>;

  return (
    <div className='py-6'>
      <div className='flex justify-end mb-6'>
        <Button
          variant='default'
          onClick={() => navigate("/projects/create-new")}
        >
          Create New Project
        </Button>
      </div>

      <div className='rounded-lg border border-border overflow-hidden'>
        <div className='grid grid-cols-6 text-sm font-semibold bg-muted px-6 py-4'>
          <div className='col-span-1'>Name</div>
          <div className='col-span-1'>Client</div>
          <div className='col-span-1'>PM</div>
          <div className='col-span-1'>Start</div>
          <div className='col-span-1'>End</div>
          <div className='col-span-1 text-center'>Action</div>
        </div>

        {projects?.map((project: any, index: number) => (
          <div
            key={project.id}
            className={clsx(
              "grid grid-cols-6 items-center text-sm px-6 py-5",
              index % 2 === 1 ? "bg-muted/50" : "bg-background"
            )}
          >
            <div className='col-span-1'>{project.name}</div>
            <div className='col-span-1'>{project.Clients?.name ?? "N/A"}</div>
            <div className='col-span-1'>{project.Managers?.name ?? "N/A"}</div>
            <div className='col-span-1'>
              {new Date(project.startDate).toLocaleDateString()}
            </div>
            <div className='col-span-1'>
              {new Date(project.endDate).toLocaleDateString()}
            </div>
            <div className='col-span-1 flex justify-center gap-4'>
              <div className='flex flex-col items-center text-xs text-muted-foreground'>
                <Eye className='mb-1 w-6 h-7 text-[#2a62ca] bg-muted flex items-center justify-center rounded-full' />
                <span className='text-center leading-tight'>
                  View Budget
                  <br />
                  Items
                </span>
              </div>
              <div className='flex flex-col items-center text-xs text-muted-foreground'>
                <MoreVertical className='mb-1 w-6 h-7 text-[#2a62ca] bg-muted flex items-center justify-center rounded-full' />
                <span>More</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfProject;
