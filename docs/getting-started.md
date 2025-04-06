# Getting Started

This guide will help you set up and run the Connect Support System locally.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Git
- Email service (for OTP delivery)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-org/connect.git
cd connect
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration values, including:

- Database credentials
- Email service credentials
- OAuth provider credentials
- NextAuth secret

4. Set up the database:

```bash
yarn prisma generate
yarn prisma migrate dev
```

## Development

1. Start the development server:

```bash
yarn dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication Setup

### Email/OTP Configuration

1. Configure email service in `.env`:

```env
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=user@example.com
EMAIL_SERVER_PASSWORD=password
EMAIL_FROM=noreply@example.com
```

2. Configure OTP settings:

```env
OTP_EXPIRY_MINUTES=5
OTP_MAX_ATTEMPTS=3
OTP_RATE_LIMIT=3
```

### OAuth Configuration

1. Set up OAuth providers in `.env`:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## Project Structure

### Key Directories

- `app/` - Next.js app router pages and API routes
- `components/` - Reusable React components
- `prisma/` - Database schema and migrations
- `services/` - Business logic and external services
- `stores/` - MobX state management
- `styles/` - Global styles and themes
- `utils/` - Utility functions

### Configuration Files

- `.env` - Environment variables
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint configuration
- `.prettierrc` - Prettier configuration

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn prisma generate` - Generate Prisma client
- `yarn prisma migrate dev` - Run database migrations

## Common Tasks

### Creating a New Component

1. Create a new file in `components/`:

```typescript
// components/NewComponent.tsx
import React from 'react';

interface NewComponentProps {
  // Props interface
}

export const NewComponent: React.FC<NewComponentProps> = ({}) => {
  return (
    <div>
      {/* Component content */}
    </div>
  );
};
```

### Adding a New API Route

1. Create a new file in `app/api/`:

```typescript
// app/api/new-route/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}
```

### Database Changes

1. Modify the schema in `prisma/schema.prisma`
2. Generate migration:

```bash
yarn prisma migrate dev --name your_migration_name
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**

   - Verify database credentials in `.env`
   - Ensure PostgreSQL is running
   - Check network connectivity

2. **Authentication Issues**

   - Verify email service configuration
   - Check OTP settings
   - Verify OAuth provider credentials
   - Check session configuration

3. **Build Errors**

   - Clear `.next` directory
   - Run `yarn install` again
   - Check TypeScript errors

## Next Steps

- [Architecture Overview](./architecture.md)
- [API Documentation](./api/README.md)
- [Database Schema](./database-schema.md)
- [Authentication Guide](./authentication.md)
