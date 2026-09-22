import { useState } from 'react';
import { JuniorBeeView } from './components/JuniorBeeView';
import { BeeKidsView } from './components/BeeKidsView';
import { ApkBuildStation } from './components/ApkBuildStation';
import { BeeSellerTools } from './components/BeeSellerTools';
import { Sparkles, GraduationCap, Wrench, UploadCloud, Key } from 'lucide-react';

export default function App() {
  const [currentModule, setCurrentModule] = useState<'junior' | 'kids' | 'apk' | 'seller'>('junior');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Sleek, Clean Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setCurrentModule('junior')}>
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-lg font-black shadow-md">
              🐝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-white">
                  Bee Plus
                </span>
                <span className="hidden sm:inline-block px-2 py-0.2 text-[10px] font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                  Eritrea
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                Junior Secondary (G6–G8) & Bee Kids
              </p>
            </div>
          </div>

          {/* Primary Learning Mode Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setCurrentModule('junior')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentModule === 'junior'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Junior Bee (G6–G8)</span>
            </button>

            <button
              onClick={() => setCurrentModule('kids')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentModule === 'kids'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>ቢ ኪድስ (Bee Kids)</span>
            </button>
          </div>

          {/* Discreet Developer & Offline Seller Tools */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentModule('apk')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border ${
                currentModule === 'apk'
                  ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/80'
              }`}
              title="GitHub Push & APK Build Station"
            >
              <UploadCloud className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Build APK</span>
            </button>

            <button
              onClick={() => setCurrentModule('seller')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border ${
                currentModule === 'seller'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/80'
              }`}
              title="Bee Seller License Generator"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Seller Tools</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Learning Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentModule === 'junior' && <JuniorBeeView />}
        {currentModule === 'kids' && <BeeKidsView />}
        {currentModule === 'apk' && <ApkBuildStation />}
        {currentModule === 'seller' && <BeeSellerTools />}
      </main>

      {/* Clean, Minimal Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-3 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <span>Bee Plus Eritrea • Ministry of Education Official Textbooks & Singapore Math</span>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Offline Activated</span>
            <span>•</span>
            <span className="text-teal-400 font-mono">100% Client/Offline Capable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
