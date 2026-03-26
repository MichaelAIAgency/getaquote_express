import type { FormData, PriceEstimate } from '../types/estimator';
import { brand } from '../config/brand';

export function calculateEstimate(data: FormData): PriceEstimate {
  const area = parseFloat(data.areaSize) || 0;

  const baseRate =
    data.projectType === 'exterior'
      ? brand.pricing.exteriorRatePerSqm
      : brand.pricing.interiorRatePerSqm;

  let multiplier = 1;

  if (data.surfaceCondition === 'medium') multiplier += 0.15;
  if (data.surfaceCondition === 'bad') multiplier += 0.30;

  if (data.numCoats === 2) multiplier += 0.40;
  if (data.numCoats === 3) multiplier += 0.70;

  if (data.extras.primer) multiplier += 0.10;
  if (data.extras.repairs) multiplier += 0.20;
  if (data.extras.ceiling) multiplier += 0.15;

  const base = area * baseRate * multiplier;
  const variance = 0.15;

  return {
    base,
    low: Math.round(base * (1 - variance)),
    high: Math.round(base * (1 + variance)),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(brand.locale, {
    style: 'currency',
    currency: brand.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
