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
  }),
});

export const { useAddPlantTypeMutation } = plantTypeApiSlice;
