import axios from "axios";

export interface LocationData {
  city?: string;
  country?: string;
  currency?: string;
}

export const fetchUserLocation = async (): Promise<LocationData> => {
  try {
    const { data } = await axios.get("https://ipapi.co/json/");
    return {
      city: data.city,
      country: data.country_name,
      currency: data.currency
    };
  } catch (error) {
    console.error("Geolocation error:", error);
    return {};
  }
};