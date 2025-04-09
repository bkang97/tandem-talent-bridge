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
} from "lucide-react";
import TalentFilters from "@/components/talent/TalentFilters";
import TalentCard from "@/components/talent/TalentCard";
import ReservationModal from "@/components/talent/ReservationModal";
import SupplyDemandChart from "@/components/talent/SupplyDemandChart";
import MarketAnalysis from "@/components/talent/MarketAnalysis";
import SponsorshipModal from "@/components/talent/SponsorshipModal";
import AccessMoreTalentTooltip from "@/components/talent/AccessMoreTalentTooltip";
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
    "Norfolk, VA",
    "Virginia Beach, VA",
    "Chesapeake, VA",
    "Hampton, VA",
    "Newport News, VA",
    "Portsmouth, VA",
  ];
  const schools = [
    "Tidewater Tech", // Focus on Tidewater Tech
    "Local Community College",
    "Other VA Trade School",
  ];
  // Only include Auto Tech and Welder programs
  const programs = ["Auto Technician", "Combination Welder"];
  const availabilityOptions = [
    "Immediately",
    "In 2 weeks",
    "In 30 days",
    "In 60 days",
  ];

  // Only include skill sets for the two programs
  const skillSets = {
    "Auto Technician": [
      "Engine Repair",
      "Brakes & ABS",
      "Steering & Suspension",
      "Electrical Systems",
      "HVAC Systems",
      "Diagnostics",
      "ASE Certified",
    ],
    "Combination Welder": [
      "SMAW",
      "GMAW (MIG)",
      "FCAW",
      "GTAW (TIG)",
      "Blueprint Reading",
      "Metal Fabrication",
      "Pipe Welding",
      "AWS Certified",
    ],
  };

  // Only include about texts for the two programs
  const aboutTexts = {
    "Auto Technician":
      "Skilled Auto Technician with hands-on experience in diagnostics, repair, and maintenance of various vehicle systems. Detail-oriented and committed to quality workmanship.",
    "Combination Welder":
      "Certified Combination Welder proficient in SMAW, GMAW, FCAW, and GTAW processes. Experienced in fabrication, structural welding, and adhering to safety standards.",
  };

  const students = [];
  // Generate 20 students total (10 per program on average)
  for (let i = 1; i <= 40; i++) {
    const program = programs[Math.floor(Math.random() * programs.length)];
    const yearsExp = Math.floor(Math.random() * 4) + 1; // 1-4 years experience

    // Make most off-market/reserved for realism
    const isOffMarket = i > 27; // Example: First 5 are available/not reserved

    students.push({
      id: `grad-${i}`, // Prefix ID
      name: `${program.split(" ")[0]} Grad ${i}`, // e.g., Auto Grad 1
      avatar: "/placeholder.svg",
      location: locations[Math.floor(Math.random() * locations.length)],
      skills: [...skillSets[program]]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 3), // Show 3-5 skills
      school: schools[Math.floor(Math.random() * schools.length)],
      program,
      availableDate:
        availabilityOptions[
          Math.floor(Math.random() * availabilityOptions.length)
        ],
      yearsExperience: yearsExp,
      isReserved: isOffMarket, // Link reservation status to market status
      isOffMarket: isOffMarket,
      isProspective: false,
      about: `${aboutTexts[program]} ${yearsExp} years of relevant experience.`,
    });
  }

  // Ensure Tidewater Tech is represented
  students.forEach((student, index) => {
    if (index % 3 === 0) {
      // Assign Tidewater Tech to roughly 1/3rd
      student.school = "Tidewater Tech";
    }
  });

  return students;
};

