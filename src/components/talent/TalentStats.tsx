
import React, { useState, useEffect } from "react";
import { BarChart, TrendingUp, Users, Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import SupplyDemandChart from "./SupplyDemandChart";
import SponsorshipModal from "./SponsorshipModal";
import ReservationModal from "./ReservationModal";
import { Badge } from "@/components/ui/badge";

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
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [activityIndex, setActivityIndex] = useState(0);

  // For FOMO elements - social proof with rotation
  const recentActivity = [
    { company: "TechCorp", action: "reserved 2 candidates", time: "5 min ago" },
    {
      company: "MedLabs",
      action: "sponsored 5 candidates",
      time: "12 min ago",
    },
    { company: "FinanceHub", action: "viewed this pool", time: "just now" },
  ];

  // For statistical visualization - market trends
  const marketTrend = {
    percentChange: -12,
    timeFrame: "last 30 days",
    isDecreasing: true,
  };

  // Rotation effect for recent activity
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActivityIndex((prevIndex) => (prevIndex + 1) % recentActivity.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleOpenSponsorshipModal = () => {
    setShowSponsorshipModal(true);
  };

  const handleScheduleConsultation = () => {
    setShowSponsorshipModal(false);
    setShowReservationModal(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 shadow-sm">
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

          {/* Market trend indicator - FOMO statistical visualization */}
          <div className="mt-3 bg-orange-50 border border-orange-100 rounded p-2 flex items-center">
            <TrendingUp
              size={16}
              className={`mr-2 ${
                marketTrend.isDecreasing
                  ? "text-red-500 rotate-180"
                  : "text-green-500"
              }`}
            />
            <span className="text-xs font-medium">
              Pool availability{" "}
              <span className="text-red-500 font-semibold">
                {marketTrend.percentChange}%
              </span>{" "}
              in {marketTrend.timeFrame}
            </span>
          </div>
        </div>
      </div>

      {/* Social proof activity feed with rotation - FOMO social proof */}
      <div className="bg-gray-50 p-3 rounded-md mb-4 border border-gray-200">
        <div className="flex items-center mb-2">
          <Users size={14} className="text-primary mr-2" />
          <span className="text-sm font-medium">Recent Platform Activity</span>
        </div>
        <div className="h-8 flex items-center">
          <Badge
            key={activityIndex}
            variant="outline"
            className="bg-white border-primary/20 text-xs animate-fade-in"
          >
            <span className="font-medium">{recentActivity[activityIndex].company}</span>&nbsp;
            {recentActivity[activityIndex].action}
            <span className="ml-1 text-gray-500">{recentActivity[activityIndex].time}</span>
          </Badge>
        </div>
      </div>

      {showChart && (
        <div className="bg-gray-50 p-4 mt-6 relative rounded-lg border border-gray-200">
          <div>
            <div className="mt-3 absolute right-4 top-2 z-10 justify-end items-end">
              {/* Urgency in visual design - FOMO visual design */}
              <Button
                variant="default"
                size="sm"
                onClick={handleOpenSponsorshipModal}
                className="relative overflow-hidden group hover:bg-primary/90 transition-all duration-300"
              >
                <span className="absolute inset-0 w-1/3 bg-white/20 skew-x-12 transform -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out"></span>
                <Bell size={14} className="mr-2" />
                <span>Learn About Sponsorship</span>
                <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  Limited
                </span>
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
          onScheduleConsultation={handleScheduleConsultation}
        />
      )}

      {/* Reservation Modal */}
      {showReservationModal && (
        <ReservationModal
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
          reservedStudents={[]}
          bulkReservation={true}
          bulkAmount={5}
          availableActiveCount={3}
          totalHiringNeed={5}
        />
      )}
    </div>
  );
};

export default TalentStats;
