import AttendanceForm from "../../form/Attendance";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const TabAttendance = ({ attendance, session, id }: any) => {
  const columns: GridColDef[] = [
    { field: "weekNumber", headerName: "Week Number", width: 130 },
    {
      field: "createdAt",
      headerName: "Status",
      width: 130,
      valueGetter: (params: GridValueGetterParams) => {
        {
          return params.field ? "Present" : "Absent";
        }
      },
    },

     { field: "comments", headerName: "Comments", width: 130 },
  ];

  return (
    <div className="flex flex-row justify-between gap-10">
      <div style={{ height: 400, width: "100%" }}>
        {attendance && (
          <DataGrid
            style={{ color: "white" }}
            rows={attendance}
            columns={columns}
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
        )}
      </div>
      {session?.user?.role === "TEACHER" && <AttendanceForm id={id} />}
    </div>
  );
};

export default TabAttendance;