const generateProspectiveStudents = () => {
  const locations = [
    "Norfolk, VA",
    "Virginia Beach, VA",
    "Chesapeake, VA",
    "Hampton, VA",
    "Newport News, VA",
    "Portsmouth, VA",
  ];
  const backgroundTypes = [
    "Career Changer",
    "Recent High School Grad",
    "Former Military",
    "Hobbyist",
    "Seeking Trade",
  ];
  // Only include Auto Tech and Welder programs
  const programs = ["Auto Technician", "Combination Welder"];

  const availabilityOptions = [
    "Available upon sponsorship",
    "Ready in 3-4 months",
    "Ready in 6 months",
  ];

  // Only include skill sets for the two programs (more foundational)
  const skillSets = {
    "Auto Technician": [
      "Basic Mechanics",
      "Tool Familiarity",
      "Problem Solving",
      "Eager to Learn",
      "Safety Conscious",
    ],
    "Combination Welder": [
      "Basic Welding Concepts",
      "Hand-Eye Coordination",
      "Attention to Detail",
      "Safety Conscious",
      "Willing to Train",
    ],
  };

  // Only include about texts for the two programs
  const aboutTexts = {
    "Auto Technician":
      "Prospective Auto Technician eager to develop hands-on skills in vehicle maintenance and repair. Motivated to learn diagnostic techniques and industry best practices.",
    "Combination Welder":
      "Future Combination Welder interested in mastering various welding techniques. Keen to learn fabrication, blueprint reading, and safety protocols.",
  };

  const students = [];
  // Generate 10 prospective students total (5 per program on average)
  for (let i = 1; i <= 10; i++) {
    const program = programs[Math.floor(Math.random() * programs.length)];
    const backgroundType =
      backgroundTypes[Math.floor(Math.random() * backgroundTypes.length)];

    students.push({
      id: `prospect-${i}`, // Prefix ID
      name: `Prospective ${program.split(" ")[0]} ${i}`, // e.g., Prospective Auto 1
      avatar: "/placeholder.svg",
      location: locations[Math.floor(Math.random() * locations.length)],
      skills: [...skillSets[program]]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 2), // Show 2-3 skills/traits
      backgroundType,
      program,
      school: "Tidewater Tech", // Assume all prospective are for Tidewater Tech
      availableDate:
        availabilityOptions[
          Math.floor(Math.random() * availabilityOptions.length)
        ],
      yearsExperience: 0,
      isReserved: i <= 3, // Example: First 3 are reserved/sponsored
      isProspective: true,
      isOffMarket: false, // Prospective are generally "on market" until sponsored/reserved
      about: `${aboutTexts[program]} Background: ${backgroundType}. Seeking sponsorship.`,
    });
  }

  return students;
};

const programInfo = {
  "combination-welding": {
    title: "Combination Welding",
    description:
      "Learn the fundamentals of welding, including metal fabrication and repair. Master various welding and metal cutting techniques, tools, machines, blueprint reading, measurements, and hazard assessment.",
    duration: "33 Weeks",
    certification: "FCAW, GTAW, SMAW, OSHA, AWS",
    format: "In-Person",
    classes: [
      "Fundamentals of Modern Welding",
      "Tungsten Arc Welding",
      "Gas Metal Arc Welding",
      "Flux Core Arc Welding",
      "Special Cutting",
      "Shielded Metal Arc Welding",
    ],
    companies: [
      "Alco Welding & Machine",
      "American Steel",
      "Chesapeake Bay Steel",
      "Colonna’s Shipyard",
      "Dynamic Manufacturing",
      "Globe Iron Construction Company",
      "Lyon Shipyard",
      "Ingalls Shipbuilding Company",
      "Va Carolina Steel",
    ],
  },
  "auto-technician": {
    title: "Auto Technician",
    description:
      "Gain hands-on experience in automotive technology, learning essential skills for vehicle maintenance, inspection, diagnosis, and repair. Develop expertise in key areas like steering, suspension, brakes, engine repair, electrical systems, engine performance, and HVAC.",
    duration: "48 Weeks",
    certification: "ASE, OSHA, EPA",
    format: "In-Person",
    classes: [
      "Steering & Suspension Systems",
      "Brakes & Anti-Lock Brakes",
      "Engine Repair",
      "Electrical & Electronics Systems",
      "Engine Performance",
      "HVAC Systems",
    ],
    companies: [
      "Ford",
      "Pep Boys",
      "CarMax",
      "Chevrolet",
      "Avis",
      "Mavis",
      "FedEx",
    ],
  },
};

