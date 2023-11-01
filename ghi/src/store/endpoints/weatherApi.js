import { apiSlice } from "../apiSlice";

export const weatherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (token) => ({
        url: "/api/weather",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApiSlice;
