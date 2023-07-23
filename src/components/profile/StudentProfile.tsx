import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabInfo from "../profile/tabs/TabInfo";
import TabAttendance from "../profile/tabs/TabAttendance";
import TabTask from "../profile/tabs/TabTask";
import { useState } from "react";
import TabGrade from "./tabs/TabGrade";


const StudentProfileTopNavigation = ({session, task,attendance}:any) => {
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
            <Tab style={{ color: "white" }} label="Grade" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TabInfo user={session?.user} />
        </TabPanel>
        <TabPanel value="2">
          <TabAttendance attendance={attendance} session={session} id={session?.user?.id} />
        </TabPanel>
        <TabPanel value="3">
          <TabTask task={task} session={session} id={session?.user?.id} />
        </TabPanel>
        <TabPanel value="4">
          <TabGrade id={session?.user?.id} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default StudentProfileTopNavigation;
