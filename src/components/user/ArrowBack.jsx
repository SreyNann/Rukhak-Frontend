import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import settingTheme from "@/theme/settingTheme";
function ArrowBack(isSettingPage) {
  const navitgate = useNavigate();
  return (
    <ArrowBackIcon
      sx={
        isSettingPage
          ? settingTheme.arrowBack
          : { position: "absolute", top: "2%", left: "2%", cursor: "pointer" }
      }
      onClick={() => navitgate(-1)}
    />
  );
}

export default ArrowBack;