const jobRoleMap = {
  "combination-welding": "combination-welding",
  "auto-technician": "auto-technician",
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
    neededCandidates: 100,
    location: "Norfolk, VA",
    skillSet: "combination-welding",
  });
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [showAccessTooltip, setShowAccessTooltip] = useState(true);
  const [showSecondStep, setShowSecondStep] = useState(false);

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
      company: "Colonna's Shipyard, Inc.",
      action: "sponsored 4 candidates",
      time: "6 min ago",
    },
    {
      company: "First Team Auto Superstore",
      action: "reserved 2 candidates",
      time: "14 min ago",
    },
    {
      company: "Globe Iron Construction Company, Inc.",
      action: "viewed this pool",
      time: "just now",
    },
    {
      company: "RK Chevrolet",
      action: "scheduled a consultation",
      time: "25 min ago",
    },
    {
      company: "Marine Hydraulics International, Inc.",
      action: "reserved 5 candidates",
      time: "50 min ago",
    },
    {
      company: "Blanchard's Tire & Auto Center",
      action: "sponsored 1 candidate",
      time: "1 hour ago",
    },
    {
      company: "Chesapeake Bay Steel, Inc.",
      action: "viewed this pool",
      time: "2 hours ago",
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
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/tidewater-tech-logo.png"
                alt="Tidewater Tech"
                className="h-8"
              />
              <div className="h-6 w-px bg-gray-300"></div>
              <h2 className="text-black font-semibold">
                Employer Talent Portal
              </h2>
            </div>
            <Badge variant="outline" className="border-black/20 text-black">
              Spring 2025 Cohort
            </Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black">
            Tidewater Tech Talent Placement
          </h1>
          <p className="text-gray-600 mt-1">
            Connect with qualified candidates who are ready to be hired
            immediately or sponsored for training.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-primary/5 border-b border-primary/10 px-6 py-4 flex items-center gap-2">
              <Users size={18} className="text-primary" />
              <h2 className="text-lg font-semibold">
                Define Your Hiring Needs
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
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
                      placeholder="e.g., Norfolk, VA"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Job Role
                    </label>
                    <div className="relative">
                      <select
                        className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md appearance-none"
                        value={hiringNeeds.skillSet}
                        onChange={(e) =>
                          setHiringNeeds({
                            ...hiringNeeds,
                            skillSet: e.target.value,
                          })
                        }
                      >
                        <option value="combination-welding">
                          Combination Welding
                        </option>
                        <option value="auto-technician">Auto Technician</option>
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
                    <label className="text-sm font-medium mb-1 block">
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
                      className="text-lg h-10 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Hiring Timeframe
                    </label>
                    <div className="relative">
                      <select className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md appearance-none">
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

                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <CalendarClock size={16} className="text-primary" />
                    Talent Availability
                  </h3>

                  <div className="mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span>Total Need:</span>
                      <span className="font-semibold">
                        {hiringNeeds.neededCandidates} Candidates
                      </span>
                    </div>

                    <div className="h-px bg-gray-200 my-3"></div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Current Students:</span>
                          <Badge
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20"
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
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Prospective Needed:</span>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 border-amber-200"
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
                    <Alert className="bg-amber-50 border-amber-200 mb-4">
                      <AlertDescription className="text-amber-800 text-xs">
                        Only {currentAvailableCount} current students available.
                        Consider sponsoring{" "}
                        {hiringNeeds.neededCandidates - currentAvailableCount}{" "}
                        prospective students.
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
                        Tidewater Tech graduates deliver immediately with
                        real-world skills
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
                        94% employer satisfaction rate with Tidewater Tech
                        graduates
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
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
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 flex flex-col gap-6 min-h-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/tidewater-tech-logo.png"
                      alt="Tidewater Tech"
                      className="h-5"
                    />
                  </div>

                  <div className="flex flex-row gap-2">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20 text-xs"
                    >
                      <Users size={12} className="mr-1" />
                      {currentAvailableCount} Current{" "}
                      {/* Assuming this count is relevant */}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 text-xs"
                    >
                      {prospectiveAvailableCount} Prospective{" "}
                      {/* Assuming this count is relevant */}
                    </Badge>
                  </div>
                </div>

                <div className="md:col-span-4 mb-2">
                  <h3 className="text-lg font-medium text-primary">
                    {/* Dynamic Title */}
                    {programInfo[jobRoleMap[hiringNeeds.skillSet]].title}{" "}
                    Program
                  </h3>
                  <p className="text-sm text-gray-600">
                    {/* Dynamic Description */}
                    {programInfo[jobRoleMap[hiringNeeds.skillSet]].description}
                  </p>
                </div>

                <div className="text-center p-2 bg-white rounded-md border border-primary/10">
                  <div className="text-xs text-gray-500 mb-1">Duration</div>
                  {/* Dynamic Duration */}
                  <div className="font-medium text-primary">
                    {programInfo[jobRoleMap[hiringNeeds.skillSet]].duration}
                  </div>
                </div>

                <div className="text-center p-2 bg-white rounded-md border border-primary/10">
                  <div className="text-xs text-gray-500 mb-1">
                    Certifications
                  </div>
                  {/* Dynamic Certification - Displaying first one if array */}
                  <div className="font-medium text-primary">
                    {
                      Array.isArray(
                        programInfo[jobRoleMap[hiringNeeds.skillSet]]
                          .certification
                      )
                        ? programInfo[jobRoleMap[hiringNeeds.skillSet]]
                            .certification[0] // Show first cert if it's an array
                        : programInfo[jobRoleMap[hiringNeeds.skillSet]]
                            .certification // Show the string directly
                    }
                    {/* Optional: Indicate if there are more certs */}
                    {Array.isArray(
                      programInfo[jobRoleMap[hiringNeeds.skillSet]]
                        .certification
                    ) &&
                      programInfo[jobRoleMap[hiringNeeds.skillSet]]
                        .certification.length > 1 &&
                      " (+ more)"}
                  </div>
                </div>

                <div className="text-center p-2 bg-white rounded-md border border-primary/10">
                  <div className="text-xs text-gray-500 mb-1">Format</div>
                  {/* Dynamic Format */}
                  <div className="font-medium text-primary">
                    {programInfo[jobRoleMap[hiringNeeds.skillSet]].format}
                  </div>
                </div>
              </div>
              <div className="">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <Award size={16} className="text-primary" />
                  Key Classes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {/* Dynamic Classes - Already using programInfo */}
                  {programInfo[jobRoleMap[hiringNeeds.skillSet]].classes.map(
                    (className, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-white border-primary/20 text-primary"
                      >
                        {className}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div>
                {/* Heading might need adjustment depending on data (Companies vs Job Roles) */}
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <Building size={16} className="text-primary" />
                  Graduates Working At
                </h4>
                <div className="flex flex-wrap gap-2">
                  {/* Dynamic Companies/Roles - Already using programInfo */}
                  {programInfo[jobRoleMap[hiringNeeds.skillSet]].companies.map(
                    (item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white text-xs rounded-md border border-primary/10"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {showSecondStep ? (
          <>
            <div className="flex flex-col lg:flex-row gap-6" id="view-students">
              <div className="lg:w-3/4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-black">
                    Reserve Your Talent
                  </h2>
                </div>

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
                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col">
                            <div
                              className={`text-2xl font-bold ${
                                displayMode === "prospective"
                                  ? "text-emerald-500"
                                  : "text-amber-500"
                              }`}
                            >
                              {displayMode === "current"
                                ? currentAvailableCount
                                : displayMode === "prospective"
                                ? prospectiveAvailableCount
                                : totalAvailableCount}
                            </div>
                            <div className="text-sm text-gray-500">
                              Available
                            </div>
                          </div>

                          <div className="h-10 w-px bg-gray-200"></div>

                          <div className="flex flex-col">
                            <div className="text-2xl font-bold">
                              {displayMode === "current"
                                ? currentReservedCount
                                : displayMode === "prospective"
                                ? prospectiveReservedCount
                                : totalReservedCount}
                            </div>
                            <div className="text-sm text-gray-500">
                              Reserved
                            </div>
                          </div>

                          <div className="h-10 w-px bg-gray-200"></div>

                          <div className="flex flex-col">
                            <div className="text-2xl font-bold">
                              {displayMode === "current"
                                ? currentStudents.length
                                : displayMode === "prospective"
                                ? prospectiveStudents.length
                                : totalCount}
                            </div>
                            <div className="text-sm text-gray-500">Total</div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setShowSupplyDemandChart(!showSupplyDemandChart)
                            }
                            className="ml-2"
                          >
                            <BarChart size={16} className="mr-1" />
                            {showSupplyDemandChart
                              ? "Hide Chart"
                              : "Market Gap"}
                          </Button>
                        </div>

                        <div className="flex items-center space-x-3 relative">
                          {showAccessTooltip && (
                            <AccessMoreTalentTooltip
                              onClick={() => setShowAccessTooltip(false)}
                            />
                          )}
                          <div
                            className={`border rounded-md overflow-hidden flex ${
                              showAccessTooltip
                                ? "border-amber-300 border-4"
                                : ""
                            }`}
                          >
                            <button
                              className={`px-3 py-1.5 text-sm ${
                                displayMode === "current"
                                  ? "bg-black text-white"
                                  : "bg-white text-gray-700"
                              }`}
                              onClick={() => handleDisplayModeChange("current")}
                            >
                              Current
                            </button>
                            <button
                              className={`px-3 py-1.5 text-sm ${
                                displayMode === "prospective"
                                  ? "bg-primary text-white"
                                  : "bg-white text-gray-700"
                              }`}
                              onClick={() =>
                                handleDisplayModeChange("prospective")
                              }
                            >
                              Prospective
                            </button>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <ArrowDownUp size={14} />
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
                        </div>
                      </div>

                      {showSupplyDemandChart && (
                        <div className="bg-gray-50 p-4 mb-5 rounded-lg border border-gray-200">
                          <SupplyDemandChart />
                        </div>
                      )}

                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-5 flex items-center justify-between overflow-hidden whitespace-nowrap relative">
                        <div className="flex items-center gap-2">
                          <Users
                            size={14}
                            className="text-gray-700 flex-shrink-0"
                          />
                          <span className="text-sm font-medium text-gray-700 flex-shrink-0">
                            Recent Activity:
                          </span>
                          <div className="h-8 flex items-center">
                            <Badge
                              key={currentActivityIndex}
                              variant="outline"
                              className="bg-white border-primary/20 text-xs animate-fade-in"
                            >
                              <span className="font-medium">
                                {recentActivity[currentActivityIndex].company}
                              </span>
                              &nbsp;
                              {recentActivity[currentActivityIndex].action}
                              <span className="ml-1 text-gray-500">
                                {recentActivity[currentActivityIndex].time}
                              </span>
                            </Badge>
                          </div>
                        </div>

                        <div className="bg-orange-50 border border-orange-100 rounded p-2 flex items-center">
                          <TrendingUp
                            size={16}
                            className={`mr-2 ${"text-red-500 rotate-180"}`}
                          />
                          <span className="text-xs font-medium">
                            Pool availability{" "}
                            <span className="text-red-500 font-semibold">
                              -22%
                            </span>{" "}
                            in the past week
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        <div className="relative">
                          <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            size={16}
                          />
                          <Input
                            placeholder="Search skills, programs, or keywords"
                            className="pl-9 w-[300px]"
                          />
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Filter size={14} />
                          Skills
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Filter size={14} />
                          Location
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Filter size={14} />
                          Availability
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Clear All
                        </Button>
                      </div>

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
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-5">
                  <h3 className="font-medium mb-4 text-black flex items-center gap-2">
                    <Users size={16} className="text-gray-700" />
                    Recently Reserved
                  </h3>

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
                                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-xs mr-2">
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
                                <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
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
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-5">
                  <h3 className="font-medium mb-4 text-primary flex items-center gap-2">
                    Need more talent?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Through our Tidewater Tech Sponsorship program, you can
                    create a pipeline of candidates tailored to your specific
                    needs.
                  </p>
                  <Button
                    className="w-full"
                    variant="default"
                    onClick={handleOpenSponsorshipModal}
                  >
                    Learn About Sponsorship
                  </Button>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-medium mb-4 text-primary flex items-center gap-2">
                    Tidewater Tech Talent Success
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">Placement rate</div>
                      <div className="font-semibold text-primary">96%</div>
                    </div>
                    <div className="h-px bg-gray-100"></div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">Employer satisfaction</div>
                      <div className="font-semibold text-primary">94%</div>
                    </div>
                    <div className="h-px bg-gray-100"></div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">1-year retention rate</div>
                      <div className="font-semibold text-primary">92%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Tidewater Tech. This talent portal is provided exclusively
            for Tidewater Tech employer partners. Powered by Tandem.
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
          onScheduleConsultation={handleScheduleConsultation}
        />
      )}
    </div>
  );
};

export default TalentRequestPage;
