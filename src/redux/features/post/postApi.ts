import { baseApi } from "src/redux/createdApi/baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPost: builder.query({
            query: () => {
                return {
                  url: "/posts",
                  method: "GET",
                };
            }
        }),

        getPostDetails: builder.query({
            query: (id) => {

                return {
                  url: `/posts/${id}`,
                  method: "GET",
                };

            }
        }),
    })
})

export const { useGetAllPostQuery,useGetPostDetailsQuery } = authApi