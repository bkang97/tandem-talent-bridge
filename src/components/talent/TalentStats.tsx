
import React, { useState } from "react";
import { BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SupplyDemandChart from "./SupplyDemandChart";
import SponsorshipModal from "./SponsorshipModal";

interface TalentStatsProps {
  availableCount: number;
  reservedCount: number;
  totalCount: number;
  onShowChart: () => void;
  showChart: boolean;
}

const TalentStats = ({
  availableCount,
  reservedCount,
  totalCount,
  onShowChart,
  showChart,
}: TalentStatsProps) => {
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border border-black/20 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Talent Pool Status</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onShowChart}
              className="ml-2"
            >
              <BarChart size={16} className="mr-2" />
              {showChart ? "Hide Chart" : "Market Gap Analysis"}
            </Button>
          </div>
          <div className="flex gap-6 mt-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {availableCount}
              </div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {reservedCount}
              </div>
              <div className="text-sm text-gray-600">Reserved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalCount}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>
        <div className="flex-grow md:flex-grow-0 min-w-[200px]">
          <div className="h-2 bg-gray-100 rounded-full mb-1">
            <div
              className="h-2 bg-primary rounded-full"
              style={{ width: `${(availableCount / totalCount) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {Math.round((availableCount / totalCount) * 100)}% available
            </span>
            <span>{totalCount} total</span>
          </div>
        </div>
      </div>

      {showChart && (
        <div className="bg-gray-50 p-4 mt-6 relative rounded-lg border border-gray-200">
          <div>
            <div className="mt-3 absolute right-4 top-2 z-10 justify-end items-end">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => setShowSponsorshipModal(true)}
              >
                Learn About Sponsorship
              </Button>
            </div>
            <SupplyDemandChart />
          </div>
        </div>
      )}

      {/* Sponsorship Modal */}
      {showSponsorshipModal && (
        <SponsorshipModal 
          isOpen={showSponsorshipModal} 
          onClose={() => setShowSponsorshipModal(false)} 
        />
      )}
    </div>
  );
};

export default TalentStats;
