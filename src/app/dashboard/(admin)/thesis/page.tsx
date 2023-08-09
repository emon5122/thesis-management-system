"use client";
import { myAxios } from "@/lib/myaxios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";

const List = () => {
  const [date, setDate] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: async () => {
      const value = await myAxios.get("theses");
      return z
        .array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
            createdAt: z.string().datetime(),
            endedAt: z.string().datetime().nullable(),
            evaluation: z.array(
              z.object({ createdAt: z.string().datetime().nullable() })
            ),
          })
        )
        .parse(value.data);
    },
    queryKey: ["theses"],
    staleTime: 300000,
  });
  const thesisMutation = useMutation({
    mutationFn: async (id: string) => {
      await myAxios.patch(`theses/${id}`, { date });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["theses"]);
      setDate(null);
    },
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Thesis Title", width: 200 },
    {
      field: "createdAt",
      headerName: "Creation Date",
      width: 200,
      valueGetter: (params: GridValueGetterParams) => {
        {
          if (!params.value) return "";
          const dateObject = new Date(params.value);
          return dateObject.toDateString();
        }
      },
    },
    {
      field: "evaluation",
      headerName: "Evaluation Date",
      width: 200,
      valueGetter: (params: GridValueGetterParams) => {
        console.log(params.value)
        {
          if (!params.value[0]?.createdAt) return "";
          const dateObject = new Date(params.value[0]?.createdAt);
          return dateObject.toDateString();
        }
      },
    },
    {
      field: "endedAt",
      headerName: "Completion Date",
      width: 200,
      type: "actions",
      cellClassName: "actions",
      getActions: ({ row }: any) => {
        return row.endedAt !== null
          ? [<>{!row.endedAt ? "" : new Date(row.endedAt).toDateString()}</>]
          : [<DateTimePicker onAccept={(e: any) => setDate(e)} key={row.id} />];
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }: any) => {
        return [
          <Button
            type="button"
            variant="outlined"
            key={row.id}
            disabled={row.id !== id}
            onClick={(e) => {
              e.preventDefault();
              thesisMutation.mutate(row.id);
            }}
          >
            Update
          </Button>,
        ];
      },
    },
  ];
  return (
    <div className="min-h-screen">
      {data && (
        <DataGrid
          style={{ color: "white", width: "full" }}
          onRowClick={(row) => setId(row.row.id)}
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[8, 16, 32]}
        />
      )}
    </div>
  );
};

export default List;
