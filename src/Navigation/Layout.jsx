import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import * as icons from "@mui/icons-material";
import NavRouter from "./NavRouter";
import URILinks from "./links";
import { Link as RouterLink } from "react-router-dom";

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;
const transitionDuration = 300; // in milliseconds

export default function Layout() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={open ? "close drawer" : "open drawer"}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidthOpen : drawerWidthClosed,
            transition: `width ${transitionDuration}ms ease-in-out`,
            overflow: "hidden",
          },
        }}
        open={open}
      >
        <Toolbar />
        <Divider />
        <List>
          {URILinks.map((uri) => {
            const Icon = icons[uri.icon];
            console.log(uri);
            return (
              <ListItem key={uri.path} disablePadding sx={{ display: "block" }}>
                {console.log("/CRM" + uri.path)}
                {/* <Link to={"/CRM" + uri.path}> */}
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  component={RouterLink} // Use RouterLink for internal navigation
                  to={uri.path} // Specify the path for navigation
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    {Icon ? <Icon /> : <icons.Delete />}

                    {/* <Delete /> */}
                  </ListItemIcon>
                  <ListItemText
                    primary={uri.name}
                    color="inherit"
                    underline="none"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
                {/* </Link> */}
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: 1,
          marginTop: "64px",
          // marginLeft: open ? `${drawerWidthOpen}px` : `${drawerWidthClosed}px`,
          transition: `margin-left ${transitionDuration}ms ease-in-out`,
          // height: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        <Paper
          sx={{
            flexGrow: 1,
            p: 2,
            height: "calc(100vh - 128px)",
            overflow: "auto",
          }}
        >
          <NavRouter />
        </Paper>
      </Box>
    </Box>
  );
}
