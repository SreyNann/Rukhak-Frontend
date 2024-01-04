import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import useAuth from "@/hooks/auth/useAuth";

const mapBoxToken = import.meta.env.VITE_MAPBOX_TOKEN;

function SearchLocation() {
  const { setLonLat } = useAuth();
  const control = new MapboxGeocoder({
    accessToken: mapBoxToken,
    marker: false,
  });
  useControl(() => control);
  control.on("result", (e) => {
    const coords = e.result?.geometry.coordinates;
    setLonLat([coords[0], coords[1]]);
  });
  return null;
}

export default SearchLocation;
