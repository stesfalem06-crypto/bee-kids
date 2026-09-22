import { useState, useEffect } from 'react';
import {
  GitBranch,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Cpu,
  Download,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Key,
  FolderArchive,
  ArrowRight,
  Play
} from 'lucide-react';

export function ApkBuildStation() {
  const [gitStatus, setGitStatus] = useState<any>(null);
  const [repoUrl, setRepoUrl] = useState('https://github.com/stesfalem06-crypto/bee-kids.git');
  const [token, setToken] = useState('');
  const [branch, setBranch] = useState('main');
  const [isPushing, setIsPushing] = useState(false);
  const [pushResult, setPushResult] = useState<any>(null);
  const [copiedCmd, setCopiedCmd] = useState(false);

  useEffect(() => {
    fetchGitStatus();
  }, []);

  const fetchGitStatus = async () => {
    try {
      const res = await fetch('/api/git/status');
      const data = await res.json();
      if (data.success) {
        setGitStatus(data);
        if (data.branch) setBranch(data.branch);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePush = async () => {
    if (!repoUrl.trim()) return;
    setIsPushing(true);
    setPushResult(null);

    try {
      const res = await fetch('/api/git/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl: repoUrl.trim(), token: token.trim(), branch: branch.trim() })
      });
      const data = await res.json();
      setPushResult(data);
      fetchGitStatus();
    } catch (err: any) {
      setPushResult({ success: false, error: err.message });
    } finally {
      setIsPushing(false);
    }
  };

  // Extract username and repo name for action link
  const cleanRepoPath = repoUrl
    .replace('https://github.com/', '')
    .replace('git@github.com:', '')
    .replace(/\.git$/, '');

  const actionsUrl = `https://github.com/${cleanRepoPath}/actions`;

  const terminalCommands = `# Step 1: Add remote repository
git remote add origin ${repoUrl}

# Step 2: Push code to main (triggers GitHub Actions release APK builds)
git push -u origin ${branch}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                APK Build & GitHub Push Station
              </h2>
              <p className="text-xs text-slate-400">
                Push your Flutter project to GitHub to automatically trigger GitHub Actions and generate both Release APKs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/download/flutter-zip"
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
              download="bee-education-flutter-suite.zip"
            >
              <FolderArchive className="w-4 h-4 text-amber-400" />
              <span>Download Project .ZIP</span>
            </a>

            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Git Ready
            </span>
          </div>
        </div>
      </div>

      {/* 3-Step Guided Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-black text-sm flex items-center justify-center shrink-0">
            1
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white">Create GitHub Repo</h4>
            <p className="text-[11px] text-slate-400">
              Create a new repository on GitHub (public or private).
            </p>
            <a
              href="https://github.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
            >
              <span>github.com/new</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-black text-sm flex items-center justify-center shrink-0">
            2
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white">Get Access Token</h4>
            <p className="text-[11px] text-slate-400">
              Generate a PAT with <code className="text-teal-300">repo</code> and <code className="text-teal-300">workflow</code> scope.
            </p>
            <a
              href="https://github.com/settings/tokens/new?scopes=repo,workflow&description=Bee-Education-APK-Build"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-teal-400 hover:text-teal-300 font-semibold"
            >
              <span>Generate Token (1-click)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-sm flex items-center justify-center shrink-0">
            3
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white">Push & Download APK</h4>
            <p className="text-[11px] text-slate-400">
              Push below. GitHub Actions compiles both release APKs automatically.
            </p>
            <span className="text-[11px] text-emerald-400 font-semibold">
              Ready in ~4 minutes
            </span>
          </div>
        </div>
      </div>

      {/* Main Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Push Form (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-amber-400" />
              Push to GitHub Repository
            </h3>

            {/* Target Repo URL */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={repoUrl}
                onChange={e => setRepoUrl(e.target.value)}
                placeholder="https://github.com/stesfalem06/bee-education.git"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs md:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Make sure this repository has been created at <a href={`https://github.com/${cleanRepoPath}`} target="_blank" rel="noreferrer" className="text-amber-400 underline">https://github.com/{cleanRepoPath}</a>.
              </p>
            </div>

            {/* PAT */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  GitHub Personal Access Token (PAT)
                </label>
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo,workflow&description=Bee-Education-APK-Build"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-teal-400 hover:text-teal-300 flex items-center gap-1 font-semibold"
                >
                  <Key className="w-3 h-3" />
                  <span>Create PAT on GitHub</span>
                </a>
              </div>
              <input
                type="password"
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (Required to push to your GitHub account)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs md:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                GitHub requires a token for git authentication over HTTPS. Your token is only used for the push command and is never permanently stored.
              </p>
            </div>

            {/* Branch */}
            <div className="flex items-center gap-4">
              <div className="w-1/2">
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Target Branch
                </label>
                <input
                  type="text"
                  value={branch}
                  onChange={e => setBranch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-white"
                />
              </div>

              <div className="w-1/2 pt-5">
                <button
                  onClick={handlePush}
                  disabled={isPushing || !repoUrl.trim()}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isPushing ? 'Pushing to GitHub...' : 'Push to GitHub Now'}</span>
                </button>
              </div>
            </div>

            {/* Push result feedback */}
            {pushResult && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                pushResult.success
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                <div className="flex items-center justify-between font-bold mb-1">
                  <div className="flex items-center gap-2">
                    {pushResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                    <span>{pushResult.success ? 'Push Successful!' : 'Push Failed'}</span>
                  </div>
                  {pushResult.success && (
                    <a
                      href={actionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition shadow"
                    >
                      <span>Open GitHub Actions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="mt-1">{pushResult.message || pushResult.error}</div>

                {pushResult.success && (
                  <p className="mt-2 text-emerald-400 font-semibold">
                    GitHub Actions is now compiling <code className="text-white">Junior_Bee_G6_G8_Release.apk</code> and <code className="text-white">Bee_Kids_Tigrinya_Release.apk</code>!
                  </p>
                )}

                {pushResult.details && (
                  <pre className="mt-2 p-2 bg-slate-950 rounded text-[11px] font-mono overflow-x-auto text-slate-400">
                    {pushResult.details}
                  </pre>
                )}
              </div>
            )}
          </div>

          {/* Terminal Manual Command Guide */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-teal-400" />
                Or Push via Local Terminal / Command Line
              </h4>
              <button
                onClick={() => copyToClipboard(terminalCommands)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs font-mono text-teal-300 overflow-x-auto leading-relaxed">
              {terminalCommands}
            </pre>

            <p className="text-[11px] text-slate-500">
              Tip: You can also use the AI Studio top bar settings menu to <strong>Export to GitHub</strong> with 1 click.
            </p>
          </div>
        </div>

        {/* Right: GitHub Actions Build Architecture (1 col) */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" />
                Automated APK Outputs
              </h3>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Release Mode
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              The repository contains <code className="text-amber-300">.github/workflows/build-apk.yml</code>. Whenever you push to <code className="text-slate-300">main</code>, GitHub Actions builds:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Junior Bee APK
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  flutter build apk -t lib/main_junior.dart --release
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Output: <strong className="text-white">Junior_Bee_G6_G8_Release.apk</strong>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Contains all G6-G8 subjects & 6 National Exams
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  Bee Kids Tigrinya APK
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  flutter build apk -t lib/main_kids.dart --release
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Output: <strong className="text-white">Bee_Kids_Tigrinya_Release.apk</strong>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Contains Singapore Math, Number Bonds & Video Reels
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  GitHub Artifacts
                </div>
                <div className="text-[11px] text-slate-400">
                  Directly downloadable from your repository&apos;s <strong>Actions</strong> tab as zip archives under <code className="text-emerald-300 font-mono">junior-apks</code> and <code className="text-emerald-300 font-mono">bee-kids-apks</code>.
                </div>
              </div>
            </div>

            {/* Quick Actions Link */}
            <div className="pt-2">
              <a
                href={actionsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Go to GitHub Actions</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
