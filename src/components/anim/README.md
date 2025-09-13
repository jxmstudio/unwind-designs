# Animation System

This directory contains the animation system for Unwind Designs, providing subtle, high-quality animations that respect user preferences and accessibility needs.

## Components

### FadeIn
A wrapper component that provides fade-in animations with optional slide-up effects.

```tsx
import { FadeIn } from '@/components/anim';

<FadeIn delay={0.2} y={30}>
  <YourContent />
</FadeIn>
```

### SlideUp
A wrapper component that animates elements when they come into view during scrolling.

```tsx
import { SlideUp } from '@/components/anim';

<SlideUp threshold={0.1} delay={0.1}>
  <YourContent />
</SlideUp>
```

### Stagger
A wrapper component that provides staggered animations for multiple child elements.

```tsx
import { Stagger } from '@/components/anim';

<Stagger staggerDelay={0.1}>
  <Item1 />
  <Item2 />
  <Item3 />
</Stagger>
```

### AnimationProvider
A context provider that provides global animation settings and reduced motion support.

```tsx
import { AnimationProvider } from '@/components/anim';

<AnimationProvider>
  <YourApp />
</AnimationProvider>
```

## Hooks

### useReducedMotionSafe
A hook that safely handles reduced motion preferences and animation feature flags.

```tsx
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

const { isDisabled, safeAnimation } = useReducedMotionSafe();
```

### useAnimation
A hook that provides access to the animation context.

```tsx
import { useAnimation } from '@/components/anim';

const { isDisabled, safeAnimation } = useAnimation();
```

## Features

- **Reduced Motion Support**: Automatically detects and respects `prefers-reduced-motion` media query
- **Feature Flag**: Can be disabled via `NEXT_PUBLIC_ENABLE_ANIMATIONS` environment variable
- **Performance Optimized**: Uses GPU-accelerated transforms and avoids layout thrash
- **Accessibility First**: Provides sensible fallbacks when animations are disabled
- **TypeScript Support**: Fully typed with proper interfaces and props

## Environment Variables

```bash
# Enable/disable animations globally (default: true)
NEXT_PUBLIC_ENABLE_ANIMATIONS=true
```

## Usage Guidelines

1. **Keep animations subtle**: Use small values for transforms (scale: 1.02, y: -2)
2. **Respect user preferences**: Always check `isDisabled` before applying animations
3. **Use safe values**: Use `safeAnimation` object for animation values
4. **Performance**: Prefer `transform` properties over layout-changing properties
5. **Accessibility**: Provide fallbacks for users with reduced motion preferences

## Examples

### Button with Hover Animation
```tsx
const { isDisabled, safeAnimation } = useReducedMotionSafe();

<motion.button
  whileHover={{ 
    scale: isDisabled ? 1 : 1.02,
    y: isDisabled ? 0 : -2
  }}
  whileTap={{ scale: isDisabled ? 1 : 0.98 }}
  transition={{ duration: safeAnimation.duration || 0.2 }}
>
  Click me
</motion.button>
```

### Card with Stagger Animation
```tsx
<Stagger staggerDelay={0.1}>
  {items.map((item, index) => (
    <Card key={item.id}>
      {item.content}
    </Card>
  ))}
</Stagger>
```

### Section with Scroll Animation
```tsx
<SlideUp threshold={0.1} delay={0.2}>
  <section className="py-20">
    <h2>Your Section</h2>
    <p>Content that animates in when scrolled to</p>
  </section>
</SlideUp>
```
