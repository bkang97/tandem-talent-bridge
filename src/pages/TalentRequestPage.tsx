import React, { useState } from 'react';
import { Info, ArrowDownUp, RefreshCw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import TalentFilters from '@/components/talent/TalentFilters';
import TalentCard from '@/components/talent/TalentCard';
import BulkReservation from '@/components/talent/BulkReservation';
import TalentStats from '@/components/talent/TalentStats';
import ReservationModal from '@/components/talent/ReservationModal';
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
import { SupplyDemandChart } from '@/components/talent/SupplyDemandChart';

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
      isReserved: i <= 24,
      about: `${aboutTexts[program]} ${yearsExp} years of relevant experience in the field.`
    });
  }
  
  return students;
};

const TalentRequestPage = () => {
  const [students, setStudents] = useState(generateMockStudents());
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('relevance');
  const [activeTab, setActiveTab] = useState('browse');
  const [showSupplyDemandChart, setShowSupplyDemandChart] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showReservationModal, setShowReservationModal] = useState(false);
  
  const handleFilterChange = (newFilters: any) => {
    console.log("Applied filters:", newFilters);
    setFilters(newFilters);
  };
  
  const handleSortChange = (option: string) => {
    setSortOption(option);
  };
  
  const handleReserveStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setSelectedStudents([student]);
      setShowReservationModal(true);
    }
  };
  
  const completeReservation = () => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        selectedStudents.some(selected => selected.id === student.id)
          ? { ...student, isReserved: true } 
          : student
      )
    );
    setShowReservationModal(false);
    setSelectedStudents([]);
  };
  
  const reservedCount = students.filter(s => s.isReserved).length;
  const availableCount = students.length - reservedCount;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Talent Placement</h1>
          <p className="text-gray-600 mt-1">
            Connect with qualified candidates from our academic partners who are ready to be hired immediately.
          </p>
        </div>
        
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4" />
          <AlertTitle>Try Before You Sponsor</AlertTitle>
          <AlertDescription>
            Reserve candidates to take them off-market for other employers. This is a risk-free way to assess our talent pipeline before committing to a full sponsorship program.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            <Tabs defaultValue="browse" className="space-y-6">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="browse">Browse Candidates</TabsTrigger>
                <TabsTrigger value="stats">Market Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse" className="space-y-6">
                <TalentStats 
                  availableCount={availableCount}
                  reservedCount={reservedCount}
                  totalCount={students.length}
                  onShowChart={() => setShowSupplyDemandChart(!showSupplyDemandChart)}
                  showChart={showSupplyDemandChart}
                />
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Available Candidates</h2>
                    <div className="flex items-center space-x-3">
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
                  
                  {availableCount > 8 && (
                    <div className="mt-8 text-center">
                      <Button variant="outline">
                        Load More ({availableCount - 8} Remaining)
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="stats">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Talent Market Analysis</h2>
                  <div className="h-96">
                    <SupplyDemandChart />
                  </div>
                  <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Understanding the Talent Gap</h3>
                    <p className="text-gray-700 mb-4">
                      This visualization shows the significant gap between available talent and market demand for 
                      key technical roles. The current candidate pool meets only approximately 23% of market demand, 
                      highlighting the strategic value of building a sustainable talent pipeline.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center mb-1">
                          <div className="w-3 h-3 bg-primary/70 rounded-full mr-2"></div>
                          <span>Available candidates: {availableCount}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                          <span>Market demand: 175+</span>
                        </div>
                      </div>
                      <Button>Learn About Sponsorship</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:w-1/4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="browse">Recent</TabsTrigger>
                <TabsTrigger value="bulk">Bulk</TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse">
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
                            <div className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
                              Reserved
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
              </TabsContent>
              
              <TabsContent value="bulk">
                <BulkReservation />
              </TabsContent>
            </Tabs>
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
