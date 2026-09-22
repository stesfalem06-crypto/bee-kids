import { useState } from 'react';
import { KIDS_LEVELS, SAMPLE_VIDEO_PACKS } from '../data/singaporeMathTigrinya';
import { SingaporeMathLesson } from '../data/types';
import {
  Star,
  Play,
  Volume2,
  Video,
  Flame,
  Lock,
  Unlock,
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';

export function BeeKidsView() {
  const [activeTab, setActiveTab] = useState<'play' | 'videos'>('play');
  const [userStars, setUserStars] = useState(18);
  const [streakDays] = useState(7);
  const [activeLesson, setActiveLesson] = useState<SingaporeMathLesson | null>(null);

  // Lesson interactive state
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [manipulativeTaps, setManipulativeTaps] = useState<number>(0);

  // Video feed state
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  // Parent gate modal state
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [parentAnswer, setParentAnswer] = useState('');
  const [isParentUnlocked, setIsParentUnlocked] = useState(false);
  const [parentError, setParentError] = useState(false);

  // Audio synthesis helper
  const playAudioVoice = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch {}
  };

  const handleSelectChoice = (choice: number | string) => {
    if (!activeLesson) return;
    setSelectedAnswer(choice);
    const correct = choice.toString() === activeLesson.correctAnswer.toString();
    setIsAnswerCorrect(correct);

    if (correct) {
      setUserStars(prev => prev + activeLesson.rewardStars);
      playAudioVoice('ብጣዕሚ ጐበዝ! ሓቂ መልሲ!');
    } else {
      playAudioVoice('ደጊምካ ፈትን!');
    }
  };

  const handleParentGateSubmit = () => {
    if (parentAnswer.trim() === '56') {
      setIsParentUnlocked(true);
      setParentError(false);
    } else {
      setParentError(true);
    }
  };

  return (
    <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-4 sm:p-6 shadow-xl font-sans min-h-[560px] flex flex-col justify-between">
      <div>
        {/* Clean, Friendly Header */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200 flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 border border-amber-500 flex items-center justify-center text-2xl shadow-sm">
              🐝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-amber-950">
                  ቢ ኪድስ (Bee Kids)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] border border-amber-300">
                  ሲንጋፖር ሒሳብ
                </span>
              </div>
              <p className="text-xs font-medium text-amber-800">
                ዕድመ 4–10 • 100% ቋንቋ ትግርኛ • CPA ሜላ (ብኣቑሑት፣ ብስእልን ብቍጽርን)
              </p>
            </div>
          </div>

          {/* Quick Badges: Stars, Streaks, Parent Gate */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-amber-100/90 border border-amber-300 px-3 py-1.5 rounded-xl">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-base font-black text-amber-950 font-mono">{userStars}</span>
              <span className="text-xs font-semibold text-amber-800 hidden sm:inline">ከዋክብቲ</span>
            </div>

            <div className="flex items-center gap-1 bg-orange-100 border border-orange-300 px-3 py-1.5 rounded-xl">
              <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
              <span className="text-xs font-bold text-orange-950">{streakDays} መዓልቲ</span>
            </div>

            <button
              onClick={() => setIsParentModalOpen(true)}
              className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-slate-700 transition"
              title="Parent Gate"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Switcher: Lessons vs Video Pack */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-amber-200/60 p-1 rounded-2xl border border-amber-300/80 flex items-center gap-1 shadow-sm">
            <button
              onClick={() => {
                setActiveLesson(null);
                setActiveTab('play');
              }}
              className={`px-5 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                activeTab === 'play'
                  ? 'bg-amber-950 text-white shadow-md'
                  : 'text-amber-900 hover:bg-amber-300/50'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>ናይ ሒሳብ ደረጃታት (Lessons)</span>
            </button>

            <button
              onClick={() => {
                setActiveLesson(null);
                setActiveTab('videos');
              }}
              className={`px-5 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                activeTab === 'videos'
                  ? 'bg-amber-950 text-white shadow-md'
                  : 'text-amber-900 hover:bg-amber-300/50'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>ናይ ትምህርቲ ቪድዮ (Reels)</span>
            </button>
          </div>
        </div>

        {/* ACTIVE LESSON VIEW */}
        {activeLesson ? (
          <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-amber-300 shadow-xl max-w-2xl mx-auto my-2 text-center animate-in zoom-in-95 duration-200">
            {/* Lesson Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-bold text-xs">
                ደረጃ {activeLesson.level} • {activeLesson.titleEnglish}
              </span>
              <button
                onClick={() => {
                  setActiveLesson(null);
                  setSelectedAnswer(null);
                  setIsAnswerCorrect(null);
                }}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                ✕ ተመለስ (Exit)
              </button>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-amber-950 mb-2">
              {activeLesson.titleTigrinya}
            </h3>

            {/* Story & Voice prompt */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
              <p className="text-base md:text-lg font-bold text-amber-950 mb-2">
                &quot;{activeLesson.storyTigrinya}&quot;
              </p>
              <button
                onClick={() => playAudioVoice(activeLesson.audioVoicePrompt)}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-xl shadow-sm transition text-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>ስምዓዮ (Audio): {activeLesson.audioVoicePrompt}</span>
              </button>
            </div>

            {/* CPA MANIPULATIVE SECTION */}
            {activeLesson.manipulative && (
              <div className="my-5 p-5 bg-amber-50/60 rounded-2xl border-2 border-dashed border-amber-300">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
                  ብኢድካ ጠውቕ እሞ ቍጸር (Tap to count):
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {Array.from({ length: activeLesson.manipulative.count }).map((_, idx) => {
                    const isTapped = idx < manipulativeTaps;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setManipulativeTaps(idx + 1);
                          playAudioVoice(`${idx + 1}`);
                        }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform active:scale-90 shadow-sm ${
                          isTapped ? 'bg-red-500 scale-110 ring-4 ring-amber-400' : 'bg-red-400'
                        }`}
                      >
                        🍎
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 text-xs font-bold text-amber-900">
                  ዝተቖጽረ: {manipulativeTaps} / {activeLesson.manipulative.count}
                </div>
              </div>
            )}

            {/* NUMBER BONDS SECTION */}
            {activeLesson.numberBond && (
              <div className="my-5 p-5 bg-teal-50 rounded-2xl border border-teal-200 flex flex-col items-center">
                <div className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-3">
                  ናይ ቍጽሪ ምትእስሳር (Number Bond Model)
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                    {activeLesson.numberBond.whole}
                  </div>
                  <div className="w-1 h-4 bg-teal-400" />
                  <div className="flex items-center gap-8">
                    <div className="w-14 h-14 rounded-full bg-teal-100 border-2 border-teal-500 text-teal-950 font-black text-xl flex items-center justify-center shadow">
                      {activeLesson.numberBond.part1}
                    </div>
                    <div className="w-14 h-14 rounded-full bg-amber-100 border-2 border-dashed border-amber-500 text-amber-950 font-black text-xl flex items-center justify-center shadow">
                      {activeLesson.numberBond.part2 === '?' ? '?' : activeLesson.numberBond.part2}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ANSWER CHOICES */}
            <div className="mt-6">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
                ትክክለኛ መልሲ ምረጽ (Select the answer):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeLesson.choices.map((choice, i) => {
                  const isChosen = selectedAnswer === choice;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectChoice(choice)}
                      className={`py-3.5 px-3 rounded-2xl text-xl font-black transition active:scale-95 shadow-sm border-2 ${
                        isChosen
                          ? isAnswerCorrect
                            ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                            : 'bg-rose-500 text-white border-rose-600'
                          : 'bg-white hover:bg-amber-100 text-amber-950 border-amber-300'
                      }`}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FEEDBACK */}
            {isAnswerCorrect !== null && (
              <div className={`mt-5 p-4 rounded-2xl border-2 animate-in zoom-in-95 duration-200 ${
                isAnswerCorrect
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                  : 'bg-orange-100 border-orange-400 text-orange-950'
              }`}>
                {isAnswerCorrect ? (
                  <div>
                    <div className="text-lg font-black text-emerald-800 mb-1">
                      🎉 ብጣዕሚ ጐበዝ! (Awesome!)
                    </div>
                    <p className="text-xs font-bold">{activeLesson.explanationTigrinya}</p>
                    <button
                      onClick={() => {
                        setActiveLesson(null);
                        setSelectedAnswer(null);
                        setIsAnswerCorrect(null);
                      }}
                      className="mt-3 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md transition"
                    >
                      ቀጽል (Next Lesson)
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-orange-900 text-xs mb-0.5">ደጊምካ ፈትን! ሓሳብካ ኣስተውዕል።</div>
                    <p className="text-[11px] text-orange-800">ናይ ስእሉ ወይ ናይ ኣቑሑቱ ቍጽሪ መሊስካ ኣስተውዕሎ።</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* VIEW 1: LESSONS PATH */}
            {activeTab === 'play' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {KIDS_LEVELS.map(lvl => (
                  <div
                    key={lvl.level}
                    className="bg-white rounded-2xl p-5 border border-amber-200 hover:border-amber-300 transition shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="w-8 h-8 rounded-xl bg-amber-400 font-black text-base flex items-center justify-center text-amber-950 shadow-sm">
                          {lvl.level}
                        </span>
                        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full">
                          {lvl.ageRange}
                        </span>
                      </div>

                      <h4 className="text-base font-black text-amber-950 mb-1">
                        {lvl.titleTigrinya}
                      </h4>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {lvl.descriptionTigrinya}
                      </p>
                    </div>

                    {/* Lesson Buttons */}
                    <div className="space-y-2 pt-3 border-t border-amber-100">
                      {lvl.lessons.map(lesson => (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setActiveLesson(lesson);
                            setSelectedAnswer(null);
                            setIsAnswerCorrect(null);
                            setManipulativeTaps(0);
                          }}
                          className="w-full py-2.5 px-3.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl shadow-sm transition flex items-center justify-between group"
                        >
                          <span className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-800 fill-amber-600" />
                            <span>{lesson.titleTigrinya}</span>
                          </span>
                          <span className="text-[11px] bg-white/80 px-2 py-0.5 rounded font-bold">
                            ተጻወት ▶
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW 2: VIDEO REELS */}
            {activeTab === 'videos' && (
              <div className="max-w-md mx-auto bg-white rounded-2xl p-5 border border-amber-200 shadow-lg">
                <div className="text-center mb-3">
                  <span className="text-[11px] font-bold uppercase text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full">
                    ጥሙር ናይ ቪድዮ ቋጠሮ (.beekid)
                  </span>
                  <h3 className="text-base font-black text-amber-950 mt-1.5">
                    {SAMPLE_VIDEO_PACKS[activeVideoIdx].titleTigrinya}
                  </h3>
                </div>

                <div className="relative aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between p-4 border border-amber-300">
                  <img
                    src={SAMPLE_VIDEO_PACKS[activeVideoIdx].thumbnailUrl}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="px-2 py-0.5 bg-black/70 text-white rounded text-[10px] font-mono">
                      🔒 Encrypted
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500 text-slate-950 rounded text-[10px] font-bold">
                      {SAMPLE_VIDEO_PACKS[activeVideoIdx].duration}
                    </span>
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="w-14 h-14 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center mx-auto shadow-lg cursor-pointer hover:scale-110 transition">
                      <Play className="w-6 h-6 fill-amber-950 ml-0.5" />
                    </div>
                  </div>

                  <div className="relative z-10 bg-black/80 backdrop-blur-sm p-3 rounded-xl text-left">
                    <p className="text-xs font-bold text-white leading-snug">
                      {SAMPLE_VIDEO_PACKS[activeVideoIdx].titleTigrinya}
                    </p>
                    <div className="flex justify-between items-center mt-1.5 text-[10px] text-amber-300">
                      <span>ዓቐን: {SAMPLE_VIDEO_PACKS[activeVideoIdx].encryptedSize}</span>
                      <span>ናይ ደርፍን ሒሳብን</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-2 mt-3">
                  <button
                    onClick={() => setActiveVideoIdx(prev => (prev > 0 ? prev - 1 : SAMPLE_VIDEO_PACKS.length - 1))}
                    className="flex-1 py-2 bg-amber-100 hover:bg-amber-200 font-bold text-xs rounded-xl text-amber-950 transition"
                  >
                    ◀ ዝሓለፈ
                  </button>
                  <button
                    onClick={() => setActiveVideoIdx(prev => (prev < SAMPLE_VIDEO_PACKS.length - 1 ? prev + 1 : 0))}
                    className="flex-1 py-2 bg-amber-400 hover:bg-amber-500 font-bold text-xs rounded-xl text-amber-950 transition shadow-sm"
                  >
                    ቀጻሊ ▶
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PARENT GATE MODAL */}
      {isParentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-amber-950 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-600" />
                መእተዊ ወለዲ (Parent Gate)
              </h4>
              <button
                onClick={() => setIsParentModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!isParentUnlocked ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  ቅጥዕታት ንምኽፋት ነዚ ሕቶ መልስ:
                </p>
                <div className="p-3 bg-amber-100 rounded-xl text-lg font-black text-amber-950 font-mono">
                  7 × 8 = ?
                </div>
                <input
                  type="number"
                  placeholder="መልሲ..."
                  value={parentAnswer}
                  onChange={e => setParentAnswer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-center text-sm font-bold"
                />
                {parentError && (
                  <p className="text-xs text-rose-600 font-bold">ስሕተት መልሲ! ደጊምካ ፈትን።</p>
                )}
                <button
                  onClick={handleParentGateSubmit}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 font-bold text-xs text-amber-950 rounded-xl shadow"
                >
                  እቶ (Verify)
                </button>
              </div>
            ) : (
              <div className="text-left space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b">
                  <span>ናይ መዓልቲ ግዜ ደረት:</span>
                  <strong>20 ደቒቕ</strong>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span>ናይ ድምጺ ቅጥዒ:</span>
                  <strong>በርቲዑ ኣሎ</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span>ዝተኣከቡ ከዋክብቲ:</span>
                  <strong>{userStars} Stars</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
