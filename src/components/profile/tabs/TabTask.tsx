import { UploadButton } from "@/components/ui/uploadthing";
import TaskForm from "../../form/Task";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { myAxios } from "@/lib/myaxios";

const TabTask = ({ task, session, id }: any) => {
  const queryClient = useQueryClient();
  const taskUpdate = useMutation({
    mutationFn: async ({
      attachment,
      id,
    }: {
      attachment: string;
      id: string;
    }) => {
      await myAxios.patch(`task/${id}`, { attachment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
      toast("Uploaded Successfully");
    },
    onError: () => {
      toast("Something went wrong");
    },
  });
  const taskColumn: GridColDef[] = [
    { field: "name", headerName: "Task Name", width: 130 },
    {
      field: "attachment",
      headerName: "Attachment",
      width: 130,
      renderCell: ({ row }: any) => {
        if (session?.user?.role === "STUDENT") {
          if (row.attachment) {
            return (
              <Link href={row.attachment} target="_blank">
                Attachment
              </Link>
            );
          }
          return (
            <UploadButton
              endpoint="fileUploader"
              onClientUploadComplete={(res) => {
                if (res && res.length > 0) {
                  taskUpdate.mutate({ attachment: res[0].fileUrl, id: row.id });
                }
              }}
              onUploadError={(error: Error) => {
                toast("Something went wrong");
              }}
            />
          );
        }
        if (row.attachment) {
          return (
            <Link href={row.attachment} target="_blank">
              Attachment
            </Link>
          );
        }
        return "";
      },
    },
    {
      field: "createdAt",
      headerName: "Creation Time",
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        {
          
          const dateObject = new Date(params.value);
          return dateObject.toDateString();
        }
      },
    },
    {
      field: "submittedAt",
      headerName: "Submission Time",
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        {
          if(!params.value) return ""
          const dateObject = new Date(params.value);
          return dateObject.toDateString();
        }
      },
    },
    { field: "isCompleted", headerName: "Status", width: 130,valueGetter: (params: GridValueGetterParams) => {
      {
        if(params.value) return "Submitted"
        return "Not Submitted"
      }
    }, },
  ];

  return (
    <div className="flex flex-row justify-between gap-10">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          style={{ color: "white" }}
          rows={task}
          columns={taskColumn}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
      {session?.user?.role === "TEACHER" && <TaskForm id={id} />}
    </div>
  );
};

export default TabTask;
