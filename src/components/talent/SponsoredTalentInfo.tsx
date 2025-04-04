import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Building2,
  GraduationCap,
  Briefcase,
  Users,
} from "lucide-react";
import SponsorshipModal from "./SponsorshipModal";

interface SponsoredTalentInfoProps {
  onClose?: () => void;
  className?: string;
}

const SponsoredTalentInfo = ({
  onClose,
  className,
}: SponsoredTalentInfoProps) => {
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);

  return (
    <>
      <Card
        className={`border border-black/20 shadow-md animate-fade-in ${className}`}
      >
        <CardHeader className="pb-3 border-b border-black/20 bg-black/5 ">
          <div className="flex items-center gap-2 mb-2">
            <img
              src="https://assets.skilltrade.com/production/permanent/skillttrade_logo.svg?dm=1724440579"
              alt="Skilltrade"
              className="h-6"
            />
          </div>
          <CardTitle className="text-lg text-black flex items-center">
            Sponsored Talent
          </CardTitle>
          <CardDescription>
            Guarantee a pipeline of qualified talent by sponsoring prospective
            candidates
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="space-y-2">
            <h3 className="font-medium">How It Works</h3>
            <ol className="space-y-2">
              <li className="flex items-start">
                <div className="bg-black rounded-full p-1 text-white mr-2 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-sm">
                  Create sponsored job opportunities that include training
                  sponsorship
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-black rounded-full p-1 text-white mr-2 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-sm">
                  Get matched with qualified, pre-screened candidates for your
                  roles
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-black rounded-full p-1 text-white mr-2 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-sm">
                  Invite candidates to apply and interview for your positions
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-black rounded-full p-1 text-white mr-2 mt-0.5">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-sm">
                  Hire and sponsor selected candidates through our training
                  program
                </span>
              </li>
            </ol>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h3 className="font-medium">Benefits</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex items-start col-span-2 md:col-span-1">
                <div className="bg-primary/10 rounded-md p-1 text-primary mr-2">
                  <Users className="h-4 w-4" />
                </div>
                <span className="text-sm">
                  Custom talent pipeline tailored to your needs
                </span>
              </li>
              <li className="flex items-start col-span-2 md:col-span-1">
                <div className="bg-primary/10 rounded-md p-1 text-primary mr-2">
                  <Building2 className="h-4 w-4" />
                </div>
                <span className="text-sm">
                  Reduce hiring costs and time-to-fill positions
                </span>
              </li>
            </ul>
          </div>

          <Button
            className="w-full mt-4"
            onClick={() => setShowSponsorshipModal(true)}
          >
            Learn More About Sponsorship
          </Button>
        </CardContent>
      </Card>

      {showSponsorshipModal && (
        <SponsorshipModal
          isOpen={showSponsorshipModal}
          onClose={() => setShowSponsorshipModal(false)}
        />
      )}
    </>
  );
};

export default SponsoredTalentInfo;
