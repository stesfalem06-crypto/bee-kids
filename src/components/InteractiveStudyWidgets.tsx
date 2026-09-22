import React, { useState } from 'react';
import { Pizza, Eye, Calculator, Compass, Sparkles, Check, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface WidgetProps {
  widgetType: 'pizzeria' | 'pythagoras' | 'microscope' | 'cell_division' | 'zobas_map' | 'primes' | 'fraction_model';
}

export function InteractiveStudyWidget({ widgetType }: WidgetProps) {
  switch (widgetType) {
    case 'pizzeria':
      return <PizzeriaInteractiveWidget />;
    case 'pythagoras':
      return <PythagorasInteractiveWidget />;
    case 'microscope':
      return <MicroscopeInteractiveWidget />;
    case 'cell_division':
      return <CellDivisionInteractiveWidget />;
    case 'zobas_map':
      return <ZobasMapInteractiveWidget />;
    case 'primes':
      return <PrimesInteractiveWidget />;
    default:
      return null;
  }
}

// 1. BANUNA PIZZERIA INTERACTIVE EQUATION BALANCER
function PizzeriaInteractiveWidget() {
  const [slices, setSlices] = useState(3);
  const [juices, setJuices] = useState(2);
  const pizzaPrice = 25;
  const juicePrice = 15;
  const total = slices * pizzaPrice + juices * juicePrice;

  return (
    <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-5 rounded-2xl border-2 border-amber-500/40 my-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-amber-500/30 pb-2">
        <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider">
          <Pizza className="w-5 h-5 text-amber-400 animate-bounce" />
          <span>Interactive Lab: Banuna Pizzeria Equation Balancer</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
          Grade 6 Math Unit 1
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-4">
        Change the quantity of pizza slices and fresh juices to see how the mathematical linear relation updates in real time:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Pizza Slices */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-amber-500/30">
          <div className="flex justify-between text-xs font-bold text-amber-300 mb-2">
            <span>🍕 Pizza Slices (p): {slices}</span>
            <span>25 Nakfa / slice</span>
          </div>
          <input
            type="range"
            min="0"
            max="8"
            value={slices}
            onChange={(e) => setSlices(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex gap-1.5 mt-2 flex-wrap min-h-[28px]">
            {Array.from({ length: slices }).map((_, i) => (
              <span key={i} className="text-lg animate-pulse" title="Pizza slice">🍕</span>
            ))}
          </div>
        </div>

        {/* Juices */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-teal-500/30">
          <div className="flex justify-between text-xs font-bold text-teal-300 mb-2">
            <span>🧃 Fresh Juices (j): {juices}</span>
            <span>15 Nakfa / juice</span>
          </div>
          <input
            type="range"
            min="0"
            max="8"
            value={juices}
            onChange={(e) => setJuices(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
          />
          <div className="flex gap-1.5 mt-2 flex-wrap min-h-[28px]">
            {Array.from({ length: juices }).map((_, i) => (
              <span key={i} className="text-lg animate-pulse" title="Juice">🧃</span>
            ))}
          </div>
        </div>
      </div>

      {/* Formula & Live Calculation Box */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono">
        <div className="text-xs text-slate-400 mb-1">Linear Cost Equation: C = 25p + 15j</div>
        <div className="text-sm md:text-base font-bold text-white flex items-center justify-center gap-2 flex-wrap">
          <span>Cost = (25 × <span className="text-amber-400">{slices}</span>)</span>
          <span>+</span>
          <span>(15 × <span className="text-teal-400">{juices}</span>)</span>
          <span>=</span>
          <span className="text-xl text-emerald-400 font-black underline decoration-emerald-500/50">
            {total} Nakfa
          </span>
        </div>
      </div>
    </div>
  );
}

// 2. PYTHAGOREAN THEOREM INTERACTIVE LAB
function PythagorasInteractiveWidget() {
  const [a, setA] = useState(6);
  const [b, setB] = useState(8);
  const cSquared = a * a + b * b;
  const c = Math.sqrt(cSquared);

  return (
    <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 p-5 rounded-2xl border-2 border-indigo-500/40 my-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-indigo-500/30 pb-2">
        <div className="flex items-center gap-2 text-indigo-400 font-black text-sm uppercase tracking-wider">
          <Compass className="w-5 h-5 text-indigo-400" />
          <span>Interactive Lab: Pythagorean Theorem (a² + b² = c²)</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
          Grade 8 Math Unit 1
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <div className="space-y-3 mb-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-amber-300 mb-1">
                <span>Side a (Base): {a} cm</span>
                <span>a² = {a * a}</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-teal-300 mb-1">
                <span>Side b (Height): {b} cm</span>
                <span>b² = {b * b}</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full accent-teal-500"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-slate-400">Step 1: a² + b² = {a}² + {b}²</div>
            <div className="text-slate-400">Step 2: c² = {a * a} + {b * b} = {cSquared}</div>
            <div className="text-emerald-400 font-bold text-sm">
              Step 3: Hypotenuse c = √{cSquared} = {Number.isInteger(c) ? c : c.toFixed(2)} cm
            </div>
          </div>
        </div>

        {/* Dynamic SVG Visualizer */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
          <svg width="220" height="180" viewBox="0 0 220 180" className="overflow-visible">
            {/* Right Triangle */}
            <polygon
              points={`30,150 ${30 + a * 12},150 30,${150 - b * 10}`}
              fill="rgba(99, 102, 241, 0.2)"
              stroke="#818cf8"
              strokeWidth="3"
            />
            {/* Right-angle marker */}
            <rect x="30" y={150 - 15} width="15" height="15" fill="none" stroke="#f59e0b" strokeWidth="2" />
            {/* Label a */}
            <text x={30 + (a * 12) / 2} y="168" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
              a = {a} cm
            </text>
            {/* Label b */}
            <text x="18" y={150 - (b * 10) / 2} fill="#14b8a6" fontSize="12" fontWeight="bold" textAnchor="end">
              b = {b} cm
            </text>
            {/* Label c */}
            <text
              x={30 + (a * 12) / 2 + 10}
              y={150 - (b * 10) / 2 - 5}
              fill="#34d399"
              fontSize="12"
              fontWeight="bold"
              textAnchor="start"
            >
              c = {Number.isInteger(c) ? c : c.toFixed(1)}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// 3. OPTICAL LIGHT MICROSCOPE SIMULATOR
function MicroscopeInteractiveWidget() {
  const [eyepiece, setEyepiece] = useState(10);
  const [objective, setObjective] = useState(40);
  const [specimen, setSpecimen] = useState<'plant' | 'animal'>('plant');
  const [focus, setFocus] = useState(90);

  const totalMagnification = eyepiece * objective;
  const blurAmount = Math.abs(100 - focus) / 10;

  return (
    <div className="bg-gradient-to-br from-teal-950/40 via-slate-900 to-slate-950 p-5 rounded-2xl border-2 border-teal-500/40 my-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-teal-500/30 pb-2">
        <div className="flex items-center gap-2 text-teal-400 font-black text-sm uppercase tracking-wider">
          <Eye className="w-5 h-5 text-teal-400" />
          <span>Interactive Lab: Compound Light Microscope Specimen Explorer</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
          Grade 6 Science Unit 1
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => setSpecimen('plant')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                specimen === 'plant'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              🌿 Onion Epidermal Plant Cell
            </button>
            <button
              onClick={() => setSpecimen('animal')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                specimen === 'animal'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              🔬 Cheek Epithelial Animal Cell
            </button>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Objective Lens:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[4, 10, 40].map((pow) => (
                <button
                  key={pow}
                  onClick={() => setObjective(pow)}
                  className={`py-1 rounded text-xs font-bold border transition ${
                    objective === pow
                      ? 'bg-teal-500 text-slate-950 border-teal-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {pow}x {pow === 4 ? '(Low)' : pow === 10 ? '(Medium)' : '(High)'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Fine Focus Wheel</span>
              <span>{focus === 100 ? '✨ Sharp Focus!' : 'Adjust to 100'}</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={focus}
              onChange={(e) => setFocus(Number(e.target.value))}
              className="w-full accent-teal-400"
            />
          </div>

          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs font-mono text-center">
            Total Magnification = {eyepiece}x (Eyepiece) × {objective}x (Objective) ={' '}
            <span className="font-bold text-teal-300">{totalMagnification}x</span>
          </div>
        </div>

        {/* Microscope Viewport Circle */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 rounded-full border-4 border-slate-700 bg-slate-950 relative overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Specimen SVG */}
            <div
              style={{
                filter: `blur(${blurAmount}px)`,
                transform: `scale(${objective === 4 ? 0.8 : objective === 10 ? 1.2 : 1.8})`,
                transition: 'all 0.3s ease'
              }}
              className="w-36 h-36 flex items-center justify-center"
            >
              {specimen === 'plant' ? (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Plant Cell with Rectangular Cell Wall */}
                  <rect x="10" y="10" width="80" height="80" rx="8" fill="#14532d" stroke="#22c55e" strokeWidth="4" />
                  <rect x="16" y="16" width="68" height="68" rx="6" fill="#166534" stroke="#86efac" strokeWidth="2" />
                  {/* Large Central Vacuole */}
                  <ellipse cx="50" cy="50" rx="25" ry="20" fill="#0284c7" opacity="0.6" />
                  {/* Nucleus */}
                  <circle cx="30" cy="35" r="9" fill="#e11d48" />
                  {/* Chloroplasts */}
                  <circle cx="70" cy="30" r="5" fill="#4ade80" />
                  <circle cx="75" cy="65" r="5" fill="#4ade80" />
                  <circle cx="35" cy="70" r="5" fill="#4ade80" />
                </svg>
              ) : (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Animal Cell - Irregular Oval */}
                  <path
                    d="M 20,50 Q 25,20 50,18 Q 78,16 82,45 Q 85,75 55,82 Q 22,85 20,50 Z"
                    fill="#3b82f6"
                    opacity="0.5"
                    stroke="#60a5fa"
                    strokeWidth="3"
                  />
                  {/* Centered Nucleus */}
                  <circle cx="50" cy="48" r="14" fill="#9333ea" />
                  <circle cx="50" cy="48" r="5" fill="#581c87" />
                  {/* Mitochondria */}
                  <ellipse cx="32" cy="65" rx="7" ry="4" fill="#f97316" />
                  <ellipse cx="68" cy="30" rx="6" ry="4" fill="#f97316" />
                </svg>
              )}
            </div>
            {/* Crosshair Overlay */}
            <div className="absolute inset-0 pointer-events-none border-b border-r border-teal-500/20" />
          </div>
          <span className="text-[11px] text-slate-400 mt-2">
            Specimen: {specimen === 'plant' ? 'Plant Cell (Cell Wall & Chloroplasts)' : 'Animal Cell (Flexible Membrane)'}
          </span>
        </div>
      </div>
    </div>
  );
}

// 4. MEIOSIS VS MITOSIS CELL DIVISION LAB
function CellDivisionInteractiveWidget() {
  const [mode, setMode] = useState<'meiosis' | 'mitosis'>('meiosis');
  const [step, setStep] = useState(1);

  return (
    <div className="bg-gradient-to-br from-violet-950/40 via-slate-900 to-slate-950 p-5 rounded-2xl border-2 border-violet-500/40 my-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-violet-500/30 pb-2">
        <div className="flex items-center gap-2 text-violet-400 font-black text-sm uppercase tracking-wider">
          <Sparkles className="w-5 h-5 text-violet-400" />
          <span>Interactive Lab: Cell Division (Meiosis vs Mitosis)</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40">
          Grade 8 Science Unit 1
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setMode('meiosis');
            setStep(1);
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
            mode === 'meiosis'
              ? 'bg-violet-600 text-white border-violet-400'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          Meiosis (Sex Cells / 4 Haploid Gametes n=23)
        </button>
        <button
          onClick={() => {
            setMode('mitosis');
            setStep(1);
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
            mode === 'mitosis'
              ? 'bg-indigo-600 text-white border-indigo-400'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          Mitosis (Body Cells / 2 Diploid Clones 2n=46)
        </button>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-slate-300 font-bold">
            Division Stage: Step {step} of 3
          </span>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`w-7 h-7 rounded-full text-xs font-bold border transition ${
                  step === s ? 'bg-violet-500 text-slate-950 border-violet-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Animation Box */}
        <div className="min-h-[110px] flex items-center justify-center p-3 bg-slate-900/60 rounded-lg border border-slate-800">
          {step === 1 && (
            <div className="flex flex-col items-center gap-1 animate-in zoom-in-75">
              <div className="w-16 h-16 rounded-full bg-violet-600/40 border-2 border-violet-400 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                2n = 46
              </div>
              <span className="text-xs text-slate-300">Parent Cell (Diploid Gonad / Somatic)</span>
            </div>
          )}

          {step === 2 && (
            <div className="flex items-center gap-6 animate-in zoom-in-75">
              <div className="w-14 h-14 rounded-full bg-indigo-600/40 border-2 border-indigo-400 flex items-center justify-center text-xs font-bold text-white">
                {mode === 'meiosis' ? 'n = 23 (dup)' : '2n = 46'}
              </div>
              <div className="w-14 h-14 rounded-full bg-indigo-600/40 border-2 border-indigo-400 flex items-center justify-center text-xs font-bold text-white">
                {mode === 'meiosis' ? 'n = 23 (dup)' : '2n = 46'}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex items-center gap-3 flex-wrap justify-center animate-in zoom-in-75">
              {mode === 'meiosis' ? (
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-emerald-600/40 border-2 border-emerald-400 flex flex-col items-center justify-center text-[10px] font-bold text-white shadow"
                    >
                      <span>n = 23</span>
                      <span className="text-[8px] text-emerald-300">gamete</span>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-14 h-14 rounded-full bg-sky-600/40 border-2 border-sky-400 flex flex-col items-center justify-center text-xs font-bold text-white shadow"
                    >
                      <span>2n = 46</span>
                      <span className="text-[9px] text-sky-200">clone</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        <div className="text-xs text-slate-300 mt-3 bg-slate-900 p-2.5 rounded border border-slate-800">
          {mode === 'meiosis'
            ? 'Meiosis produces 4 genetically unique haploid gametes (sperm/egg) with 23 chromosomes for sexual reproduction.'
            : 'Mitosis produces 2 identical diploid daughter cells (46 chromosomes) for somatic body growth and tissue repair.'}
        </div>
      </div>
    </div>
  );
}

// 5. ERITREA 6 ZOBAS INTERACTIVE GEOGRAPHY EXPLORER
function ZobasMapInteractiveWidget() {
  const [selectedZoba, setSelectedZoba] = useState('Gash-Barka');

  const zobasData: Record<
    string,
    { capital: string; terrain: string; crops: string; landmark: string; color: string }
  > = {
    'Gash-Barka': {
      capital: 'Barentu',
      terrain: 'Fertile western plains, Barka and Gash river basins',
      crops: 'Sorghum, Sesame, Cotton, Bananas, Livestock',
      landmark: 'Bisha Mine, Fikrina Farm, Agordat historic mosque',
      color: '#10b981'
    },
    Maekel: {
      capital: 'Asmara (National Capital)',
      terrain: 'Highland plateau at 2,325m above sea level, temperate climate',
      crops: 'Vegetables, Dairy, Flowers, Poultry',
      landmark: 'UNESCO Modernist Architecture of Asmara, Cinema Impero',
      color: '#f59e0b'
    },
    Debub: {
      capital: 'Mendefera',
      terrain: 'Cool mountain ranges, terrace agriculture, highest peak Emba Soira (3,018m)',
      crops: 'Teff, Wheat, Barley, Legumes',
      landmark: 'Metera Obelisk, Kohaito archaeological plateau',
      color: '#3b82f6'
    },
    Anseba: {
      capital: 'Keren',
      terrain: 'Picturesque granitic hills and Anseba river valley',
      crops: 'Citrus fruits, Guavas, Papayas, Onions, Cattle',
      landmark: 'Tigu Fort, Shrine of St. Mary of Da\'ari',
      color: '#ec4899'
    },
    'Semenawi Keyih Bahri': {
      capital: 'Massawa',
      terrain: 'Northern Red Sea coast, Green Belt (Filfil Solomona), Dahlik archipelago',
      crops: 'Coffee, Marine fisheries, Salt mining, Dates',
      landmark: 'Massawa Ottoman Port, Sheikh Hanafi Mosque, Dahlik Islands',
      color: '#06b6d4'
    },
    'Debubawi Keyih Bahri': {
      capital: 'Assab',
      terrain: 'Southern Red Sea coast, volcanic Danakil Depression, salt pans',
      crops: 'Salt extraction, Deep sea fisheries, Maritime shipping',
      landmark: 'Port of Assab, Danakil Rift Valley, Ras Doumeira',
      color: '#8b5cf6'
    }
  };

  const curr = zobasData[selectedZoba];

  return (
    <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-5 rounded-2xl border-2 border-emerald-500/40 my-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-emerald-500/30 pb-2">
        <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
          <Compass className="w-5 h-5 text-emerald-400" />
          <span>Interactive Lab: The Six Zobas & Geography of Eritrea</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          Grade 6 Social Studies
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {Object.keys(zobasData).map((name) => (
          <button
            key={name}
            onClick={() => setSelectedZoba(name)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition border ${
              selectedZoba === name
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-black scale-102'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Selected Zoba Details Card */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: curr.color }} />
            Zoba {selectedZoba}
          </h4>
          <span className="text-xs font-mono font-bold text-amber-400">
            Capital: {curr.capital}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-1 font-bold">Terrain & Geography:</span>
            <span className="text-slate-200">{curr.terrain}</span>
          </div>
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-1 font-bold">Agriculture & Resources:</span>
            <span className="text-emerald-300">{curr.crops}</span>
          </div>
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 block mb-1 font-bold">Heritage & Landmarks:</span>
            <span className="text-amber-300">{curr.landmark}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. SIEVE OF ERATOSTHENES PRIMES INTERACTIVE LAB
function PrimesInteractiveWidget() {
  const [filterMultiple, setFilterMultiple] = useState<number | null>(null);

  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

  return (
    <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-5 rounded-2xl border-2 border-amber-500/40 my-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-amber-500/30 pb-2">
        <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider">
          <Calculator className="w-5 h-5 text-amber-400" />
          <span>Interactive Lab: Sieve of Eratosthenes (Primes 1 to 50)</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
          Grade 6 Math Unit 3
        </span>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="text-xs text-slate-300 self-center">Filter composite multiples:</span>
        {[2, 3, 5, 7].map((m) => (
          <button
            key={m}
            onClick={() => setFilterMultiple(filterMultiple === m ? null : m)}
            className={`px-3 py-1 rounded text-xs font-bold border transition ${
              filterMultiple === m
                ? 'bg-amber-500 text-slate-950 border-amber-300'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            Multiples of {m}
          </button>
        ))}
        {filterMultiple && (
          <button
            onClick={() => setFilterMultiple(null)}
            className="px-2 py-1 rounded text-xs text-slate-400 hover:text-white"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-10 gap-1.5 p-3 bg-slate-950 rounded-xl border border-slate-800">
        {numbers.map((n) => {
          const isPrime = primes.includes(n);
          const isFiltered = filterMultiple && n !== filterMultiple && n % filterMultiple === 0;

          let bg = 'bg-slate-800 text-slate-300';
          if (n === 1) bg = 'bg-slate-900 text-slate-600 line-through';
          else if (isFiltered) bg = 'bg-red-950/60 text-red-500 line-through opacity-50';
          else if (isPrime) bg = 'bg-emerald-600 text-white font-black shadow';

          return (
            <div
              key={n}
              className={`h-7 rounded flex items-center justify-center text-xs font-mono transition-all ${bg}`}
              title={isPrime ? `${n} is Prime!` : `${n}`}
            >
              {n}
            </div>
          );
        })}
      </div>
      <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-4 justify-between">
        <span>Green = Prime Numbers (Divisible strictly by 1 and itself)</span>
        <span>Total primes up to 50: {primes.length}</span>
      </div>
    </div>
  );
}
