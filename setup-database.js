// This is a helper script to set up and initialize your database
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file with database connection string...');
  fs.writeFileSync(
    envPath, 
    'DATABASE_URL="postgresql://neondb_owner:npg_Bu1AzLbnkfV0@ep-dawn-thunder-a1txd9e9-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"\n'
  );
} else {
  console.log('.env file already exists, skipping creation');
}

// Instructions for manual setup
console.log('\n===== DATABASE SETUP INSTRUCTIONS =====');
console.log('1. First, install required dependencies:');
console.log('   npm install --save pg @prisma/client');
console.log('   npm install --save-dev prisma @types/node');
console.log('\n2. Then, generate the Prisma client:');
console.log('   npx prisma generate');
console.log('\n3. Push the schema to your database:');
console.log('   npx prisma db push');
console.log('\n4. To view your database in a UI (optional):');
console.log('   npx prisma studio');
console.log('\n=====  END OF INSTRUCTIONS  =====\n');
