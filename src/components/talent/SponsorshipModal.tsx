import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Building,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";

interface SponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SponsorshipModal = ({ isOpen, onClose }: SponsorshipModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 overflow-y-auto max-h-[90%] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column - Visual Explanation */}
          <div className="bg-primary/5 p-8 flex flex-col justify-center">
            <img
              src="https://assets.skilltrade.com/production/permanent/skillttrade_logo.svg?dm=1724440579"
              alt="Skilltrade"
              className="h-8 mb-6"
            />
            <h3 className="text-xl font-bold text-primary mb-4 text-center">
              How Sponsorship Works
            </h3>

            <div className="relative mt-4">
              {/* Connector Lines */}
              <div className="absolute h-full w-1 bg-primary/20 left-6 top-10 -z-10"></div>

              {/* Step 1 */}
              <div className="flex mb-10 items-start">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="font-bold">1</span>
                </div>
                <div className="ml-5">
                  <h4 className="font-semibold text-lg flex items-center">
                    <Building className="mr-2 text-primary" size={20} />
                    Hire
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Interview and select pre-screened candidates that align with
                    your hiring needs before training begins.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex mb-10 items-start">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="font-bold">2</span>
                </div>
                <div className="ml-5">
                  <h4 className="font-semibold text-lg flex items-center">
                    <GraduationCap className="mr-2 text-primary" size={20} />
                    Train
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Candidates undergo rigorous training through our accredited
                    academic partners in programs aligned with your specific
                    needs.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="font-bold">3</span>
                </div>
                <div className="ml-5">
                  <h4 className="font-semibold text-lg flex items-center">
                    <BriefcaseBusiness
                      className="mr-2 text-primary"
                      size={20}
                    />
                    Sponsor
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Your sponsorship covers all or part of the training costs,
                    and in return, candidates commit to joining your
                    organization upon graduation. <br />
                    <br />
                    Graduates join your organization with the exact skills you
                    need
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Information */}
          <div className="p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Tandem Sponsorship Program
              </DialogTitle>
              <DialogDescription className="text-base">
                Build your custom talent pipeline through our employer-sponsored
                training model
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-700">
                The Tandem Sponsorship program connects employers with qualified
                candidates and top-tier training providers to build a
                sustainable talent pipeline tailored to your specific needs.
              </p>

              <div className="rounded-lg bg-white border border-primary/20 p-4 mt-4">
                <h4 className="font-medium text-primary mb-2">Key Benefits</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Close skill gaps with custom-trained talent
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Reduce hiring costs and time-to-productivity
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Improve retention with candidates who are committed to
                      your organization
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Scale your workforce with predictable talent acquisition
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex flex-col sm:flex-col gap-3">
                <Button className="flex-1">Schedule a Consultation</Button>
                <Button
                  variant="outline"
                  className="flex-1 border-primary/30 text-primary/80"
                >
                  Download Program Guide <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SponsorshipModal;
