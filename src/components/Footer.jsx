import { Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative z-10 bg-linear-to-r from-pink-300 via-purple-300 to-rose-300 border-t border-pink-200/50 mt-auto w-full">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center">
        <p className="text-white text-sm mb-2">✧･ﾟ: *✧･ﾟ:*</p>
        <div className="flex items-center justify-center gap-2 text-gray-600 font-medium">
          <span>© {new Date().getFullYear()} CMovie | Gerlyn Mae Villanca</span>
          <Heart className="text-pink-400" size={16} fill="currentColor" />
        </div>
        <p className="text-white text-sm mt-2">Made with love and React ♡</p>
        <p className="text-white text-xs mt-3">*･゜ﾟ･*:.｡..｡.:*･'(*ﾟ▽ﾟ*)'･*:.｡. .｡.:*･゜ﾟ･*</p>
      </div>
    </footer>
  );
}

export default Footer;