export type PropertyType = 'single_family' | 'condo' | 'townhouse' | 'commercial';
export type ProjectType = 'interior' | 'exterior' | 'both' | 'deck_fence' | 'cabinets' | 'stained_doors';
export type SurfaceCondition = 'excellent' | 'good' | 'fair' | 'poor';
export type PaintQuality = 'standard' | 'premium' | 'ultra_premium';
export type Urgency = 'flexible' | 'one_month' | 'two_weeks' | 'asap';
export type NumCoats = 1 | 2 | 3;

export interface FormData {
  propertyType: PropertyType | null;
  projectType: ProjectType | null;
  areaSize: string;
  surfaceCondition: SurfaceCondition | null;
  paintQuality: PaintQuality | null;
  urgency: Urgency | null;
  numCoats: NumCoats | null;
  extras: {
    primer: boolean;
    repairs: boolean;
    ceiling: boolean;
    trim: boolean;
    doors: boolean;
    pressure_washing: boolean;
    color_consultation: boolean;
  };
}

export interface PriceEstimate {
  low: number;
  high: number;
  base: number;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface AiAnalysis {
  projectType: 'interior' | 'exterior';
  surfaceCondition: SurfaceCondition;
  hasCeiling: boolean;
  needsRepairs: boolean;
  needsPrimer: boolean;
  estimatedAreaSqft: number | null;
  conditionReport: string;
  confidence: 'low' | 'medium' | 'high';
}
