"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Menu, X, Search, ShoppingCart, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const { scrollY } = useScroll();
  const { state } = useCart();
  const { isDisabled } = useReducedMotionSafe();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(238, 231, 212, 0.98)", "rgba(238, 231, 212, 1)"]
  );
  const shadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0,0,0,0)", "0 4px 20px rgba(92, 70, 48, 0.15)"]
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  const closeAboutDropdown = () => {
    setIsAboutDropdownOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-borderNeutral/30"
      style={{
        backgroundColor,
        boxShadow: shadow
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <BrandLogo width={240} height={84} priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/flat-packs"
              className="hover:text-accent-600 font-medium transition-colors duration-200 relative group text-body py-2 px-4 whitespace-nowrap inline-flex items-center"
            >
              Flat Packs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/shop"
              className="hover:text-accent-600 font-medium transition-colors duration-200 relative group text-body py-2 px-4 whitespace-nowrap inline-flex items-center"
            >
              Shop All Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/start-your-build"
              className="hover:text-accent-600 font-medium transition-colors duration-200 relative group text-body py-2 px-4 whitespace-nowrap inline-flex items-center"
            >
              Start Your Build
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300" />
            </Link>
            
            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={toggleAboutDropdown}
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                className="hover:text-accent-600 font-medium transition-colors duration-200 relative group text-body flex items-center gap-1 py-2 px-4 whitespace-nowrap"
              >
                About
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300" />
              </button>
              
              {/* Dropdown Menu */}
              <motion.div
                initial={false}
                animate={isAboutDropdownOpen ? "open" : "closed"}
                variants={{
                  open: { opacity: 1, y: 0, scale: 1 },
                  closed: { opacity: 0, y: -10, scale: 0.95 }
                }}
                transition={{ duration: 0.2 }}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-48 bg-cream-300 border border-borderNeutral rounded-xl shadow-medium overflow-hidden"
              >
                <div className="py-2">
                  <Link
                    href="/about"
                    className="block px-4 py-3 hover:text-accent-600 hover:bg-cream-400 transition-colors duration-200 text-body"
                    onClick={closeAboutDropdown}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/policies/returns"
                    className="block px-4 py-3 hover:text-accent-600 hover:bg-cream-400 transition-colors duration-200 text-body"
                    onClick={closeAboutDropdown}
                  >
                    Return Policy
                  </Link>
                  <Link
                    href="/policies/terms"
                    className="block px-4 py-3 hover:text-accent-600 hover:bg-cream-400 transition-colors duration-200 text-body"
                    onClick={closeAboutDropdown}
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/policies/privacy"
                    className="block px-4 py-3 hover:text-accent-600 hover:bg-cream-400 transition-colors duration-200 text-body"
                    onClick={closeAboutDropdown}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/policies/shipping"
                    className="block px-4 py-3 hover:text-accent-600 hover:bg-cream-400 transition-colors duration-200 text-body"
                    onClick={closeAboutDropdown}
                  >
                    Shipping Policy
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <Link
              href="/contact"
              className="hover:text-accent-600 font-medium transition-colors duration-200 relative group text-body py-2 px-4 whitespace-nowrap inline-flex items-center"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4 ml-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 pl-12 pr-4 py-2.5 bg-surface-50 border border-borderNeutral rounded-xl text-textPrimary placeholder:text-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all duration-200 shadow-soft"
              />
            </div>

            {/* Cart with Counter */}
            <Link href="/cart" className="ml-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-2 border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white px-3 py-2 rounded-xl transition-all duration-200 font-medium text-body-small relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {state.itemCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-caption rounded-full flex items-center justify-center font-semibold shadow-medium"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      scale: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }}
                    key={state.itemCount}
                  >
                    {state.itemCount}
                  </motion.span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-3 text-textPrimary hover:text-accent-600 transition-colors duration-200 rounded-lg hover:bg-surface-100"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="lg:hidden"
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          variants={{
            open: { height: "auto", opacity: 1 },
            closed: { height: 0, opacity: 0 }
          }}
          transition={{ 
            duration: isDisabled ? 0 : 0.3, 
            ease: "easeInOut" 
          }}
        >
          <div className="py-6 space-y-2 border-t border-borderNeutral bg-surface-50/80 backdrop-blur-sm">
            <Link
              href="/flat-packs"
              className="block hover:text-accent-600 font-medium transition-colors duration-200 py-3 px-6 rounded-lg hover:bg-surface-100 text-body"
              onClick={closeMenu}
            >
              Flat Packs
            </Link>
            <Link
              href="/shop"
              className="block hover:text-accent-600 font-medium transition-colors duration-200 py-3 px-6 rounded-lg hover:bg-surface-100 text-body"
              onClick={closeMenu}
            >
              Shop All Products
            </Link>
            <Link
              href="/start-your-build"
              className="block hover:text-accent-600 font-medium transition-colors duration-200 py-3 px-6 rounded-lg hover:bg-surface-100 text-body"
              onClick={closeMenu}
            >
              Start Your Build
            </Link>
            
            {/* Mobile About Section */}
            <div className="space-y-2">
              <div className="px-4 py-2 text-body-small font-medium text-textSecondary uppercase tracking-wide">
                About
              </div>
              <Link
                href="/about"
                className="block hover:text-accent-600 font-medium transition-colors duration-200 py-3 px-8 rounded-lg hover:bg-surface-100 text-body"
                onClick={closeMenu}
              >
                About Us
              </Link>
              <Link
                href="/policies/returns"
                className="block hover:text-accent-600 font-medium transition-colors duration-200 py-3 px-8 rounded-lg hover:bg-surface-100 text-body"
                onClick={closeMenu}
              >
                Return Policy
              </Link>
              <Link
                href="/policies/terms"
                className="block hover:text-accent-600 font-medium transition-colors duration-200 py-3 px-8 rounded-lg hover:bg-surface-100 text-body"
                onClick={closeMenu}
              >
                Terms of Service
              </Link>
              <Link
                href="/policies/privacy"
                className="block hover:text-accent-600 font-medium transition-colors duration-200 py-3 px-8 rounded-lg hover:bg-surface-100 text-body"
                onClick={closeMenu}
              >
                Privacy Policy
              </Link>
              <Link
                href="/policies/shipping"
                className="block hover:text-accent-600 font-medium transition-colors duration-200 py-3 px-8 rounded-lg hover:bg-surface-100 text-body"
                onClick={closeMenu}
              >
                Shipping Policy
              </Link>
            </div>
            
            <Link
              href="/contact"
              className="block hover:text-accent-600 font-medium transition-colors duration-200 py-3 px-6 rounded-lg hover:bg-surface-100 text-body"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
