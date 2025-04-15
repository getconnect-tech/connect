# Getting Started with Connect Support System

## Quick Start Guide

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Firebase account
- Environment variables setup

### Installation

1. **Clone the Repository**

   ```bash
   git clone [repository-url]
   cd connect
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/connect"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   FIREBASE_API_KEY="your-firebase-key"
   FIREBASE_AUTH_DOMAIN="your-firebase-domain"
   FIREBASE_PROJECT_ID="your-project-id"
   FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   FIREBASE_APP_ID="your-app-id"
   ```

4. **Database Setup**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Project Structure

```
connect/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   └── (routes)/       # Page routes
├── components/         # Reusable components
├── prisma/            # Database schema
├── services/          # Business logic
├── stores/            # MobX stores
└── utils/             # Utility functions
```

### Key Files to Know

- `prisma/schema.prisma` - Database schema
- `app/api/` - API endpoints
- `components/` - UI components
- `stores/` - State management
- `utils/appTypes.tsx` - Type definitions

### Common Tasks

#### 1. Creating a New API Endpoint

```typescript
// app/api/example/route.ts
import { withWorkspaceAuth } from '@/middlewares/withWorkspaceAuth';

export const GET = withWorkspaceAuth(async (req) => {
  try {
    // Your code here
    return Response.json({ data: 'success' });
  } catch (err) {
    return handleApiError(err);
  }
});
```

#### 2. Creating a New Component

```typescript
// components/Example/Example.tsx
import { observer } from 'mobx-react-lite';
import { useStores } from '@/stores';

const Example = () => {
  const { exampleStore } = useStores();

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default observer(Example);
```

#### 3. Adding New Types

```typescript
// utils/appTypes.tsx
export interface NewType {
  id: string;
  name: string;
  // Add more properties
}
```

### Development Tips

1. **State Management**

   - Use MobX stores for global state
   - Use React state for component-specific state
   - Follow the observer pattern

2. **API Development**

   - Always use workspace authentication
   - Validate inputs with Zod
   - Handle errors properly
   - Use proper HTTP status codes

3. **Component Development**

   - Make components reusable
   - Use TypeScript for type safety
   - Follow the single responsibility principle
   - Use proper naming conventions

4. **Database Operations**
   - Use Prisma for database operations
   - Create migrations for schema changes
   - Follow naming conventions
   - Add proper indexes

### Common Commands

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Format code
npm run format

# Lint code
npm run lint
```

### Debugging

1. **API Debugging**

   - Use Postman or similar tools
   - Check network tab in dev tools
   - Look for error responses
   - Check server logs

2. **Component Debugging**

   - Use React DevTools
   - Check component props
   - Monitor state changes
   - Use console.log strategically

3. **Database Debugging**
   - Use Prisma Studio
   - Check query logs
   - Verify migrations
   - Check constraints

### Best Practices

1. **Code Organization**

   - Follow the project structure
   - Keep files focused
   - Use proper naming
   - Document your code

2. **Performance**

   - Optimize images
   - Use proper loading states
   - Implement caching
   - Monitor bundle size

3. **Security**
   - Validate all inputs
   - Use proper authentication
   - Follow security guidelines
   - Keep dependencies updated

### Getting Help

1. **Documentation**

   - Check `doc/system-documentation.md`
   - Read API documentation
   - Review component docs
   - Check type definitions

2. **Support**
   - Check existing issues
   - Create new issues
   - Ask team members
   - Review pull requests

### Next Steps

1. **Explore the Codebase**

   - Review existing components
   - Study API endpoints
   - Understand data flow
   - Check type definitions

2. **Start Developing**

   - Pick a small task
   - Follow the workflow
   - Write tests
   - Get code review

3. **Learn More**
   - Read Next.js docs
   - Study TypeScript
   - Learn MobX
   - Understand Prisma
