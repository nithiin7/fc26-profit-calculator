export interface MarketInputState {
  buyPrice: number | '';
  sellPrice: number | '';
  quantity: number | '';
  taxRate: number | '';
}

export interface CalculationResult {
  totalBuyCost: number;
  totalSellRevenue: number;
  taxAmount: number;
  netRevenue: number;
  profit: number;
  profitPerItem: number;
  roi: number; // Return on Investment %
  breakEvenSellPrice: number;
}

export enum ProfitState {
  PROFIT = 'PROFIT',
  LOSS = 'LOSS',
  BREAK_EVEN = 'BREAK_EVEN',
  NEUTRAL = 'NEUTRAL', // Initial state or zero
}
