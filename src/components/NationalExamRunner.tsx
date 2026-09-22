import { useState, useEffect } from 'react';
import { NationalExam, ExamQuestion } from '../data/types';
import { Clock, CheckCircle, AlertCircle, Award, RotateCcw, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface NationalExamRunnerProps {
  exam: NationalExam;
  onExit: () => void;
}

export function NationalExamRunner({ exam, onExit }: NationalExamRunnerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [timeLeft, setTimeLeft] = useState(exam.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (qNum: number, choice: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qNum]: choice }));
  };

  const questions = exam.questions;
  const currentQ = questions[currentIdx] || questions[0];

  // Calculate score
  let correctCount = 0;
  questions.forEach(q => {
    if (selectedAnswers[q.num] === q.correctAnswer) {
      correctCount++;
    }
  });
  const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  if (isSubmitted && !showReview) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-2xl text-center">
        <div className="inline-flex p-4 rounded-full bg-amber-500/20 text-amber-400 mb-4">
          <Award className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Examination Completed!</h2>
        <p className="text-slate-400 mb-6">{exam.title}</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div className="text-3xl font-black text-amber-400">{correctCount} / {questions.length}</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Correct Answers</div>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div className="text-3xl font-black text-teal-400">{scorePercent}%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">National Grade</div>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div className="text-3xl font-black text-sky-400">{Object.keys(selectedAnswers).length}</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold">Attempted</div>
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-left mb-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Official Eritrean MOE Grading Standard
          </div>
          <p className="text-xs text-slate-400">
            {scorePercent >= 75
              ? 'Distinction (A): Outstanding mastery of the junior secondary curriculum!'
              : scorePercent >= 60
              ? 'Credit (B): Solid understanding of key concepts.'
              : scorePercent >= 50
              ? 'Pass (C): Satisfactory. Focus on reviewing weaker topics.'
              : 'Review Needed: Recommended to revisit unit notes and worked examples.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setShowReview(true)}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition shadow-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Review All Answers & Explanations
          </button>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition border border-slate-700"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
      {/* Exam Header */}
      <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              National Examination
            </span>
            <span className="text-xs text-slate-400">Version {exam.version} • {exam.year}</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">{exam.title}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
            timeLeft < 300 ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse' : 'bg-slate-950 border-slate-700 text-amber-400'
          }`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={() => {
              if (isSubmitted) {
                onExit();
              } else if (confirm('Are you sure you want to submit your examination paper now?')) {
                setIsSubmitted(true);
              }
            }}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition"
          >
            {isSubmitted ? 'Close Review' : 'Submit Paper'}
          </button>
        </div>
      </div>

      {/* Main Examination View */}
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[480px]">
        {/* Question Area (3 cols) */}
        <div className="md:col-span-3 p-6 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              {isSubmitted && (
                <span className={`font-semibold flex items-center gap-1 ${
                  selectedAnswers[currentQ.num] === currentQ.correctAnswer ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {selectedAnswers[currentQ.num] === currentQ.correctAnswer ? (
                    <><CheckCircle className="w-4 h-4" /> Correct</>
                  ) : (
                    <><AlertCircle className="w-4 h-4" /> Incorrect (Key: {currentQ.correctAnswer})</>
                  )}
                </span>
              )}
            </div>

            <h3 className="text-base md:text-lg font-medium text-slate-100 mb-6 leading-relaxed">
              <span className="font-bold text-amber-400 mr-2">{currentQ.num}.</span>
              {currentQ.question}
            </h3>

            {/* Choices */}
            <div className="space-y-3">
              {(['A', 'B', 'C', 'D'] as const).map(letter => {
                const text = currentQ.options[letter];
                const isSelected = selectedAnswers[currentQ.num] === letter;
                const isCorrect = currentQ.correctAnswer === letter;

                let optStyle = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:border-slate-500';
                if (isSubmitted) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    optStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 line-through';
                  }
                } else if (isSelected) {
                  optStyle = 'bg-teal-500/20 border-teal-500 text-teal-200 font-semibold shadow-md';
                }

                return (
                  <button
                    key={letter}
                    onClick={() => handleSelectAnswer(currentQ.num, letter)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border transition flex items-center gap-3.5 ${optStyle}`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                      isSelected ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm">{text}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box during review */}
            {isSubmitted && (
              <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1 flex items-center justify-between">
                    <span>Eritrean Curriculum Step-by-Step Explanation</span>
                    <span className="text-emerald-400 font-bold">
                      Correct Answer: [{currentQ.correctAnswer}]
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentQ.explanation}
                  </p>
                </div>

                {/* Linked Previous Years Similar Questions */}
                {currentQ.similarQuestions && currentQ.similarQuestions.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
                      <span>🔗 Similar Question in Previous National Examinations</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentQ.similarQuestions.map((sim, si) => (
                        <span
                          key={si}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono"
                        >
                          {sim}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
            <button
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold rounded-lg text-slate-300 flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-xs text-slate-400">
              {currentIdx + 1} / {questions.length}
            </span>
            <button
              onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIdx === questions.length - 1}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold rounded-lg text-slate-300 flex items-center gap-1.5 transition"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Answer Sheet Bubble Grid (1 col) */}
        <div className="p-4 bg-slate-950/60 overflow-y-auto max-h-[500px]">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Answer Sheet Grid
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.num] !== undefined;
              const isCurrent = idx === currentIdx;
              const isCorrect = isSubmitted && selectedAnswers[q.num] === q.correctAnswer;
              const isWrong = isSubmitted && isAnswered && !isCorrect;

              let cellStyle = 'bg-slate-800/80 text-slate-400 border-slate-700';
              if (isSubmitted) {
                if (isCorrect) cellStyle = 'bg-emerald-600 text-white font-bold border-emerald-500';
                else if (isWrong) cellStyle = 'bg-rose-600 text-white font-bold border-rose-500';
                else cellStyle = 'bg-slate-900 text-slate-600 border-slate-800';
              } else if (isAnswered) {
                cellStyle = 'bg-teal-600 text-white font-bold border-teal-500';
              }

              return (
                <button
                  key={q.num}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-8 rounded text-xs font-mono border transition flex items-center justify-center ${cellStyle} ${
                    isCurrent ? 'ring-2 ring-amber-400' : ''
                  }`}
                >
                  {q.num}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
