import React from 'react';
import InputGroup from './InputGroup';
import { MarketItem } from '../types';
import { IconTrash } from './Icons';

interface ItemCardProps {
  item: MarketItem;
  onItemChange: (field: keyof MarketItem) => (val: number | string) => void;
  onRemove: () => void;
  showRemoveButton: boolean;
  isDarkMode: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onItemChange, onRemove, showRemoveButton, isDarkMode }) => {
  const cardClasses = isDarkMode
    ? 'rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-[0_30px_80px_-38px_rgba(15,23,42,0.9)]'
    : 'rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm';

  const labelText = isDarkMode ? 'text-slate-300' : 'text-slate-600';
  const inputText = isDarkMode ? 'text-white placeholder:text-slate-500' : 'text-slate-950 placeholder:text-slate-400';
  const removeButtonClass = isDarkMode
    ? 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-slate-300 transition hover:border-rose-400/30 hover:text-rose-200'
    : 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition hover:border-rose-400/30 hover:text-rose-600';

  return (
    <div className={cardClasses}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <input
            type="text"
            value={item.name}
            onChange={(e) => onItemChange('name')(e.target.value)}
            placeholder="Player name"
            className={`w-full border-none bg-transparent text-lg font-semibold outline-none ${inputText}`}
          />
          <p className={`mt-1 text-sm ${labelText}`}>Use a team name, player name, or trade label.</p>
        </div>

        {showRemoveButton && (
          <button
            onClick={onRemove}
            className={removeButtonClass}
            title="Remove item"
          >
            <IconTrash className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputGroup label="Buy Price" value={item.buyPrice} onChange={onItemChange('buyPrice')} placeholder="e.g. 5000" isDarkMode={isDarkMode} />
        <InputGroup label="Sell Price" value={item.sellPrice} onChange={onItemChange('sellPrice')} placeholder="e.g. 5500" isDarkMode={isDarkMode} />
        <InputGroup label="Quantity" value={item.quantity} onChange={onItemChange('quantity')} min={1} isInteger isDarkMode={isDarkMode} />
        <InputGroup label="Tax Rate (%)" value={item.taxRate} onChange={onItemChange('taxRate')} helperText="Default 5%" isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default ItemCard;
