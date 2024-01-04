import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import mapImage from "@/assets/mapImage.png";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useNavigate } from "react-router-dom";

function AddLocation() {
  const navigate = useNavigate();
  const storeLongitude = JSON.parse(localStorage.getItem("storeLongitude"));
  const storeLatitude = JSON.parse(localStorage.getItem("storeLatitude"));
  return (
    <Box
      onClick={() => navigate("/map/store-location")}
      sx={{
        height: "auto",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(5, 2, 0.1, 0.1)",
        background: "white",
        overflow: "hidden",
        backgroundColor: "background.paper",
        cursor: "pointer",
      }}
    >
      <Box sx={{ padding: "12px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Store Location</Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: "12px",
              color: "primary.main",
              fontWeight: "500",
              borderRadius: "12px",
            }}
          >
            {storeLongitude && storeLatitude ? (
              <Box component="span">
                Added <CheckCircleRoundedIcon fontSize="12px" />
              </Box>
            ) : (
              <Box component="span">
                Required <sup>*</sup>
              </Box>
            )}
          </Typography>
        </Box>
        <Typography variant="body2">Select your store location:</Typography>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            marginTop: "8px",
            overflow: "hidden", // Hide overflow for the inner box
            borderRadius: "8px",
          }}
        >
          <Box
            component="img"
            src={mapImage}
            alt="map-image"
            sx={{
              objectFit: "cover", // Use cover to fill the container
              width: "100%",
              height: "100px",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default AddLocation;
