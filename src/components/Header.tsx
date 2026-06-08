import React from 'react';
import { IconSoccer, IconMoon, IconSun } from './Icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const headerBadgeClass = isDarkMode
    ? 'border-slate-700/70 bg-slate-950/80 text-slate-300'
    : 'border-slate-200 bg-slate-100 text-slate-600';
  const badgeIconClass = isDarkMode
    ? 'bg-cyan-400/10 text-cyan-300'
    : 'bg-sky-100 text-sky-600';
  const buttonClass = isDarkMode
    ? 'inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2.5 text-sm font-semibold text-slate-100 shadow-lg shadow-slate-950/20 hover:bg-slate-800/90'
    : 'inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-slate-200';

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-4 max-w-2xl">
        <div className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm ${headerBadgeClass}`}>
          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${badgeIconClass}`}>
            <IconSoccer className="w-4 h-4" />
          </span>
          FC26 Ultimate Team Profit Console
        </div>

        <div className="space-y-2">
          <h1 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
            Game-winning market analysis for FC26 traders.
          </h1>
          <p className={`max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Enter your buy and sell prices, account for market tax, and see profit, ROI, and item totals instantly in a polished, modern dashboard.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className={`rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center ${isDarkMode ? 'text-slate-100' : 'text-slate-950'}`}>
            <p className={`text-2xl font-semibold ${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`}>100%</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Live</p>
          </div>
          <div className={`rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center ${isDarkMode ? 'text-slate-100' : 'text-slate-950'}`}>
            <p className={`text-2xl font-semibold ${isDarkMode ? 'text-lime-300' : 'text-emerald-600'}`}>5%</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Tax</p>
          </div>
          <div className={`rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center ${isDarkMode ? 'text-slate-100' : 'text-slate-950'}`}>
            <p className={`text-2xl font-semibold ${isDarkMode ? 'text-sky-300' : 'text-sky-600'}`}>ROI</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Instant</p>
          </div>
        </div>

        <button type="button" onClick={toggleTheme} className={buttonClass}>
          {isDarkMode ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Header;
