import { CalculationResult, MarketInputState, MarketItem, ItemCalculationResult } from '../types';

/**
 * Calculates market profit details for a single item.
 */
export const calculateItemProfit = (
  item: MarketItem
): ItemCalculationResult => {
  const buyPrice = Number(item.buyPrice) || 0;
  const sellPrice = Number(item.sellPrice) || 0;
  const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
  const taxRate = Number(item.taxRate) || 0;

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

/**
 * Calculates aggregated profit details across multiple items.
 */
export const calculateTotalProfit = (
  items: MarketItem[]
): CalculationResult => {
  const itemResults = items.map(calculateItemProfit);

  return {
    totalBuyCost: itemResults.reduce((sum, item) => sum + item.totalBuyCost, 0),
    totalSellRevenue: itemResults.reduce((sum, item) => sum + item.totalSellRevenue, 0),
    taxAmount: itemResults.reduce((sum, item) => sum + item.taxAmount, 0),
    netRevenue: itemResults.reduce((sum, item) => sum + item.netRevenue, 0),
    profit: itemResults.reduce((sum, item) => sum + item.profit, 0),
    profitPerItem: 0, // Not applicable for aggregated totals
    roi: 0, // Would need to be calculated differently for portfolio ROI
    breakEvenSellPrice: 0, // Not applicable for aggregated totals
  };
};

/**
 * Calculates market profit details based on inputs (legacy function for backward compatibility).
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
