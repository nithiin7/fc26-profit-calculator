import React from 'react';
import InputGroup from './InputGroup';
import { MarketItem } from '../types';
import { IconTrash } from './Icons';

interface ItemCardProps {
  item: MarketItem;
  onItemChange: (field: keyof MarketItem) => (val: number | string) => void;
  onRemove: () => void;
  showRemoveButton: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onItemChange, onRemove, showRemoveButton }) => {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-[0_30px_80px_-38px_rgba(15,23,42,0.9)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <input
            type="text"
            value={item.name}
            onChange={(e) => onItemChange('name')(e.target.value)}
            placeholder="Player name"
            className="w-full border-none bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-500"
          />
          <p className="mt-1 text-sm text-slate-400">Use a team name, player name, or trade label.</p>
        </div>

        {showRemoveButton && (
          <button
            onClick={onRemove}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-slate-300 transition hover:border-rose-400/30 hover:text-rose-200"
            title="Remove item"
          >
            <IconTrash className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InputGroup label="Buy Price" value={item.buyPrice} onChange={onItemChange('buyPrice')} placeholder="e.g. 5000" />
        <InputGroup label="Sell Price" value={item.sellPrice} onChange={onItemChange('sellPrice')} placeholder="e.g. 5500" />
        <InputGroup label="Quantity" value={item.quantity} onChange={onItemChange('quantity')} min={1} isInteger />
        <InputGroup label="Tax Rate (%)" value={item.taxRate} onChange={onItemChange('taxRate')} helperText="Default 5%" />
      </div>
    </div>
  );
};

export default ItemCard;
