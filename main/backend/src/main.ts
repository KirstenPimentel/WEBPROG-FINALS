// Provide a modern fetch in Node/Nest (fixes "FetchError: fetch failed" in some setups)
import { fetch as undiciFetch } from 'undici';
(globalThis as any).fetch = undiciFetch;

// Load environment variables from main/backend/.env
import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow your React app (Vite) to call the API during development
  // You can later restrict `origin` to your Vercel frontend URL.
  app.enableCors({
    origin: true,
    credentials: false,
  });

  // Optional: quick sanity log (remove after debugging)
  console.log('[ENV CHECK] SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
  console.log(
    '[ENV CHECK] SERVICE_ROLE_KEY length:',
    process.env.SUPABASE_SERVICE_ROLE_KEY
      ? process.env.SUPABASE_SERVICE_ROLE_KEY.length
      : 0
  );

  await app.listen(3000);
  console.log('API listening on http://localhost:3000');
}
bootstrap();