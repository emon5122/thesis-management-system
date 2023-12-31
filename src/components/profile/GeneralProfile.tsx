import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabInfo from "../../components/profile/tabs/TabInfo";
import TabAttendance from "../../components/profile/tabs/TabAttendance";
import TabTask from "../../components/profile/tabs/TabTask";
import { useState } from "react";
import TabNotice from "./tabs/TabNotice";
import TabEvaluation from "./tabs/TabEvaluation";
import TabResult from "./tabs/TabResult";

const ProfileTopNavigation = ({ session, task, attendance, id, user }: any) => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab style={{ color: "white" }} label="Info" value="1" />
            <Tab style={{ color: "white" }} label="Attendance" value="2" />
            <Tab style={{ color: "white" }} label="Tasks" value="3" />
            <Tab style={{ color: "white" }} label="Notices" value="4" />
            {session?.user?.role !== "ADMIN" && (
              <Tab style={{ color: "white" }} label="Evaluation" value="5" />
            )}
{session?.user?.role === "ADMIN" && (
            <Tab style={{ color: "white" }} label="Result" value="6" />
)}
          </TabList>
        </Box>
        <TabPanel value="1">
          <TabInfo user={user} id={id} session={session} />
        </TabPanel>
        <TabPanel value="2">
          <TabAttendance attendance={attendance} session={session} id={id} />
        </TabPanel>
        <TabPanel value="3">
          <TabTask task={task} session={session} id={id} />
        </TabPanel>
        <TabPanel value="4">
          <TabNotice id={id} session={session} />
        </TabPanel>
        {session?.user?.role !== "ADMIN" && (
          <TabPanel value="5">
            <TabEvaluation id={id} />
          </TabPanel>
        )}
        {session?.user?.role === "ADMIN" && (
          <TabPanel value="6">
            <TabResult id={id} />
          </TabPanel>
        )}
      </TabContext>
    </Box>
  );
};

export default ProfileTopNavigation;
