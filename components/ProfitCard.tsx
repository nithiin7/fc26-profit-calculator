import React, { useState } from 'react';
import { ProfitState } from '../types';
import { formatCurrency } from '../utils/calculations';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import { IconTrendingUp, IconTrendingDown, IconMinus, IconCopy, IconCheck, IconCoins } from './Icons';

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

  // Determine styles based on state
  let bgClass = "bg-neutral-50 border-neutral-200";
  let textClass = "text-neutral-900";
  let icon = <IconMinus className="w-6 h-6 text-neutral-400" />;
  let label = "Break Even";

  if (state === ProfitState.PROFIT) {
    bgClass = "bg-profit-light/30 border-profit/20";
    textClass = "text-profit-dark";
    icon = <IconTrendingUp className="w-6 h-6 text-profit" />;
    label = "Net Profit";
  } else if (state === ProfitState.LOSS) {
    bgClass = "bg-loss-light/30 border-loss/20";
    textClass = "text-loss-dark";
    icon = <IconTrendingDown className="w-6 h-6 text-loss" />;
    label = "Net Loss";
  }

  return (
    <div className={`relative w-full rounded-2xl border ${bgClass} p-6 transition-colors duration-300`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white rounded-lg shadow-sm border border-neutral-100">
            {icon}
          </div>
          <span className="text-sm font-semibold uppercase tracking-wide text-neutral-500">{label}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="p-1.5 text-neutral-400 hover:text-black transition-colors rounded hover:bg-black/5"
          title="Copy result"
          aria-label="Copy result to clipboard"
        >
          {copied ? <IconCheck className="w-4 h-4 text-green-600" /> : <IconCopy className="w-4 h-4" />}
        </button>
      </div>

      <div className="mt-4 flex flex-col items-baseline">
        <div className={`text-5xl font-bold tracking-tight ${textClass} font-mono flex items-center gap-2`}>
            {formatCurrency(Math.abs(animatedAmount))}
            <IconCoins className="w-8 h-8 opacity-50" />
        </div>
        
        {state !== ProfitState.NEUTRAL && (
           <div className="mt-2 flex items-center gap-2">
             <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
               roi >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
             }`}>
               {roi > 0 ? '+' : ''}{animatedRoi.toFixed(2)}% ROI
             </span>
           </div>
        )}
      </div>
    </div>
  );
};

export default ProfitCard;