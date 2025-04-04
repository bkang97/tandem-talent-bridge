import React, { useState } from 'react';
import { Info, ArrowDownUp, RefreshCw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import TalentFilters from '@/components/talent/TalentFilters';
import TalentCard from '@/components/talent/TalentCard';
import TalentStats from '@/components/talent/TalentStats';
import ReservationModal from '@/components/talent/ReservationModal';
import SupplyDemandChart from '@/components/talent/SupplyDemandChart';
import TalentNeeds from '@/components/talent/TalentNeeds';
import MarketAnalysis from '@/components/talent/MarketAnalysis';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const generateMockStudents = () => {
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Chicago, IL', 'Seattle, WA', 'Remote'];
  const schools = ['ForgeNow', 'AIM', 'CodeCampus', 'TechAcademy', 'SkillTrade'];
  const programs = [
    'Cybersecurity Analyst', 
    'Cloud Solutions Architect', 
    'Data Analytics', 
    'Full Stack Developer',
    'UX/UI Designer',
    'IT Project Management'
  ];
  const availabilityOptions = [
    'Immediately',
    'In 2 weeks',
    'In 30 days',
    'In 60 days',
    'In 90 days'
  ];
  
  const skillSets = {
    'Cybersecurity Analyst': ['Cybersecurity', 'Network Security', 'Penetration Testing', 'SIEM', 'Risk Assessment'],
    'Cloud Solutions Architect': ['Cloud Computing', 'AWS', 'Azure', 'DevOps', 'Infrastructure as Code'],
    'Data Analytics': ['Data Analysis', 'SQL', 'Python', 'Tableau', 'Power BI', 'R'],
    'Full Stack Developer': ['JavaScript', 'React', 'Node.js', 'REST APIs', 'SQL', 'Git'],
    'UX/UI Designer': ['UI/UX Design', 'Figma', 'User Research', 'Wireframing', 'Prototyping'],
    'IT Project Management': ['Project Management', 'Agile', 'Scrum', 'JIRA', 'Risk Management']
  };
  
  const aboutTexts = {
    'Cybersecurity Analyst': 'Cybersecurity professional with experience in network security, vulnerability assessment, and security monitoring. Skilled in security tools and SIEM systems.',
    'Cloud Solutions Architect': 'Cloud solutions professional with expertise in cloud services, migration, and implementing infrastructure as code. Strong problem-solving abilities and certification in cloud platforms.',
    'Data Analytics': 'Data analytics professional skilled in transforming complex data into actionable insights. Strong background in business intelligence and creating interactive dashboards.',
    'Full Stack Developer': 'Full stack developer with expertise in JavaScript frameworks. Passionate about creating efficient, scalable web applications with intuitive user interfaces.',
    'UX/UI Designer': 'UX/UI designer with a focus on creating user-centered digital experiences. Strong portfolio of web and mobile application designs with a keen eye for detail.',
    'IT Project Management': 'IT project manager with experience in software development projects. Expertise in Agile methodologies and strong communication skills.'
  };
  
  const students = [];
  for (let i = 1; i <= 40; i++) {
    const program = programs[Math.floor(Math.random() * programs.length)];
    const yearsExp = Math.floor(Math.random() * 5) + 1;
    
    const isOffMarket = i <= 37;
    
    students.push({
      id: i.toString(),
      name: `Student ${i}`,
      avatar: '/placeholder.svg',
      location: locations[Math.floor(Math.random() * locations.length)],
      skills: [...skillSets[program]].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2),
      school: schools[Math.floor(Math.random() * schools.length)],
      program,
      availableDate: availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)],
      yearsExperience: yearsExp,
      isReserved: isOffMarket,
      isOffMarket: isOffMarket,
      isProspective: false,
      about: `${aboutTexts[program]} ${yearsExp} years of relevant experience in the field.`
    });
  }
  
  return students;
};

