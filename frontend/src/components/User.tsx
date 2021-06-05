import { useMeQuery } from "../generated/graphql";

export function useUser() {
  const { data } = useMeQuery();
  return data?.me;
}
