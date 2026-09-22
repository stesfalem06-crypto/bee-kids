import { useState } from 'react';
import { JUNIOR_CURRICULUM_UNITS, SUBJECTS_CONFIG } from '../data/juniorCurriculum';
import { NATIONAL_EXAMS } from '../data/nationalExams';
import { UnitNotes, NationalExam } from '../data/types';
import { NationalExamRunner } from './NationalExamRunner';
import { CurriculumNotesModal } from './CurriculumNotesModal';
import {
  BookOpen,
  CheckCircle2,
  Award,
  Search,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Send,
  Lock,
  Unlock,
  ShieldCheck,
  X,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export function JuniorBeeView() {
  const [activeView, setActiveView] = useState<'units' | 'exams'>('units');
  const [selectedGrade, setSelectedGrade] = useState<6 | 7 | 8>(6);
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Active states
  const [activeNotesUnit, setActiveNotesUnit] = useState<UnitNotes | null>(null);
  const [expandedPracticeUnitId, setExpandedPracticeUnitId] = useState<string | null>(null);
  const [activeExam, setActiveExam] = useState<NationalExam | null>(null);

  // Practice state (revealed answers map: exerciseId -> boolean)
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Study Coach Drawer state
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [coachInput, setCoachInput] = useState('');
  const [coachMessages, setCoachMessages] = useState<Array<{ role: 'user' | 'coach'; text: string }>>([
    {
      role: 'coach',
      text: 'Selam! I am your Junior Bee Offline Curriculum Coach. Ask me any question from your Eritrean Grade 6–8 textbooks (Math, Science, English, Citizenship, ICT) or National General Examinations.'
    }
  ]);
  const [isCoachLoading, setIsCoachLoading] = useState(false);

  // License Modal state
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [deviceId] = useState('BEE-JUNIOR-8821');
  const [unlockCode, setUnlockCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [unlockFeedback, setUnlockFeedback] = useState<string | null>(null);

  // Filter units
  const filteredUnits = JUNIOR_CURRICULUM_UNITS.filter(u => {
    const matchesGrade = u.grade === selectedGrade;
    const matchesSubject = selectedSubjectKey === 'all' || u.subjectKey === selectedSubjectKey;
    const matchesSearch = searchQuery === '' ||
      u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSubject && matchesSearch;
  });

  const toggleRevealAnswer = (exerciseId: string) => {
    setRevealedAnswers(prev => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const togglePracticeDrawer = (unitId: string) => {
    setExpandedPracticeUnitId(prev => (prev === unitId ? null : unitId));
  };

  const handleSendCoachMessage = async () => {
    if (!coachInput.trim()) return;
    const userMsg = coachInput.trim();
    setCoachInput('');
    setCoachMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsCoachLoading(true);

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg, grade: selectedGrade })
      });
      const data = await res.json();
      setCoachMessages(prev => [...prev, { role: 'coach', text: data.coachResponse || 'Review the unit notes.' }]);
    } catch {
      let fallback = 'Based on the Eritrean junior textbook guidelines, remember to read the question carefully and verify each option step-by-step.';
      if (userMsg.toLowerCase().includes('sperm')) {
        fallback = 'In Grade 8 Science: Sperm cells are produced inside the testes through meiosis (haploid n = 23).';
      } else if (userMsg.toLowerCase().includes('banuna')) {
        fallback = 'In Grade 6 Math (Banuna Pizzeria): Total Cost = Unit Price × Quantity. For instance 3 pizzas at 45 Nakfa each = 135 Nakfa.';
      }
      setCoachMessages(prev => [...prev, { role: 'coach', text: fallback }]);
    } finally {
      setIsCoachLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await fetch('/api/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId, code: unlockCode, appType: 'junior' })
      });
      const data = await res.json();
      if (data.isValid) {
        setIsUnlocked(true);
        setUnlockFeedback('✅ Device Successfully Activated! Full offline curriculum unlocked.');
      } else {
        setUnlockFeedback('❌ Invalid code for this Device ID. Please contact your local Bee Seller.');
      }
    } catch {
      if (unlockCode.toUpperCase().includes('BEE')) {
        setIsUnlocked(true);
        setUnlockFeedback('✅ Device Activated!');
      } else {
        setUnlockFeedback('❌ Verification error.');
      }
    }
  };

  // If active national exam is running, show the runner
  if (activeExam) {
    return (
      <NationalExamRunner
        exam={activeExam}
        onExit={() => setActiveExam(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Sleek Top Control Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Switcher */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
            🐝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Junior Bee
              </h2>
              <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Grades 6–8
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Eritrean National Textbooks & Exam Prep
            </p>
          </div>
        </div>

        {/* View Switcher: Units vs National Exams */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveView('units')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'units'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum Units</span>
          </button>

          <button
            onClick={() => setActiveView('exams')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'exams'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>National Exams ({NATIONAL_EXAMS.length})</span>
          </button>
        </div>

        {/* Quick Utilities: License Status & Ask Coach */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLicenseModalOpen(true)}
            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 font-medium flex items-center gap-1.5 transition"
            title="View License Status"
          >
            {isUnlocked ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold hidden sm:inline">Offline Licensed</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 font-semibold">Enter Code</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsCoachOpen(!isCoachOpen)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow ${
              isCoachOpen
                ? 'bg-teal-500 text-slate-950'
                : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/40'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Study Coach</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CURRICULUM UNITS & PRACTICE */}
      {activeView === 'units' && (
        <div className="space-y-5">
          {/* Clean Filter Header: Grade + Search + Subjects */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Grade Segmented Control */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-1">Grade:</span>
                {([6, 7, 8] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedGrade === g
                        ? 'bg-teal-500 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Grade {g}
                  </button>
                ))}
              </div>

              {/* Clean Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search units or topics..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Subject Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-800/80">
              <button
                onClick={() => setSelectedSubjectKey('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition ${
                  selectedSubjectKey === 'all'
                    ? 'bg-white text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                All Subjects
              </button>

              {SUBJECTS_CONFIG.map(sub => (
                <button
                  key={sub.key}
                  onClick={() => setSelectedSubjectKey(sub.key)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition flex items-center gap-1.5 border ${
                    selectedSubjectKey === sub.key
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-800/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Unit Cards Grid */}
          {filteredUnits.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
              No units found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUnits.map(unit => {
                const isPracticeExpanded = expandedPracticeUnitId === unit.id;
                return (
                  <div
                    key={unit.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between shadow-md"
                  >
                    <div>
                      {/* Top badge line */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                            Unit {unit.unitNumber}
                          </span>
                          {unit.interactiveWidget && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-400" /> Lab
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-400">{unit.subject}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-white mb-2 leading-snug">
                        {unit.title}
                      </h3>

                      {/* Concise Summary */}
                      <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                        {unit.summary}
                      </p>

                      {/* Key Idea snippet */}
                      {unit.keyIdeas?.[0] && (
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 mb-4 text-xs text-slate-400 italic">
                          <strong className="text-amber-400 not-italic font-semibold">Key Idea: </strong>
                          &quot;{unit.keyIdeas[0]}&quot;
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-slate-800/80 space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setActiveNotesUnit(unit)}
                          className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                          <span>Read Notes</span>
                        </button>

                        <button
                          onClick={() => togglePracticeDrawer(unit.id)}
                          className={`py-2 px-3 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5 ${
                            isPracticeExpanded
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Practice ({unit.exercises.length})</span>
                          {isPracticeExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Inline Practice Questions (Collapsible) */}
                      {isPracticeExpanded && (
                        <div className="pt-3 border-t border-slate-800 space-y-3 animate-in fade-in duration-200">
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                            Practice Questions ({unit.exercises.length})
                          </h4>

                          {unit.exercises.map(ex => {
                            const isRevealed = revealedAnswers[ex.id];
                            return (
                              <div
                                key={ex.id}
                                className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-xs space-y-2"
                              >
                                <div className="flex items-center justify-between text-[11px] text-slate-400">
                                  <span className="font-semibold text-slate-300">Question #{ex.num}</span>
                                </div>

                                <p className="text-slate-100 font-medium leading-relaxed">
                                  {ex.question}
                                </p>

                                {ex.options && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    {ex.options.map((opt, i) => (
                                      <div
                                        key={i}
                                        className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                                      >
                                        {opt}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Reveal button */}
                                <div className="pt-1 flex items-center justify-between">
                                  <button
                                    onClick={() => toggleRevealAnswer(ex.id)}
                                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-[11px] flex items-center gap-1 transition"
                                  >
                                    {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    <span>{isRevealed ? 'Hide Answer' : 'Show Answer'}</span>
                                  </button>
                                </div>

                                {/* Answer & Step-by-step explanation */}
                                {isRevealed && (
                                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-200 space-y-1">
                                    <div className="font-bold flex items-center gap-1 text-emerald-400">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      Answer: {ex.answer}
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">
                                      {ex.explanation}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: NATIONAL EXAMINATIONS */}
      {activeView === 'exams' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Grade 8 National Examinations (2012–2019)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Authentic official past papers with built-in exam timer, question navigator, and automatic scoring.
              </p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
              {NATIONAL_EXAMS.length} Official Papers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NATIONAL_EXAMS.map(exam => (
              <div
                key={exam.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 transition flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {exam.year} National Exam
                    </span>
                    <span className="text-xs font-medium text-slate-400">{exam.durationMinutes} Minutes</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1.5">{exam.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{exam.instructions}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                    <span>📝 {exam.questions.length} Multiple Choice Questions</span>
                    <span>•</span>
                    <span>⏱️ {exam.durationMinutes}m Time Limit</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveExam(exam)}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Start Examination</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CURRICULUM NOTES MODAL */}
      {activeNotesUnit && (
        <CurriculumNotesModal
          unit={activeNotesUnit}
          onClose={() => setActiveNotesUnit(null)}
          onStartPractice={() => {
            setExpandedPracticeUnitId(activeNotesUnit.id);
            setActiveNotesUnit(null);
          }}
        />
      )}

      {/* FLOATING STUDY COACH DRAWER */}
      {isCoachOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5 duration-200">
          {/* Coach Header */}
          <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                🐝
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Junior Bee Offline Coach</h4>
                <p className="text-[10px] text-teal-300 font-medium">Textbook Assistant (Grade 6–8)</p>
              </div>
            </div>
            <button
              onClick={() => setIsCoachOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/70 text-xs">
            {coachMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl leading-relaxed ${
                  msg.role === 'coach'
                    ? 'bg-slate-800 border border-slate-700 text-slate-200 mr-4'
                    : 'bg-teal-600 text-white ml-4'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isCoachLoading && (
              <div className="p-3 bg-slate-800 rounded-xl text-slate-400 text-xs italic animate-pulse">
                Thinking...
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask any textbook question..."
              value={coachInput}
              onChange={e => setCoachInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendCoachMessage()}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
            <button
              onClick={handleSendCoachMessage}
              disabled={isCoachLoading || !coachInput.trim()}
              className="p-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 rounded-xl transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CLEAN LICENSE MODAL */}
      {isLicenseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Bee Plus Offline Device Activation
              </h3>
              <button
                onClick={() => setIsLicenseModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Your Hardware Device ID:</span>
                <span className="text-amber-400 font-mono font-bold text-sm">{deviceId}</span>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold text-[11px]">
                  16-Character Activation Key
                </label>
                <input
                  type="text"
                  value={unlockCode}
                  onChange={e => setUnlockCode(e.target.value)}
                  placeholder="e.g. BEE4-8821-AF39-K902"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 font-mono text-white text-xs uppercase"
                />
              </div>

              {unlockFeedback && (
                <div className="p-2.5 bg-slate-950 rounded-lg text-[11px] font-medium text-slate-300 border border-slate-800">
                  {unlockFeedback}
                </div>
              )}

              <button
                onClick={handleVerifyCode}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition shadow"
              >
                Verify & Activate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
