
import React, { useState } from 'react';
import { Info, ArrowDownUp, RefreshCw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import TalentFilters from '@/components/talent/TalentFilters';
import TalentCard from '@/components/talent/TalentCard';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Mock data for students
const mockStudents = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/placeholder.svg',
    location: 'San Francisco, CA',
    skills: ['Cybersecurity', 'Network Security', 'Penetration Testing', 'SIEM'],
    school: 'ForgeNow',
    program: 'Cybersecurity Analyst',
    availableDate: 'Immediately',
    yearsExperience: 2,
    isReserved: false,
    about: 'Recent cybersecurity graduate with 2 years of IT support experience. Skilled in network security, vulnerability assessment, and security monitoring. CompTIA Security+ certified with hands-on experience in security tools and SIEM systems.'
  },
  {
    id: '2',
    name: 'Maya Rodriguez',
    avatar: '/placeholder.svg',
    location: 'Austin, TX',
    skills: ['Cloud Computing', 'AWS', 'DevOps', 'Infrastructure as Code'],
    school: 'AIM',
    program: 'Cloud Solutions Architect',
    availableDate: 'In 30 days',
    yearsExperience: 3,
    isReserved: false,
    about: 'Cloud solutions professional with 3 years of IT infrastructure experience. Expertise in AWS services, cloud migration, and implementing infrastructure as code using Terraform. AWS Certified Solutions Architect with strong problem-solving abilities.'
  },
  {
    id: '3',
    name: 'David Chen',
    avatar: '/placeholder.svg',
    location: 'Remote',
    skills: ['Data Analysis', 'SQL', 'Python', 'Tableau', 'Power BI'],
    school: 'SkillTrade',
    program: 'Data Analytics',
    availableDate: 'Immediately',
    yearsExperience: 1,
    isReserved: false,
    about: 'Data analytics professional with experience in SQL, Python, and data visualization tools. Skilled in transforming complex data into actionable insights. Strong background in business intelligence and creating interactive dashboards.'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    avatar: '/placeholder.svg',
    location: 'Chicago, IL',
    skills: ['Software Development', 'JavaScript', 'React', 'Node.js', 'REST APIs'],
    school: 'CodeCampus',
    program: 'Full Stack Developer',
    availableDate: 'In 14 days',
    yearsExperience: 2,
    isReserved: true,
    about: 'Full stack developer with expertise in JavaScript, React, and Node.js. Passionate about creating efficient, scalable web applications with intuitive user interfaces. Experience in RESTful API development and integration with third-party services.'
  },
  {
    id: '5',
    name: 'Jordan Taylor',
    avatar: '/placeholder.svg',
    location: 'New York, NY',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Wireframing', 'Prototyping'],
    school: 'TechAcademy',
    program: 'UX/UI Designer',
    availableDate: 'Immediately',
    yearsExperience: 3,
    isReserved: false,
    about: 'UX/UI designer with a focus on creating user-centered digital experiences. Skilled in user research, wireframing, and prototyping. Strong portfolio of web and mobile application designs with a keen eye for detail and aesthetics.'
  },
  {
    id: '6',
    name: 'Priya Patel',
    avatar: '/placeholder.svg',
    location: 'Remote',
    skills: ['Project Management', 'Agile', 'Scrum', 'JIRA'],
    school: 'SkillTrade',
    program: 'IT Project Management',
    availableDate: 'In 30 days',
    yearsExperience: 4,
    isReserved: false,
    about: 'IT project manager with 4 years of experience in software development projects. Certified Scrum Master with expertise in Agile methodologies. Strong communication skills with a track record of delivering projects on time and within budget.'
  }
];

const TalentRequestPage = () => {
  const [students, setStudents] = useState(mockStudents);
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('relevance');
  
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
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, isReserved: true } 
          : student
      )
    );
  };
  
  const reservedCount = students.filter(s => s.isReserved).length;
  const totalCount = students.length;
  
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
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-4 md:items-center">
            <div>
              <h2 className="text-xl font-semibold">Available Candidates</h2>
              <p className="text-gray-500">
                {reservedCount} reserved of {totalCount} available candidates
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
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
              
              <Button variant="ghost" size="icon">
                <RefreshCw size={16} />
              </Button>
            </div>
          </div>
          
          <TalentFilters onFilterChange={handleFilterChange} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(student => (
              <TalentCard 
                key={student.id} 
                student={student} 
                onReserve={handleReserveStudent}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Need more specialized talent?</h2>
          <p className="text-gray-700 mb-4">
            Through our Tandem Sponsorship program, you can sponsor candidates through training 
            specifically tailored to your organization's needs. This gives you a dedicated pipeline 
            of custom-trained talent.
          </p>
          <Button>Learn About Sponsorship</Button>
        </div>
      </main>
    </div>
  );
};

export default TalentRequestPage;
