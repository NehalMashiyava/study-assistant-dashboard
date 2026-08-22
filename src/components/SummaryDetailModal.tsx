import React from 'react';
import { 
  X, 
  Clock, 
  Tag, 
  Copy, 
  Check, 
  Sparkles, 
  ListChecks, 
  Layers, 
  BookA, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { SummaryItem } from '../types';

interface SummaryDetailModalProps {
  summary: SummaryItem | null;
  onClose: () => void;
}

export const SummaryDetailModal: React.FC<SummaryDetailModalProps> = ({ summary, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!summary) return null;

  const handleCopy = () => {
    let formattedText = `# ${summary.title}\nSubject: ${summary.subject}\nEstimated Reading Time: ${summary.readingTimeMinutes} min\n\n`;

    if (summary.tldr) {
      formattedText += `## TL;DR\n${summary.tldr}\n\n`;
    } else {
      formattedText += `## Overview\n${summary.excerpt}\n\n`;
    }

    const concepts = summary.coreConcepts || summary.bulletPoints;
    if (concepts && concepts.length > 0) {
      formattedText += `## Core Concepts\n${concepts.map(c => `- ${c}`).join('\n')}\n\n`;
    }

    if (summary.detailedBreakdown && summary.detailedBreakdown.length > 0) {
      formattedText += `## Detailed Breakdown\n`;
      summary.detailedBreakdown.forEach((item) => {
        formattedText += `### ${item.conceptTitle}\n${item.explanation}\n`;
        if (item.examples && item.examples.length > 0) {
          formattedText += `Examples & Evidence:\n${item.examples.map(ex => `  * ${ex}`).join('\n')}\n`;
        }
        formattedText += `\n`;
      });
    } else if (summary.fullContent) {
      formattedText += `## Detailed Notes\n${summary.fullContent}\n\n`;
    }

    if (summary.keyVocabulary && summary.keyVocabulary.length > 0) {
      formattedText += `## Key Vocabulary\n`;
      summary.keyVocabulary.forEach(v => {
        formattedText += `- **${v.term}**: ${v.definition}\n`;
      });
      formattedText += `\n`;
    }

    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const coreConceptsList = summary.coreConcepts || summary.bulletPoints || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 my-8 w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-100">
                {summary.subject}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="h-3.5 w-3.5" />
                <span>{summary.readingTimeMinutes} min read</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl pt-1">
              {summary.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1">
          {/* 1. TL;DR: 2-Sentence Overarching Summary */}
          <div className="rounded-2xl bg-indigo-50/70 p-4 sm:p-5 border border-indigo-100/90 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1.5">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>TL;DR (Executive Summary)</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-normal">
              {summary.tldr || summary.excerpt}
            </p>
          </div>

          {/* 2. Core Concepts (3-5 Main Themes) */}
          {coreConceptsList.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-indigo-600" />
                <span>Core Concepts (Main Themes)</span>
              </h4>
              <div className="space-y-2">
                {coreConceptsList.map((concept, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-sm text-slate-800"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Detailed Breakdown: Expanding on each concept */}
          {summary.detailedBreakdown && summary.detailedBreakdown.length > 0 ? (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-600" />
                <span>Detailed Breakdown & Conceptual Expansion</span>
              </h4>
              <div className="space-y-3.5">
                {summary.detailedBreakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200/80 bg-white p-4.5 space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                      <span className="text-indigo-600">§ {idx + 1}.</span>
                      <span>{item.conceptTitle}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">
                      {item.explanation}
                    </p>
                    {item.examples && item.examples.length > 0 && (
                      <div className="pl-5 pt-1 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Lecture Evidence & Examples:
                        </span>
                        <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                          {item.examples.map((ex, exIdx) => (
                            <li key={exIdx} className="leading-relaxed">
                              {ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : summary.fullContent ? (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />
                <span>Detailed Notes</span>
              </h4>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line shadow-2xs">
                {summary.fullContent}
              </div>
            </div>
          ) : null}

          {/* 4. Key Vocabulary */}
          {summary.keyVocabulary && summary.keyVocabulary.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                <BookA className="h-4 w-4 text-indigo-600" />
                <span>Key Vocabulary & Definitions</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {summary.keyVocabulary.map((vocab, vIdx) => (
                  <div
                    key={vIdx}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1"
                  >
                    <div className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {vocab.term}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {vocab.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {summary.tags && summary.tags.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <Tag className="h-3.5 w-3.5" />
                <span>Topics & Taxonomy:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {summary.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 shrink-0">
          <span className="text-xs text-slate-400">
            Generated {summary.createdAt}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Formatted Notes</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
