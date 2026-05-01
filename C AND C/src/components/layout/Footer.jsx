export default function Footer() {
  return (
    <footer className="bg-coffee text-cream/90 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg">☕</span>
              </div>
              <span className="font-display text-2xl font-bold text-white">
                Cup & Cozy
              </span>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              Where every sip tells a story. Premium artisan coffee crafted with
              love, in a space designed for warmth and connection.
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li className="flex justify-between max-w-[200px]">
                <span>Mon – Fri</span>
                <span>7:00 AM – 10:00 PM</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span>Saturday</span>
                <span>8:00 AM – 11:00 PM</span>
              </li>
              <li className="flex justify-between max-w-[200px]">
                <span>Sunday</span>
                <span>9:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">
              Find Us
            </h4>
            <address className="text-sm text-cream/60 not-italic space-y-2">
              <p>42 Brew Street, Café Quarter</p>
              <p>Mumbai, Maharashtra 400001</p>
              <p className="pt-2">
                <a href="tel:+911234567890" className="hover:text-accent transition-colors">
                  +91 123 456 7890
                </a>
              </p>
              <p>
                <a href="mailto:hello@cupandcozy.in" className="hover:text-accent transition-colors">
                  hello@cupandcozy.in
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} Cup & Cozy. Crafted with ❤️ and caffeine.
          </p>
          <div className="flex items-center gap-6 text-xs text-cream/40">
            <span className="hover:text-cream/70 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-cream/70 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-cream/70 transition-colors cursor-pointer">Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
