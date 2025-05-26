// src/components/projects/ListOfProject.tsx
import React from "react";
import { Button } from "../../components/ui/button";
import { Eye, MoreVertical } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import {
  useGetProjectsQuery,
  useGetLookupsQuery,
} from "../../redux/projectApi";
import type { ProjectListItem } from "../../redux/projecttypes";

const ListOfProject: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading,
  } = useGetProjectsQuery();

  const {
    data: lookups,
    error: lookupsError,
    isLoading: lookupsLoading,
  } = useGetLookupsQuery();

  if (projectsLoading || lookupsLoading) return <div>Loading projects...</div>;
  if (projectsError || lookupsError) return <div>Failed to load projects.</div>;
  return (
    <div className='py-6'>
      <div className='flex justify-end mb-6'>
        <Button onClick={() => navigate("/projects List/create-new-project")}>
          Create New Project
        </Button>
      </div>

      <div className='rounded-lg border border-border overflow-hidden'>
        <div className='grid grid-cols-6 text-sm font-semibold bg-muted px-6 py-4'>
          <div>Name</div>
          <div>Client</div>
          <div>PM</div>
          <div>Start</div>
          <div>End</div>
          <div className='text-center'>Action</div>
        </div>

        {projects!.map((project: ProjectListItem, index) => {
          // map clientId → label
          const clientOpt = lookups!.clients.find(
            (c) => c.value === project.clientId.toString()
          );
          const clientLabel = clientOpt?.label ?? project.clientId.toString();

          // build manager name
          const manager = project.manager
            ? `${project.manager.first_name} ${project.manager.last_name}`
            : "N/A";

          return (
            <div
              key={project.id}
              className={clsx(
                "grid grid-cols-6 items-center text-sm px-6 py-5",
                index % 2 === 1 ? "bg-muted/50" : "bg-background"
              )}
            >
              <div>{project.name}</div>
              <div>{clientLabel}</div>
              <div>{manager}</div>
              <div>{new Date(project.startDate).toLocaleDateString()}</div>
              <div>{new Date(project.endDate).toLocaleDateString()}</div>

              <div className='flex justify-center gap-4'>
                <div className='flex flex-col items-center text-xs text-muted-foreground'>
                  <Eye
                    className='mb-1 w-6 h-7 text-[#2a62ca] bg-muted flex items-center justify-center rounded-full'
                    onClick={() => navigate("/projects List/Budget Items")}
                  />
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
          );
        })}
      </div>
    </div>
  );
};

export default ListOfProject;
