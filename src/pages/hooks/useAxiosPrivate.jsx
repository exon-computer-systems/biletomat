import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        // console.log("Setting up interceptors");

        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                // console.log("Request intercepted:", config);
                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => {
                console.error("Request error:", error);
                return Promise.reject(error);
            }
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => {
                // console.log("Response intercepted:", response);
                return response;
            },
            async (error) => {
                console.error("Response error:", error);
                const prevRequest = error?.config;
                console.log("second");
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    console.log("Refreshing token...");
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers[
                            "Authorization"
                        ] = `Bearer ${newAccessToken}`;
                        console.log(
                            "Retrying request with new token:",
                            prevRequest
                        );
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        console.error("Token refresh error:", refreshError);
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // console.log("Ejecting interceptors");
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
