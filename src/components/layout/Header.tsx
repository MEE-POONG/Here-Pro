"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { getCategories } from '@/actions/admin-actions';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadCats() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (e) {
        console.error(e);
      }
    }
    loadCats();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full bg-gradient-to-r from-[#4dd0e1] to-[#00bcd4] sticky top-0 z-50 shadow-md">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group z-50 relative"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#4dd0e1] font-bold shadow-sm group-hover:scale-105 transition-transform">
              H
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-white tracking-tight">Here</span>
              <span className="text-[10px] text-white/80 uppercase tracking-widest font-bold">Pro Brand</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-white">
            <Link
              href="/"
              className="hover:text-white/80 transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t.nav.home}
            </Link>

            {/* Products Dropdown */}
            <div className="relative group" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 hover:text-white/80 transition-colors py-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                {t.nav.products} <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top-left ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="flex flex-col py-2">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/categories/${cat.slug}`}
                        className="px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors text-left flex items-center justify-between group/item"
                      >
                        {cat.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-6 py-3 text-gray-400 text-sm">Loading...</div>
                  )}
                </div>
              </div>
            </div>

            <Link href="/about" className="hover:text-white/80 transition-colors">{t.nav.about}</Link>
            <Link href="/contact" className="hover:text-white/80 transition-colors">{t.nav.contact}</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/20 rounded-full p-1 border border-white/30">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-[#4dd0e1] shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('th')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'th' ? 'bg-white text-[#4dd0e1] shadow-sm' : 'text-white hover:bg-white/10'}`}
              >
                TH
              </button>
            </div>

            {/* CTA Button */}
            <Link href="/contact" className="bg-white text-[#0097a7] px-6 py-2 rounded-full text-sm font-bold hover:bg-white/90 transition-all shadow-lg">
              {t.nav.partnership}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white z-50 relative p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-gradient-to-br from-[#4dd0e1] to-[#00bcd4] z-40 transition-transform duration-300 md:hidden flex flex-col pt-24 px-6 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col gap-6 text-xl font-bold text-white">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-white/20 pb-4">{t.nav.home}</Link>
          <div className="flex flex-col gap-4 border-b border-white/20 pb-4">
            <span className="opacity-80 text-sm uppercase tracking-wider">{t.nav.products}</span>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="pl-4 text-lg font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-white/20 pb-4">{t.nav.about}</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-white/20 pb-4">{t.nav.contact}</Link>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium opacity-80">Language</span>
            <div className="flex items-center bg-white/20 rounded-full p-1 border border-white/30">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${language === 'en' ? 'bg-white text-[#4dd0e1] shadow-sm' : 'text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('th')}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${language === 'th' ? 'bg-white text-[#4dd0e1] shadow-sm' : 'text-white'}`}
              >
                TH
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
