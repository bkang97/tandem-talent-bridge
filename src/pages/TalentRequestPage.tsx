
import React, { useState, useEffect } from "react";
import { Info, ArrowDownUp, RefreshCw } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import TalentFilters from "@/components/talent/TalentFilters";
import TalentCard from "@/components/talent/TalentCard";
import TalentStats from "@/components/talent/TalentStats";
import ReservationModal from "@/components/talent/ReservationModal";
import SupplyDemandChart from "@/components/talent/SupplyDemandChart";
import TalentNeeds from "@/components/talent/TalentNeeds";
import MarketAnalysis from "@/components/talent/MarketAnalysis";
import SponsoredTalentInfo from "@/components/talent/SponsoredTalentInfo";
import SponsorshipModal from "@/components/talent/SponsorshipModal"; // Fixed import path
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const generateMockStudents = () => {
  const locations = [
    "San Francisco, CA",
    "New York, NY",
    "Austin, TX",
    "Chicago, IL",
    "Seattle, WA",
    "Remote",
  ];
  const schools = [
    "ForgeNow",
    "AIM",
    "CodeCampus",
    "TechAcademy",
    "SkillTrade",
  ];
  const programs = [
    "Cybersecurity Analyst",
    "Cloud Solutions Architect",
    "Data Analytics",
    "Full Stack Developer",
    "UX/UI Designer",
    "IT Project Management",
  ];
  const availabilityOptions = [
    "Immediately",
    "In 2 weeks",
    "In 30 days",
    "In 60 days",
    "In 90 days",
  ];

  const skillSets = {
    "Cybersecurity Analyst": [
      "Cybersecurity",
      "Network Security",
      "Penetration Testing",
      "SIEM",
      "Risk Assessment",
    ],
    "Cloud Solutions Architect": [
      "Cloud Computing",
      "AWS",
      "Azure",
      "DevOps",
      "Infrastructure as Code",
    ],
    "Data Analytics": [
      "Data Analysis",
      "SQL",
      "Python",
      "Tableau",
      "Power BI",
      "R",
    ],
    "Full Stack Developer": [
      "JavaScript",
      "React",
      "Node.js",
      "REST APIs",
      "SQL",
      "Git",
    ],
    "UX/UI Designer": [
      "UI/UX Design",
      "Figma",
      "User Research",
      "Wireframing",
      "Prototyping",
    ],
    "IT Project Management": [
      "Project Management",
      "Agile",
      "Scrum",
      "JIRA",
      "Risk Management",
    ],
  };

  const aboutTexts = {
    "Cybersecurity Analyst":
      "Cybersecurity professional with experience in network security, vulnerability assessment, and security monitoring. Skilled in security tools and SIEM systems.",
    "Cloud Solutions Architect":
      "Cloud solutions professional with expertise in cloud services, migration, and implementing infrastructure as code. Strong problem-solving abilities and certification in cloud platforms.",
    "Data Analytics":
      "Data analytics professional skilled in transforming complex data into actionable insights. Strong background in business intelligence and creating interactive dashboards.",
    "Full Stack Developer":
      "Full stack developer with expertise in JavaScript frameworks. Passionate about creating efficient, scalable web applications with intuitive user interfaces.",
    "UX/UI Designer":
      "UX/UI designer with a focus on creating user-centered digital experiences. Strong portfolio of web and mobile application designs with a keen eye for detail.",
    "IT Project Management":
      "IT project manager with experience in software development projects. Expertise in Agile methodologies and strong communication skills.",
  };

  const students = [];
  for (let i = 1; i <= 40; i++) {
    const program = programs[Math.floor(Math.random() * programs.length)];
    const yearsExp = Math.floor(Math.random() * 5) + 1;

    // Make all but 3 off-market
    const isOffMarket = i > 3;

    students.push({
      id: i.toString(),
      name: `Student ${i}`,
      avatar: "/placeholder.svg",
      location: locations[Math.floor(Math.random() * locations.length)],
      skills: [...skillSets[program]]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2),
      school: schools[Math.floor(Math.random() * schools.length)],
      program,
      availableDate:
        availabilityOptions[
          Math.floor(Math.random() * availabilityOptions.length)
        ],
      yearsExperience: yearsExp,
      isReserved: isOffMarket,
      isOffMarket: isOffMarket,
      isProspective: false,
      about: `${aboutTexts[program]} ${yearsExp} years of relevant experience in the field.`,
    });
  }

  return students;
};

