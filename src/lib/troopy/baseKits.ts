export type BaseKitType = 'wander' | 'roam' | 'premium';

export interface BaseKitConfig {
  id: BaseKitType;
  name: string;
  tagline: string;
  description: string;
  fromPrice: number;
  badge: {
    text: string;
    className: string;
  };
  accent: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  sidebar: {
    whyChoose: {
      title: string;
      bullets: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
    helpSection: {
      title: string;
      description: string;
      ctaText: string;
      ctaLink: string;
    };
  };
}

export const baseKitConfigs: Record<BaseKitType, BaseKitConfig> = {
  wander: {
    id: 'wander',
    name: 'Wander Kit',
    tagline: 'Budget-Friendly Adventure',
    description: 'Perfect for weekend adventures with reliable storage and basic amenities. Multiple finish options available. Coming Soon!',
    fromPrice: 3750,
    badge: {
      text: 'Coming Soon',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    accent: {
      primary: 'green-600',
      secondary: 'green-100', 
      gradient: 'from-green-50 to-emerald-50'
    },
    sidebar: {
      whyChoose: {
        title: 'Why Choose Wander?',
        bullets: [
          {
            icon: '🔧',
            title: 'Easy Assembly',
            description: 'Tool-free connectors and clear instructions'
          },
          {
            icon: '💰',
            title: 'Great Value',
            description: 'Reliable materials without the premium price tag'
          },
          {
            icon: '🛡️',
            title: 'Warranty',
            description: 'Up to 2–3 years coverage on Wander kits'
          }
        ]
      },
      helpSection: {
        title: 'Need help deciding?',
        description: 'Our team can help you choose the perfect configuration for your adventures.',
        ctaText: 'Start Your Build',
        ctaLink: '/start-your-build?base=wander'
      }
    }
  },
  roam: {
    id: 'roam',
    name: 'Roam Kit',
    tagline: 'The Complete Explorer',
    description: 'Our most popular choice with premium features and enhanced storage solutions. Built for serious adventurers. Coming Soon!',
    fromPrice: 6700,
    badge: {
      text: 'Coming Soon',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    accent: {
      primary: 'blue-600',
      secondary: 'blue-100',
      gradient: 'from-blue-50 to-sky-50'
    },
    sidebar: {
      whyChoose: {
        title: 'Why Choose Roam?',
        bullets: [
          {
            icon: '⭐',
            title: 'Premium Features',
            description: 'Enhanced storage and quality materials'
          },
          {
            icon: '🚀',
            title: 'Most Popular',
            description: 'Trusted by thousands of adventurers'
          },
          {
            icon: '🔒',
            title: 'Extended Warranty',
            description: 'Up to 3 years comprehensive coverage'
          }
        ]
      },
      helpSection: {
        title: 'Need help deciding?',
        description: 'Speak with our experts about the Roam Kit features and configurations.',
        ctaText: 'Start Your Build',
        ctaLink: '/start-your-build?base=roam'
      }
    }
  },
  premium: {
    id: 'premium',
    name: 'Premium Kit',
    tagline: 'Ultimate Luxury Experience',
    description: 'The pinnacle of expedition outfitting with luxury finishes, advanced features, and premium materials throughout.',
    fromPrice: 9850,
    badge: {
      text: 'Luxury',
      className: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    accent: {
      primary: 'purple-600',
      secondary: 'purple-100',
      gradient: 'from-purple-50 to-violet-50'
    },
    sidebar: {
      whyChoose: {
        title: 'Why Choose Premium?',
        bullets: [
          {
            icon: '💎',
            title: 'Luxury Materials',
            description: 'Premium hardwoods and finest hardware'
          },
          {
            icon: '🎯',
            title: 'Advanced Features',
            description: 'State-of-the-art storage and organization'
          },
          {
            icon: '👑',
            title: 'Premium Support',
            description: 'White-glove service and lifetime warranty'
          }
        ]
      },
      helpSection: {
        title: 'Need help deciding?',
        description: 'Let us create a custom Premium Kit solution tailored to your exact needs.',
        ctaText: 'Start Your Build',
        ctaLink: '/start-your-build?base=premium'
      }
    }
  }
};

export function getBaseKitConfig(base: string): BaseKitConfig | null {
  if (base in baseKitConfigs) {
    return baseKitConfigs[base as BaseKitType];
  }
  return null;
}
