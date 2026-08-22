import React from 'react';
import { 
  X, 
  Flame, 
  Clock, 
  Award, 
  Sparkles, 
  GraduationCap, 
  Mail, 
  Settings, 
  Check, 
  BellRing,
  BookOpen
} from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateGoal: (hours: number) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateGoal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            Student Profile & Settings
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* User Info Card */}
          <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-sm"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="flex-1 truncate">
              <h4 className="text-base font-bold text-slate-900 truncate">
                {user.name}
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Mail className="h-3.5 w-3.5" />
                <span>{user.email}</span>
              </p>
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-800 mt-2">
                <GraduationCap className="h-3 w-3" />
                <span>{user.major}</span>
              </span>
            </div>
          </div>

          {/* Key Badges & XP */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3">
              <div className="flex items-center justify-center text-amber-600 mb-1">
                <Flame className="h-5 w-5 fill-amber-500 text-amber-500" />
              </div>
              <span className="block text-lg font-black text-amber-950">
                {user.dailyStreak} Days
              </span>
              <span className="text-[10px] font-semibold text-amber-700 uppercase">
                Active Streak
              </span>
            </div>

            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-3">
              <div className="flex items-center justify-center text-indigo-600 mb-1">
                <Award className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="block text-lg font-black text-indigo-950">
                {user.xpPoints}
              </span>
              <span className="text-[10px] font-semibold text-indigo-700 uppercase">
                Study XP
              </span>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3">
              <div className="flex items-center justify-center text-emerald-600 mb-1">
                <Clock className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="block text-lg font-black text-emerald-950">
                {user.completedHoursThisWeek}h
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 uppercase">
                This Week
              </span>
            </div>
          </div>

          {/* Goal Adjustment */}
          <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Weekly Study Target
              </label>
              <span className="text-xs font-bold text-indigo-600">
                {user.weeklyGoalHours} Hours / Week
              </span>
            </div>

            <input
              type="range"
              min={5}
              max={40}
              step={1}
              value={user.weeklyGoalHours}
              onChange={(e) => onUpdateGoal(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>5 hrs (Casual)</span>
              <span>20 hrs (Target)</span>
              <span>40 hrs (Intensive)</span>
            </div>
          </div>

          {/* Notification / Learning Preferences */}
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <BellRing className="h-4 w-4 text-slate-400" />
                <span>Daily spaced repetition reminders</span>
              </div>
              <span className="text-indigo-600 font-bold">Enabled</span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Sparkles className="h-4 w-4 text-slate-400" />
                <span>AI smart flashcard auto-generation</span>
              </div>
              <span className="text-indigo-600 font-bold">Active</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-6 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