const generateProspectiveStudents = () => {
  const locations = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Chicago, IL', 'Seattle, WA', 'Remote'];
  const backgroundTypes = ['Career Changer', 'Recent Graduate', 'Former Military', 'Self-Taught', 'Bootcamp Graduate'];
  const programs = [
    'Cybersecurity Analyst', 
    'Cloud Solutions Architect', 
    'Data Analytics', 
    'Full Stack Developer',
    'UX/UI Designer',
    'IT Project Management'
  ];
  
  const availabilityOptions = [
    'Available upon sponsorship',
    'Ready in 3-4 months',
    'Ready in 6 months'
  ];

  const skillSets = {
    'Cybersecurity Analyst': ['Security Fundamentals', 'Network Basics', 'Programming Knowledge', 'Problem Solving', 'Technical Aptitude'],
    'Cloud Solutions Architect': ['IT Background', 'Problem Solving', 'Technical Curiosity', 'Systems Thinking', 'Project Management'],
    'Data Analytics': ['Mathematical Aptitude', 'Excel', 'Critical Thinking', 'Communication', 'Problem Solving'],
    'Full Stack Developer': ['HTML/CSS Basics', 'JavaScript Fundamentals', 'Logical Thinking', 'Problem Solving', 'Self-Learning'],
    'UX/UI Designer': ['Visual Design Skills', 'Creativity', 'User Empathy', 'Communication', 'Problem Solving'],
    'IT Project Management': ['Organization Skills', 'Communication', 'Leadership', 'Technical Background', 'Strategic Thinking']
  };
  
  const aboutTexts = {
    'Cybersecurity Analyst': 'Prospective cybersecurity professional with strong fundamentals and enthusiasm for network security. Ready to develop skills in security monitoring and vulnerability assessment.',
    'Cloud Solutions Architect': 'Aspiring cloud professional with technical background and interest in cloud infrastructure. Eager to learn cloud platforms and best practices.',
    'Data Analytics': 'Future data analyst with strong analytical thinking and basic data manipulation skills. Ready to develop expertise in business intelligence tools and statistical analysis.',
    'Full Stack Developer': 'Prospective developer with coding fundamentals and eagerness to build web applications. Excited to enhance programming skills and learn modern frameworks.',
    'UX/UI Designer': 'Creative individual with design foundation looking to specialize in user experience. Motivated to learn user research methods and design systems.',
    'IT Project Management': 'Organized professional with leadership skills seeking to transition into IT project management. Ready to learn agile methodologies and technical project coordination.'
  };
  
  const students = [];
  for (let i = 1; i <= 20; i++) {
    const program = programs[Math.floor(Math.random() * programs.length)];
    const backgroundType = backgroundTypes[Math.floor(Math.random() * backgroundTypes.length)];
    
    students.push({
      id: `p-${i}`,
      name: `Prospective ${i}`,
      avatar: '/placeholder.svg',
      location: locations[Math.floor(Math.random() * locations.length)],
      skills: [...skillSets[program]].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2),
      backgroundType,
      program,
      availableDate: availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)],
      yearsExperience: 0,
      isReserved: i <= 6,
      isProspective: true,
      about: `${aboutTexts[program]} Background: ${backgroundType}.`
    });
  }
  
  return students;
};

