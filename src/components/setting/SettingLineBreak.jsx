import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function SettingLineBreak({ section }) {
  return (
    <>
      {section && (
        <Typography variant="h7" padding={"0 16px"} fontWeight={"500"}>
          {section}
        </Typography>
      )}
      <Box sx={{ width: "100%", border: "1px solid #C2C9BD" }}></Box>
    </>
  );
}

export default SettingLineBreak;
