import { apiSlice } from "../apiSlice";

export const plantTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPlantType: builder.mutation({
      query: ({ info, token }) => ({
        url: "/api/planttype",
        method: "post",
        body: info,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "PlantType", id: arg.id },
      ],
    }),
    deletePlantType: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/planttype/${id}`,
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "PlantType", id: arg.id },
      ],
    }),
    plantTypeByUser: builder.query({
      query: ({ id, token }) => ({
        url: `/api/user/${id}/planttype`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result = [], error, arg) => [
        "PlantType",
        ...result.map(({ id }) => ({ type: "PlantType", id })),
      ],
    }),
  }),
});

export const {
  useAddPlantTypeMutation,
  useDeletePlantTypeMutation,
  usePlantTypeByUserQuery,
} = plantTypeApiSlice;
