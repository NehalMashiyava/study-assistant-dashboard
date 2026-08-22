import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  CheckSquare, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { NavView, UserProfile } from '../types';

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  user: UserProfile;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenProfile: () => void;
  summaryCount: number;
  deckCount: number;
  quizCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  user,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  onOpenProfile,
  summaryCount,
  deckCount,
  quizCount,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavView,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      description: 'Overview & Study Stats',
    },
    {
      id: 'summaries' as NavView,
      label: 'Summaries',
      icon: FileText,
      badge: summaryCount > 0 ? summaryCount : null,
      description: 'AI Generated Notes',
    },
    {
      id: 'flashcards' as NavView,
      label: 'Flashcards',
      icon: Layers,
      badge: deckCount > 0 ? deckCount : null,
      description: 'Spaced Repetition Decks',
    },
    {
      id: 'quizzes' as NavView,
      label: 'Quizzes',
      icon: CheckSquare,
      badge: quizCount > 0 ? quizCount : null,
      description: 'Practice & Self-Tests',
    },
  ];

  const handleNavClick = (viewId: NavView) => {
    onNavigate(viewId);
    if (isMobileOpen) {
      onCloseMobile();
    }
  };

  const weeklyProgressPercent = Math.min(
    100,
    Math.round((user.completedHoursThisWeek / user.weeklyGoalHours) * 100)
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          id="mobile-sidebar-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="main-app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out lg:static lg:z-30 shadow-sm ${
          isCollapsed ? 'w-20 p-4' : 'w-64 p-6'
        } ${
          isMobileOpen
            ? 'translate-x-0 shadow-xl'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className={`flex items-center justify-between mb-8 ${isCollapsed ? 'px-0 justify-center' : 'px-1'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0">
              S
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                  StudyFlow
                </span>
                <span className="text-[11px] font-medium text-slate-400 mt-0.5">
                  AI Study Assistant
                </span>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            id="btn-close-mobile-sidebar"
            onClick={onCloseMobile}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            id="btn-toggle-sidebar-collapse"
            onClick={onToggleCollapse}
            className="hidden h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:flex"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 font-semibold'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive ? 'text-indigo-600' : 'text-slate-400'
                  }`}
                />

                {!isCollapsed && (
                  <div className="flex flex-1 items-center justify-between truncate text-left">
                    <span className="truncate">{item.label}</span>
                    {item.badge !== null && (
                      <span
                        className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          isActive
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}

          {/* Quick Study Streak Card (Visible when expanded) */}
          {!isCollapsed && (
            <div className="pt-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {user.dailyStreak} Day Streak
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Consistent learner
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-[10px] font-medium text-slate-500">
                    <span>Weekly Goal</span>
                    <span className="font-semibold text-slate-700">
                      {user.completedHoursThisWeek}/{user.weeklyGoalHours}h
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${weeklyProgressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* User Profile Section at the Bottom */}
        <div className="mt-auto pt-6 border-t border-slate-100 px-1">
          <button
            id="btn-user-profile-sidebar"
            onClick={onOpenProfile}
            title={isCollapsed ? `${user.name} (View Profile)` : undefined}
            className={`group flex w-full items-center gap-3 rounded-xl p-1.5 transition-all hover:bg-slate-50 ${
              isCollapsed ? 'justify-center p-1' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs border border-indigo-200 shrink-0">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>

            {!isCollapsed && (
              <div className="flex flex-1 items-center justify-between truncate text-left">
                <div className="truncate">
                  <p className="truncate text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {user.name}
                  </p>
                  <p className="truncate text-[10px] text-slate-500">
                    {user.major} • Pro Plan
                  </p>
                </div>
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600" />
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
