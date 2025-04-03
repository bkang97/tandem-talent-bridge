
import React, { useState, useEffect } from 'react';
import { Info, ArrowDownUp, RefreshCw, Filter, BarChart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import TalentFilters from '@/components/talent/TalentFilters';
import TalentCard from '@/components/talent/TalentCard';
import BulkReservation from '@/components/talent/BulkReservation';
import SupplyDemandChart from '@/components/talent/SupplyDemandChart';
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

// Generate a larger set of mock data for students
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
  
  // Generate 40 students
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
      isReserved: i <= 24, // Make 24 students already reserved
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
    // In a real app, this would filter the students based on the selected filters
  };
  
  const handleSortChange = (option: string) => {
    setSortOption(option);
    // In a real app, this would sort the students based on the selected option
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Talent Placement</h1>
          <p className="text-gray-600">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row justify-between mb-4 md:items-center">
                <div>
                  <h2 className="text-xl font-semibold">Available Candidates</h2>
                  <p className="text-gray-500">
                    {reservedCount} reserved of {students.length} total candidates
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSupplyDemandChart(!showSupplyDemandChart)}
                  >
                    <BarChart size={16} className="mr-2" />
                    {showSupplyDemandChart ? 'Hide Chart' : 'Market Trends'}
                  </Button>
                
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
                      <DropdownMenuItem onClick={() => handleSortChange('academic')}>
                        Academic Performance
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button variant="ghost" size="icon" title="Refresh results">
                    <RefreshCw size={16} />
                  </Button>
                </div>
              </div>
              
              {showSupplyDemandChart && (
                <div className="bg-gray-50 p-4 mb-6 rounded-md border border-gray-200">
                  <div className="h-80">
                    <SupplyDemandChart />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    The chart shows a significant gap between talent supply and market demand across key tech roles,
                    highlighting the need for strategic talent pipeline development through programs like Tandem Sponsorship.
                  </p>
                </div>
              )}
              
              <TalentFilters onFilterChange={handleFilterChange} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                {students.filter(s => !s.isReserved).slice(0, 12).map(student => (
                  <TalentCard 
                    key={student.id} 
                    student={student} 
                    onReserve={handleReserveStudent}
                  />
                ))}
              </div>
              
              {availableCount > 12 && (
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    Load More ({availableCount - 12} Remaining)
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="browse">Browse</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Reserve</TabsTrigger>
              </TabsList>
              
              <TabsContent value="browse" className="mt-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">Talent Availability</h3>
                    <div className="bg-gray-100 rounded-full h-3">
                      <div 
                        className="bg-primary rounded-full h-3" 
                        style={{ width: `${(availableCount/students.length)*100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-600">{availableCount} available</span>
                      <span className="text-gray-600">{reservedCount} reserved</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Recently Reserved</h4>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-2 pr-4">
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
                    </ScrollArea>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-4">
                    <h3 className="font-semibold text-primary mb-2">Supply & Demand Gap</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      The talent gap in tech continues to widen. There are currently:
                    </p>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Available candidates:</span>
                      <span className="font-medium">{availableCount}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm">Market demand:</span>
                      <span className="font-medium">175+</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mb-1">
                      <div className="h-2 bg-primary rounded-full" style={{ width: '23%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      Current candidate pool meets only ~23% of market demand
                    </p>
                  </div>
                  
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">Need more talent?</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Through our Tandem Sponsorship program, you can sponsor candidates through training 
                      specifically tailored to your organization's needs, creating a dedicated pipeline.
                    </p>
                    <Button className="w-full">Learn About Sponsorship</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="bulk" className="mt-4">
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
