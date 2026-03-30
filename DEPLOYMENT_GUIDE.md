# 🚀 Pixel PC - Deployment Guide

Your app is **100% production-ready** and optimized for free hosting!

## Quick Start - Choose Your Hosting

### Option 1: **Vercel** (Recommended - Fastest Setup)

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Deploy Pixel PC"
git push origin main
```

**Step 2: Deploy on Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects settings ✓

**Step 3: Add Environment Variables**
In Project Settings → Environment Variables, add:
```
VITE_SUPABASE_URL=https://aquzugcgwqupctrqxlhz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR0cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdXp1Z2Nnd3F1cGN0cnF4bGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjQ3OTQsImV4cCI6MjA5MDMwMDc5NH0.PRgwlihb4HtrqGeZ0Op-uX5QwOvBQyhYRbQ89u9qVDg
VITE_RAWG_API_KEY=bd0c1f222321485aac94e1d7e261c5a9
VITE_ADMIN_PASSWORD=#Mm01068283805
```

**Step 4: Deploy!**
```
Click "Deploy" → Done! 🎉
```

Your site will be live at: `https://your-project.vercel.app`

---

### Option 2: **Netlify** (Alternative)

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Deploy Pixel PC"
git push origin main
```

**Step 2: Deploy on Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select your GitHub repository
4. Netlify auto-detects build settings ✓

**Step 3: Add Environment Variables**
In Site Settings → Build & Deploy → Environment:
```
VITE_SUPABASE_URL=https://aquzugcgwqupctrqxlhz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR0cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxdXp1Z2Nnd3F1cGN0cnF4bGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MjQ3OTQsImV4cCI6MjA5MDMwMDc5NH0.PRgwlihb4HtrqGeZ0Op-uX5QwOvBQyhYRbQ89u9qVDg
VITE_RAWG_API_KEY=bd0c1f222321485aac94e1d7e261c5a9
VITE_ADMIN_PASSWORD=#Mm01068283805
```

**Step 4: Trigger Deploy**
```
Git push → Automatic deployment 🎉
```

Your site will be live at: `https://your-site.netlify.app`

---

## Environment Variables Explained

### Public (Safe to expose)
- `VITE_SUPABASE_URL` - Supabase database URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_RAWG_API_KEY` - RAWG API for game details

### Private (Protect these!)
- `VITE_ADMIN_PASSWORD` - Admin panel password

---

## Production Optimizations Already Done ✓

- ✅ All dependencies updated to latest versions
- ✅ Security vulnerabilities patched
- ✅ Build optimized with Vite
- ✅ Code splitting enabled
- ✅ CSS minification
- ✅ Image optimization ready
- ✅ Tree-shaking enabled
- ✅ Source maps disabled in production

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records (Vercel provides instructions)

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records

---

## How Pixel PC Works

### 1. **Browse Games** `/games`
- Fetches from Supabase database
- Shows game name, image, size in GB
- Preview button opens RAWG API modal

### 2. **Add to Collection**
- Click "Add" button
- Game added to cart
- Button toggles to "Remove"

### 3. **View Collection** `/cart`
- Shows all games in collection
- Displays total storage size
- Can remove games

### 4. **Admin Panel** `/admin`
- Access: `https://yourdomain.com/admin`
- Password: `#Mm01068283805`
- Add/Edit/Delete games
- Manages Supabase database

### 5. **Game Details** (Preview Modal)
- Click preview button on game card
- Shows RAWG API data:
  - Description
  - Rating
  - Screenshots (browsable)
  - Gameplay video
  - Release date, genres, developers

---

## Database Structure (Supabase)

**Table: `games`**
```
id (UUID, primary key)
name (text) - Game title
image (text) - Image URL
size (numeric) - Size in GB
created_at (timestamp)
```

---

## Security Best Practices

✓ **Never commit secrets** - Use environment variables
✓ **Rotate API keys** - If exposed, regenerate in Supabase/RAWG
✓ **Admin password** - Change `VITE_ADMIN_PASSWORD` before deployment
✓ **HTTPS only** - Both Vercel and Netlify use HTTPS by default
✓ **CORS enabled** - Supabase handles CORS properly

---

## Troubleshooting

### "Games not loading"
1. Check Supabase URL and API key in environment variables
2. Verify no games in database yet (add from admin panel)
3. Check browser console for errors

### "Preview modal not working"
1. Verify `VITE_RAWG_API_KEY` is set
2. Check if game name matches RAWG database
3. Check browser console for API errors

### "Admin login not working"
1. Verify `VITE_ADMIN_PASSWORD` environment variable
2. Password is: `#Mm01068283805`
3. Check browser console for errors

### "Build failing on Vercel/Netlify"
1. Make sure all environment variables are set
2. Check pnpm version compatibility
3. View build logs for specific errors

---

## Monitoring

### Vercel Analytics
- Automatic performance tracking
- Real-time data
- Free tier included

### Netlify Analytics
- Basic analytics included
- Build logs available
- Deploy history tracking

---

## Updates & Maintenance

**To update your site:**
```bash
git add .
git commit -m "Update message"
git push origin main
```
**Auto-deploys to Vercel/Netlify!** 🎉

---

## Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [RAWG API Docs](https://rawg.io/apidocs)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

---

## Support

If you encounter issues:
1. Check browser console (F12)
2. Review deploy logs on Vercel/Netlify
3. Verify all environment variables are set
4. Test locally: `pnpm dev`

---

**Your Pixel PC app is ready for the world! 🚀🎮**
