const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const ROUND_PASSWORDS = {
  1: process.env.ROUND_1_PASSWORD || 'trust',
  2: process.env.ROUND_2_PASSWORD || 'alignment',
  3: process.env.ROUND_3_PASSWORD || 'autonomy'
};

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

// Data for cards by round - Bridgebuilders Action Cards
const cardsByRound = {
  1: {
    team: [
      {
        id: 1,
        title: 'Action Plan',
        scenario: 'I write an action plan for the first three months and send it to everyone. The plan contains ambitious goals, a detailed plan, and a description of who is to do what.\n\nI communicate this plan to the remote team members in our weekly, individual phone meetings.'
      },
      {
        id: 2,
        title: 'Visit a Site',
        scenario: 'I gather my team members from one of the business centres for a workshop. Here we openly discuss and agree on goals and visions for their part of the team. Before the meeting, I discuss my plans with the local regional manager.\n\nI do this to make sure the local team members understand how they are supposed to create value for the company and for their business centre.\n\nPay one business trip if you choose to travel to remote business centres.\n\nSelect one business centre:'
      },
      {
        id: 3,
        title: 'Here\'s What We Will Do',
        scenario: 'I gather all the team members physically or virtually for a full day\'s meeting where I present my vision, goals and KPIs for our team.\n\nBy clarifying goals and plans I ensure that the team members have a shared point of departure, and feel that things are under control.\n\nPay one business trip if you choose to travel to meet in person.'
      },
      {
        id: 4,
        title: 'Breaking Bread',
        scenario: 'I gather the entire team for a team building event where we can get to know each other and each person\'s individual strengths.\n\nI keep the main emphasis on social aspects in order to build up the team and allow relations to form. We also spend some time discussing our individual preferences in collaboration.\n\nPay one business trip.'
      },
      {
        id: 5,
        title: 'Cards on the Table',
        scenario: 'I gather all team members for a meeting in which I explain my goals and how I intend to lead the team.\n\nPrior to the meeting, we all take a test that maps out our cultural traits, and at the meeting we have an open exchange about our differences and how they might influence our everyday collaboration.\n\nPay one business trip.'
      },
      {
        id: 6,
        title: 'Stay in Touch',
        scenario: 'I check in with all the team members via virtual tools at least once a week. I do this to have a short chat about how things are going, to provide feedback, and to make sure people are okay.\n\nApart from the team member\'s well-being, I focus on establishing standards for our virtual communication and use of global tools.'
      },
      {
        id: 7,
        title: 'Let\'s Figure It Out',
        scenario: 'I gather all or some of the team members for a physical or virtual workshop where we discuss the tasks at hand as well as how each individual team member can best contribute.\n\nI create an open and shared process with room for listening to the input of the team members.\n\nPay one business trip if you choose to travel to meet in person.\n\nChoose team members:'
      },
      {
        id: 8,
        title: 'On Tour',
        scenario: 'I travel to all business centres to get to know the team members and to help them see the bigger purpose of their job and of the new function.\n\nI take time to meet the members where they are and to be there as a leader during the visit.\n\nPay one business trip.'
      },
      {
        id: 9,
        title: 'Socialise',
        scenario: 'I visit some or all business centres to have coffee with each individual team member and take them and their spouses out to dinner.\n\nI focus on getting to know everyone and on showing that I care about their general well-being.\n\nPay one business trip if you choose to travel to remote business centres.\n\nSelect business centres:'
      },
      {
        id: 10,
        title: 'This is Your Job',
        scenario: 'I carefully write job descriptions for all team members stating their personal responsibilities, goals and KPIs.\n\nI share the job descriptions with the whole team in order for everyone to understand how roles and responsibilities are defined among the team members.'
      },
      {
        id: 11,
        title: 'Setting the Bar High',
        scenario: 'I focus on delivering quality on time. I do this via phone, email and web meetings.\n\nI frequently follow up on goals and results in order to make everyone aware of where my focus is right now. At the same time, I make sure to set an example by keeping my own deadlines.'
      },
      {
        id: 12,
        title: 'Let\'s Talk About Your Job',
        scenario: 'I conduct physical or virtual meetings with all of the team members in order to discuss and develop their jobs.\n\nI do this to ensure that all team members feel committed to their new role and have an opportunity to shape their responsibilities.\n\nPay one business trip if you choose to meet in person.'
      }
    ],
    stakeholder: [
      {
        id: 1,
        title: 'Making the Right Compromises',
        scenario: 'I meet up with one or more of the stakeholders separately. I explain the objectives of the team and open up for a discussion on how we can make it work. I let them know that I am willing to make a few compromises if necessary.\n\nI hope to create a mutual understanding of our shared goals and workflows.\n\nPay one business trip if you meet in person with stakeholders at remote business centres.\n\nChoose stakeholder(s):'
      },
      {
        id: 2,
        title: 'This is How We Work!',
        scenario: 'I visit one or more stakeholders in order to clarify how we work together and to express how I expect the stakeholder to navigate in relation to my local team members.\n\nI keep the goals and mandate from the COO clear and visible for both of us.\n\nPay one business trip if you meet with stakeholders from remote business centres.\n\nChoose stakeholder(s):'
      },
      {
        id: 3,
        title: 'Kick-off Workshop',
        scenario: 'I invite all stakeholders to a high-end conference centre for a full-day collaborative and open workshop where we discuss how to create a strong, mutually beneficial work environment.\n\nI focus on securing a shared understanding of our goals and processes, and where our work responsibilities have overlaps and interactions.\n\nPay one business trip.'
      },
      {
        id: 4,
        title: 'Personal Meetings',
        scenario: 'I tour all three business centres to meet with the local stakeholders.\n\nWe spend a couple of hours together at the office. I focus on asking questions and listening until I understand their local situation.\n\nAfter the meeting, we go out for dinner and I get to know them a little better on a personal level.\n\nPay one business trip.'
      }
    ]
  },
  2: {
    team: [
      {
        id: 1,
        title: 'Involve the Experts',
        scenario: 'I meet with two team members to develop a standard format and structure for weekly reports. The results are then communicated to the rest of the team.\n\nI seek to make it easier for the team to build upon each others work, and for me to track progress. I want to do it in a way that recognises key team members.\n\nPay one business trip if you choose team members from remote location.\n\nChoose two team members:'
      },
      {
        id: 2,
        title: 'Adapt Corporate Guidelines',
        scenario: 'Based on my interpretation of corporate guidelines, I develop and communicate a standardised reporting structure including a plan for weekly reports.\n\nWith this, I seek to make it easier for the team to build upon each other\'s work and for me to track progress.'
      },
      {
        id: 3,
        title: 'Weekly Check-up',
        scenario: 'I arrange weekly video conference meetings and groupware reporting. The team is to use these to coordinate deliverables between themselves and track progress.\n\nIn the meetings I make it clear that the team members are free to manage their own time as long as they deliver results.'
      },
      {
        id: 4,
        title: 'Collaboration Across Business Centres',
        scenario: 'I delegate work related to the new client to two team members from different business centres. The rest are asked to cover for them and collaborate on existing tasks.\n\nI do this to increase collaboration and knowledge sharing and to inspire my team to take responsibility.\n\nChoose two team members:'
      },
      {
        id: 5,
        title: 'Develop Job Descriptions',
        scenario: 'I develop job descriptions with clear mandates and KPIs for everyone. I send them out and let the team members know that even though I welcome feedback, this is how I see things.\n\nI do this to ensure the team members know their individual tasks and responsibilities, and what I expect from them.'
      },
      {
        id: 6,
        title: 'Pit Stop',
        scenario: 'I bring my entire team together for a workshop where we discuss progress so far, and specifically address issues related to collaboration and communication. We also discuss when it is OK to deviate from global standards.\n\nIn the workshop design, I try to accommodate different preferences by mixing group work, discussions and individual reflections.\n\nPay one business trip.'
      },
      {
        id: 7,
        title: 'Let Me Help You',
        scenario: 'I identify a few team members who could use a little extra attention.\n\nI meet with them and have an in depth conversation about their current deliverables. I focus on creating a safe space and seek to provide guidance on their individual contributions.\n\nPay one business trip if you choose to travel to remote business centres.\n\nChoose three team members:'
      },
      {
        id: 8,
        title: 'Celebrate Victories',
        scenario: 'I make a point of celebrating our victories with little rituals whenever we succeed with our projects, and meet the new client\'s needs.\n\nI do this to create cohesion and a sense of community and to make it clear what our team is supposed to achieve.'
      },
      {
        id: 9,
        title: 'Quick Results',
        scenario: 'For each business centre, I identify a few small projects with potential for creating quick results for the new client. I delegate control of these projects to the local teams.\n\nI do this to give the local teams momentum with some quick wins to show that their work is valuable.'
      },
      {
        id: 10,
        title: 'Let\'s Go Virtual',
        scenario: 'I run a training programme in virtual collaboration for the whole team. Here we focus on shared plans and processes. The training can be either virtual or face-to-face.\n\nI do this to ensure that we are able to coordinate our activities without meeting in person all the time.\n\nPay one business trip if you choose to travel to meet in person.'
      },
      {
        id: 11,
        title: 'Your Contribution',
        scenario: 'I visit one of the business centres and run a customised workshop where we work together to identify each team member\'s contribution to the team on meeting the new client\'s needs.\n\nI make it an open and democratic process and I invite the participants to comment on both their own and each others\' roles.\n\nPay one business trip if you choose to travel to remote business centres.\n\nSelect one business center:'
      },
      {
        id: 12,
        title: 'Performance Review',
        scenario: 'I conduct individual performance reviews with all the team members via our teleconference setup.\n\nDuring these meetings, I make sure to focus on how each team member can contribute to the overall efficiency of the company going forward.'
      }
    ],
    stakeholder: [
      {
        id: 1,
        title: 'What Can I Do for You?',
        scenario: 'I identify how our new customer situation may change local objectives and ways of working. I then meet face-to-face with one or more stakeholders to discuss the situation.\n\nMy aim is to ensure that we get behind the corporate strategy without losing the ability to develop locally adapted solutions.\n\nPay one business trip if you meet with stakeholders from remote business centres.\n\nChoose stakeholder(s):'
      },
      {
        id: 2,
        title: 'I Just Called...',
        scenario: 'I arrange frequent but short follow-up calls with all stakeholders.\n\nI do this to make sure they are satisfied with our services and to ensure that local conflicts are handled before they become serious.'
      },
      {
        id: 3,
        title: 'Here\'s My Plan',
        scenario: 'I meet with the people from Corporate who are responsible for our new customer. Together we make a plan for how to best address the client\'s needs at local level.\n\nI send this plan to one or more stakeholders and make clear to them what they can expect from my team, and what I expect from them in return.\n\nChoose stakeholder(s):'
      },
      {
        id: 4,
        title: 'Let\'s Make a Game Plan',
        scenario: 'In order to optimise workflows between my team and the business centres, I meet with selected stakeholders.\n\nAt the meetings, we carefully design a plan for how the work of the different team members can best support the needs of the stakeholder.\n\nPay one business trip if you meet in person with stakeholders from remote business centres.\n\nChoose stakeholder(s):'
      }
    ]
  },
  3: {
    team: [
      {
        id: 1,
        title: 'Crisis Meeting',
        scenario: 'In view of the crisis, I gather the team, outline the situation and stress the importance of Global Analytics in addressing the issue.\n\nI make it clear that each team member is expected to be a part of the solution.\n\nPay one business trip.'
      },
      {
        id: 2,
        title: 'One-on-One',
        scenario: 'I conduct personal meetings with all team members to make them understand the urgency and the need for an extra effort.\n\nI ask for input from each person and work with them to revise their KPIs.\n\nPay one business trip if you choose to meet in person.'
      },
      {
        id: 3,
        title: 'Follow My Lead',
        scenario: 'I apply myself to delivering quality in compliance with company standards. I put in extra hours and make sure that everyone on the team is aware of my good example.\n\nI do this in the belief that the team will be inspired to follow my example.'
      },
      {
        id: 4,
        title: 'Let\'s Celebrate',
        scenario: 'I gather all the team members for a surprise celebration of the work we do.\n\nIn my speech at the event I focus on the results we have already achieved as a team and highlight the high potential of the team if we continue along this path.\n\nPay one business trip.'
      },
      {
        id: 5,
        title: 'A Local Solution',
        scenario: 'In order to increase flexibility I join my local teams for meetings with their Regional Managers to discuss how we can best contribute in this time of crisis.\n\nTogether we define a set of tasks that create synergy between local and global needs. Working on these, the team members report to the Regional Managers.\n\nPay one business trip if you choose to travel to remote business centres.\n\nSelect business centres:'
      },
      {
        id: 6,
        title: 'How Are You?',
        scenario: 'Realising that the situation is taking a toll on my team members, I travel to have a personal conversation about their situation and work-load.\n\nI listen to my team members and try to identify areas where I can support them. I let them know that I am always there to help if they need it, and follow up as necessary.\n\nPay one business trip.'
      },
      {
        id: 7,
        title: 'A Real Opportunity',
        scenario: 'I write a post for the company newsletter. In this I frame the situation as a real opportunity for the Global Analytics Team. I stress that quality issues can only be solved with centralised efforts like ours.\n\nI also present an ambitious plan for the future and what the organisation can do to capitalise on the current situation.'
      },
      {
        id: 8,
        title: 'Find a Way',
        scenario: 'I create a task-force consisting of two team members from different business centres who are charged with addressing the quality issues in a way they see fit.\n\nMeanwhile, I tell the rest of the team that they will have to put in extra work to cover for the two.\n\nChoose two team members from different business centres:'
      },
      {
        id: 9,
        title: 'Good Morning',
        scenario: 'Every Monday I conduct a virtual morning meeting with my team. At the meeting, everyone presents their current status and plan for the week.\n\nI do this to make sure that we progress according to plan without losing anyone along the way.'
      },
      {
        id: 10,
        title: 'Do the Right Things',
        scenario: 'I arrange meetings with one or more local teams where I clarify what is important right now and what they should focus on. I do this in a friendly but firm way that leaves little room for misunderstandings.\n\nI want to make sure that my expectations are well understood, and stop local initiatives that I think is less important.\n\nPay one business trip if you choose to travel to remote business centres.\n\nSelect business centres:'
      },
      {
        id: 11,
        title: 'Remember Our Standards',
        scenario: 'Whenever I communicate with my team, I make sure to highlight the corporate quality standards that we must comply with.\n\nI do this to create a clear and shared understanding of what is expected from us by global management.'
      },
      {
        id: 12,
        title: 'What\'s in It for You?',
        scenario: 'I have meetings with select team members where I frame the current crisis as an opportunity for them to step up and show themselves as valuable performers for the company.\n\nI do this to motivate the team members to perform. Both for their own and the company\'s sake.\n\nPay one business trip if you choose to meet in person.\n\nChoose up to three team members.'
      }
    ],
    stakeholder: [
      {
        id: 1,
        title: 'Taking Over',
        scenario: 'I talk to the company COO and ask him for a mandate to take a more centralised approach to data quality in order to address the quality crisis.\n\nI am hoping that this initiative can help improve data quality in the company and that it will strengthen my position without alienating too many stakeholders.'
      },
      {
        id: 2,
        title: 'Can We Get Through This Together?',
        scenario: 'I meet physically or virtually with the stakeholders to explore the possibilities of collaborating on solving the quality problems.\n\nI do this to create an alliance with my peers making our units work together to solve the crisis and improve data quality.\n\nPay one business trip if you choose to meet in person.'
      },
      {
        id: 3,
        title: 'Special Attention',
        scenario: 'I travel to meet a single stakeholder who is in need of attention. At the meeting, we discuss the challenges facing the stakeholder, but I also make sure to find time for social talk.\n\nI do this to improve our relation and to stop the stakeholder creating noise and spreading doubt in my local team.\n\nPay one business trip if you meet with a stakeholder from a remote business centre.\n\nChoose a single stakeholder:'
      },
      {
        id: 4,
        title: 'Just Wanted to Say Hello',
        scenario: 'I travel to meet with all my stakeholders in order to reconnect socially.\n\nAt this time of crisis I believe it is extra important to maintain good personal relations.\n\nPay one business trip.'
      }
    ]
  }
};

