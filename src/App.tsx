import React, { useState, useMemo } from 'react';
import InputGroup from './components/InputGroup';
import ResultRow from './components/ResultRow';
import ProfitCard from './components/ProfitCard';
import { IconSoccer, IconTrophy } from './components/Icons';
import { MarketInputState, ProfitState } from './types';
import { calculateProfit, formatCurrency } from './utils/calculations';

function App() {
  // State
  const [inputs, setInputs] = useState<MarketInputState>({
    buyPrice: '',
    sellPrice: '',
    quantity: 1,
    taxRate: 5,
  });

  // Derived State (Calculations)
  const results = useMemo(() => calculateProfit(inputs), [inputs]);

  // Determine Visual State
  const profitState = useMemo(() => {
    if (results.profit > 0) return ProfitState.PROFIT;
    if (results.profit < 0) return ProfitState.LOSS;
    if (inputs.buyPrice === '' && inputs.sellPrice === '')
      return ProfitState.NEUTRAL;
    return ProfitState.BREAK_EVEN;
  }, [results.profit, inputs.buyPrice, inputs.sellPrice]);

  // Handlers
  const handleInputChange =
    (field: keyof MarketInputState) => (val: number | '') => {
      setInputs((prev) => ({ ...prev, [field]: val }));
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
          {/* Inputs */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="sm:col-span-1">
              <InputGroup
                label="Buy Price"
                value={inputs.buyPrice}
                onChange={handleInputChange('buyPrice')}
                placeholder="e.g. 5000"
              />
            </div>
            <div className="sm:col-span-1">
              <InputGroup
                label="Sell Price"
                value={inputs.sellPrice}
                onChange={handleInputChange('sellPrice')}
                placeholder="e.g. 5500"
              />
            </div>
            <div className="sm:col-span-1 lg:col-span-1">
              <InputGroup
                label="Quantity"
                value={inputs.quantity}
                onChange={handleInputChange('quantity')}
                min={1}
                isInteger
              />
            </div>
            <div className="sm:col-span-1 lg:col-span-1">
              <InputGroup
                label="Tax Rate (%)"
                value={inputs.taxRate}
                onChange={handleInputChange('taxRate')}
                helperText="Default 5%"
              />
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
              Transaction Breakdown
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
                    label={`Market Tax (${inputs.taxRate || 0}%)`}
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

            {/* Break Even Info */}
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="text-sm font-medium text-neutral-600">Break Even Sell Price</span>
                <span className="font-mono text-lg font-semibold text-neutral-900">
                  {formatCurrency(Math.ceil(results.breakEvenSellPrice))}
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
