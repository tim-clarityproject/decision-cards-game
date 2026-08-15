const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const GAME_PASSWORD = process.env.GAME_PASSWORD || 'admin123'; // Change in production

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session middleware
app.use(session({
  secret: 'decision-cards-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Data for cards
const staffCards = [
  { id: 1, title: 'Take All New Staff Members Out for Dinner' },
  { id: 2, title: 'Have 1-1 Development Conversations with All Staff' },
  { id: 3, title: 'Wear a Chicken Outfit to Work' },
  { id: 4, title: 'Bring in Adie Shariff to Run a Simulation' },
  {
    id: 5,
    title: 'Organize a Full-Day Staff Retreat or Off-site',
    scenario: 'Your team has been working in silos across different departments. You\'ve noticed decreased collaboration and some tension between groups. You decide to invest time and budget into organizing a full-day retreat where your entire staff can connect, align on vision, and build stronger relationships across departments. This requires coordinating schedules, securing a venue, planning activities, and managing a significant budget.',
    results: 'After the retreat, team satisfaction increased by 28%, and cross-departmental collaboration improved significantly. However, some team members felt the activities were too structured, and the follow-up engagement dropped after 6 weeks when you didn\'t establish ongoing connection rituals.',
    keyInsights: 'Experiential events create temporary bonding but require sustained follow-up to maintain momentum. The most impactful moments were informal—unstructured meals and break times—not the planned activities. Teams need permission to be themselves, not just participate in team-building exercises.',
    nextSteps: 'Consider establishing monthly informal gatherings or quarterly shorter check-ins instead of relying on one big event. Use the retreat to launch ongoing initiatives like department exchange days or lunch-and-learn sessions.',
    reflection: 'Did you invest in the event because you genuinely believed it would improve collaboration, or because it felt like the "right" thing to do as a leader? How do you know what your team actually needs to strengthen bonds?'
  },
  { id: 6, title: 'Staff Card 6' },
  { id: 7, title: 'Staff Card 7' },
  { id: 8, title: 'Staff Card 8' },
  { id: 9, title: 'Staff Card 9' },
  { id: 10, title: 'Staff Card 10' },
  { id: 11, title: 'Staff Card 11' },
  { id: 12, title: 'Staff Card 12' }
];

const stakeholderCards = [
  { id: 1, title: 'Make a Visit to Stakeholders' },
  { id: 2, title: 'Have an Alignment Conversation' },
  { id: 3, title: 'Buy Them a Chicken Outfit' },
  { id: 4, title: 'Recommend Adie Shariff to Them' }
];

// Middleware to check if user is authenticated for results
const requireAuth = (req, res, next) => {
  if (req.session.authenticated) {
    next();
  } else {
    res.redirect('/login');
  }
};

// HOME PAGE
app.get('/', (req, res) => {
  res.render('home', { authenticated: req.session.authenticated });
});

// LOGIN PAGE
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === GAME_PASSWORD) {
    req.session.authenticated = true;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Incorrect password. Please try again.' });
  }
});

app.get('/logout', (req, res) => {
  req.session.authenticated = false;
  res.redirect('/');
});

// STAFF CARDS DIRECTORY
app.get('/staff-cards', (req, res) => {
  res.render('staff-cards', { cards: staffCards, authenticated: req.session.authenticated });
});

// INDIVIDUAL STAFF CARD PAGES
app.get('/staff-cards/:id', (req, res) => {
  const card = staffCards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send('Card not found');

  res.render('staff-card', {
    card,
    authenticated: req.session.authenticated,
    nextId: card.id < 12 ? card.id + 1 : null,
    prevId: card.id > 1 ? card.id - 1 : null
  });
});

// STAFF RESULTS PAGES (password protected)
app.get('/staff-cards/:id/results', requireAuth, (req, res) => {
  const card = staffCards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send('Card not found');

  res.render('staff-results', {
    card,
    nextId: card.id < 12 ? card.id + 1 : null,
    prevId: card.id > 1 ? card.id - 1 : null
  });
});

// STAKEHOLDER CARDS DIRECTORY
app.get('/stakeholder-cards', (req, res) => {
  res.render('stakeholder-cards', { cards: stakeholderCards, authenticated: req.session.authenticated });
});

// INDIVIDUAL STAKEHOLDER CARD PAGES
app.get('/stakeholder-cards/:id', (req, res) => {
  const card = stakeholderCards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send('Card not found');

  res.render('stakeholder-card', {
    card,
    authenticated: req.session.authenticated,
    nextId: card.id < 4 ? card.id + 1 : null,
    prevId: card.id > 1 ? card.id - 1 : null
  });
});

// STAKEHOLDER RESULTS PAGES (password protected)
app.get('/stakeholder-cards/:id/results', requireAuth, (req, res) => {
  const card = stakeholderCards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send('Card not found');

  res.render('stakeholder-results', {
    card,
    nextId: card.id < 4 ? card.id + 1 : null,
    prevId: card.id > 1 ? card.id - 1 : null
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Decision Cards Game running on http://localhost:${PORT}`);
  console.log(`Current password: ${GAME_PASSWORD}`);
});
