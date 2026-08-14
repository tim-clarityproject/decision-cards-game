# Leadership Simulation - Decision Cards Game

A web-based interactive simulation game where participants make leadership decisions across staff and stakeholder scenarios, with password-protected results revealed at the end.

## Features

- **35 Interactive Pages**: Home, 2 directories, 16 decision cards, 16 password-protected results pages
- **Single Password Authentication**: Enter password once to unlock all results
- **Staff Cards**: 12 decision scenarios
- **Stakeholder Cards**: 4 decision scenarios
- **Session Management**: Persistent authentication during game session
- **Responsive Design**: Works on desktop, tablet, and mobile

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run locally:
```bash
npm start
```

The app will start on `http://localhost:3000`

## Environment Variables

- `PORT`: Port to run the server (default: 3000)
- `GAME_PASSWORD`: Password to unlock results (default: admin123)

## Deployment

This app is configured for deployment on Render:

1. Push to GitHub
2. Connect GitHub repository to Render
3. Set environment variables in Render dashboard:
   - `GAME_PASSWORD`: Your secure password

## Customization

All card content is stored as placeholders. To update:

1. Edit `app.js` to change card titles and add content
2. Edit templates in `/views` to customize styling and layout
3. Results pages are in `staff-results.ejs` and `stakeholder-results.ejs`

## Architecture

- **Framework**: Express.js
- **View Engine**: EJS templates
- **Session Management**: express-session
- **Styling**: CSS (responsive and clean)

## Password Protection

- Results pages are protected by middleware that checks session authentication
- Users must enter the password once to access all results
- Password is configurable via environment variables