// Legacy references for Round 1
const staffCards = cardsByRound[1].team;
const stakeholderCards = cardsByRound[1].stakeholder;

// Middleware to check if user is authenticated for a specific round
const requireAuth = (req, res, next) => {
  const roundId = parseInt(req.params.roundId) || 1;
  if (req.session.authenticatedRounds && req.session.authenticatedRounds.includes(roundId)) {
    next();
  } else {
    res.redirect('/');
  }
};

// HOME PAGE
app.get('/', (req, res) => {
  const authenticatedRounds = req.session.authenticatedRounds || [];
  res.render('home', {
    authenticated: authenticatedRounds.length > 0,
    authenticatedRounds: authenticatedRounds
  });
});

// LOGIN HANDLER (posts from home page)
app.post('/login', (req, res) => {
  const { password, round } = req.body;
  const roundId = parseInt(round) || 1;

  if (ROUND_PASSWORDS[roundId] && password === ROUND_PASSWORDS[roundId]) {
    if (!req.session.authenticatedRounds) {
      req.session.authenticatedRounds = [];
    }
    if (!req.session.authenticatedRounds.includes(roundId)) {
      req.session.authenticatedRounds.push(roundId);
    }
    res.redirect('/');
  } else {
    const authenticatedRounds = req.session.authenticatedRounds || [];
    res.render('home', {
      error: 'Incorrect password. Please try again.',
      authenticated: authenticatedRounds.length > 0,
      authenticatedRounds: authenticatedRounds,
      errorRound: roundId
    });
  }
});

