
import React from 'react';
import { MapPin, Briefcase, GraduationCap, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
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
  
  const handleReserve = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        <div className={`bg-white rounded-lg border ${student.isReserved ? 'border-accent/30' : 'border-gray-200'} overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-secondary/50 text-secondary-foreground">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{student.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={12} className="mr-1" />
                    <span>{student.location}</span>
                  </div>
                </div>
              </div>
              {student.isReserved && (
                <Badge variant="outline" className="border-accent/30 text-accent bg-accent/5">
                  Reserved
                </Badge>
              )}
            </div>
            
            <div className="mb-3">
              <p className="text-sm font-medium mb-2">{student.program}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {student.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="font-normal text-xs py-0">
                    {skill}
                  </Badge>
                ))}
                {student.skills.length > 3 && (
                  <span className="text-xs text-gray-500">+{student.skills.length - 3}</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
              <div className="flex items-center">
                <GraduationCap size={12} className="mr-1 flex-shrink-0" />
                <span>{student.school}</span>
              </div>
              <div className="flex items-center">
                <Briefcase size={12} className="mr-1 flex-shrink-0" />
                <span>{student.yearsExperience} yrs exp</span>
              </div>
              <div className="flex items-center col-span-2">
                <Calendar size={12} className="mr-1 flex-shrink-0" />
                <span>Available {student.availableDate}</span>
              </div>
            </div>
            
            <div className={`flex ${student.isReserved ? 'justify-end' : 'justify-between'} gap-2`}>
              {!student.isReserved && (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-grow" 
                  onClick={handleReserve}
                >
                  Reserve
                </Button>
              )}
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8" 
                onClick={handleDownloadResume}
              >
                <Download size={14} />
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
              <Avatar className="h-28 w-28 mb-4">
                <AvatarImage src={student.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xl bg-secondary/50 text-secondary-foreground">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {student.isReserved ? (
                <div className="w-full">
                  <div className="mb-4 py-2 px-4 bg-accent/10 text-accent rounded-md text-center font-medium">
                    Reserved Candidate
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
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
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
            <h3 className="text-lg font-medium mb-2">About</h3>
            <p className="text-gray-700 mb-6">{student.about}</p>
            
            <h3 className="text-lg font-medium mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {student.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>
            
            <h3 className="text-lg font-medium mb-2">Academic Performance</h3>
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
