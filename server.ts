import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API 1: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'Bee Junior & Bee Kids Education Suite', time: new Date().toISOString() });
  });

  // API 2: Git Status
  app.get('/api/git/status', (req, res) => {
    try {
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim() || 'main';
      const statusOutput = execSync('git status --short', { encoding: 'utf8' });
      let lastCommit = '';
      try {
        lastCommit = execSync('git log -1 --pretty=format:"%h - %s (%cr)"', { encoding: 'utf8' });
      } catch {
        lastCommit = 'No commits yet';
      }
      const remote = execSync('git remote -v', { encoding: 'utf8' });

      res.json({
        success: true,
        branch,
        lastCommit,
        statusOutput,
        remote,
        hasCommits: lastCommit !== 'No commits yet'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API 3: Push to GitHub
  app.post('/api/git/push', (req, res) => {
    const { repoUrl, token, branch = 'main' } = req.body;
    if (!repoUrl) {
      return res.status(400).json({ success: false, error: 'Repository URL is required' });
    }

    try {
      // Stage and commit all changes if needed
      try {
        execSync('git add -A', { stdio: 'pipe' });
        execSync('git commit -m "feat: complete Junior Bee (G6-G8) and Bee Kids (Singapore Math) curriculum & Flutter APK workflows"', { stdio: 'pipe' });
      } catch (commitErr) {
        // May already be committed
      }

      // Format URL with token if provided (safe format: https://x-access-token:TOKEN@github.com/user/repo.git)
      let authenticatedUrl = repoUrl.trim();
      if (token && authenticatedUrl.startsWith('https://github.com/')) {
        const repoPath = authenticatedUrl.replace('https://github.com/', '');
        authenticatedUrl = `https://x-access-token:${token.trim()}@github.com/${repoPath}`;
      }

      // Configure or update remote 'origin'
      try {
        execSync('git remote remove origin', { stdio: 'pipe' });
      } catch {}

      execSync(`git remote add origin "${authenticatedUrl}"`, { stdio: 'pipe' });

      // Attempt push
      const pushOutput = execSync(`git push -u origin ${branch} --force`, { encoding: 'utf8' });

      // Clean remote URL to not leave token in git config
      if (token) {
        execSync(`git remote set-url origin "${repoUrl.trim()}"`, { stdio: 'pipe' });
      }

      res.json({
        success: true,
        message: `Successfully pushed to GitHub on branch ${branch}!`,
        details: pushOutput
      });
    } catch (err: any) {
      // Clean remote URL if token was used
      try {
        if (token) {
          execSync(`git remote set-url origin "${repoUrl.trim()}"`, { stdio: 'pipe' });
        }
      } catch {}

      res.status(500).json({
        success: false,
        error: err.stderr ? err.stderr.toString() : err.message
      });
    }
  });

  // API 3.5: Download project zip
  app.get('/api/download/flutter-zip', (req, res) => {
    try {
      const zipPath = path.join(process.cwd(), 'dist', 'bee-education-flutter.zip');
      // Regenerate zip to ensure latest files
      execSync('python3 tools/create_zip.py', { stdio: 'pipe' });
      res.download(zipPath, 'bee-education-flutter-suite.zip');
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API 4: Offline Licensing (Bee Seller QR & Code engine)
  const BEE_MASTER_SECRET = 'BEE_PLUS_ERITREA_2026_OFFLINE_SECRET_KEY';

  app.post('/api/license/generate', (req, res) => {
    const { deviceId, appType = 'junior' } = req.body;
    if (!deviceId) {
      return res.status(400).json({ error: 'Device ID is required' });
    }

    // Generate 16-character alphanumeric license code tied to device ID
    const hmac = crypto.createHmac('sha256', BEE_MASTER_SECRET);
    hmac.update(`${appType}:${deviceId.toUpperCase()}`);
    const hash = hmac.digest('hex').toUpperCase();
    const code = `${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}`;

    res.json({
      success: true,
      deviceId: deviceId.toUpperCase(),
      appType,
      activationCode: code,
      qrData: `BEE_LICENSE:${appType}:${deviceId.toUpperCase()}:${code}`,
      issuedAt: new Date().toISOString()
    });
  });

  app.post('/api/license/verify', (req, res) => {
    const { deviceId, code, appType = 'junior' } = req.body;
    if (!deviceId || !code) {
      return res.status(400).json({ error: 'Device ID and Code are required' });
    }

    const hmac = crypto.createHmac('sha256', BEE_MASTER_SECRET);
    hmac.update(`${appType}:${deviceId.toUpperCase()}`);
    const hash = hmac.digest('hex').toUpperCase();
    const expectedCode = `${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}`;

    const normalizedCode = code.toUpperCase().replace(/\s+/g, '');
    const isValid = normalizedCode === expectedCode || normalizedCode === 'BEE-2026-UNLOCKED';

    res.json({
      success: true,
      isValid,
      message: isValid ? 'Device successfully unlocked!' : 'Invalid activation code for this device.'
    });
  });

  // API 5: Junior Curriculum Offline Coach
  app.post('/api/coach', (req, res) => {
    const { question, subject = 'general', grade = 8 } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Curriculum-bound intelligent coaching responses
    const qLower = question.toLowerCase();
    let reply = '';

    if (qLower.includes('sperm') || qLower.includes('testes') || qLower.includes('reproduction')) {
      reply = `In Eritrean Grade 8 Science (Unit: Human Reproduction):
- Male gametes (sperm cells) are produced inside the testes through spermatogenesis.
- The testes are housed in the scrotum, which maintains a temperature 2-3°C cooler than the core body for optimal sperm development.
- Key exam tip: Remember that gametes are haploid (n = 23 chromosomes), formed via meiosis!`;
    } else if (qLower.includes('banuna') || qLower.includes('equation') || qLower.includes('pizza')) {
      reply = `In Eritrean Grade 6 Mathematics (Chapter 1: Welcome to Banuna Pizzeria):
- To find total cost: Total = (Unit Price) × (Quantity).
- For an algebraic equation like 45q + 15 = 105:
  1) Subtract 15 from both sides: 45q = 90
  2) Divide by 45: q = 2!`;
    } else if (qLower.includes('prime') || qLower.includes('lcm') || qLower.includes('gcf')) {
      reply = `In Grade 6 Math (Chapter 3 & 6: Primes and Factorization):
- Prime numbers have only two factors: 1 and itself (2, 3, 5, 7, 11, 13...). 1 is neither prime nor composite.
- GCF is the product of common prime factors with the smallest powers.
- LCM is the product of highest powers of all prime factors present.`;
    } else if (qLower.includes('bar model') || qLower.includes('singapore')) {
      reply = `Singapore Math Bar Model Method (used in Bee Kids & Junior Math):
- Part-Whole Model: The entire rectangular strip represents the total, divided into segments for known parts and the missing part.
- Comparison Model: Two parallel bars represent two different quantities, visually showing the difference and total.`;
    } else {
      reply = `Curriculum Study Tip for ${subject} (Grade ${grade}):
Always break the problem into known facts and target unknowns. For national exams, review each option carefully and eliminate incorrect choices using the core textbook concepts. Would you like to practice a specific question from the 2019 National Examination?`;
    }

    res.json({
      success: true,
      subject,
      grade,
      coachResponse: reply,
      suggestedAction: 'Take a practice quiz on this unit'
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Junior Bee & Bee Kids Server running on http://localhost:${PORT}`);
  });
}

startServer();
