# PostgreSQL Database Setup Instructions

This guide explains how to set up the PostgreSQL database connection for the MedPassport application.

## Connection Information

The application is configured to connect to a Neon PostgreSQL database with the following connection string:

```
postgresql://neondb_owner:npg_Bu1AzLbnkfV0@ep-dawn-thunder-a1txd9e9-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

This connection string is stored in the `.env` file at the root of the project.

## Setup Steps

1. **Install required dependencies:**

   ```bash
   npm install --save pg @prisma/client
   npm install --save-dev prisma @types/node
   ```

2. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

3. **Push database schema:**

   ```bash
   npx prisma db push
   ```

4. **View database in browser UI (optional):**

   ```bash
   npx prisma studio
   ```

## Project Structure

- `/prisma/schema.prisma`: Contains the database schema definition
- `/lib/db/prisma.ts`: Exports the Prisma client instance for use throughout the app
- `/lib/db/api.ts`: Contains helper functions for database operations

## Usage Examples

### Storing analysis results in the database

```typescript
import prisma from '@/lib/db/prisma';

// Example: Save analysis result
await prisma.analysisResult.create({
  data: {
    reportType: "Heart Sounds Analysis",
    result: "Analysis result text goes here...",
    userRole: "Doctor",
    additionalInfo: "Additional context information",
    targetLanguage: "English"
  }
});
```

### Retrieving analysis results

```typescript
import prisma from '@/lib/db/prisma';

// Example: Get recent analysis results
const results = await prisma.analysisResult.findMany({
  orderBy: {
    createdAt: 'desc'
  },
  take: 10
});
```

## Error Handling

The application has been configured to gracefully handle database connection errors. If there's an issue connecting to the database, API endpoints will still function using the local cache.
