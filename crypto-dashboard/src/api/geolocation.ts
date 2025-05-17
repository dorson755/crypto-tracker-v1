import axios from "axios";

export const fetchUserLocation = async () => {
  try {
    const { data } = await axios.get("https://ipapi.co/json/");
    return data;
  } catch (error) {
    console.error("Geolocation error:", error);
    return null;
  }
};