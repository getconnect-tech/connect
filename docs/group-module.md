# Group Module Documentation

## Overview

The Group module provides functionality to manage and display groups of contacts. It includes features for viewing group details, managing contacts within groups, and tracking tickets associated with the group.

## Components

### GroupDetailComponent

Located at `app/group/[groupId]/groupDetail.tsx`

#### Features

- Displays group information including name and label
- Shows group statistics (total contacts, open tickets, closed tickets)
- Lists all contacts belonging to the group
- Displays tickets filtered by status (Open, Snoozed, Done)

### Workspace Initialization

The group detail page implements a robust workspace initialization process:

1. **Loading State**:

   - Shows loading spinner during workspace initialization
   - Prevents "workspace_id required" errors during page loads
   - Handles both direct URL access and navigation from other pages

2. **Initialization Flow**:

   ```typescript
   // Initialization sequence
   const initializeWorkspace = async () => {
     // 1. Get workspace ID from preferences
     const workspaceId =
       await UserPreferenceSingleton.getInstance().getCurrentWorkspace();

     // 2. Load workspace data
     await getWorkspaceById(workspaceId);

     // 3. Initialize group details component
     setIsInitialized(true);
   };
   ```

#### Props

```typescript
interface GroupDetailProps {
  groupId: string;
}
```

#### Usage

```typescript
<GroupDetailComponent groupId="group-123" />
```

### Group Page

Located at `app/group/[groupId]/page.tsx`

Serves as the container for the GroupDetailComponent and provides MobX store integration.

## Store

### GroupStore

Located at `stores/groupStore.ts`

#### State

- `groupDetails`: Current group's details and associated data
- `loading`: Loading state for group operations
- `error`: Error state for failed operations

#### Methods

- `loadGroupDetails(groupId: string)`: Fetches group details, contacts, and tickets
- `clearGroupDetails()`: Resets the group store state

## API Routes

### Group Details API

Located at `app/api/groups/[groupId]/route.ts`

#### Endpoints

- `GET /api/groups/[groupId]`
  - Returns group details, contacts, and associated tickets
  - Response includes:
    - Group information (name, label, custom traits)
    - List of contacts in the group
    - Tickets associated with the group

## Styling

### Styled Components

Located at `app/group/[groupId]/style.tsx`

Key components:

- `Main`: Main container layout
- `SplitViewContainer`: Split view for group details and tickets
- `LeftPanel`: Contains group information and contacts list
- `RightPanel`: Displays tickets
- `GroupStats`: Statistics display section
- `ContactsList`: Styled list for group contacts

## Integration

### Store Integration

The group module is integrated with the main application through:

- Store registration in `stores/index.ts`
- MobX Provider wrapper in the group page component

### Contact Integration

- Uses `ContactCard` component to display contacts
- Customized to hide ticket counts in group context
- Maintains consistent styling with contact module

## Usage Guidelines

1. **Viewing Group Details**

   - Navigate to `/group/[groupId]`
   - View group information, stats, and contacts
   - Filter tickets by status using tabs

2. **Managing Contacts**

   - Contacts are displayed with their basic information
   - Click on a contact to navigate to their detail view

3. **Ticket Management**
   - Use tabs to filter between Open, Snoozed, and Done tickets
   - Each ticket shows its status, assignee, and last update

## Best Practices

1. **Performance**

   - Use `observer` wrapper for components that depend on store data
   - Implement proper cleanup in useEffect hooks
   - Optimize ticket filtering operations

2. **State Management**

   - Use MobX store for global state
   - Keep local UI state within components
   - Clear store state when unmounting

3. **Error Handling**
   - Display appropriate error states
   - Provide clear error messages to users
   - Implement proper error boundaries

## Future Improvements

1. **Planned Features**

   - Group editing capabilities
   - Bulk contact management
   - Advanced ticket filtering
   - Group analytics dashboard

2. **Technical Debt**
   - Implement proper pagination for contacts and tickets
   - Add caching for frequently accessed data
   - Improve error handling and recovery
