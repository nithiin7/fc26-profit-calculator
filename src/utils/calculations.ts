import { CalculationResult, MarketInputState } from '../types';

/**
 * Calculates market profit details based on inputs.
 */
export const calculateProfit = (
  inputs: MarketInputState
): CalculationResult => {
  const buyPrice = Number(inputs.buyPrice) || 0;
  const sellPrice = Number(inputs.sellPrice) || 0;
  const quantity = Math.max(1, Math.floor(Number(inputs.quantity) || 1));
  const taxRate = Number(inputs.taxRate) || 0;

  const totalBuyCost = buyPrice * quantity;
  const totalSellRevenue = sellPrice * quantity;

  // Tax is calculated on the total sell price
  const taxAmount = totalSellRevenue * (taxRate / 100);

  const netRevenue = totalSellRevenue - taxAmount;
  const profit = netRevenue - totalBuyCost;
  const profitPerItem = quantity > 0 ? profit / quantity : 0;

  const roi = totalBuyCost > 0 ? (profit / totalBuyCost) * 100 : 0;

  // Break even: x - (x * tax) = buyPrice
  // x(1 - tax) = buyPrice
  // x = buyPrice / (1 - tax)
  const taxDecimal = taxRate / 100;
  const breakEvenSellPrice = taxDecimal < 1 ? buyPrice / (1 - taxDecimal) : 0;

  return {
    totalBuyCost,
    totalSellRevenue,
    taxAmount,
    netRevenue,
    profit,
    profitPerItem,
    roi,
    breakEvenSellPrice,
  };
};

export const formatCurrency = (val: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

export const formatPercentage = (val: number): string => {
  return (
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(val) + '%'
  );
};
