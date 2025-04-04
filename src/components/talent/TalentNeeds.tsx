import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UsersRound,
  AlertCircle,
  ArrowRight,
  CalendarClock,
  GraduationCap,
  Award,
  Building,
  Check,
  Users,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface TalentNeedsProps {
  className?: string;
  availableCurrentStudents: number;
  availableProspectiveStudents: number;
  onStartReservation: (data: any) => void;
}

const programInfo = {
  "certified-medical-assistant": {
    title: "Certified Medical Assistant",
    description:
      "Learn essential clinical and administrative skills to assist physicians in healthcare settings.",
    duration: "20 Weeks",
    certification: "CCMA",
    format: "Hybrid & Online",
    classes: [
      "Foundations of Medical Assisting",
      "Clinical Procedures",
      "Pharmacology",
      "Medical Terminology",
      "Healthcare Law and Ethics",
    ],
    companies: [
      "Mayo Clinic",
      "Cleveland Clinic",
      "Kaiser Permanente",
      "Johns Hopkins Medicine",
      "Ascension",
    ],
  },
  "surgical-technologist": {
    title: "Surgical Technologist",
    description:
      "Prepare for a career assisting surgeons in the operating room with proper techniques and protocols.",
    duration: "24 Weeks",
    certification: "CST",
    format: "Hybrid",
    classes: [
      "Surgical Procedures",
      "Sterilization Techniques",
      "Anatomy & Physiology",
      "Surgical Pharmacology",
      "Operating Room Protocols",
    ],
    companies: [
      "HCA Healthcare",
      "Tenet Healthcare",
      "Intermountain Healthcare",
      "NYU Langone",
      "UPMC",
    ],
  },
  "sterile-processing": {
    title: "Sterile Processing Technician",
    description:
      "Learn to clean, sterilize, and prepare medical instruments and equipment for surgeries and procedures.",
    duration: "16 Weeks",
    certification: "CRCST",
    format: "Online with Labs",
    classes: [
      "Decontamination Procedures",
      "Sterilization Processes",
      "Inventory Management",
      "Medical Terminology",
      "Infection Control",
    ],
    companies: [
      "Steris",
      "Hospital Corporation of America",
      "Banner Health",
      "AdventHealth",
      "Providence Health",
    ],
  },
};

const jobRoleMap = {
  "medical-assistant": "certified-medical-assistant",
  "surgical-tech": "surgical-technologist",
  "sterile-processing-tech": "sterile-processing",
  "patient-care-tech": "certified-medical-assistant",
  "medical-administrative-assistant": "certified-medical-assistant",
};

