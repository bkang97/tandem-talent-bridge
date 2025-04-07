import React from "react";
import { ChevronsDown, ChevronsUp } from "lucide-react";

const AccessMoreTalentTooltip = ({ ...props }) => {
  return (
    <div className="absolute -top-[100px] right-38 z-10 poi" {...props}>
      <div className="relative bg-amber-50 border border-amber-300 rounded-lg p-3 shadow-md max-w-[200px] pointer-effects-none">
        <div className="text-sm font-medium text-amber-800">
          Access More Talent
        </div>
        <p className="text-xs text-amber-700 mt-1">
          Click "Prospective" to view prospective candidates ready for
          sponsorship
        </p>
      </div>
    </div>
  );
};

export default AccessMoreTalentTooltip;
