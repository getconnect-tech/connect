# Authentication

This document outlines the authentication system used in the Connect Support System, including authentication flows, security measures, and integration details.

## Overview

The system uses NextAuth.js for authentication, providing a secure and flexible authentication solution with support for email/OTP and OAuth providers.

## Authentication Methods

### 1. Email/OTP

```typescript
// Step 1: Request OTP
POST /api/auth/otp/request
{
  "email": "user@example.com"
}

// Step 2: Verify OTP
POST /api/auth/callback/credentials
{
  "email": "user@example.com",
  "otp": "123456",
  "redirect": false
}
```

### 2. OAuth Providers

- Google
- GitHub
- Microsoft
- Custom OAuth providers

## Authentication Flow

### 1. Initial Authentication

1. **User Initiation**

   - User visits login page
   - Selects authentication method (Email/OTP or OAuth)

2. **Email/OTP Flow**

   ```
   // Step 1: OTP Request
   Client -> Server: POST /api/auth/otp/request
   Server -> Email Service: Send OTP
   Server -> Client: OTP sent confirmation

   // Step 2: OTP Verification
   Client -> Server: POST /api/auth/callback/credentials
   Server -> Database: Verify OTP
   Server -> Client: Set session cookie
   ```

3. **OAuth Flow**
   ```
   Client -> Server: GET /api/auth/signin/{provider}
   Server -> Provider: Redirect to OAuth provider
   Provider -> Server: Callback with auth code
   Server -> Provider: Exchange code for tokens
   Server -> Database: Create/Update user
   Server -> Client: Set session cookie
   ```

### 2. Session Management

1. **Session Creation**

   - JWT token generation
   - Secure HTTP-only cookie set
   - Session data stored in database

2. **Session Validation**

   ```
   Client -> Server: Request with session cookie
   Server -> Database: Validate session
   Server -> Client: Response with user data
   ```

3. **Session Refresh**
   - Automatic token refresh
   - Silent re-authentication
   - Session extension

### 3. Workspace Selection

1. **Post-Authentication**

   - User redirected to workspace selection
   - List of available workspaces displayed

2. **Workspace Context**
   - Selected workspace stored in session
   - Workspace-specific permissions applied
   - UI adapted to workspace settings

## Security Measures

### OTP Security

- 6-digit numeric OTP
- 5-minute expiry
- Rate limiting per email
- Maximum 3 attempts per OTP
- IP-based rate limiting
- OTP blacklisting after use

### Token Security

- JWT signing with RSA-256
- Access token: 1 hour expiry
- Refresh token: 30 days expiry
- Secure HTTP-only cookies
- CSRF protection with double-submit cookie
- Token blacklisting for logout

## API Authentication

### Bearer Token

```http
Authorization: Bearer <token>
```

### API Key (for service-to-service)

```http
X-API-Key: <api-key>
```

## Role-Based Access Control (RBAC)

### System Roles

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

### Workspace Roles

1. **Owner**

   - Full workspace control
   - User management
   - Settings management
   - Billing management

2. **Admin**

   - Manage tickets
   - Manage users
   - Configure settings
   - View analytics

3. **Member**

   - Create and manage tickets
   - Comment on tickets
   - View workspace data

4. **Viewer**
   - View tickets
   - Read-only access
   - Limited data visibility

## OTP Flow Details

### OTP Generation

- Random 6-digit number
- Stored with timestamp and email
- Hashed for security
- One-time use only

### OTP Delivery

- Sent via email
- Clear expiration time
- Rate limited per email/IP
- Delivery confirmation

### OTP Validation

- Check expiration
- Verify email match
- Check attempt count
- Validate format
- One-time use enforcement

## Session Management

### Active Sessions

- View all active sessions
- Session details (IP, location, device)
- Revoke specific sessions
- Logout from all devices
- Session activity logging

### Session Timeout

- Inactivity timeout: 30 minutes
- Maximum session duration: 24 hours
- Automatic refresh token rotation
- Grace period for session extension

## Security Headers

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Error Handling

### Authentication Errors

```json
{
  "error": {
    "code": "AUTH_ERROR",
    "message": "Invalid OTP",
    "details": {
      "field": "otp",
      "reason": "expired",
      "attempts": 2,
      "lockout": false
    }
  }
}
```

### Rate Limiting

- OTP requests: 3 per 15 minutes per email
- OTP attempts: 3 per OTP
- OAuth attempts: 5 per 15 minutes
- API requests: 100 per minute
- IP-based rate limiting

## Integration Guide

### Next.js Setup

```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

export default NextAuth(authOptions);

// lib/auth.ts
export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // OTP verification logic
        const { email, otp } = credentials;
        // Verify OTP and return user
      },
    }),
    GoogleProvider({
      // Google OAuth config
    }),
    // Other providers
  ],
  callbacks: {
    async jwt({ token, user }) {
      // JWT handling
    },
    async session({ session, token }) {
      // Session handling
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

### Client-Side Usage

```typescript
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        Welcome {session.user.name}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
```

## Best Practices

1. Always use HTTPS
2. Implement comprehensive rate limiting
3. Use secure session storage
4. Regularly rotate secrets and keys
5. Monitor authentication attempts
6. Implement proper error handling
7. Use secure OTP generation
8. Enable OTP expiry
9. Conduct regular security audits
10. Keep dependencies updated
11. Log all authentication events
12. Implement IP-based security measures
13. Use secure cookie settings
14. Validate all user input
15. Implement proper session cleanup
