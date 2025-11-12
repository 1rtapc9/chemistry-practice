// src/lib/api.js
// Minimal Supabase helper to write attempts & progress.
// The app imports supabase client directly; this module keeps helpers in one place.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || (window.__ENV && window.__ENV.SUPABASE_URL);
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || (window.__ENV && window.__ENV.SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * recordAttempt writes a row to the attempts table and updates progress.
 * attempt: { userId, mode, difficulty, questionText, userAnswer, correct }
 */
export async function recordAttempt(attempt) {
  if (!attempt.userId) {
    // skip persistence for anonymous users
    return { ok: false, message: 'anonymous' };
  }
  try {
    // insert attempt
    const { data: attemptData, error: insertError } = await supabase
      .from('attempts')
      .insert([{
        user_id: attempt.userId,
        mode: attempt.mode,
        difficulty: attempt.difficulty,
        question_text: attempt.questionText,
        user_answer: attempt.userAnswer,
        correct: attempt.correct
      }]);
    if (insertError) throw insertError;

    // update or insert progress (upsert)
    const { error: upsertErr } = await supabase
      .from('progress')
      .upsert({
        user_id: attempt.userId,
        mode: attempt.mode,
        grade: attempt.nextGrade ?? attempt.difficulty,
        streak: attempt.nextStreak ?? 0,
        last_updated: new Date().toISOString()
      }, { onConflict: ['user_id', 'mode'] });
    if (upsertErr) throw upsertErr;

    return { ok: true, attempt: attemptData };
  } catch (err) {
    console.error('recordAttempt error', err);
    return { ok: false, message: err.message || String(err) };
  }
}
