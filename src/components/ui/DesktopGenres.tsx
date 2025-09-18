import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';
import { TV_GENRES } from '@/lib/genres';

const DesktopGenres: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
      <div 
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <button 
          className="text-gray-300 hover:text-white transition-colors font-medium"
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          Genres <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
        </button>
        {open && (
          <div className="absolute right-0 top-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg min-w-[220px] z-50 pt-2">
            <div className="py-2 max-h-80 overflow-y-auto">
              {TV_GENRES.map((g: {id:number; name:string}) => (
                <Link
                  key={g.id}
                  href={`/genres/${g.id}`}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

export { DesktopGenres };