const TalentRequestPage = () => {
  const [currentStudents, setCurrentStudents] = useState(generateMockStudents());
  const [prospectiveStudents, setProspectiveStudents] = useState(generateProspectiveStudents());
  const [displayMode, setDisplayMode] = useState('all'); // 'all', 'current', 'prospective'
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('relevance');
  const [activeTab, setActiveTab] = useState('browse');
  const [showSupplyDemandChart, setShowSupplyDemandChart] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showReservationModal, setShowReservationModal] = useState(false);
  
  const getFilteredStudents = () => {
    let students = [];
    if (displayMode === 'all' || displayMode === 'current') {
      students = [...students, ...currentStudents];
    }
    if (displayMode === 'all' || displayMode === 'prospective') {
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
    const student = students.find(s => s.id === studentId);
    if (student) {
      setSelectedStudents([student]);
      setShowReservationModal(true);
    }
  };
  
  const completeReservation = () => {
    const updatedSelectedIds = selectedStudents.map(s => s.id);
    
    if (selectedStudents.some(s => !s.isProspective)) {
      setCurrentStudents(prevStudents => 
        prevStudents.map(student => 
          updatedSelectedIds.includes(student.id)
            ? { ...student, isReserved: true, isOffMarket: true } 
            : student
        )
      );
    }
    
    if (selectedStudents.some(s => s.isProspective)) {
      setProspectiveStudents(prevStudents => 
        prevStudents.map(student => 
          updatedSelectedIds.includes(student.id)
            ? { ...student, isReserved: true } 
            : student
        )
      );
    }
    
    setShowReservationModal(false);
    setSelectedStudents([]);
  };
  
  const currentReservedCount = currentStudents.filter(s => s.isReserved).length;
  const currentAvailableCount = currentStudents.length - currentReservedCount;
  
  const prospectiveReservedCount = prospectiveStudents.filter(s => s.isReserved).length;
  const prospectiveAvailableCount = prospectiveStudents.length - prospectiveReservedCount;
  
  const totalReservedCount = currentReservedCount + prospectiveReservedCount;
  const totalAvailableCount = currentAvailableCount + prospectiveAvailableCount;
  const totalCount = currentStudents.length + prospectiveStudents.length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Talent Placement</h1>
          <p className="text-gray-600 mt-1">
            Connect with qualified candidates from our academic partners who are ready to be hired immediately or sponsored for training.
          </p>
        </div>
        
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertTitle>Talent Pipeline Solutions</AlertTitle>
          <AlertDescription>
            Reserve current candidates to take them off-market, or sponsor prospective candidates to build your future talent pipeline through our Tandem Sponsorship program.
          </AlertDescription>
        </Alert>
        
        <TalentNeeds 
          availableCurrentStudents={currentStudents.filter(s => !s.isReserved).length}
          availableProspectiveStudents={prospectiveStudents.filter(s => !s.isReserved).length}
          className="mb-6"
        />
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            <Tabs defaultValue="browse" className="space-y-6">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="browse">Browse Candidates</TabsTrigger>
                <TabsTrigger value="stats">Market Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse" className="space-y-6">
                <TalentStats 
                  availableCount={displayMode === 'current' ? currentAvailableCount : (displayMode === 'prospective' ? prospectiveAvailableCount : totalAvailableCount)}
                  reservedCount={displayMode === 'current' ? currentReservedCount : (displayMode === 'prospective' ? prospectiveReservedCount : totalReservedCount)}
                  totalCount={displayMode === 'current' ? currentStudents.length : (displayMode === 'prospective' ? prospectiveStudents.length : totalCount)}
                  onShowChart={() => setShowSupplyDemandChart(!showSupplyDemandChart)}
                  showChart={showSupplyDemandChart}
                />
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                    <h2 className="text-xl font-semibold">Available Candidates</h2>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex rounded-md overflow-hidden border">
                        <button 
                          className={`px-3 py-1.5 text-sm ${displayMode === 'all' ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => handleDisplayModeChange('all')}
                        >
                          All
                        </button>
                        <button 
                          className={`px-3 py-1.5 text-sm ${displayMode === 'current' ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => handleDisplayModeChange('current')}
                        >
                          Current
                        </button>
                        <button 
                          className={`px-3 py-1.5 text-sm ${displayMode === 'prospective' ? 'bg-primary text-white' : 'bg-white'}`}
                          onClick={() => handleDisplayModeChange('prospective')}
                        >
                          Prospective
                        </button>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <ArrowDownUp size={16} />
                            Sort: {sortOption.charAt(0).toUpperCase() + sortOption.slice(1)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleSortChange('relevance')}>
                            Relevance
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSortChange('availability')}>
                            Availability (Soonest)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSortChange('experience')}>
                            Experience (Most)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Button variant="ghost" size="icon" title="Refresh results">
                        <RefreshCw size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <TalentFilters onFilterChange={handleFilterChange} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {students.filter(s => !s.isReserved).slice(0, 8).map(student => (
                      <TalentCard 
                        key={student.id} 
                        student={student} 
                        onReserve={handleReserveStudent}
                      />
                    ))}
                  </div>
                  
                  {students.filter(s => !s.isReserved).length > 8 && (
                    <div className="mt-8 text-center">
                      <Button variant="outline">
                        Load More ({students.filter(s => !s.isReserved).length - 8} Remaining)
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="stats">
                <MarketAnalysis />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-3">Recently Reserved</h3>
              <ScrollArea className="h-[300px]">
                {students.filter(s => s.isReserved).length > 0 ? (
                  <div className="space-y-2 pr-3">
                    {students.filter(s => s.isReserved).slice(0, 8).map(student => (
                      <div key={student.id} className="p-2 border-b flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-secondary/20 rounded-full flex items-center justify-center text-secondary-foreground text-xs mr-2">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.program}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {student.isProspective && (
                            <Badge variant="outline" className="mr-2 bg-accent/5 text-accent border-accent/20 text-xs">
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
              
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-2">Need more talent?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Through our Tandem Sponsorship program, you can create a pipeline of candidates tailored to your specific needs.
                </p>
                <Button variant="outline" className="w-full">Learn About Sponsorship</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {showReservationModal && (
        <ReservationModal
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
          reservedStudents={selectedStudents}
        />
      )}
    </div>
  );
};

export default TalentRequestPage;
