
import React from 'react';
import { ChevronsUp } from 'lucide-react';

const AccessMoreTalentTooltip = () => {
  return (
    <div className="absolute -top-16 right-0 md:right-8 animate-pulse z-10">
      <div className="relative bg-amber-50 border border-amber-200 rounded-lg p-3 shadow-md max-w-[200px]">
        <div className="text-sm font-medium text-amber-800">
          Access More Talent
        </div>
        <p className="text-xs text-amber-700 mt-1">
          Click here to view prospective candidates ready for sponsorship
        </p>
        
        {/* Dotted curved arrow */}
        <div className="absolute bottom-0 right-6 transform translate-y-full">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M30 5 C15 5, 5 15, 5 30" 
              stroke="#F59E0B" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
              fill="none"
              transform="rotate(200 20 20)"
            />
            <ChevronsUp 
              className="text-amber-500" 
              size={16} 
              style={{ 
                transform: 'rotate(200deg) translate(-5px, -5px)' 
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AccessMoreTalentTooltip;
