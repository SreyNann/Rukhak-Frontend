import MoreVert from "@mui/icons-material/MoreVert";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { createContext, useState } from "react";
import  IconButton from "@mui/material/IconButton";

export const SidebarContext = createContext();

function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside>
      <nav className="navbar">
        <div className="header">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`logo ${expanded ? "expanded" : "collapsed"}`}
            alt=""
          />
          <IconButton
            sx={{
              backgroundColor: "#f5f5f5",
              "&:hover, &.Mui-focusVisible": { backgroundColor: "#eeeeee" },
            }}
            onClick={() => setExpanded((curr) => !curr)}
          >
            {expanded ? <ChevronLeft variant="contained" /> : <ChevronRight />}
          </IconButton>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="sidebar-items">{children}</ul>
        </SidebarContext.Provider>

        <div className="account">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="profile"
          />
          <div className={`information ${expanded ? "expanded" : "collapsed"}`}>
            <div className="user">
              <h4>John Doe</h4>
              <span>johndoe@gmail.com</span>
            </div>
            <MoreVert />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
