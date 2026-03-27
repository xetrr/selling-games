import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Youtube,
  Mail,
  MapPin,
  Gamepad2,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0B] border-t border-[#161618] mt-20">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-base font-black tracking-tight text-white mb-4">
              ABA PRO GAMES
            </h3>
            <p className="text-sm text-foreground/60 mb-6">
              Your premier destination for game data, hard drives, and gaming
              accessories. Experience gaming like never before.
            </p>
            <div className="space-y-3">
              <p className="text-xs font-black tracking-[0.25em] uppercase text-primary mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-2 bg-muted rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-foreground/70 hover:text-primary" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-muted rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-foreground/70 hover:text-primary" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-muted rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-foreground/70 hover:text-primary" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-muted rounded-lg hover:bg-primary/20 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-foreground/70 hover:text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-[10px] font-black tracking-[0.25em] uppercase text-primary mb-6">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/games"
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Gamepad2 className="w-3 h-3" />
                  Game Data
                </Link>
              </li>
              <li>
                <Link
                  to="/harddisks"
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                >
                  Hard Drives
                </Link>
              </li>
              <li>
                <Link
                  to="/accessories"
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                >
                  Media
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[10px] font-black tracking-[0.25em] uppercase text-primary mb-6">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/201210838049"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-3 h-3 text-primary" />
                  +20 121 083 8049
                </a>
              </li>
              <li>
                <a
                  href="mailto:aba@abaprogames.com"
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3 h-3 text-primary" />
                  aba@abaprogames.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/9WUL7GCnYtNTj23U7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3 h-3 text-primary" />
                  <span className="ltr">Cairo, Egypt</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[10px] font-black tracking-[0.25em] uppercase text-primary mb-6">
              Stay Updated
            </h3>
            <p className="text-xs text-foreground/60 mb-4">
              Subscribe to get the latest game releases and exclusive offers.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-xs bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="w-full px-3 py-2 text-xs font-bold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/60">
          <p>© {currentYear} ABA Pro Games. All rights reserved.</p>
          <p>Made with passion for gaming 🎮</p>
        </div>
      </div>
    </footer>
  );
}
