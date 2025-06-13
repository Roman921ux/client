import instance from "@/shared/model/api/axios-instance";
import { useEffect } from "react";

export default function usePageView() {
  useEffect(() => {
    const fetchCreateView = async () => {
      try {
        const timeNow = new Date();
        const timeNowISOString = timeNow.toISOString();

        const response = await instance.post(`/views?date=${timeNowISOString}`);
        console.log("Response fetchCreateView", response.data);
        return response.data;
      } catch (err) {
        console.error(err);
      }
    };

    fetchCreateView();
  }, []);
}
