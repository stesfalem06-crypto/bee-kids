import { UnitNotes } from '../data/types';
import { X, BookOpen, Lightbulb, CheckSquare, Sparkles, Image as ImageIcon } from 'lucide-react';
import { InteractiveStudyWidget } from './InteractiveStudyWidgets';

interface CurriculumNotesModalProps {
  unit: UnitNotes;
  onClose: () => void;
  onStartPractice: () => void;
}

export function CurriculumNotesModal({ unit, onClose, onStartPractice }: CurriculumNotesModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-800/80 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Grade {unit.grade} • Unit {unit.unitNumber}
              </span>
              <span className="text-xs text-slate-400">{unit.subject}</span>
              {unit.interactiveWidget && (
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400 animate-spin" /> Interactive Lab
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-white mt-1">{unit.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Summary */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Textbook Summary
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{unit.summary}</p>
          </div>

          {/* Interactive Widget Animation for Selected Units */}
          {unit.interactiveWidget && (
            <div>
              <InteractiveStudyWidget widgetType={unit.interactiveWidget} />
            </div>
          )}

          {/* Illustrations & Visual Diagrams */}
          {unit.illustrations && unit.illustrations.length > 0 && (
            <div className="bg-slate-950/50 p-4 rounded-xl border border-teal-500/30">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-teal-400" /> Illustrated Textbook Diagrams
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {unit.illustrations.map((ill, i) => (
                  <div key={i} className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex items-start gap-3">
                    <span className="text-2xl p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 shrink-0">
                      {ill.icon}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-teal-300">{ill.caption}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{ill.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Ideas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Key Ideas & Principles
            </h3>
            <div className="space-y-2">
              {unit.keyIdeas.map((idea, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <p className="text-xs md:text-sm text-slate-200">{idea}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Terms */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Vocabulary & Key Terms
            </h3>
            <div className="flex flex-wrap gap-2">
              {unit.keyTerms.map((term, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {unit.sections.map((sec, i) => (
              <div key={i} className="bg-slate-800/30 p-4 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">{sec.title}</h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">{sec.content}</p>
              </div>
            ))}
          </div>

          {/* Worked Examples */}
          {unit.examples.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Worked Textbook Examples
              </h3>
              <div className="space-y-4">
                {unit.examples.map((ex, i) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-amber-300 mb-1">{ex.title}</div>
                    <div className="text-xs md:text-sm text-slate-200 font-medium mb-3 italic">
                      "{ex.problem}"
                    </div>
                    <div className="space-y-1.5 mb-3 pl-3 border-l-2 border-teal-500/50">
                      {ex.solutionSteps.map((step, si) => (
                        <div key={si} className="text-xs text-slate-400">
                          {step}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg inline-block border border-emerald-500/20">
                      Final Answer: {ex.finalAnswer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-800/80 px-6 py-4 border-t border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {unit.exercises.length} practice questions available
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartPractice();
              }}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-lg"
            >
              <CheckSquare className="w-4 h-4" /> Practice Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
