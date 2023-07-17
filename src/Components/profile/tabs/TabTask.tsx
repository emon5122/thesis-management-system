import TaskForm from "@/components/form/Task"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const TabTask = ({task,session,id}:any) => {
    const taskColumn: GridColDef[] = [
        { field: "name", headerName: "Task Name", width: 130 },
        { field: "details", headerName: "Details", width: 130 },
        { field: "attachment", headerName: "Attachment", width: 130 },
        { field: "createdAt", headerName: "Creation Time", width: 130 },
        { field: "submittedAt", headerName: "Submission Time", width: 130 },
        { field: "isCompleted", headerName: "Status", width: 130 },
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
  )
}

export default TabTask
