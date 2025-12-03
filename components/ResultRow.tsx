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
  tooltip,
  highlight = false,
  negative = false
}) => {
  const animatedValue = useAnimatedNumber(value);

  const formatted = isPercentage 
    ? formatPercentage(animatedValue)
    : isCurrency 
      ? formatCurrency(animatedValue) 
      : Math.round(animatedValue).toString();

  return (
    <div className={`flex justify-between items-center py-2 ${highlight ? 'border-t border-dashed border-neutral-300 pt-3 mt-1' : ''}`}>
      <div className="flex items-center gap-1.5 text-neutral-500">
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className={`font-mono font-medium text-base ${negative ? 'text-loss' : 'text-neutral-900'}`}>
        {negative && '-'}{formatted}
      </div>
    </div>
  );
};

export default ResultRow;