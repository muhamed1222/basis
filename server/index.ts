/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import rateLimit from 'express-rate-limit';
import { ApolloServer, gql } from 'apollo-server-express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import OAuth2Server from 'oauth2-server';

const app = express();
app.use(express.json());

// Slug management
const RESERVED_SLUGS = new Set(['admin', 'login', 'me', 'profile']);
const usedSlugs = new Set<string>();

// Simple in-memory OAuth model
const users: Record<string, { id: string; password: string }> = {
  user: { id: 'user', password: 'pass' },
  test: { id: 'test', password: 'testpass' },
};

const oauth = new OAuth2Server({
  model: {
    async getClient(clientId: string, clientSecret: string) {
      if (clientId === 'client' && clientSecret === 'secret') {
        return { id: 'client', grants: ['client_credentials'] };
      }
      return null;
    },
    async saveToken(token: any, client: any, user: any) {
      return { ...token, client, user };
    },
    async getUser(username: string, password: string) {
      const record = users[username];
      if (record && record.password === password) {
        return { id: record.id };
      }
      return null;
    },
    async getAccessToken(accessToken: string) {
      return {
        accessToken,
        client: { id: 'client' },
        user: { id: 'user' },
        accessTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
      };
    },
    verifyScope() {
      return true;
    },
  },
});

app.post('/oauth/token', (req, res, next) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);
  oauth
    .token(request, response)
    .then(function (token) {
      res.json(token);
    })
    .catch(function (err) {
      res.status(err.code || 500).json(err);
    });
});

// Rate limiting middleware
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);

// Sample REST endpoint
app.get('/api/profile', (req, res) => {
  res.json({ id: 'user', name: 'Demo User' });
});

// Simple auth endpoints for local development
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }
  if (users[email]) {
    res.status(409).json({ error: 'User already exists' });
    return;
  }
  users[email] = { id: email, password };
  res.status(201).json({ id: email, email, role: 'owner' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  const record = users[email];
  if (record && record.password === password) {
    res.json({ id: record.id, email, role: 'owner' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Slug endpoints
app.get('/api/check-slug', (req, res) => {
  const slug = String(req.query.slug || '').trim().toLowerCase();
  const valid = /^[a-zA-Z0-9-_]{3,20}$/.test(slug);
  if (!valid) {
    res.json({ unique: false });
    return;
  }
  const unique = !RESERVED_SLUGS.has(slug) && !usedSlugs.has(slug);
  res.json({ unique });
});

app.post('/api/register-slug', (req, res) => {
  const slug = String(req.body?.slug || '').trim().toLowerCase();
  const valid = /^[a-zA-Z0-9-_]{3,20}$/.test(slug);
  if (!valid) {
    res.status(400).json({ success: false });
    return;
  }
  if (RESERVED_SLUGS.has(slug) || usedSlugs.has(slug)) {
    res.status(409).json({ success: false });
    return;
  }
  usedSlugs.add(slug);
  res.json({ success: true });
});

// GraphQL setup
const typeDefs = gql`
  type Query {
    profile: Profile
  }
  type Profile {
    id: ID!
    name: String!
  }
`;
const resolvers = {
  Query: {
    profile: () => ({ id: 'user', name: 'Demo User' }),
  },
};
const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();
apollo.applyMiddleware({ app, path: '/graphql' });

// Swagger setup
const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Basis API',
      version: '1.0.0',
    },
  },
  apis: [],
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Webhook endpoint example
app.post('/webhook/event', (req, res) => {
  console.log('Received event', req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
