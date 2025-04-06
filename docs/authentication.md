# Authentication

This document outlines the authentication system used in the Connect Support System, including authentication flows, security measures, and integration details.

## Overview

The system uses NextAuth.js for authentication, providing a secure and flexible authentication solution with support for multiple providers and custom authentication methods.

## Authentication Methods

### 1. Email/Password

```typescript
// Example login request
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### 2. OAuth Providers

- Google
- GitHub
- Microsoft
- Custom OAuth providers

## Authentication Flow

### Login Flow

1. User submits credentials
2. System validates credentials
3. If valid, creates session
4. Returns JWT token
5. Sets secure HTTP-only cookie

### Session Management

- JWT-based sessions
- Refresh token rotation
- Session timeout: 24 hours
- Refresh token expiry: 30 days

## Security Measures

### Password Security

- BCrypt hashing
- Minimum 8 characters
- Requires special characters
- Password history check
- Account lockout after 5 failed attempts

### Token Security

- JWT signing with RSA
- Short-lived access tokens (1 hour)
- Secure HTTP-only cookies
- CSRF protection
- Token blacklisting

## API Authentication

### Bearer Token

```http
Authorization: Bearer <token>
```

### API Key

```http
X-API-Key: <api-key>
```

## Role-Based Access Control (RBAC)

### User Roles

1. **Super Admin**

   - Full system access
   - User management
   - Workspace management
   - System settings

2. **Admin**

   - Workspace management
   - User management within workspace
   - Settings management

3. **Member**

   - Create and manage tickets
   - Comment on tickets
   - View workspace data

4. **Viewer**
   - View tickets
   - Read-only access

## Workspace Access

### Workspace Roles

1. **Owner**

   - Full workspace control
   - User management
   - Settings management

2. **Admin**

   - Manage tickets
   - Manage users
   - Configure settings

3. **Member**

   - Create and manage tickets
   - Comment on tickets

4. **Viewer**
   - View tickets
   - Read-only access

## Multi-Factor Authentication (MFA)

### Supported Methods

1. **TOTP (Time-based One-Time Password)**

   - Google Authenticator
   - Authy
   - Microsoft Authenticator

2. **SMS**
   - Phone number verification
   - One-time codes

### MFA Setup Flow

1. User enables MFA
2. System generates secret
3. User scans QR code
4. User verifies setup
5. System enables MFA

## Password Reset Flow

1. User requests password reset
2. System sends reset email
3. User clicks reset link
4. User sets new password
5. System invalidates old sessions

## Session Management

### Active Sessions

- View all active sessions
- Revoke specific sessions
- Logout from all devices

### Session Timeout

- Inactivity timeout: 30 minutes
- Maximum session duration: 24 hours
- Automatic refresh token rotation

## Security Headers

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'none'
```

## Error Handling

### Authentication Errors

```json
{
  "error": {
    "code": "AUTH_ERROR",
    "message": "Invalid credentials",
    "details": {
      "field": "password",
      "reason": "incorrect"
    }
  }
}
```

### Rate Limiting

- Login attempts: 5 per 15 minutes
- Password reset: 3 per hour
- API requests: 100 per minute

## Integration Guide

### Next.js Setup

```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

export default NextAuth(authOptions);
```

### Client-Side Usage

```typescript
import { useSession } from 'next-auth/react';

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return <div>Welcome {session.user.name}</div>;
  }

  return <div>Please sign in</div>;
}
```

## Best Practices

1. Always use HTTPS
2. Implement rate limiting
3. Use secure session storage
4. Regularly rotate secrets
5. Monitor authentication attempts
6. Implement proper error handling
7. Use secure password policies
8. Enable MFA where possible
9. Regular security audits
10. Keep dependencies updated
