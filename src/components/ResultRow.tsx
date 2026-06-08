import React from 'react';
import { formatCurrency, formatPercentage } from '../utils/calculations';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';

interface ResultRowProps {
  label: string;
  value: number;
  isCurrency?: boolean;
  isPercentage?: boolean;
  tooltip?: string;
  highlight?: boolean;
  negative?: boolean;
}

const ResultRow: React.FC<ResultRowProps> = ({
  label,
  value,
  isCurrency = true,
  isPercentage = false,
  tooltip, // eslint-disable-line @typescript-eslint/no-unused-vars
  highlight = false,
  negative = false,
}) => {
  const animatedValue = useAnimatedNumber(value);

  const formatted = isPercentage
    ? formatPercentage(animatedValue)
    : isCurrency
    ? formatCurrency(animatedValue)
    : Math.round(animatedValue).toString();

  return (
    <div className={`flex justify-between items-center gap-4 ${highlight ? 'border-t border-slate-800 pt-4 mt-4' : 'py-3'}`}>
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`font-mono text-sm font-semibold ${negative ? 'text-rose-300' : 'text-slate-100'}`}>
        {negative && '-'}
        {formatted}
      </span>
    </div>
  );
};

export default ResultRow;
