import React, { useState, useMemo, useCallback } from 'react';
import ResultRow from './components/ResultRow';
import ProfitCard from './components/ProfitCard';
import ItemCard from './components/ItemCard';
import { IconSoccer, IconTrophy, IconPlus } from './components/Icons';
import { MarketItem, ProfitState } from './types';
import { calculateTotalProfit } from './utils/calculations';

function App() {
  const generateId = useCallback(() => Math.random().toString(36).substring(2, 9), []);

  const [items, setItems] = useState<MarketItem[]>([
    {
      id: generateId(),
      name: 'Player 1',
      buyPrice: '',
      sellPrice: '',
      quantity: 1,
      taxRate: 5,
    },
  ]);

  const results = useMemo(() => calculateTotalProfit(items), [items]);

  const taxRateDisplay = useMemo(() => {
    const taxRates = items.map((item) => Number(item.taxRate) || 0);
    const uniqueRates = [...new Set(taxRates)];
    return uniqueRates.length === 1 ? uniqueRates[0] : 'Various';
  }, [items]);

  const profitState = useMemo(() => {
    if (results.profit > 0) return ProfitState.PROFIT;
    if (results.profit < 0) return ProfitState.LOSS;
    const hasAnyPrices = items.some((item) => item.buyPrice !== '' || item.sellPrice !== '');
    if (!hasAnyPrices) return ProfitState.NEUTRAL;
    return ProfitState.BREAK_EVEN;
  }, [results.profit, items]);

  const handleItemChange = (itemId: string) => (field: keyof MarketItem) => (val: number | string | '') => {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, [field]: val } : item)));
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: generateId(),
        name: `Player ${prev.length + 1}`,
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_18%),radial-gradient(circle_at_60%_30%,_rgba(168,85,247,0.14),_transparent_20%)]" />
        <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 px-6 py-8 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/70 bg-slate-950/80 px-4 py-2 text-sm text-slate-300">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                      <IconSoccer className="w-4 h-4" />
                    </span>
                    FC26 Ultimate Team Profit Console
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Game-winning market analysis for FC26 traders.
                    </h1>
                    <p className="max-w-xl text-slate-400">
                      Enter your buy and sell prices, account for market tax, and see profit, ROI, and item totals instantly in a polished, modern dashboard.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
                    <p className="text-2xl font-semibold text-cyan-300">100%</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Live</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
                    <p className="text-2xl font-semibold text-lime-300">5%</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Tax</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center">
                    <p className="text-2xl font-semibold text-sky-300">ROI</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Instant</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-8 xl:grid-cols-[1.75fr_1fr]">
              <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Trading Items</h2>
                    <p className="mt-2 text-sm text-slate-400">Build and compare multiple listings with tax-aware profit calculations.</p>
                  </div>
                  <button
                    onClick={handleAddItem}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
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
              </div>

              <ProfitCard amount={results.profit} state={profitState} roi={results.roi} />
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Transaction breakdown</h3>
                  <p className="text-sm text-slate-400">Review revenue, fee impact, and item costs in one clean view.</p>
                </div>
                <div className="inline-flex items-center gap-3 rounded-full bg-slate-950/80 px-4 py-2 text-sm text-slate-300 ring-1 ring-white/10">
                  <span className="text-slate-100">Tax</span>
                  <span className="font-semibold text-white">{taxRateDisplay}%</span>
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Revenue</p>
                  <div className="mt-4 space-y-2">
                    <ResultRow label="Total Revenue" value={results.totalSellRevenue} />
                    <ResultRow label="Market Tax" value={results.taxAmount} negative />
                    <ResultRow label="Net Revenue" value={results.netRevenue} highlight />
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Cost</p>
                  <div className="mt-4 space-y-2">
                    <ResultRow label="Total Cost" value={results.totalBuyCost} negative />
                    <ResultRow label="Profit Per Item" value={results.profitPerItem} highlight />
                    <div className="mt-4 rounded-3xl bg-slate-900/90 p-4 text-sm text-slate-300">
                      <span className="font-semibold text-white">Total Items:</span> {items.length}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
