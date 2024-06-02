const url =
  "https://marine-api.open-meteo.com/v1/marine?latitude=54.544&longitude=10.227&hourly=wave_height,wave_direction,wave_period";

export const fetchCurrentConditions = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