app.get('/logout', (req, res) => {
  req.session.authenticatedRounds = [];
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

// ROUND SELECTOR PAGE
app.get('/round/:roundId', (req, res) => {
  const roundId = parseInt(req.params.roundId);
  if (![1, 2, 3].includes(roundId)) return res.status(404).send('Round not found');

  res.render('round', {
    roundNumber: roundId,
    authenticated: req.session.authenticated
  });
});

// HELPER FUNCTION: Get cards for a specific round and type
const getCardsForRound = (roundId, type) => {
  return cardsByRound[roundId] ? cardsByRound[roundId][type] : [];
};

// TEAM ACTIONS DIRECTORY FOR ALL ROUNDS
app.get('/round/:roundId/team-actions', (req, res) => {
  const roundId = parseInt(req.params.roundId);
  if (![1, 2, 3].includes(roundId)) return res.status(404).send('Round not found');

  const cards = getCardsForRound(roundId, 'team');
  res.render('staff-cards', {
    cards,
    roundNumber: roundId,
    authenticated: req.session.authenticated
  });
});

// INDIVIDUAL TEAM ACTION CARD FOR ALL ROUNDS
app.get('/round/:roundId/team-actions/:id', (req, res) => {
  const roundId = parseInt(req.params.roundId);
  const cardId = parseInt(req.params.id);
  if (![1, 2, 3].includes(roundId)) return res.status(404).send('Round not found');

  const cards = getCardsForRound(roundId, 'team');
  const card = cards.find(c => c.id === cardId);
  if (!card) return res.status(404).send('Card not found');

  const maxCards = cards.length;
  res.render('staff-card', {
    card,
    roundNumber: roundId,
    authenticated: req.session.authenticated,
    nextId: card.id < maxCards ? card.id + 1 : null,
    prevId: card.id > 1 ? card.id - 1 : null
  });
});

// TEAM ACTION RESULTS FOR ALL ROUNDS
app.get('/round/:roundId/team-actions/:id/results', requireAuth, (req, res) => {
  const roundId = parseInt(req.params.roundId);
  const cardId = parseInt(req.params.id);
  if (![1, 2, 3].includes(roundId)) return res.status(404).send('Round not found');

  const cards = getCardsForRound(roundId, 'team');
  const card = cards.find(c => c.id === cardId);
  if (!card) return res.status(404).send('Card not found');

  const maxCards = cards.length;
  res.render('staff-results', {
    card,
    roundNumber: roundId,
    nextId: card.id < maxCards ? card.id + 1 : null,
    prevId: card.id > 1 ? card.id - 1 : null
  });
});

// STAKEHOLDER ACTIONS DIRECTORY FOR ALL ROUNDS
app.get('/round/:roundId/stakeholder-actions', (req, res) => {
  const roundId = parseInt(req.params.roundId);
  if (![1, 2, 3].includes(roundId)) return res.status(404).send('Round not found');

  const cards = getCardsForRound(roundId, 'stakeholder');
  res.render('stakeholder-cards', {
    cards,
    roundNumber: roundId,
    authenticated: req.session.authenticated
  });
});

// INDIVIDUAL STAKEHOLDER ACTION CARD FOR ALL ROUNDS
app.get('/round/:roundId/stakeholder-actions/:id', (req, res) => {
  const roundId = parseInt(req.params.roundId);
  const cardId = parseInt(req.params.id);
  if (![1, 2, 3].includes(roundId)) return res.status(404).send('Round not found');

  const cards = getCardsForRound(roundId, 'stakeholder');
  const card = cards.find(c => c.id === cardId);
  if (!card) return res.status(404).send('Card not found');

  const maxCards = cards.length;
  res.render('stakeholder-card', {
    card,
    roundNumber: roundId,
    authenticated: req.session.authenticated,
    nextId: card.id < maxCards ? card.id + 1 : null,
    prevId: card.id > 1 ? card.id - 1 : null
  });
});

// STAKEHOLDER ACTION RESULTS FOR ALL ROUNDS
app.get('/round/:roundId/stakeholder-actions/:id/results', requireAuth, (req, res) => {
  const roundId = parseInt(req.params.roundId);
  const cardId = parseInt(req.params.id);
  if (![1, 2, 3].includes(roundId)) return res.status(404).send('Round not found');

  const cards = getCardsForRound(roundId, 'stakeholder');
  const card = cards.find(c => c.id === cardId);
  if (!card) return res.status(404).send('Card not found');

  const maxCards = cards.length;
  res.render('stakeholder-results', {
    card,
    roundNumber: roundId,
    nextId: card.id < maxCards ? card.id + 1 : null,
    prevId: card.id > 1 ? card.id - 1 : null
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Decision Cards Game running on http://localhost:${PORT}`);
  console.log(`Current password: ${GAME_PASSWORD}`);
});
