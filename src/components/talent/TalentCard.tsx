
import React from 'react';
import { MapPin, Briefcase, GraduationCap, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface TalentCardProps {
  student: {
    id: string;
    name: string;
    avatar?: string;
    location: string;
    skills: string[];
    school: string;
    program: string;
    availableDate: string;
    yearsExperience: number;
    isReserved: boolean;
    about: string;
    resumeUrl?: string;
  };
  onReserve: (id: string) => void;
}

const TalentCard = ({ student, onReserve }: TalentCardProps) => {
  const { toast } = useToast();
  
  const handleReserve = () => {
    onReserve(student.id);
    toast({
      title: "Candidate Reserved!",
      description: `You've successfully reserved ${student.name}. They are now off-market for other employers.`,
    });
  };
  
  const handleDownloadResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Resume Downloaded",
      description: `${student.name}'s resume has been downloaded.`,
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`talent-card bg-white rounded-lg border ${student.isReserved ? 'border-accent' : 'border-gray-200'} overflow-hidden cursor-pointer`}>
          <div className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-secondary text-white">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={14} className="mr-1" />
                    <span>{student.location}</span>
                  </div>
                </div>
              </div>
              {student.isReserved && (
                <span className="reserved-badge">Reserved</span>
              )}
            </div>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {student.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="skill-badge">{skill}</span>
                ))}
                {student.skills.length > 3 && (
                  <span className="text-xs text-gray-500">+{student.skills.length - 3} more</span>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <GraduationCap size={15} className="mr-2" />
                  <span>{student.school}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase size={15} className="mr-2" />
                  <span>{student.yearsExperience} years exp.</span>
                </div>
                <div className="flex items-center text-gray-600 col-span-2">
                  <Calendar size={15} className="mr-2" />
                  <span>Available {student.availableDate}</span>
                </div>
              </div>
            </div>
            
            <div className={`flex ${student.isReserved ? 'justify-end' : 'justify-between'}`}>
              {!student.isReserved && (
                <Button variant="default" onClick={handleReserve}>Reserve Candidate</Button>
              )}
              <Button variant="outline" size="icon" onClick={handleDownloadResume}>
                <Download size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Candidate Profile</DialogTitle>
          <DialogDescription>
            Full profile details for {student.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={student.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl bg-secondary text-white">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {student.isReserved ? (
                <div className="w-full">
                  <div className="mb-4 py-2 px-4 bg-accent/10 text-accent rounded-md text-center font-medium">
                    You've reserved this candidate
                  </div>
                  <Button variant="secondary" className="w-full" onClick={handleDownloadResume}>
                    <Download size={16} className="mr-2" />
                    Download Resume
                  </Button>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <Button className="w-full" onClick={handleReserve}>
                    Reserve This Candidate
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={handleDownloadResume}>
                    <Download size={16} className="mr-2" />
                    Download Resume
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-gray-700">
                <MapPin size={16} className="mr-2 text-gray-500" />
                <span>{student.location}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <GraduationCap size={16} className="mr-2 text-gray-500" />
                <span>{student.school} - {student.program}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Briefcase size={16} className="mr-2 text-gray-500" />
                <span>{student.yearsExperience} years experience</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar size={16} className="mr-2 text-gray-500" />
                <span>Available {student.availableDate}</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-700 mb-6">{student.about}</p>
            
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {student.skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Academic Performance</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Program Completion</div>
                  <div className="font-semibold">100%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">GPA Equivalent</div>
                  <div className="font-semibold">3.8/4.0</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Technical Assessment</div>
                  <div className="font-semibold">92nd Percentile</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Instructor Recommendation</div>
                  <div className="font-semibold">Highly Recommended</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TalentCard;
