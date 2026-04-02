import type { FormData, PriceEstimate } from '../types/estimator';
import { brand } from '../config/brand';

export function calculateEstimate(data: FormData): PriceEstimate {
  const area = parseFloat(data.areaSize) || 0;

  const { interiorBaseRatePerSqft, exteriorMultiplier, deckFenceRatePerSqft, bothMultiplier } =
    brand.pricing;

  let baseRate: number;
  if (data.projectType === 'deck_fence') {
    baseRate = deckFenceRatePerSqft;
  } else if (data.projectType === 'exterior') {
    baseRate = interiorBaseRatePerSqft * exteriorMultiplier;
  } else if (data.projectType === 'both') {
    baseRate = interiorBaseRatePerSqft * bothMultiplier * exteriorMultiplier;
  } else {
    baseRate = interiorBaseRatePerSqft;
  }

  let multiplier = 1;

  if (data.propertyType === 'commercial') multiplier += 0.15;

  if (data.surfaceCondition === 'good') multiplier += 0.10;
  if (data.surfaceCondition === 'fair') multiplier += 0.20;
  if (data.surfaceCondition === 'poor') multiplier += 0.35;

  if (data.paintQuality === 'premium') multiplier += 0.25;
  if (data.paintQuality === 'ultra_premium') multiplier += 0.50;

  if (data.urgency === 'one_month') multiplier += 0.08;
  if (data.urgency === 'two_weeks') multiplier += 0.15;
  if (data.urgency === 'asap') multiplier += 0.30;

  if (data.numCoats === 2) multiplier += 0.40;
  if (data.numCoats === 3) multiplier += 0.70;

  if (data.extras.primer) multiplier += 0.10;
  if (data.extras.repairs) multiplier += 0.20;
  if (data.extras.ceiling) multiplier += 0.15;
  if (data.extras.trim) multiplier += 0.10;
  if (data.extras.doors) multiplier += 0.15;
  if (data.extras.pressure_washing) multiplier += 0.12;
  if (data.extras.color_consultation) multiplier += 0.05;

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
