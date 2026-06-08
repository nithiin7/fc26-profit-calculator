import React, { useState } from 'react';
import { ProfitState } from '../types';
import { formatCurrency } from '../utils/calculations';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconCopy,
  IconCheck,
  IconCoins,
} from './Icons';

interface ProfitCardProps {
  amount: number;
  state: ProfitState;
  roi: number;
}

const ProfitCard: React.FC<ProfitCardProps> = ({ amount, state, roi }) => {
  const animatedAmount = useAnimatedNumber(amount);
  const animatedRoi = useAnimatedNumber(roi);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `Profit: ${formatCurrency(amount)} coins | ROI: ${roi.toFixed(1)}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  let stateLabel = 'Break Even';
  let stateIcon = <IconMinus className="w-6 h-6 text-slate-400" />;
  let stateTone = 'text-slate-100';
  let chipBg = 'bg-slate-800/80 text-slate-300';

  if (state === ProfitState.PROFIT) {
    stateLabel = 'Net Profit';
    stateIcon = <IconTrendingUp className="w-6 h-6 text-cyan-300" />;
    stateTone = 'text-cyan-300';
    chipBg = 'bg-cyan-500/10 text-cyan-200 ring ring-cyan-400/20';
  } else if (state === ProfitState.LOSS) {
    stateLabel = 'Net Loss';
    stateIcon = <IconTrendingDown className="w-6 h-6 text-rose-300" />;
    stateTone = 'text-rose-300';
    chipBg = 'bg-rose-500/10 text-rose-200 ring ring-rose-400/20';
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-slate-950/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900/80 shadow-inner shadow-slate-950/40">
            {stateIcon}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stateLabel}</p>
            <p className="mt-1 text-sm text-slate-400">Instant margin analysis with coin-ready totals</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 px-4 text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
          title="Copy result"
          aria-label="Copy result to clipboard"
        >
          {copied ? <IconCheck className="w-5 h-5 text-emerald-400" /> : <IconCopy className="w-5 h-5" />}
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className={`flex items-end gap-3 ${stateTone}`}>
          <span className="text-5xl font-semibold tracking-tight sm:text-6xl">
            {formatCurrency(Math.abs(animatedAmount))}
          </span>
          <IconCoins className="w-10 h-10 opacity-60" />
        </div>

        {state !== ProfitState.NEUTRAL && (
          <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${chipBg}`}>
            {roi > 0 ? '+' : ''}
            {animatedRoi.toFixed(2)}% ROI
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfitCard;
