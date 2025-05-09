// seed_passwords.js
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

// Use your Supabase URL + **SERVICE ROLE** key (never in browser)
const supabase = createClient(
  process.env.SUPA_URL,
  process.env.SUPA_SERVICE_ROLE_KEY
);

async function seed() {
  const passwords = Array.from({ length: 100 }, () =>
    Math.random().toString(36).slice(2,10)
  );
  for (let pwd of passwords) {
    const { error } = await supabase
      .from('passwords')
      .insert({ password: pwd });
    if (error) console.error('Error inserting', pwd, error);
    else console.log('Inserted password:', pwd);
  }
  console.log('✅ All done!');
}

seed();