const TalentNeeds = ({
  className,
  availableCurrentStudents,
  availableProspectiveStudents,
  onStartReservation,
}: TalentNeedsProps) => {
  const [location, setLocation] = useState("Dallas, TX");
  const [jobRole, setJobRole] = useState("medical-assistant");
  const [quantity, setQuantity] = useState(10);
  const [timeframe, setTimeframe] = useState("30days");

  // Get the program based on the selected job role
  const selectedProgram = jobRole ? programInfo[jobRoleMap[jobRole]] : null;

  // Calculate metrics based on inputs
  const neededCandidates = quantity;
  const availableActive = Math.min(availableCurrentStudents, neededCandidates);
  const gapAmount = Math.max(0, neededCandidates - availableActive);
  const availablePercent = Math.round(
    (availableActive / neededCandidates) * 100
  );
  const prospectivePercent = 100 - availablePercent;

  const handleStartReservation = () => {
    onStartReservation({
      neededCandidates,
      location,
      jobRole,
      timeframe,
      availableActive,
      gapAmount,
      program: selectedProgram?.title,
    });
  };

  return (
    <Card className={`border border-primary/20 shadow-sm ${className}`}>
      <CardHeader className="pb-3 bg-primary/5 border-b border-primary/20">
        <CardTitle className="text-lg flex items-center gap-2">
          <UsersRound size={20} className="text-primary" />
          Define Your Hiring Needs
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-4 md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Location
                </label>
                <Input
                  placeholder="e.g., San Francisco, Remote, etc."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Job Role
                </label>
                <Select value={jobRole} onValueChange={setJobRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical-assistant">
                      Medical Assistant
                    </SelectItem>
                    <SelectItem value="surgical-tech">
                      Surgical Technologist
                    </SelectItem>
                    <SelectItem value="sterile-processing-tech">
                      Sterile Processing Technician
                    </SelectItem>
                    <SelectItem value="patient-care-tech">
                      Patient Care Technician
                    </SelectItem>
                    <SelectItem value="medical-administrative-assistant">
                      Medical Administrative Assistant
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Candidates Needed</label>
              </div>
              <Input
                id="candidates"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="text-xl h-14 text-center font-semibold"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Hiring Timeframe
              </label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">Within 30 days</SelectItem>
                  <SelectItem value="60days">Within 60 days</SelectItem>
                  <SelectItem value="90days">Within 90 days</SelectItem>
                  <SelectItem value="6months">Within 6 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedProgram && (
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between gap-8 mb-4">
                  <div className="flex items-center">
                    <img
                      src="https://assets.skilltrade.com/production/permanent/skillttrade_logo.svg?dm=1724440579"
                      alt="Skilltrade"
                      className="h-5"
                    />
                  </div>
                  <h3 className="font-medium text-lg flex items-center gap-2">
                    {selectedProgram.title} Program
                  </h3>
                  <div className="flex flex-col gap-2">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      <Users size={14} className="mr-1" />
                      {availableCurrentStudents}&nbsp;Current
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-accent/10 text-accent border-accent/20"
                    >
                      {availableProspectiveStudents}&nbsp;Prospective
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {selectedProgram.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-2 bg-white rounded-md border border-primary/10">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="font-medium text-primary">
                      {selectedProgram.duration}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-md border border-primary/10">
                    <div className="text-xs text-gray-500 mb-1">
                      Certification
                    </div>
                    <div className="font-medium text-primary">
                      {selectedProgram.certification}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-md border border-primary/10">
                    <div className="text-xs text-gray-500 mb-1">Format</div>
                    <div className="font-medium text-primary">
                      {selectedProgram.format}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                    <Award size={16} className="text-primary" />
                    Key Classes
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProgram.classes.map((className, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-white border-primary/20 text-primary"
                      >
                        {className}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                    <Building size={16} className="text-primary" />
                    Graduates Working At
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.companies.map((company, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white text-xs rounded-md border border-primary/10"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-primary/5 rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <CalendarClock size={16} className="mr-1.5 text-primary" />
              Talent Availability
            </h3>

            <div className="mb-4">
              <div className="flex justify-between items-center text-sm">
                <span>Total Hiring Need:</span>
                <span className="font-semibold">
                  {neededCandidates} Candidates
                </span>
              </div>

              <Separator className="my-3" />

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Current Students Available:</span>
                    <span className="font-medium">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {availableActive}&nbsp;/&nbsp;{neededCandidates}
                      </Badge>
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${availablePercent}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Prospective Students Needed:</span>
                    <span className="font-medium">
                      <Badge
                        variant="outline"
                        className="bg-accent/10 text-accent border-accent/20"
                      >
                        {gapAmount}&nbsp;/&nbsp;{neededCandidates}
                      </Badge>
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${prospectivePercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {gapAmount > 0 && (
              <Alert
                variant="default"
                className="bg-amber-50 border-amber-200 mt-3 mb-3"
              >
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-800 text-xs">
                  Only {availableActive} current students available. You'll need
                  to sponsor {gapAmount} prospective students to fulfill your
                  needs.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <Check
                  size={16}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <span className="text-xs">
                  Skilltrade graduates deliver immediately with real-world
                  skills
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check
                  size={16}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <span className="text-xs">
                  Training and certification are included in sponsorship
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check
                  size={16}
                  className="text-primary mt-0.5 flex-shrink-0"
                />
                <span className="text-xs">
                  94% employer satisfaction rate with Skilltrade graduates
                </span>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => {
                const element = document.getElementById("view-students");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              disabled={!location || !jobRole || !timeframe}
            >
              Start Reserving Talent
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentNeeds;
