import type { APIRoute } from 'astro';
import { BASE_URL } from '../lib/site';

export const GET: APIRoute = () =>
  new Response(`${new URL(BASE_URL).hostname}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
