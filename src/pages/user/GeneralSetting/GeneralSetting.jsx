// MUI component
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// Internal component
import UserDetails from "./UserDetails";

import settingTheme from "@/theme/settingTheme";
import useUser from "@/hooks/user/useUser";

function GeneralSetting() {
  const { isLoading, isError } = useUser();
  if (isLoading) {
    return <CircularProgress color="success" sx={settingTheme.loading} />;
  } else if (isError) {
    return (
      <Alert severity="error">Internal server error! Please try again.</Alert>
    );
  }
  return (
    <>
      <UserDetails />
    </>
  );
}

export default GeneralSetting;
