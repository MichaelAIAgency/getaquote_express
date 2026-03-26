export type PropertyType = 'residential' | 'commercial';
export type ProjectType = 'interior' | 'exterior';
export type SurfaceCondition = 'good' | 'medium' | 'bad';
export type PaintQuality = 'standard' | 'premium' | 'ultra_premium';
export type Urgency = 'flexible' | 'two_weeks' | 'asap';
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
}

export interface AiAnalysis {
  projectType: ProjectType;
  surfaceCondition: SurfaceCondition;
  hasCeiling: boolean;
  needsRepairs: boolean;
  needsPrimer: boolean;
  estimatedAreaM2: number | null;
  conditionReport: string;
  confidence: 'low' | 'medium' | 'high';
}
