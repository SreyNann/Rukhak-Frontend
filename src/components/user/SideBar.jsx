import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";
import Loading from "../admin/product/Loading";

// MUI components
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// MUI icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ForumIcon from "@mui/icons-material/Forum";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import HistoryIcon from "@mui/icons-material/History";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { useLogoutMutation } from "@/features/auth/authApiSlice";

function SideBar() {
  const [logout, { isLoading }] = useLogoutMutation();
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const location = useLocation();
  const persist = localStorage.getItem("persist") === "true" ? true : false;
  const [state, setState] = useState({
    left: false,
  });

  const handleCloseDrawer = (path, anchor) => {
    navigate(path, { state: { from: location }, replace: true });
    setState({ ...state, [anchor]: false });
  };

  const handleLoginLogout = async (anchor) => {
    if (token || persist) {
      handleCloseDrawer("/", anchor);
      await logout().unwrap();
    } else {
      navigate("/auth");
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuItems = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Rukhak bot", icon: <SmartToyIcon />, path: "/rukhakbot" },
    { name: "Your store", icon: <StorefrontIcon />, path: "/yourstore" },
    { name: "Forum", icon: <ForumIcon />, path: "/forum" },
    { name: "Scanning", icon: <CenterFocusStrongIcon />, path: "/scanning" },
    { name: "Order history", icon: <HistoryIcon />, path: "/orderhistory" },
    { name: "Cart", icon: <ShoppingCartIcon />, path: "/cart" },
    { name: "Setting", icon: <SettingsIcon />, path: "/setting" },
    { name: "Help & feedback", icon: <QuestionMarkIcon />, path: "/help" },
  ];

  const list = (anchor) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: anchor === "top" || anchor === "bottom" ? "auto" : 280,
        height: "100%",
        backgroundColor: "background.default",
      }}
      role="presentation"
    >
      {isLoading && <Loading />}
      <Toolbar
        sx={{ display: "flex", p: "0 1rem", justifyContent: "flex-end" }}
      >
        <IconButton onClick={toggleDrawer(anchor, false)}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>

      {/* Display user account */}
      {(token || persist) && (
        <>
          <Divider />
          <ListItem
            disablePadding
            onClick={() => handleCloseDrawer("/useraccount", anchor)}
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2">Username</Typography>
                <Typography variant="caption">username@gmail.com</Typography>
              </Box>
            </ListItemButton>
          </ListItem>

          <Divider />
        </>
      )}
      {/* Map all the menu items */}
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => handleCloseDrawer(item.path, anchor)}
          >
            <ListItemButton sx={{ paddingY: "0.75rem" }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Logout Button */}
      <List sx={{ marginTop: "auto", backgroundColor: "#FCFDF6" }}>
        <Divider />
        <ListItem disablePadding onClick={() => handleLoginLogout(anchor)}>
          <ListItemButton>
            <ListItemIcon>
              {token ? <LogoutIcon /> : <LoginIcon />}
            </ListItemIcon>
            <ListItemText primary={token || persist ? "Logout" : "Login"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <React.Fragment key={"left"}>
      <MenuIcon onClick={toggleDrawer("left", true)} />
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        sx={{ height: "100%" }}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}

export default SideBar;
