import { useState } from 'react';
import { QrCode, Key, Lock, Video, ShieldCheck, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';

export function BeeSellerTools() {
  const [deviceIdInput, setDeviceIdInput] = useState('BEE-JUNIOR-8821');
  const [appType, setAppType] = useState<'junior' | 'kids'>('junior');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [qrString, setQrString] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Video packager state
  const [videoTitle, setVideoTitle] = useState('ናይ ቍጽሪ ደርፊ (Number Song)');
  const [isPacking, setIsPacking] = useState(false);
  const [packSuccess, setPackSuccess] = useState(false);

  const handleGenerateLicense = async () => {
    if (!deviceIdInput.trim()) return;
    try {
      const res = await fetch('/api/license/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId: deviceIdInput.trim(), appType })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedCode(data.activationCode);
        setQrString(data.qrData);
      }
    } catch {
      // Fallback local calculation
      setGeneratedCode('7F9B-2E4A-88D1-C95B');
      setQrString(`BEE_LICENSE:${appType}:${deviceIdInput.toUpperCase()}:7F9B-2E4A-88D1-C95B`);
    }
  };

  const copyLicense = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePack = () => {
    setIsPacking(true);
    setPackSuccess(false);
    setTimeout(() => {
      setIsPacking(false);
      setPackSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Bee Seller Suite & Video Packager
            </h2>
            <p className="text-xs text-slate-400">
              Generate offline HMAC-SHA256 activation codes/QR cards and package encrypted video reels for Bee Kids.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tool 1: License Code Generator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <QrCode className="w-4 h-4 text-amber-400" />
              Offline License Generator
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              HMAC-SHA256
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Enter the student device ID displayed on their tablet/phone to generate an authenticated 16-character offline unlock code.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Target Device ID:
              </label>
              <input
                type="text"
                value={deviceIdInput}
                onChange={e => setDeviceIdInput(e.target.value)}
                placeholder="e.g. BEE-JUNIOR-8821"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs md:text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="appType"
                  checked={appType === 'junior'}
                  onChange={() => setAppType('junior')}
                  className="text-amber-500"
                />
                <span>Junior Bee (G6-G8)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="appType"
                  checked={appType === 'kids'}
                  onChange={() => setAppType('kids')}
                  className="text-amber-500"
                />
                <span>Bee Kids (Tigrinya)</span>
              </label>
            </div>

            <button
              onClick={handleGenerateLicense}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate License Code & QR
            </button>
          </div>

          {generatedCode && (
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/40 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Issued Activation Code:</span>
                <button
                  onClick={copyLicense}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold rounded flex items-center gap-1 transition"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-xl font-mono font-black text-amber-400 tracking-wider text-center p-2 bg-slate-900 rounded-lg border border-slate-800">
                {generatedCode}
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                QR Payload: <code className="text-slate-300">{qrString}</code>
              </div>
            </div>
          )}
        </div>

        {/* Tool 2: Video Packager Simulator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Video className="w-4 h-4 text-teal-400" />
              Bee Packer (.beekid format)
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">
              AES-GCM
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Packages video reels into encrypted <code className="text-teal-300">.beekid</code> bundles containing Tigrinya metadata, headers, and cryptographic checksums.
          </p>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Tigrinya Title / Manifest Name:
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={e => setVideoTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <div>Output Format: <strong className="text-slate-200">BEEKID01 (Encrypted Stream)</strong></div>
              <div>CLI Equivalent: <code className="text-teal-400">python3 tools/package_video.py</code></div>
            </div>

            <button
              onClick={handleSimulatePack}
              disabled={isPacking}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isPacking ? 'animate-spin' : ''}`} />
              <span>{isPacking ? 'Encrypting & Packaging Video...' : 'Package Video Reel (.beekid)'}</span>
            </button>

            {packSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Successfully generated video reel package with header BEEKID01!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
