import { useContext } from "react";
import { MobXProviderContext } from "mobx-react";
import { userStore } from "./userStore";
import { workspaceStore } from "./workspaceStore";

// Combine all stores in one object
const stores = {
  userStore,
  workspaceStore,
};
export default stores;

// We need to define here useStore that we can use as a hook in page or components
export const useStores = () => {
  return useContext(MobXProviderContext) as {
    userStore: typeof userStore;
  };
};
