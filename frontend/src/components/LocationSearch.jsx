import PropType from "prop-types";
import { useRef } from "react";
import { useTheme, InputBase } from "@mui/material";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setLocation } from "../redux/locationSlice";
// import { setGame } from "redux/gameSlice";

const LocationSearch = () => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  const { palette } = useTheme();

  const handlePlacesChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
      dispatch(
        setLocation({
          name: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
      })
      );
    }
  };
  
  

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
      libraries={["places"]}
    >
      <StandaloneSearchBox
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <InputBase
          type="text"
          className="form-control"
          placeholder="Game Location..."
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "0.5rem 1rem",
          }}
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

LocationSearch.propTypes = {
  gameLocation: PropType.string,
  setGameLocation: PropType.func,
  setGameText: PropType.func,
};

export default LocationSearch;