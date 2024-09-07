import { useSWRConfig } from "swr";

export function useRefresh() {
  const { mutate } = useSWRConfig();

  const refresh = (key: string | Array<any>) => {
    return mutate(key);
  };

  return refresh;
}

// ***Alternatively, if you want to use it without a hook:

// export const refreshSWR = (key: string | Array<any>) => {
//     const { mutate } = useSWRConfig()
//     return mutate(key)
//   }
