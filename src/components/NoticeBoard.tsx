"use client";
import { myAxios } from "@/lib/myaxios";
import { useQueries } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/DropDownMenu";
import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import Notice from "./Notice";
import { noticesSchema } from "@/schema/notice";
import { BellRing } from "lucide-react";

const NoticeBoard = () => {
  const results = useQueries({
    queries: [
      {
        queryFn: async () => {
          const notice = await myAxios.get("notice");
          return noticesSchema.parse(notice.data).reverse();
        },
        queryKey: ["notice"],
        staleTime: 30000,
      },
      {
        queryFn: async () => {
          return await getSession();
        },
        queryKey: ["session"],
        staleTime: 60000,
      },
    ],
  });
  const { data: session } = results[1];
  const { data: notices } = results[0];
  if (session?.user?.role === "STUDENT") {
    return (
      <div >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="text">
              <Badge badgeContent={notices?.length} color="info">
                <BellRing className="text-white hover:text-blue-300" />
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-3 max-h-56 overflow-auto bg-white">
            {notices &&
              notices.map((notice, index: number) => {
                return (
                  <Notice
                    details={notice.details}
                    createdAt={notice.createdAt}
                    key={index}
                  />
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
};

export default NoticeBoard;