const generateProspectiveStudents = () => {
  const locations = [
    "San Francisco, CA",
    "New York, NY",
    "Austin, TX",
    "Chicago, IL",
    "Seattle, WA",
    "Remote",
  ];
  const backgroundTypes = [
    "Career Changer",
    "Recent Graduate",
    "Former Military",
    "Self-Taught",
    "Bootcamp Graduate",
  ];
  const programs = [
    "Certified Medical Assistant",
    "Surgical Technologist",
    "Sterile Processing Technician",
    "Patient Care Technician",
    "Medical Administrative Assistant",
  ];

  const availabilityOptions = [
    "Available upon sponsorship",
    "Ready in 3-4 months",
    "Ready in 6 months",
  ];

  const skillSets = {
    "Certified Medical Assistant": [
      "Patient Care",
      "Vital Signs",
      "Medical Terminology",
      "EHR Systems",
      "Clinical Procedures",
    ],
    "Surgical Technologist": [
      "Surgical Procedures",
      "Sterilization",
      "Medical Instruments",
      "Perioperative Care",
      "Aseptic Technique",
    ],
    "Sterile Processing Technician": [
      "Sterilization Techniques",
      "Decontamination",
      "Inventory Management",
      "Medical Instruments",
      "Quality Control",
    ],
    "Patient Care Technician": [
      "Basic Care",
      "Vital Monitoring",
      "Patient Mobility",
      "Medical Terminology",
      "Phlebotomy",
    ],
    "Medical Administrative Assistant": [
      "Medical Office",
      "Medical Billing",
      "Medical Coding",
      "Patient Scheduling",
      "Medical Transcription",
    ],
  };

  const aboutTexts = {
    "Certified Medical Assistant":
      "Prospective medical assistant with strong foundations in patient care and clinical procedures. Ready to provide both administrative and clinical support in healthcare settings.",
    "Surgical Technologist":
      "Future surgical technologist with interest in operating room procedures and sterile techniques. Eager to assist surgeons and prepare for surgical procedures.",
    "Sterile Processing Technician":
      "Prospective sterile processing technician with attention to detail and knowledge of basic sterilization concepts. Ready to ensure medical instruments are properly prepared.",
    "Patient Care Technician":
      "Aspiring patient care technician with compassion for patients and fundamental care skills. Ready to provide basic care under nursing supervision.",
    "Medical Administrative Assistant":
      "Future medical administrative assistant with organizational skills and customer service experience. Ready to manage front office operations in healthcare settings.",
  };

  const students = [];
  for (let i = 1; i <= 20; i++) {
    const program = programs[Math.floor(Math.random() * programs.length)];
    const backgroundType =
      backgroundTypes[Math.floor(Math.random() * backgroundTypes.length)];

    students.push({
      id: `p-${i}`,
      name: `Prospective ${i}`,
      avatar: "/placeholder.svg",
      location: locations[Math.floor(Math.random() * locations.length)],
      skills: [...skillSets[program]]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2),
      backgroundType,
      program,
      availableDate:
        availabilityOptions[
          Math.floor(Math.random() * availabilityOptions.length)
        ],
      yearsExperience: 0,
      isReserved: i <= 6,
      isProspective: true,
      about: `${aboutTexts[program]} Background: ${backgroundType}.`,
    });
  }

  return students;
};

