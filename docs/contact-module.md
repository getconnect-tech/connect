# Contact Module Documentation

## Overview

The contact module provides a comprehensive view of individual contacts and their associated tickets within the workspace. It implements a split-view layout with contact details on the left and ticket management on the right, following the same pattern as the inbox module for consistency.

## Key Features

- **Contact Details Display**: Shows contact information including name, email, phone, address, and custom traits
- **Group Information**: Displays all groups the contact belongs to, including:
  - Group name and label
  - Number of contacts in each group
  - Open and closed ticket counts per group
- **Ticket Management**:
  - Implements three ticket states: Open, Snoozed, and Done
  - Matches inbox behavior for ticket filtering and display
  - Handles snooze functionality based on `snooze_until` date

## Implementation Details

### Contact Detail Component

```typescript
// Main structure
<SplitViewContainer>
  <LeftPanel>
    // Contact information display
    <ContactInfo>
      // Basic contact details (name, email, phone)
      // Address information
      // Custom traits
      // Group information with statistics
    </ContactInfo>
  </LeftPanel>
  <RightPanel>
    // Ticket management tabs (Open/Snoozed/Done)
    // Ticket list with InboxCard components
  </RightPanel>
</SplitViewContainer>
```

### Workspace Initialization

The contact detail page implements a robust workspace initialization process:

1. **Loading State**:

   - Shows loading spinner during workspace and contact data initialization
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

     // 3. Load contact details
     await getContactDetailById(contactId);
   };
   ```

### Group Information Display

The contact detail view shows all groups a contact belongs to, with each group displaying:

- Group name
- Group label (if available)
- Number of contacts in the group
- Number of open tickets
- Number of closed tickets

### Ticket Filtering Logic

```typescript
// Filtering based on ticket status and snooze date
case 'Open':
  return ticket.status === TicketStatus.OPEN &&
         (isEmpty(ticket?.snooze_until) ||
          new Date(ticket.snooze_until) < currentTime);
case 'Snoozed':
  return ticket.status === TicketStatus.OPEN &&
         ticket.snooze_until &&
         new Date(ticket.snooze_until) > currentTime;
case 'Done':
  return ticket.status === TicketStatus.CLOSED;
```

## API Integration

- Uses workspace-authenticated endpoints for contact and ticket data
- Implements proper error handling and loading states
- Includes group data in contact details API response
- Formats group information with ticket statistics

## Data Structure

The contact detail API returns contact information including:

```typescript
interface Contact {
  // Basic contact information
  id: string;
  name: string;
  email: string;
  // ... other contact fields

  // Group information
  groups: Array<{
    id: string;
    name: string;
    group_label?: string;
    contacts_count: number;
    ticketsCount: {
      OPEN: number;
      CLOSED: number;
    };
  }>;
}
```

## Quick Summary

The contact module provides a unified interface for managing contact information and their associated tickets, implementing the same ticket management patterns as the inbox module for a consistent user experience. It displays comprehensive contact details, group affiliations with statistics, and ticket management capabilities while maintaining proper API integration and error handling. The module includes robust workspace initialization to ensure proper data loading and prevent common errors.
