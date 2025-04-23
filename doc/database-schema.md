# Database Schema

This document outlines the database schema for the Connect Support System, including all tables, relationships, and important fields.

## Overview

The system uses PostgreSQL as the primary database, managed through Prisma ORM. The schema is designed to support multi-tenancy, user management, ticket tracking, and various other features.

## Core Tables

### Users

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastLoginAt   DateTime?
  isActive      Boolean   @default(true)

  // Relations
  workspaces    WorkspaceUser[]
  tickets       Ticket[]  @relation("AssignedTickets")
  createdTickets Ticket[] @relation("CreatedTickets")
  comments      Comment[]
  notifications Notification[]
  otpTokens     OTPToken[]
}
```

### OTPTokens

```prisma
model OTPToken {
  id          String    @id @default(cuid())
  email       String
  token       String
  expiresAt   DateTime
  attempts    Int       @default(0)
  isUsed      Boolean   @default(false)
  createdAt   DateTime  @default(now())

  // Relations
  user        User?     @relation(fields: [email], references: [email])

  @@index([email, token])
  @@index([expiresAt])
}
```

### Workspaces

```prisma
model Workspace {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  isActive    Boolean   @default(true)

  // Relations
  users       WorkspaceUser[]
  tickets     Ticket[]
  settings    WorkspaceSettings?
}
```

### WorkspaceUsers

```prisma
model WorkspaceUser {
  id          String    @id @default(cuid())
  userId      String
  workspaceId String
  role        WorkspaceRole @default(MEMBER)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  user        User      @relation(fields: [userId], references: [id])
  workspace   Workspace @relation(fields: [workspaceId], references: [id])

  @@unique([userId, workspaceId])
}
```

### Tickets

```prisma
model Ticket {
  id            String    @id @default(cuid())
  subject       String
  description   String
  status        TicketStatus @default(OPEN)
  priority      TicketPriority @default(MEDIUM)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  closedAt      DateTime?

  // Relations
  workspaceId   String
  createdById   String
  assignedToId  String?
  workspace     Workspace @relation(fields: [workspaceId], references: [id])
  createdBy     User      @relation("CreatedTickets", fields: [createdById], references: [id])
  assignedTo    User?     @relation("AssignedTickets", fields: [assignedToId], references: [id])
  comments      Comment[]
  attachments   Attachment[]
  tags          TicketTag[]
}
```

### Comments

```prisma
model Comment {
  id          String    @id @default(cuid())
  content     String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  ticketId    String
  userId      String
  ticket      Ticket    @relation(fields: [ticketId], references: [id])
  user        User      @relation(fields: [userId], references: [id])
  attachments Attachment[]
}
```

### Attachments

```prisma
model Attachment {
  id          String    @id @default(cuid())
  name        String
  url         String
  type        String
  size        Int
  createdAt   DateTime  @default(now())

  // Relations
  ticketId    String?
  commentId   String?
  ticket      Ticket?   @relation(fields: [ticketId], references: [id])
  comment     Comment?  @relation(fields: [commentId], references: [id])
}
```

### Notifications

```prisma
model Notification {
  id          String    @id @default(cuid())
  type        NotificationType
  content     String
  isRead      Boolean   @default(false)
  createdAt   DateTime  @default(now())

  // Relations
  userId      String
  user        User      @relation(fields: [userId], references: [id])
}
```

## Enums

### Role

```prisma
enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}
```

### WorkspaceRole

```prisma
enum WorkspaceRole {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}
```

### TicketStatus

```prisma
enum TicketStatus {
  OPEN
  IN_PROGRESS
  WAITING
  CLOSED
  RESOLVED
}
```

### TicketPriority

```prisma
enum TicketPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

### NotificationType

```prisma
enum NotificationType {
  TICKET_CREATED
  TICKET_UPDATED
  TICKET_ASSIGNED
  COMMENT_ADDED
  MENTION
  OTP_SENT
}
```

## Indexes

### User Indexes

- `email` (unique)
- `isActive`

### OTPToken Indexes

- `email, token` (composite)
- `expiresAt`
- `isUsed`

### Workspace Indexes

- `slug` (unique)
- `isActive`

### Ticket Indexes

- `workspaceId`
- `status`
- `priority`
- `createdAt`
- `assignedToId`

### Comment Indexes

- `ticketId`
- `createdAt`

### Notification Indexes

- `userId`
- `isRead`
- `createdAt`

## Relationships

### User-OTPToken (One-to-Many)

- Users can have multiple OTP tokens
- OTP tokens belong to one user
- Tokens are tracked by email

### User-Workspace (Many-to-Many)

- Users can belong to multiple workspaces
- Workspaces can have multiple users
- Junction table: `WorkspaceUser`

### User-Ticket (One-to-Many)

- Users can create multiple tickets
- Users can be assigned multiple tickets
- Tickets belong to one creator and can be assigned to one user

### Ticket-Comment (One-to-Many)

- Tickets can have multiple comments
- Comments belong to one ticket

### Ticket-Attachment (One-to-Many)

- Tickets can have multiple attachments
- Attachments belong to one ticket or comment

## Data Validation

### User

- Email must be valid format
- Name must be between 2-100 characters

### OTPToken

- Token must be 6 digits
- Must have expiration time
- Maximum 3 attempts
- One-time use only

### Workspace

- Name must be between 2-100 characters
- Slug must be URL-safe and unique

### Ticket

- Subject must be between 2-200 characters
- Description must not be empty
- Priority must be one of the defined values
- Status must be one of the defined values

### Comment

- Content must not be empty
- Must be associated with a valid ticket and user

## Data Retention

- User accounts: Indefinite (can be deactivated)
- Workspaces: Indefinite (can be archived)
- OTP tokens: 5 minutes after creation
- Tickets: 5 years after closure
- Comments: Same as associated ticket
- Attachments: Same as associated ticket/comment
- Notifications: 90 days

## Backup Strategy

- Daily full backups
- Hourly incremental backups
- 30-day retention for daily backups
- 7-day retention for hourly backups
- Automated backup verification
- Point-in-time recovery capability
