# Deployment Guide - Decision Cards Game

Your game is ready to deploy! Follow these steps to get it live on the internet.

## Quick Start (5 minutes)

### Step 1: Push to GitHub

1. Go to [github.com](https://github.com) and log in (create account if needed)
2. Click "+" → "New repository"
3. Name it: `decision-cards-game`
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"
6. Copy the commands from "push an existing repository" section
7. In your terminal (in the decision-cards-game folder), run those commands

Example:
```bash
git remote add origin https://github.com/YOUR-USERNAME/decision-cards-game.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (it's free)
3. Click "New +" → "Web Service"
4. Select your `decision-cards-game` repository
5. Fill in the form:
   - **Name**: `decision-cards-game` (or anything you want)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
6. Click "Advanced" and add Environment Variable:
   - **Key**: `GAME_PASSWORD`
   - **Value**: Choose a secure password (e.g., something only you know to give at game end)
7. Click "Create Web Service"

**Wait 2-3 minutes for deployment.** You'll see a URL like:
```
https://decision-cards-game-xxxx.onrender.com
```

That's your live game! 🎉

## Customizing Your Game

### Change the Password

In Render dashboard → Environment → Edit `GAME_PASSWORD`

### Update Card Content

To add real content to your cards:

1. Edit `app.js` in GitHub:
   - Find the `staffCards` array (around line 20) - update card titles
   - Find the `stakeholderCards` array (around line 30) - update card titles

2. Edit the template files:
   - `views/staff-results.ejs` - add results for staff cards
   - `views/stakeholder-results.ejs` - add results for stakeholder cards
   - `views/staff-card.ejs` and `views/stakeholder-card.ejs` - add card details

3. Commit and push changes to GitHub - **Render will auto-deploy your changes!**

### Change Styling

Edit the `<style>` blocks in the template files to customize colors, fonts, layouts.

## How Your Game Works

**During the Game:**
- Users navigate through cards and read decision scenarios
- They cannot see results (locked behind password)

**After the Game:**
- You give them the password (set in environment variables)
- They enter it once on the login page
- All 16 results pages unlock
- They can view results for all their decisions

## Testing Before Going Live

1. Visit your Render URL: `https://your-app-name.onrender.com`
2. Try navigating through staff and stakeholder cards
3. Click "View Results" - should redirect to login
4. Use the password you set in environment variables
5. Verify results pages load correctly

## Troubleshooting

**"App not loading"**
- Check Render logs (click app → Logs tab)
- Ensure all files are pushed to GitHub

**"Password not working"**
- Check the GAME_PASSWORD environment variable in Render
- Make sure you entered it correctly

**"Changes aren't showing"**
- Render auto-deploys on push, wait 1-2 minutes
- Force refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

## Support

The app is built with:
- **Express.js** - Web framework
- **EJS** - Template engine
- **express-session** - Session management

All code is in the GitHub repository for easy maintenance and updates.

---

**You're all set!** Share the Render URL with your participants. They can access it from any device with a browser.
