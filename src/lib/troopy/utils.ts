import { BaseKitType } from './baseKits';

export function isValidBaseKit(base: string): base is BaseKitType {
  return ['wander', 'roam', 'premium'].includes(base);
}

export function getBaseKitFromSlug(slug: string): BaseKitType | null {
  const normalized = slug.toLowerCase();
  if (isValidBaseKit(normalized)) {
    return normalized;
  }
  return null;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function scrollToElement(elementId: string, offset: number = 100) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

export function buildConfigureKitUrl(
  baseKit: BaseKitType, 
  fridgeType?: string, 
  finish?: string
): string {
  const params = new URLSearchParams();
  params.set('base', baseKit);
  
  if (fridgeType && fridgeType !== 'all') {
    params.set('fridge', fridgeType);
  }
  
  if (finish && finish !== 'all') {
    params.set('finish', finish);
  }
  
  return `/start-your-build?${params.toString()}`;
}
