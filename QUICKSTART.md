# Quick Start Guide - Decision Cards Game

## What You Have

A fully functional **35-page leadership simulation game** with:
- ✅ 1 Home page
- ✅ 2 Card directory pages (Staff & Stakeholder)
- ✅ 16 Decision card pages (12 staff + 4 stakeholder)
- ✅ 16 Password-protected Results pages
- ✅ Single password authentication (enter once, access all results)
- ✅ Responsive design (works on mobile, tablet, desktop)
- ✅ Placeholder content ready for you to customize

## Get It Running (Choose One)

### Option A: Deploy to Render (Easiest - Recommended)
See **DEPLOYMENT.md** for step-by-step instructions. You'll have a live URL in 5 minutes.

### Option B: Run Locally
```bash
cd decision-cards-game
npm install
npm start
```
Then open `http://localhost:3000` in your browser.

## Game Flow

### For Participants (During Game)
1. Open the home page
2. Click "Decision Cards for Reports" or "Decision Cards for Stakeholders"
3. Browse through all available cards (numbered 1-12 or 1-4)
4. Read each card's details
5. Try clicking "View Results" - they'll be locked 🔒

### For You (After Game)
1. Give participants the password you set (via email or verbally)
2. They go to the home page and click "Sign In for Results"
3. They enter the password once
4. All 16 results pages unlock 🔓
5. They can freely browse all results

## Customizing Content

### Update Card Details
Edit `app.js`:
```javascript
// Around line 19 - Staff Cards
const staffCards = [
  { id: 1, title: 'Your custom title here' },
  // ...
];

// Around line 32 - Stakeholder Cards
const stakeholderCards = [
  { id: 1, title: 'Your custom title here' },
  // ...
];
```

### Add Results Content
Edit `views/staff-results.ejs` and `views/stakeholder-results.ejs`

Find the sections like:
```html
<div class="section">
  <h2>📊 What Happened?</h2>
  <p>This is placeholder text for the results section...</p>
</div>
```

Replace with your actual results, feedback, coaching questions, etc.

### Customize Styling
Edit the `<style>` block in any template file. Key colors:
- Primary: `#667eea` (purple)
- Secondary: `#764ba2` (darker purple)
- Success: `#2ecc71` (green)

## File Structure

```
decision-cards-game/
├── app.js                    # Main app (routes & logic)
├── package.json              # Dependencies
├── Procfile                  # Render deployment config
├── views/                    # HTML templates
│   ├── home.ejs             # Home page
│   ├── login.ejs            # Login/password page
│   ├── staff-directory.ejs  # Staff cards list
│   ├── staff-card.ejs       # Individual staff card
│   ├── staff-results.ejs    # Staff results (protected)
│   ├── stakeholder-directory.ejs
│   ├── stakeholder-card.ejs
│   └── stakeholder-results.ejs
├── README.md                 # Full documentation
├── DEPLOYMENT.md             # Deployment steps
└── QUICKSTART.md             # This file
```

## What Each Page Does

| Page | URL | Access | Purpose |
|------|-----|--------|---------|
| Home | `/` | Public | Start page with navigation |
| Login | `/login` | Public | Password entry |
| Staff Directory | `/staff-cards` | Public | List all 12 staff cards |
| Staff Card | `/staff-cards/:id` | Public | Individual card details |
| Staff Results | `/staff-cards/:id/results` | Protected | Results (needs password) |
| Stakeholder Directory | `/stakeholder-cards` | Public | List all 4 stakeholder cards |
| Stakeholder Card | `/stakeholder-cards/:id` | Public | Individual card details |
| Stakeholder Results | `/stakeholder-cards/:id/results` | Protected | Results (needs password) |

## Default Password
When you first run it: `admin123`

Change it immediately! When you deploy to Render, you'll set your own password in the environment variables.

## Testing Checklist

Before sharing with participants:
- [ ] All pages load (click through home, staff, stakeholder, individual cards)
- [ ] Results show "locked" without password
- [ ] Login page appears when clicking results without auth
- [ ] Password works (enter `admin123` or your custom password)
- [ ] After login, results pages load
- [ ] Navigation between pages works
- [ ] Responsive design on mobile browser

## Need Help?

1. Check **DEPLOYMENT.md** for deployment issues
2. Check **README.md** for technical details
3. View `app.js` comments for code explanations
4. All templates use standard HTML/EJS - easy to customize

## Next Steps

1. **Customize content**: Add your actual card titles and results
2. **Deploy**: Follow DEPLOYMENT.md to get a live URL
3. **Share**: Give participants the URL
4. **Facilitate**: Give them the password at game end

---

**You're ready to go!** This infrastructure is flexible - you can update content, change colors, add new cards, or modify the flow anytime. Just edit files, commit to GitHub, and Render auto-deploys.
