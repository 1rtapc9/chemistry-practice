import React, { useEffect, useState } from 'react';
import QUESTIONS from './lib/questions';
import { normalizeAnswer, decideNextState } from './lib/adaptive';
import { supabase, recordAttempt } from './lib/api';

export default function App() {
  const [mode, setMode] = useState('acid');
  const [grade, setGrade] = useState(6);
  const [streak, setStreak] = useState(0);
  const [current, setCurrent] = useState(null); // current question object
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  // Restore supabase session (if any)
  useEffect(() => {
    supabase.auth.getSession().then(r => {
      const session = r.data?.session;
      if (session?.user) setUser(session.user);
    });
    // load any stored progress from localStorage (fallback)
    const saved = localStorage.getItem('acid_namer_progress');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setGrade(p.grade || 6);
        setStreak(p.streak || 0);
        setMode(p.mode || 'acid');
      } catch {}
    }
  }, []);

  // save minimal progress locally to survive refresh
  useEffect(() => {
    localStorage.setItem('acid_namer_progress', JSON.stringify({ grade, streak, mode }));
  }, [grade, streak, mode]);

  useEffect(() => {
    pickRandomQuestion();
    // eslint-disable-next-line
  }, [grade, mode]);

  function pickRandomQuestion() {
    const pool = (QUESTIONS[mode] && QUESTIONS[mode][grade]) || [];
    if (pool.length === 0) {
      setCurrent({ prompt: 'No questions available for this grade/mode.', canonicalAnswer: '', acceptedAnswers: [], explanation: '', remediation: '' });
      return;
    }
    const idx = Math.floor(Math.random() * pool.length);
    setCurrent(pool[idx]);
    setAnswer('');
    setFeedback(null);
  }

  async function submit() {
    if (!current) return;
    const userNorm = normalizeAnswer(answer);
    const canonNorm = normalizeAnswer(current.canonicalAnswer);
    const accepted = (current.acceptedAnswers || []).map(normalizeAnswer);
    const correct = (userNorm === canonNorm) || accepted.includes(userNorm);

    setFeedback({ correct, expected: current.canonicalAnswer, explanation: current.explanation, remediation: current.remediation });

    const { nextGrade, nextStreak } = decideNextState({ currentGrade: grade, currentStreak: streak, wasCorrect: correct });
    const prevGrade = grade;
    setGrade(nextGrade);
    setStreak(nextStreak);

    setHistory(h => [{ q: current.prompt, ans: answer, ok: correct, expected: current.canonicalAnswer }, ...h].slice(0, 50));

    // attempt persistence (if logged in)
    const userId = user?.id;
    try {
      await recordAttempt({
        userId,
        mode,
        difficulty: prevGrade,
        questionText: current.prompt,
        userAnswer: answer,
        correct,
        nextGrade,
        nextStreak
      });
    } catch (e) {
      // non-fatal
      console.error('persist error', e);
    }

    // small delay then next question
    setTimeout(() => {
      pickRandomQuestion();
    }, 700);
  }

  async function signUpDemo() {
    const email = prompt('Enter email for a demo account (no real email will be sent unless you use a real address).');
    if (!email) return;
    const { error } = await supabase.auth.signUp({ email });
    if (error) alert('Sign-up error: ' + error.message);
    else alert('Sign-up initiated. Check email if you used a real address.');
  }

  return (
    <div className="app" role="main">
      <div className="header">
        <h1>Acid Namer — Adaptive Practice (No AI)</h1>
        <div className="small">Grade: <strong>{grade}</strong> &nbsp; Streak: <strong>{streak}</strong></div>
      </div>

      <div style={{display:'flex', gap:12, marginTop:8}}>
        <select value={mode} onChange={e=> { setMode(e.target.value); setGrade(6); setStreak(0); }} aria-label="Practice mode">
          <option value="acid">Name acids</option>
          <option value="skeleton">Sentence-equation skeletons</option>
        </select>
        <button onClick={()=>{ setGrade(6); setStreak(0); }}>Reset to Grade 6</button>
        <button onClick={signUpDemo}>Sign up (demo)</button>
      </div>

      <div className="questionBox" role="region" aria-live="polite">
        <div className="small">Question (Grade {grade})</div>
        <div style={{marginTop:6, fontWeight:600}}>{current ? current.prompt : 'Loading...'}</div>

        <div className="inputRow">
          <input value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your answer" aria-label="Answer input" onKeyDown={(e)=>{ if(e.key==='Enter'){ submit(); }}} />
          <button onClick={submit}>Submit</button>
        </div>

        {feedback && (
          <div style={{marginTop:12}} className={feedback.correct ? 'feedback-correct' : 'feedback-wrong'} role="alert">
            <div style={{fontWeight:700}}>{feedback.correct ? 'Correct' : 'Not quite'}</div>
            <div className="small" style={{marginTop:6}}><strong>Expected:</strong> {feedback.expected}</div>
            <div className="small" style={{marginTop:6}}><strong>Explanation:</strong> {feedback.explanation}</div>
            {feedback.remediation && <div className="small" style={{marginTop:6}}><strong>Try this:</strong> {feedback.remediation}</div>}
          </div>
        )}
      </div>

      <div className="history">
        <div className="small">Recent attempts</div>
        <ul>
          {history.map((h, i) => (
            <li key={i} style={{marginTop:8}}>
              <div style={{fontWeight:600}}>{h.q}</div>
              <div className="small">You: {h.ans} — {h.ok ? '✓ correct' : '✕ wrong'} (expected: {h.expected})</div>
            </li>
          ))}
        </ul>
      </div>

      <footer style={{marginTop:18}} className="small">
        This version uses a local question bank (no AI). To add more questions, edit <code>src/lib/questions.js</code>.
      </footer>
    </div>
  );
}
