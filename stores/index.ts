import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import { userStore } from './userStore';
import { workspaceStore } from './workspaceStore';
import { ticketStore } from './ticketStore';
import { settingStore } from './settingStore';
import { messageStore } from './messageStore';
import { contactStore } from './contactStore';
import { appStore } from './appStore';
import { teamcampStore } from './teamcampStore';

// Combine all stores in one object
const stores = {
  userStore,
  workspaceStore,
  ticketStore,
  settingStore,
  messageStore,
  contactStore,
  teamcampStore,
  appStore,
};
export default stores;

// We need to define here useStore that we can use as a hook in page or components
export const useStores = () => {
  return useContext(MobXProviderContext) as {
    userStore: typeof userStore;
    workspaceStore: typeof workspaceStore;
    ticketStore: typeof ticketStore;
    settingStore: typeof settingStore;
    messageStore: typeof messageStore;
    contactStore: typeof contactStore;
    teamcampStore: typeof teamcampStore;
    appStore: typeof appStore;
  };
};
