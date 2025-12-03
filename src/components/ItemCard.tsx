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

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onItemChange,
  onRemove,
  showRemoveButton,
}) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-4">
          <input
            type="text"
            value={item.name}
            onChange={(e) => onItemChange('name')(e.target.value)}
            placeholder="Item name"
            className="w-full text-lg font-semibold text-neutral-900 bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-neutral-400"
          />
        </div>
        {showRemoveButton && (
          <button
            onClick={onRemove}
            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove item"
          >
            <IconTrash className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="sm:col-span-1">
          <InputGroup
            label="Buy Price"
            value={item.buyPrice}
            onChange={onItemChange('buyPrice')}
            placeholder="e.g. 5000"
          />
        </div>
        <div className="sm:col-span-1">
          <InputGroup
            label="Sell Price"
            value={item.sellPrice}
            onChange={onItemChange('sellPrice')}
            placeholder="e.g. 5500"
          />
        </div>
        <div className="sm:col-span-1 lg:col-span-1">
          <InputGroup
            label="Quantity"
            value={item.quantity}
            onChange={onItemChange('quantity')}
            min={1}
            isInteger
          />
        </div>
        <div className="sm:col-span-1 lg:col-span-1">
          <InputGroup
            label="Tax Rate (%)"
            value={item.taxRate}
            onChange={onItemChange('taxRate')}
            helperText="Default 5%"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
