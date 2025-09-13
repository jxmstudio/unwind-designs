# Unwind Designs - E-commerce Site

A beautiful, modern e-commerce website built with Next.js 15, Tailwind CSS, and shadcn/ui components. Features a custom maroon/cream/beige color scheme and comprehensive e-commerce functionality.

## ✨ Features

- **Modern Design**: Beautiful UI with custom maroon/cream/beige color scheme
- **Responsive Layout**: Mobile-first design with announcement bar and navigation
- **Product Management**: Product grid with cards, thumbnails, prices, and sale badges
- **Shopping Cart**: Full cart functionality with Stripe integration
- **User Authentication**: Secure user accounts with NextAuth.js
- **File Uploads**: Image and file management with UploadThing
- **Content Management**: Blog and content system with Big Post API
- **Form Validation**: Comprehensive forms with React Hook Form and Zod
- **SEO Optimized**: Built-in SEO optimization with next-seo
- **Performance**: Optimized for speed and user experience

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom theme
- **Components**: shadcn/ui component library
- **Forms**: React Hook Form with Zod validation
- **Payments**: Stripe integration
- **File Uploads**: UploadThing
- **Content**: Big Post API integration
- **Authentication**: NextAuth.js
- **SEO**: next-seo
- **TypeScript**: Full type safety

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/unwind-designs.git
   cd unwind-designs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your actual API keys and configuration.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# UploadThing Configuration
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Big Post API Configuration
BIGPOST_API_URL=your_api_url
BIGPOST_API_KEY=your_api_key

# NextAuth.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Tailwind CSS Configuration

The project uses Tailwind CSS v4 with a custom color scheme:

- **Maroon**: Primary brand color (#7a1a1a)
- **Cream**: Light background color (#f5f0e8)
- **Beige**: Secondary accent color (#d4c19e)

### Component Library

The project uses shadcn/ui components which are already configured and styled to match the custom theme.

## 📁 Project Structure

```
unwind-designs/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── announcement-bar.tsx
│   │   ├── navigation.tsx
│   │   ├── hero-section.tsx
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   └── footer.tsx
│   └── lib/               # Utility functions
│       ├── stripe.ts      # Stripe integration
│       ├── uploadthing.ts # UploadThing integration
│       ├── bigpost-api.ts # Big Post API integration
│       ├── auth.ts        # Authentication config
│       ├── validations.ts # Zod schemas
│       └── form-hooks.ts  # Form hooks
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind configuration
└── package.json          # Dependencies
```

## 🎨 Customization

### Colors

The color scheme can be customized in `tailwind.config.ts`:

```typescript
colors: {
  maroon: {
    50: '#fdf2f2',
    100: '#fce7e7',
    // ... more shades
    950: '#420a0a',
  },
  cream: {
    50: '#fefefe',
    100: '#fdfcfb',
    // ... more shades
    950: '#5a4a2e',
  },
  beige: {
    // ... beige color palette
  },
}
```

### Components

All components are built with Tailwind CSS classes and can be easily customized by modifying the className props.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Responsive Design

The site is fully responsive with breakpoints:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔒 Security Features

- Environment variable protection
- API route validation
- Form input sanitization
- Secure authentication
- HTTPS enforcement in production

## 📊 Performance

- Next.js 15 optimizations
- Image optimization with next/image
- Lazy loading components
- Optimized bundle splitting
- SEO best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you need help or have questions:

- Create an issue on GitHub
- Check the documentation
- Contact the development team

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- shadcn/ui for the beautiful component library
- All contributors and supporters

---

Built with ❤️ by the Unwind Designs team