const TalentRequestPage = () => {
  const [currentStudents, setCurrentStudents] = useState(
    generateMockStudents()
  );
  const [prospectiveStudents, setProspectiveStudents] = useState(
    generateProspectiveStudents()
  );
  const [displayMode, setDisplayMode] = useState("current"); // 'all', 'current', 'prospective'
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("relevance");
  const [activeTab, setActiveTab] = useState("browse");
  const [showSupplyDemandChart, setShowSupplyDemandChart] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [bulkReservation, setBulkReservation] = useState(false);
  const [hiringNeeds, setHiringNeeds] = useState({
    neededCandidates: 10,
    location: "",
    skillSet: "",
  });
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);

  const getFilteredStudents = () => {
    let students = [];
    if (displayMode === "all" || displayMode === "current") {
      students = [...students, ...currentStudents];
    }
    if (displayMode === "all" || displayMode === "prospective") {
      students = [...students, ...prospectiveStudents];
    }
    return students;
  };

  const students = getFilteredStudents();

  const handleFilterChange = (newFilters: any) => {
    console.log("Applied filters:", newFilters);
    setFilters(newFilters);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleDisplayModeChange = (mode: string) => {
    setDisplayMode(mode);
  };

  const handleReserveStudent = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (student) {
      setSelectedStudents([student]);
      setShowReservationModal(true);
      setBulkReservation(false);
    }
  };

  const handleStartReservation = (data: any) => {
    setBulkReservation(true);
    setHiringNeeds(data);
    setShowReservationModal(true);
  };

  const completeReservation = () => {
    const updatedSelectedIds = selectedStudents.map((s) => s.id);

    if (selectedStudents.some((s) => !s.isProspective)) {
      setCurrentStudents((prevStudents) =>
        prevStudents.map((student) =>
          updatedSelectedIds.includes(student.id)
            ? { ...student, isReserved: true, isOffMarket: true }
            : student
        )
      );
    }

    if (selectedStudents.some((s) => s.isProspective)) {
      setProspectiveStudents((prevStudents) =>
        prevStudents.map((student) =>
          updatedSelectedIds.includes(student.id)
            ? { ...student, isReserved: true }
            : student
        )
      );
    }

    setShowReservationModal(false);
    setSelectedStudents([]);
    setBulkReservation(false);
  };

  const currentReservedCount = currentStudents.filter(
    (s) => s.isReserved
  ).length;
  const currentAvailableCount = currentStudents.length - currentReservedCount;

  const prospectiveReservedCount = prospectiveStudents.filter(
    (s) => s.isReserved
  ).length;
  const prospectiveAvailableCount =
    prospectiveStudents.length - prospectiveReservedCount;

  const totalReservedCount = currentReservedCount + prospectiveReservedCount;
  const totalAvailableCount = currentAvailableCount + prospectiveAvailableCount;
  const totalCount = currentStudents.length + prospectiveStudents.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary/5 border-b border-primary/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 font-bold text-xl">
              <img
                src="https://assets.skilltrade.com/production/permanent/skillttrade_logo.svg?dm=1724440579"
                alt="Skilltrade"
                className="h-8"
              />
            </div>
            <div className="mt-2 md:mt-0">
              <div>
                <h2 className="text-black font-semibold">
                  Employer Talent Portal
                </h2>
                <p className="text-sm text-black/80">
                  Access to SkillTrade's current and prospective talent pool
                </p>
              </div>
              <div>
                <Badge className="bg-black text-white border-black/20 mr-2">
                  Powered by Tandem
                </Badge>
                <Badge variant="outline" className="border-black text-black">
                  Spring 2025 Cohort
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary">
            SkillTrade Talent Placement
          </h1>
          <p className="text-gray-600 mt-1">
            Connect with qualified candidates from SkillTrade who are ready to
            be hired immediately or sponsored for training.
          </p>
        </div>

        <Alert className="mb-6 bg-white border border-black/20 ">
          <Info size={16} className="mr-1.5 text-black" />
          <AlertTitle className="text-black font-semibold">
            How do I use this?
          </AlertTitle>
          <AlertDescription className="text-black">
            Reserve current candidates to take them off-market, or sponsor
            prospective candidates to build your future talent pipeline through
            our Tandem Sponsorship program.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <TalentNeeds
              availableCurrentStudents={currentAvailableCount}
              availableProspectiveStudents={prospectiveAvailableCount}
              onStartReservation={handleStartReservation}
            />
          </div>
          <div className="lg:col-span-1">
            <SponsoredTalentInfo />
          </div>
        </div>

        <hr className="my-4 mb-6" />

        <div className="flex flex-col lg:flex-row gap-6" id="view-students">
          <div className="lg:w-3/4">
            <h1 className="text-2xl font-bold text-black mb-4">
              Reserve Your Talent
            </h1>
            <Tabs defaultValue="browse" className="space-y-6">
              <TabsList className="w-full grid grid-cols-2 bg-black/5 text-black/80 border border-black/20 h-11 px-1.5">
                <TabsTrigger
                  value="browse"
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Browse Candidates
                </TabsTrigger>
                <TabsTrigger
                  value="stats"
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  Market Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="space-y-6">
                <TalentStats
                  availableCount={
                    displayMode === "current"
                      ? currentAvailableCount
                      : displayMode === "prospective"
                      ? prospectiveAvailableCount
                      : totalAvailableCount
                  }
                  reservedCount={
                    displayMode === "current"
                      ? currentReservedCount
                      : displayMode === "prospective"
                      ? prospectiveReservedCount
                      : totalReservedCount
                  }
                  totalCount={
                    displayMode === "current"
                      ? currentStudents.length
                      : displayMode === "prospective"
                      ? prospectiveStudents.length
                      : totalCount
                  }
                  onShowChart={() =>
                    setShowSupplyDemandChart(!showSupplyDemandChart)
                  }
                  showChart={showSupplyDemandChart}
                />

                <div
                  className={`bg-white p-6 rounded-lg border ${
                    displayMode === "prospective"
                      ? "border-primary"
                      : "border-black"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                    <h2
                      className={`text-xl font-semibold text-black ${
                        displayMode === "prospective"
                          ? "text-primary"
                          : "text-black"
                      }`}
                    >
                      {displayMode === "current"
                        ? "View Current Students"
                        : displayMode === "prospective"
                        ? "Hire Prospective Students"
                        : "All Candidates"}
                    </h2>

                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex rounded-md overflow-hidden border ${
                          displayMode === "prospective"
                            ? "border-primary"
                            : "border-black"
                        }`}
                      >
                        <button
                          className={`px-3 py-1.5 text-sm ${
                            displayMode === "current"
                              ? "bg-black/80 text-white"
                              : "bg-white text-primary"
                          }`}
                          onClick={() => handleDisplayModeChange("current")}
                        >
                          Current
                        </button>
                        <button
                          className={`px-3 py-1.5 text-sm ${
                            displayMode === "prospective"
                              ? "bg-primary text-white"
                              : "bg-white text-black/80"
                          }`}
                          onClick={() => handleDisplayModeChange("prospective")}
                        >
                          Prospective
                        </button>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`flex items-center gap-2 border border-black/20 text-black ${
                              displayMode === "prospective"
                                ? "bg-primary text-white border-none"
                                : "bg-white hover:bg-black"
                            }`}
                          >
                            <ArrowDownUp size={16} />
                            Sort:{" "}
                            {sortOption.charAt(0).toUpperCase() +
                              sortOption.slice(1)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleSortChange("relevance")}
                          >
                            Relevance
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSortChange("availability")}
                          >
                            Availability (Soonest)
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleSortChange("experience")}
                          >
                            Experience (Most)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        variant="ghost"
                        size="icon"
                        title="Refresh results"
                        className="text-primary/80"
                      >
                        <RefreshCw size={16} />
                      </Button>
                    </div>
                  </div>

                  <TalentFilters onFilterChange={handleFilterChange} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {students.map((student) => (
                      <TalentCard
                        key={student.id}
                        student={student}
                        onReserve={handleReserveStudent}
                      />
                    ))}
                  </div>

                  {students.length > 8 && (
                    <div className="mt-8 text-center">
                      <Button
                        variant="outline"
                        className="border-primary/20 text-primary/80 hover:bg-primary/5"
                      >
                        Load More ({students.length - 8} Remaining)
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="stats" className="overflow-hidden">
                <MarketAnalysis />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-black/20">
              <h3 className="font-medium mb-3 text-black">Recently Reserved</h3>
              <ScrollArea className="h-[300px]">
                {students.filter((s) => s.isReserved).length > 0 ? (
                  <div className="space-y-2 pr-3">
                    {students
                      .filter((s) => s.isReserved)
                      .slice(0, 8)
                      .map((student) => (
                        <div
                          key={student.id}
                          className="p-2 border-b flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary/80 text-xs mr-2">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <div className="text-sm font-medium">
                                {student.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {student.program}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {student.isProspective && (
                              <Badge
                                variant="outline"
                                className="mr-2 bg-primary/5 text-primary/80 border-primary/20 text-xs"
                              >
                                Prospective
                              </Badge>
                            )}
                            <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                              Off-market
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No candidates reserved yet</p>
                  </div>
                )}
              </ScrollArea>

              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-medium mb-2 text-primary">
                  Need more talent?
                </h3>
                <p className="text-sm text-primary/80 mb-3">
                  Through our Tandem Sponsorship program, you can create a
                  pipeline of candidates tailored to your specific needs.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-primary/30 text-primary/80 hover:bg-primary/10"
                  onClick={() => setShowSponsorshipModal(true)}
                >
                  Learn About Sponsorship
                </Button>
              </div>

              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h3 className="font-medium mb-2 text-primary">
                  SkillTrade Talent Success
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-primary">96%</div>
                    <div className="text-primary/80">Placement rate</div>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">94%</div>
                    <div className="text-primary/80">Employer satisfaction</div>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">92%</div>
                    <div className="text-primary/80">1-year retention rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 SkillTrade. This talent portal is provided exclusively for
            SkillTrade employer partners.
          </p>
        </div>
      </main>

      {showReservationModal && (
        <ReservationModal
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
          reservedStudents={selectedStudents}
          bulkReservation={bulkReservation}
          bulkAmount={hiringNeeds.neededCandidates}
          availableActiveCount={Math.min(
            currentAvailableCount,
            hiringNeeds.neededCandidates
          )}
          totalHiringNeed={hiringNeeds.neededCandidates}
        />
      )}

      {showSponsorshipModal && (
        <SponsorshipModal 
          isOpen={showSponsorshipModal} 
          onClose={() => setShowSponsorshipModal(false)} 
        />
      )}
    </div>
  );
};

export default TalentRequestPage;
