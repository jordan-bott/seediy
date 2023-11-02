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
    getWeatherByTime: builder.query({
      query: ({ unix_time, token }) => ({
        url: `/api/weather/${unix_time}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetWeatherQuery, useGetWeatherByTimeQuery } = weatherApiSlice;
