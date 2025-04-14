import { Contact, GroupInfo } from './dataTypes';

export const formatGroups = (
  groups: Contact['groups'],
): GroupInfo[] | undefined => {
  if (!groups) return undefined;
  return groups.map((group) => ({
    ...group,
    group_id: group.group_id || null,
    avatar: group.avatar || null,
    group_label: group.group_label || null,
    contacts_count: group.contacts_count || null,
  }));
};
