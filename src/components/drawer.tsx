"use client";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import LogOut from "./Logout";
import { useState } from "react";
import NoticeBoard from "./NoticeBoard";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const PersistentDrawerLeft = ({ children }: any) => {
  const { data: session } = useQuery({
    queryFn: async () => await getSession(),
    queryKey: ["session"],
    staleTime: Infinity,
  });
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  let paths;
  const role = session?.user?.role;
  if (role === "TEACHER") {
    paths = [
      { url: "/dashboard/list", name: "Supervisee List" },
      { url: "/dashboard/evaluation", name: "Evaluation" },
    ];
  } else if (role === "ADMIN") {
    paths = [
      { url: "/dashboard/students", name: "Student List" },
      { url: "/dashboard/thesis", name: "Thesis List" },
      { url: "/dashboard/assign", name: "Assign Thesis" },
      { url: "/dashboard/assign-evaluator", name: "Assign Evaluator" },
    ];
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <div className="bg-neutral-400">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex flex-row">
              <Link href="/">
                <Typography variant="h6" noWrap component="div" sx={{}}>
                  Thesis Management System
                </Typography>
              </Link>
              <div className="flex justify-end">
                <NoticeBoard />
              </div>
            </div>
          </Toolbar>
        </div>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgb(100 116 139)",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className="text-white">
          <DrawerHeader>
            <IconButton color="inherit" onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <MenuIcon /> : <MenuIcon />}
            </IconButton>
          </DrawerHeader>
        </div>
        <Divider />
        {paths &&
          paths.map((path, index) => {
            return (
              <div key={index}>
                <ul>
                  <Link
                    href={path.url}
                    className="flex items-center p-2  text-white  hover:bg-slate-400"
                  >
                    <span className="flex-1 ml-3 whitespace-nowrap text-white">
                      {path.name}
                    </span>
                  </Link>
                </ul>
                <hr className="bg-white" />
              </div>
            );
          })}

        <List>
          <LogOut />
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />

        {children}
      </Main>
    </Box>
  );
};
export default PersistentDrawerLeft;
