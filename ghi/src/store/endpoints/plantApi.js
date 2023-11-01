import { build } from "vite";
import { apiSlice } from "../apiSlice";

export const plantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPlant: builder.mutation({
      query: ({ info, token }) => ({
        url: "/api/plants",
        method: "post",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Plant", id: arg.id }],
    }),
    updatePlant: builder.mutation({
      query: ({ info, id, token }) => ({
        url: `/api/plants/${id}`,
        method: "put",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Plant", id: arg.id }],
    }),
    deletePlant: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/plants/${id}`,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Plant", id: arg.id }],
    }),
    plantsByUser: builder.query({
      query: ({ id, token }) => ({
        url: `/api/users/${id}/plants`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result = [], error, arg) => [
        "Plant",
        ...result.map(({ id }) => ({ type: "Plant", id })),
      ],
    }),
    plantedPlantsByUser: builder.query({
      query: ({ id, token }) => ({
        url: `/api/users/${id}/plants/planted`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result = [], error, arg) => [
        "Plant",
        ...result.map(({ id }) => ({ type: "Plant", id })),
      ],
    }),
    unplant: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/plants/${id}/unplant`,
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Plant", id: arg.id }],
    }),
  }),
});

export const {
  useAddPlantMutation,
  useUpdatePlantMutation,
  useDeletePlantMutation,
  usePlantsByUserQuery,
  usePlantedPlantsByUserQuery,
  useUnplantMutation,
} = plantApiSlice;
