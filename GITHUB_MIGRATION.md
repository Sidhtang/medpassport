# GitHub Repository Migration Guide

## Steps to Add the Medical Analyzer Code to Your GitHub Repository

1. **Clone your repository**

   ```
   git clone https://github.com/Sidhtang/medpassport.git
   cd medpassport
   ```

2. **Copy all files from the medical-analyzer project**

   Copy all files and folders from the current medical-analyzer project to your cloned repository.

3. **Initialize Git (if not already initialized)**

   ```
   git init
   ```

4. **Add all files to Git**

   ```
   git add .
   ```

5. **Commit changes**

   ```
   git commit -m "Add Medical Analyzer application with Gemini AI integration"
   ```

6. **Push to GitHub**

   ```
   git push origin main
   ```
   
   (If your main branch is called "master" instead, use `git push origin master`)

7. **Configure Vercel Deployment**

   After pushing to GitHub, you can connect your repository to Vercel for deployment:
   
   - Go to [Vercel](https://vercel.com) and sign in
   - Click "New Project" and import your GitHub repository
   - Configure the environment variables:
     - `NEXT_PUBLIC_GEMINI_API_KEY`
   - Deploy the project

## Important Files to Transfer

Make sure to transfer all these files and directories:

- `/components` - React components
- `/lib` - TypeScript types and API utilities
- `/pages` - Next.js pages and API routes
- `/public` - Static assets
- `/styles` - Global styles
- `/utils` - AI and file processing utilities
- `package.json` - Dependencies
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `.env.local` - Environment variables (create this on your local machine, don't commit to GitHub)

## Troubleshooting

If you encounter any issues with the push, make sure:

1. You have write access to the repository
2. The repository is not protected from force pushes
3. You have properly configured your Git credentials
