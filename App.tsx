import React, { useState, useMemo } from 'react';
import InputGroup from './components/InputGroup';
import ResultRow from './components/ResultRow';
import ProfitCard from './components/ProfitCard';
import { MarketInputState, ProfitState } from './types';
import { calculateProfit, formatCurrency } from './utils/calculations';

function App() {
  // State
  const [inputs, setInputs] = useState<MarketInputState>({
    buyPrice: '',
    sellPrice: '',
    quantity: 1,
    taxRate: 5
  });

  // Derived State (Calculations)
  const results = useMemo(() => calculateProfit(inputs), [inputs]);

  // Determine Visual State
  const profitState = useMemo(() => {
    if (results.profit > 0) return ProfitState.PROFIT;
    if (results.profit < 0) return ProfitState.LOSS;
    if (inputs.buyPrice === '' && inputs.sellPrice === '') return ProfitState.NEUTRAL;
    return ProfitState.BREAK_EVEN;
  }, [results.profit, inputs.buyPrice, inputs.sellPrice]);

  // Handlers
  const handleInputChange = (field: keyof MarketInputState) => (val: number | '') => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 sm:p-8">
      <main className="w-full max-w-lg bg-white shadow-xl shadow-neutral-200/50 rounded-3xl overflow-hidden border border-neutral-100">
        
        {/* Header */}
        <div className="bg-black text-white p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-600 to-neutral-800 flex items-center justify-center font-bold font-mono">
              FC
            </div>
            <h1 className="text-xl font-bold tracking-tight">Market Profit Calculator</h1>
          </div>
          <p className="text-neutral-400 text-sm">
            Optimize your trades with real-time tax and profit analysis.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Inputs */}
          <section className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="col-span-1">
              <InputGroup 
                label="Buy Price" 
                value={inputs.buyPrice} 
                onChange={handleInputChange('buyPrice')} 
                placeholder="e.g. 5000"
              />
            </div>
            <div className="col-span-1">
              <InputGroup 
                label="Sell Price" 
                value={inputs.sellPrice} 
                onChange={handleInputChange('sellPrice')}
                placeholder="e.g. 5500"
              />
            </div>
            <div className="col-span-1">
              <InputGroup 
                label="Quantity" 
                value={inputs.quantity} 
                onChange={handleInputChange('quantity')} 
                min={1}
                isInteger
              />
            </div>
            <div className="col-span-1">
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
          <section className="bg-neutral-50 rounded-xl p-5 border border-neutral-100">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Breakdown</h3>
            
            <div className="flex flex-col gap-1">
              <ResultRow 
                label="Total Revenue" 
                value={results.totalSellRevenue} 
              />
              <ResultRow 
                label={`Market Tax (${inputs.taxRate || 0}%)`} 
                value={results.taxAmount} 
                negative
              />
              <ResultRow 
                label="Net Revenue" 
                value={results.netRevenue} 
              />
              <ResultRow 
                label="Total Cost" 
                value={results.totalBuyCost} 
                negative
              />
              
              <div className="my-1"></div>

              <ResultRow 
                label="Profit Per Item" 
                value={results.profitPerItem} 
                highlight
              />
               <div className="flex justify-between items-center py-2 text-xs text-neutral-500">
                 <span>Break Even Sell Price</span>
                 <span className="font-mono">{formatCurrency(Math.ceil(results.breakEvenSellPrice))}</span>
               </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;