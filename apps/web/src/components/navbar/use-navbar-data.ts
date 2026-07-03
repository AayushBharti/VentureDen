import useSWR from "swr";

import type { NavigationData } from "@/types";

const fetcher = async (url: string): Promise<NavigationData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch navigation data");
  }
  return response.json();
};

/**
 * Navbar + settings data hook.
 *
 * Nav links and site settings are server-rendered into `initial` and change
 * very rarely, so there's no client polling — that would fire an Edge Request +
 * dynamic function invocation per interval, per open tab, for near-static data.
 * The data refreshes on the next full navigation/load instead.
 */
export function useNavbarData(initial: NavigationData) {
  const { data, error } = useSWR<NavigationData>("/api/navigation", fetcher, {
    fallbackData: initial,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  return { data: data || initial, error };
}
