"use client";
import useSWR from "swr";
import { fetcherWithToken } from "./api";

export const useMyProfile = () => {
  const { data, error, mutate } = useSWR("/auth/profile", fetcherWithToken);
  return {
    profileData: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};
