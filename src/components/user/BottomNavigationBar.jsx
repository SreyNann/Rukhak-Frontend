import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@mui/material/styles/styled";

// MUI components
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// MUI icons
import RestoreIcon from "@mui/icons-material/Restore";
import ForumIcon from "@mui/icons-material/Forum";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";

const StyledBottomNavigationAction = styled(BottomNavigationAction)(() => ({
  padding: "0",
  minWidth: "56px",
}));

function BottomNavigationBar() {
  const [value, setValue] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Set the initial value based on the current route
    const pathname = location.pathname;
    if (pathname === "/forum") {
      setValue("Forum");
    } else if (pathname === "/scanning") {
      setValue("Scan");
    } else if (pathname === "/") {
      setValue("Home");
    } else if (pathname === "/orderhistory") {
      setValue("Order");
    } else if (pathname === "/cart") {
      setValue("Cart");
    } else {
      setValue("");
    }
  }, [location.pathname]);

  const menuItems = [
    { name: "Forum", icon: <ForumIcon />, path: "/forum" },
    { name: "Scan", icon: <CenterFocusStrongIcon />, path: "/scanning" },
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Order", icon: <RestoreIcon />, path: "/orderhistory" },
    { name: "Cart", icon: <ShoppingCartIcon />, path: "/cart" },
  ];

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleChange}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        position: "sticky",
        bottom: 0,
        width: "100%",
        zIndex: 1100,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        mt: "2rem",
      }}
    >
      {menuItems.map((item) => (
        <StyledBottomNavigationAction
          key={item.name}
          value={item.name}
          label={item.name}
          icon={item.icon}
          sx={{ color: "text.primary" }}
          onClick={() => {
            navigate(item.path);
          }}
        />
      ))}
    </BottomNavigation>
  );
}

export default BottomNavigationBar;
