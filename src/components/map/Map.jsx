import ReactMapGl, { Marker, GeolocateControl } from "react-map-gl";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth";
import "mapbox-gl/dist/mapbox-gl.css";

import Box from "@mui/material/Box";
import ButtonFixed from "../user/ButtonFixed";
import SearchLocation from "./SearchLocation";

const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN;
const mapBoxStyle = import.meta.env.VITE_MAPBOX_STYLES;

function Map({ isStoreAddress, isDeliveryAddress }) {
  const { LonLat, setLonLat } = useAuth();
  const navigate = useNavigate();
  const longitude = LonLat[0];
  const latitude = LonLat[1];
  const onMapClick = (event) => {
    setLonLat([event.lngLat.lng, event.lngLat.lat]);
  };

  const handleSaveStoreClick = () => {
    localStorage.setItem("storeLongitude", JSON.stringify(longitude));
    localStorage.setItem("storeLatitude", JSON.stringify(latitude));
    navigate(-1);
  };

  return (
    <>
      <Box height={"100vh"} position="relative">
        <ReactMapGl
          mapboxAccessToken={mapBoxToken}
          initialViewState={{
            longitude: longitude,
            latitude: latitude,
            zoom: 10,
          }}
          mapStyle={mapBoxStyle}
          onClick={onMapClick}
        >
          <Marker latitude={latitude} longitude={longitude} />
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            fitBoundsOptions={{ zoom: 16 }}
            showAccuracyCircle={false}
            showUserHeading
            position="top-left"
            trackUserLocation={true}
            onGeolocate={(e) =>
              setLonLat([e.coords.longitude, e.coords.latitude])
            }
          />
          <SearchLocation />
        </ReactMapGl>
        {isStoreAddress && (
          <ButtonFixed
            text="Save"
            textCancel="cancel"
            onClick={handleSaveStoreClick}
          />
        )}
      </Box>
    </>
  );
}

export default Map;
