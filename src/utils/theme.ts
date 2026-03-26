import { brand } from '../config/brand';

export function applyBrandTheme() {
  const root = document.documentElement;
  const { colors } = brand;
  root.style.setProperty('--brand-primary',       colors.primary);
  root.style.setProperty('--brand-hover',         colors.primaryHover);
  root.style.setProperty('--brand-light',         colors.primaryLight);
  root.style.setProperty('--brand-text',          colors.primaryText);
  root.style.setProperty('--brand-ring',          colors.primaryRing);
  root.style.setProperty('--brand-gradient-from', colors.gradientFrom);
  root.style.setProperty('--brand-gradient-to',   colors.gradientTo);
}
