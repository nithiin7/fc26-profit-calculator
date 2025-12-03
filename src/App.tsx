import React, { useState, useMemo, useCallback } from 'react';
import ResultRow from './components/ResultRow';
import ProfitCard from './components/ProfitCard';
import ItemCard from './components/ItemCard';
import { IconSoccer, IconTrophy, IconPlus } from './components/Icons';
import { MarketItem, ProfitState } from './types';
import { calculateTotalProfit } from './utils/calculations';

function App() {
  // Generate unique ID for items
  const generateId = useCallback(() => Math.random().toString(36).substring(2, 9), []);

  // State
  const [items, setItems] = useState<MarketItem[]>([
    {
      id: generateId(),
      name: 'Item 1',
      buyPrice: '',
      sellPrice: '',
      quantity: 1,
      taxRate: 5,
    },
  ]);

  // Derived State (Calculations)
  const results = useMemo(() => calculateTotalProfit(items), [items]);

  // Get tax rate display for the breakdown section
  const taxRateDisplay = useMemo(() => {
    const taxRates = items.map(item => Number(item.taxRate) || 0);
    const uniqueRates = [...new Set(taxRates)];
    return uniqueRates.length === 1 ? uniqueRates[0] : 'Various';
  }, [items]);

  // Determine Visual State
  const profitState = useMemo(() => {
    if (results.profit > 0) return ProfitState.PROFIT;
    if (results.profit < 0) return ProfitState.LOSS;
    const hasAnyPrices = items.some(item => item.buyPrice !== '' || item.sellPrice !== '');
    if (!hasAnyPrices) return ProfitState.NEUTRAL;
    return ProfitState.BREAK_EVEN;
  }, [results.profit, items]);

  // Handlers
  const handleItemChange = (itemId: string) => (field: keyof MarketItem) => (val: number | string | '') => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, [field]: val } : item
      )
    );
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: generateId(),
        name: `Item ${prev.length + 1}`,
        buyPrice: '',
        sellPrice: '',
        quantity: 1,
        taxRate: 5,
      },
    ]);
  };

  const handleRemoveItem = (itemId: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  return (
    <div className="h-screen w-screen bg-neutral-50 overflow-hidden">
      <main className="h-full w-full bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-4 sm:p-6 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-600 to-neutral-800 flex items-center justify-center font-bold font-mono text-sm">
                FC26
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <IconSoccer className="w-4 h-4 text-blue-400" />
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                    Ultimate Team Market Calculator
                  </h1>
                  <IconTrophy className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-neutral-400 text-xs">
                  EA FC 26 • Optimize your trades with real-time tax analysis
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="px-2 py-1 bg-blue-600 text-xs font-semibold rounded-md">
                FUT
              </div>
              <div className="px-2 py-1 bg-green-600 text-xs font-semibold rounded-md">
                FC26
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-8 lg:space-y-10">
          {/* Items */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-neutral-900">Trading Items</h2>
              <button
                onClick={handleAddItem}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <IconPlus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onItemChange={handleItemChange(item.id)}
                  onRemove={() => handleRemoveItem(item.id)}
                  showRemoveButton={items.length > 1}
                />
              ))}
            </div>
          </section>

          {/* Main Result Card */}
          <section>
            <ProfitCard
              amount={results.profit}
              state={profitState}
              roi={results.roi}
            />
          </section>

          {/* Detailed Breakdown */}
          <section className="bg-neutral-50 rounded-xl p-6 lg:p-8 border border-neutral-100">
            <h3 className="text-sm font-bold text-neutral-600 uppercase tracking-wider mb-4">
              Total Transaction Breakdown
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Revenue Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Revenue</h4>
                <div className="space-y-2">
                  <ResultRow
                    label="Total Revenue"
                    value={results.totalSellRevenue}
                  />
                  <ResultRow
                    label={`Market Tax (${taxRateDisplay}${typeof taxRateDisplay === 'number' ? '%' : ''})`}
                    value={results.taxAmount}
                    negative
                  />
                  <ResultRow label="Net Revenue" value={results.netRevenue} />
                </div>
              </div>

              {/* Cost Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Cost</h4>
                <div className="space-y-2">
                  <ResultRow
                    label="Total Cost"
                    value={results.totalBuyCost}
                    negative
                  />
                  <ResultRow
                    label="Profit Per Item"
                    value={results.profitPerItem}
                    highlight
                  />
                </div>
              </div>
            </div>

            {/* Total Items Info */}
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="text-sm font-medium text-neutral-600">Total Items</span>
                <span className="font-mono text-lg font-semibold text-neutral-900">
                  {items.length}
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
