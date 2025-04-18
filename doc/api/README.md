# API Documentation

This document provides comprehensive documentation for all API endpoints in the Connect Support System.

## Base URL

```
https://api.connect-support.com/v1
```

## Authentication

All API requests must include an authentication token in the header:

```http
Authorization: Bearer <token>
```

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      // Additional error details
    }
  }
}
```

## Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## API Endpoints

### Authentication

- [Login](./auth/login.md)
- [Logout](./auth/logout.md)
- [Refresh Token](./auth/refresh-token.md)
- [Password Reset](./auth/password-reset.md)

### Users

- [Get User Profile](./users/get-profile.md)
- [Update User Profile](./users/update-profile.md)
- [List Users](./users/list-users.md)
- [Create User](./users/create-user.md)
- [Get User By Id](./users/get-user-by-id.md)
- [Get Ticket By User](./users/get-ticket-by-user.md)

### Workspaces

- [List Workspaces](./workspaces/list-workspaces.md)
- [Create Workspace](./workspaces/create-workspace.md)
- [Update Workspace](./workspaces/update-workspace.md)
- [Delete Workspace](./workspaces/delete-workspace.md)
- [Get Workspace](./workspaces/get-workspace.md)

### Tickets

- [Create Ticket](./tickets/create-ticket.md)
- [Get Ticket](./tickets/get-ticket.md)
- [Update Ticket](./tickets/update-ticket.md)
- [List Tickets](./tickets/list-tickets.md)
- [Assign Ticket](./tickets/assign-ticket.md)
- [Close Ticket](./tickets/close-ticket.md)

### Comments

- [Add Comment](./comments/add-comment.md)
- [List Comments](./comments/list-comments.md)
- [Update Comment](./comments/update-comment.md)
- [Delete Comment](./comments/delete-comment.md)

### Attachments

- [Upload Attachment](./attachments/upload-attachment.md)
- [Get Attachment](./attachments/get-attachment.md)
- [Delete Attachment](./attachments/delete-attachment.md)

### Notifications

- [List Notifications](./notifications/list-notifications.md)
- [Mark as Read](./notifications/mark-as-read.md)
- [Notification Settings](./notifications/settings.md)

## Webhooks

The system supports the following webhook events:

- `ticket.created`
- `ticket.updated`
- `ticket.closed`
- `comment.added`
- `user.created`
- `user.updated`

## SDKs

Official SDKs are available for:

- [JavaScript/TypeScript](./sdk/javascript.md)
- [Python](./sdk/python.md)
- [Ruby](./sdk/ruby.md)

## Examples

### JavaScript/TypeScript

```typescript
import { ConnectClient } from '@connect/sdk';

const client = new ConnectClient({
  apiKey: 'your-api-key',
  workspaceId: 'your-workspace-id',
});

// Create a ticket
const ticket = await client.tickets.create({
  subject: 'Help needed',
  description: 'I need assistance with...',
  priority: 'high',
});
```

### Python

```python
from connect import ConnectClient

client = ConnectClient(
    api_key='your-api-key',
    workspace_id='your-workspace-id'
)

# Create a ticket
ticket = client.tickets.create(
    subject='Help needed',
    description='I need assistance with...',
    priority='high'
)
```

## Support

For API support, please contact:

- Email: api-support@connect-support.com
- Documentation: https://docs.connect-support.com
- Status Page: https://status.connect-support.com
