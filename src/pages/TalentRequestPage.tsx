import React, { useState, useEffect } from "react";
import {
  Info,
  ArrowDownUp,
  RefreshCw,
  Search,
  Users,
  Filter,
  CalendarClock,
  BarChart,
  TrendingUp,
  Star,
  Building,
  Check,
  Award,
  Menu,
  X
} from "lucide-react";
import TalentFilters from "@/components/talent/TalentFilters";
import TalentCard from "@/components/talent/TalentCard";
import ReservationModal from "@/components/talent/ReservationModal";
import SupplyDemandChart from "@/components/talent/SupplyDemandChart";
import MarketAnalysis from "@/components/talent/MarketAnalysis";
import SponsorshipModal from "@/components/talent/SponsorshipModal";
import AccessMoreTalentTooltip from "@/components/talent/AccessMoreTalentTooltip";
import ResponsiveAccessTooltip from "@/components/talent/ResponsiveAccessTooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBreakpoint } from "@/hooks/use-breakpoint";
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
import { Input } from "@/components/ui/input";

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
    location: "Dallas, TX",
    skillSet: "medical-assistant",
  });
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [showAccessTooltip, setShowAccessTooltip] = useState(true);
  const [showSecondStep, setShowSecondStep] = useState(false);
  const isMobile = useIsMobile();
  const isDesktop = useBreakpoint("lg");

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
      setBulkReservation(true);
    }
  };

  const handleStartReservation = (data: any) => {
    setBulkReservation(true);
    setHiringNeeds(data);
    setShowReservationModal(true);
  };

  const handleOpenSponsorshipModal = () => {
    setShowSponsorshipModal(true);
  };

  const handleScheduleConsultation = () => {
    setShowSponsorshipModal(false);
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

  const recentActivity = [
    {
      company: "TechCorp",
      action: "reserved 2 candidates",
      time: "5 min ago",
    },
    {
      company: "MedLabs",
      action: "sponsored 5 candidates",
      time: "12 min ago",
    },
    {
      company: "FinanceHub",
      action: "viewed this pool",
      time: "just now",
    },
    {
      company: "Healthcare Partners",
      action: "scheduled a consultation",
      time: "23 min ago",
    },
    {
      company: "City Medical",
      action: "reserved 8 candidates",
      time: "1 hour ago",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % recentActivity.length);
    }, 8000); // Rotate every 8 seconds

    return () => {
      clearInterval(interval);
    };
  }, [recentActivity.length]);

  useEffect(() => {
    if (displayMode === "prospective") {
      setShowAccessTooltip(false);
    }
  }, [displayMode]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="https://assets.skilltrade.com/production/permanent/skillttrade_logo.svg?dm=1724440579"
                alt="Skilltrade"
                className="h-6 sm:h-8"
              />
              {!isMobile && (
                <>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <h2 className="text-black font-semibold text-sm sm:text-base">
                    Employer Talent Portal
                  </h2>
                </>
              )}
            </div>
            <Badge variant="outline" className="border-black/20 text-black text-xs sm:text-sm">
              Spring 2025 Cohort
            </Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto mobile-container max-w-7xl">
        <div className="mobile-section">
          <h1 className="mobile-text-xl md:text-2xl font-bold text-black">
            SkillTrade Talent Placement
          </h1>
          <p className="mobile-text-sm md:text-base text-gray-600 mt-1">
            Connect with qualified candidates who are ready to be hired
            immediately or sponsored for training.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-primary/5 border-b border-primary/10 px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2">
              <Users size={isMobile ? 16 : 18} className="text-primary" />
              <h2 className="mobile-text-base md:text-lg font-semibold">
                Define Your Hiring Needs
              </h2>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="mobile-text-sm font-medium mb-1 block">
                      Location
                    </label>
                    <Input
                      value={hiringNeeds.location}
                      onChange={(e) =>
                        setHiringNeeds({
                          ...hiringNeeds,
                          location: e.target.value,
                        })
                      }
                      placeholder="e.g., Dallas, TX"
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="mobile-text-sm font-medium mb-1 block">
                      Job Role
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-9 sm:h-10 px-3 py-1 sm:py-2 bg-background border border-input rounded-md appearance-none text-sm sm:text-base"
                        value={hiringNeeds.skillSet}
                        onChange={(e) =>
                          setHiringNeeds({
                            ...hiringNeeds,
                            skillSet: e.target.value,
                          })
                        }
                      >
                        <option value="medical-assistant">
                          Medical Assistant
                        </option>
                        <option value="surgical-tech">
                          Surgical Technologist
                        </option>
                        <option value="sterile-processing-tech">
                          Sterile Processing Technician
                        </option>
                        <option value="patient-care-tech">
                          Patient Care Technician
                        </option>
                        <option value="medical-administrative-assistant">
                          Medical Administrative Assistant
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mobile-text-sm font-medium mb-1 block">
                      Candidates Needed
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={hiringNeeds.neededCandidates}
                      onChange={(e) =>
                        setHiringNeeds({
                          ...hiringNeeds,
                          neededCandidates: parseInt(e.target.value) || 0,
                        })
                      }
                      className="text-base sm:text-lg h-9 sm:h-10 font-medium"
                    />
                  </div>

                  <div>
                    <label className="mobile-text-sm font-medium mb-1 block">
                      Hiring Timeframe
                    </label>
                    <div className="relative">
                      <select className="w-full h-9 sm:h-10 px-3 py-1 sm:py-2 bg-background border border-input rounded-md appearance-none text-sm sm:text-base">
                        <option value="30days">Within 30 days</option>
                        <option value="60days">Within 60 days</option>
                        <option value="90days">Within 90 days</option>
                        <option value="6months">Within 6 months</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 sm:p-5 border border-gray-200">
                  <h3 className="mobile-text-sm sm:text-base font-medium mb-3 flex items-center gap-2">
                    <CalendarClock size={isMobile ? 14 : 16} className="text-primary" />
                    Talent Availability
                  </h3>

                  <div className="mb-3 sm:mb-4">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span>Total Need:</span>
                      <span className="font-semibold">
                        {hiringNeeds.neededCandidates} Candidates
                      </span>
                    </div>

                    <div className="h-px bg-gray-200 my-2 sm:my-3"></div>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1 text-xs sm:text-sm">
                          <span>Current Students:</span>
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20 text-xs"
                          >
                            {Math.min(
                              currentAvailableCount,
                              hiringNeeds.neededCandidates
                            )}{" "}
                            / {hiringNeeds.neededCandidates}
                          </Badge>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                (currentAvailableCount /
                                  hiringNeeds.neededCandidates) *
                                  100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1 text-xs sm:text-sm">
                          <span>Prospective Needed:</span>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 border-amber-200 text-xs"
                          >
                            {Math.max(
                              0,
                              hiringNeeds.neededCandidates -
                                currentAvailableCount
                            )}{" "}
                            / {hiringNeeds.neededCandidates}
                          </Badge>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                (Math.max(
                                  0,
                                  hiringNeeds.neededCandidates -
                                    currentAvailableCount
                                ) /
                                  hiringNeeds.neededCandidates) *
                                  100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {hiringNeeds.neededCandidates > currentAvailableCount && (
                    <Alert className="bg-amber-50 border-amber-200 mb-3 sm:mb-4 py-2 sm:py-3">
                      <AlertDescription className="text-amber-800 text-xs">
                        Only {currentAvailableCount} current students available.
                        Consider sponsoring{" "}
                        {hiringNeeds.neededCandidates - currentAvailableCount}{" "}
                        prospective students.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                    <div className="flex items-start gap-2">
                      <Check
                        size={isMobile ? 14 : 16}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span className="text-xs">
                        Skilltrade graduates deliver immediately with real-world
                        skills
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check
                        size={isMobile ? 14 : 16}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span className="text-xs">
                        Training and certification are included in sponsorship
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check
                        size={isMobile ? 14 : 16}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      <span className="text-xs">
                        94% employer satisfaction rate with Skilltrade graduates
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full text-sm sm:text-base"
                    onClick={() => {
                      setShowSecondStep(true);
                      setTimeout(() => {
                        const element =
                          document.getElementById("view-students");
                        if (element) {
                          const y =
                            element.getBoundingClientRect().top +
                            window.scrollY -
                            20;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }, 100);
                    }}
                  >
                    Start Reserving Talent
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white">
            {hiringNeeds.skillSet === "medical-assistant" && (
              <div className="p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/20 flex flex-col gap-4 sm:gap-6 min-h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
                  <div className="md:col-span-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src="https://assets.skilltrade.com/production/permanent/skillttrade_logo.svg?dm=1724440579"
                        alt="Skilltrade"
                        className="h-4 sm:h-5"
                      />
                    </div>

                    <div className="flex flex-row gap-1 sm:gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20 text-xs"
                      >
                        <Users size={12} className="mr-1" />
                        {currentAvailableCount} Current
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 text-xs"
                      >
                        {prospectiveAvailableCount} Prospective
                      </Badge>
                    </div>
                  </div>

                  <div className="md:col-span-4 mb-1 sm:mb-2">
                    <h3 className="mobile-text-base md:text-lg font-medium text-primary">
                      Certified Medical Assistant Program
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Learn essential clinical and administrative skills to
                      assist physicians in healthcare settings.
                    </p>
                  </div>

                  <div className="text-center p-2 bg-white rounded-md border border-primary/10">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="font-medium text-primary text-xs sm:text-sm">20 Weeks</div>
                  </div>

                  <div className="text-center p-2 bg-white rounded-md border border-primary/10">
                    <div className="text-xs text-gray-500 mb-1">
                      Certification
                    </div>
                    <div className="font-medium text-primary text-xs sm:text-sm">CCMA</div>
                  </div>

                  <div className="text-center p-2 bg-white rounded-md border border-primary/10">
                    <div className="text-xs text-gray-500 mb-1">Format</div>
                    <div className="font-medium text-primary text-xs sm:text-sm">
                      Hybrid & Online
                    </div>
                  </div>
                </div>
                <div className="">
                  <h4 className="text-xs sm:text-sm font-medium mb-2 flex items-center gap-1.5">
                    <Award size={isMobile ? 14 : 16} className="text-primary" />
                    Key Classes
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {programInfo[jobRoleMap[hiringNeeds.skillSet]].classes.map(
                      (className, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-white border-primary/20 text-primary text-xs"
                        >
                          {className}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-medium mb-2 flex items-center gap-1.5">
                    <Building size={isMobile ? 14 : 16} className="text-primary" />
                    Graduates Working At
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {programInfo[
                      jobRoleMap[hiringNeeds.skillSet]
                    ].companies.map((company, index) => (
                      <span
                        key={index}
                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white text-xs rounded-md border border-primary/10"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showSecondStep ? (
          <>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6" id="view-students">
              <div className="lg:w-3/4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="mobile-text-lg md:text-xl font-bold text-black">
                    Reserve Your Talent
                  </h2>
                </div>

                <Tabs defaultValue="browse" className="space-y-4 sm:space-y-6">
                  <TabsList className="w-full grid grid-cols-2 bg-black/5 text-black/80 border border-black
