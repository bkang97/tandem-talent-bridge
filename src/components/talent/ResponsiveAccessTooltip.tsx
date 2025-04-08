
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import AccessMoreTalentTooltip from './AccessMoreTalentTooltip';

interface ResponsiveAccessTooltipProps {
  onClick: () => void;
}

const ResponsiveAccessTooltip: React.FC<ResponsiveAccessTooltipProps> = ({ onClick }) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="w-full bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-amber-800 font-medium text-sm">
            Access More Talent
          </div>
        </div>
        <button 
          onClick={onClick}
          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-medium"
        >
          Tap to Access
        </button>
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L0 0H24L12 16Z" fill="#FEF3C7" />
          </svg>
        </div>
      </div>
    );
  }
  
  return <AccessMoreTalentTooltip onClick={onClick} />;
};

export default ResponsiveAccessTooltip;
