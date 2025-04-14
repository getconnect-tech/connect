# Contact Module Documentation

## Overview

The contact module provides a comprehensive view of individual contacts and their associated tickets within the workspace. It implements a split-view layout with contact details on the left and ticket management on the right, following the same pattern as the inbox module for consistency.

## Key Features

- **Contact Details Display**: Shows contact information including name, email, phone, address, and custom traits
- **Workspace Context**: Displays current workspace information for context
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
    // Workspace information
  </LeftPanel>
  <RightPanel>
    // Ticket management tabs (Open/Snoozed/Done)
    // Ticket list with InboxCard components
  </RightPanel>
</SplitViewContainer>
```

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
- Maintains consistent header handling for workspace context

## Quick Summary

The contact module provides a unified interface for managing contact information and their associated tickets, implementing the same ticket management patterns as the inbox module for a consistent user experience. It handles contact details display, ticket filtering, and workspace context while maintaining proper API integration and error handling.
