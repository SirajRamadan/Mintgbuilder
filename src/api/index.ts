import { Hono } from 'hono';
import { cors } from "hono/cors";
import { createAuth } from "./auth";

const app = new Hono().basePath('api');

app.use(cors({ origin: "*" }));

// Auth routes
app.all('/auth/*', (c) => {
  const baseURL = `${new URL(c.req.url).protocol}//${new URL(c.req.url).host}`;
  const auth = createAuth(baseURL);
  return auth.handler(c.req.raw);
});

app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));

export default app;
