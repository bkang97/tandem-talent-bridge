
import React from 'react';
import { MapPin, Briefcase, GraduationCap, Calendar, Download, User } from 'lucide-react';
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
    school?: string;
    backgroundType?: string;
    program: string;
    availableDate: string;
    yearsExperience: number;
    isReserved: boolean;
    isOffMarket?: boolean;
    isProspective: boolean;
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
      title: student.isProspective ? "Prospective Candidate Reserved!" : "Candidate Reserved!",
      description: `You've successfully reserved ${student.name}. ${student.isProspective ? 'They will be sponsored for training.' : 'They are now off-market for other employers.'}`,
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
        <div className={`bg-white rounded-lg border ${student.isReserved && !student.isProspective ? 'border-gray-300' : 'border-gray-200'} ${student.isProspective ? 'border-l-4 border-l-accent' : ''} overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} />
                  <AvatarFallback className={`${student.isProspective ? 'bg-accent/20 text-accent' : 'bg-secondary/50 text-secondary-foreground'}`}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-medium">{student.name}</h3>
                    {student.isProspective && (
                      <Badge variant="outline" className="ml-1 bg-accent/5 text-accent border-accent/20 text-xs">
                        Prospective
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={12} className="mr-1" />
                    <span>{student.location}</span>
                  </div>
                </div>
              </div>
              {!student.isProspective ? (
                student.isReserved ? (
                  <Badge variant="outline" className="border-gray-300 text-gray-700 bg-gray-100">
                    Off-market
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                    Available {student.availableDate}
                  </Badge>
                )
              ) : (
                <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20">
                  {student.availableDate}
                </Badge>
              )}
            </div>
            
            <div className="mb-3">
              <p className="text-sm font-medium mb-2">{student.program}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                {student.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant={student.isProspective ? "outline" : "secondary"} className={`font-normal text-xs py-0 ${student.isProspective ? 'text-accent/80 border-accent/30' : ''}`}>
                    {skill}
                  </Badge>
                ))}
                {student.skills.length > 3 && (
                  <span className="text-xs text-gray-500">+{student.skills.length - 3}</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
              {student.isProspective ? (
                <>
                  <div className="flex items-center">
                    <User size={12} className="mr-1 flex-shrink-0" />
                    <span>{student.backgroundType}</span>
                  </div>
                  <div className="flex items-center col-span-2">
                    <Calendar size={12} className="mr-1 flex-shrink-0" />
                    <span>{student.availableDate}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <GraduationCap size={12} className="mr-1 flex-shrink-0" />
                    <span>{student.school}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase size={12} className="mr-1 flex-shrink-0" />
                    <span>{student.yearsExperience} yrs exp</span>
                  </div>
                  {student.isReserved && (
                    <div className="flex items-center col-span-2">
                      <Calendar size={12} className="mr-1 flex-shrink-0" />
                      <span>Available {student.availableDate}</span>
                    </div>
                  )}
                </>
              )}
            </div>
            
            <div className={`flex ${student.isReserved && !student.isProspective ? 'justify-end' : 'justify-between'} gap-2`}>
              {(student.isProspective || !student.isReserved) && (
                <Button 
                  variant={student.isProspective ? "outline" : "default"}
                  size="sm" 
                  className={`flex-grow ${student.isProspective ? 'border-accent text-accent hover:bg-accent/10' : ''}`}
                  onClick={handleReserve}
                  disabled={!student.isProspective && student.isReserved}
                >
                  {student.isProspective ? 'Sponsor' : 'Reserve'}
                </Button>
              )}
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8" 
                onClick={handleDownloadResume}
                disabled={student.isReserved && !student.isProspective}
              >
                <Download size={14} />
              </Button>
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {student.isProspective ? 'Prospective Candidate Profile' : 'Candidate Profile'}
          </DialogTitle>
          <DialogDescription>
            Full profile details for {student.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <Avatar className="h-28 w-28 mb-4">
                <AvatarImage src={student.avatar || "/placeholder.svg"} />
                <AvatarFallback className={`text-xl ${student.isProspective ? 'bg-accent/20 text-accent' : 'bg-secondary/50 text-secondary-foreground'}`}>
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {student.isReserved && !student.isProspective ? (
                <div className="w-full">
                  <div className="mb-4 py-2 px-4 bg-gray-100 text-gray-700 rounded-md text-center font-medium">
                    Off-market Candidate
                  </div>
                  <Button variant="secondary" className="w-full" onClick={handleDownloadResume}>
                    <Download size={16} className="mr-2" />
                    Download Resume
                  </Button>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  <Button 
                    className={`w-full ${student.isProspective ? 'border-accent bg-white text-accent hover:bg-accent/10' : ''}`}
                    variant={student.isProspective ? "outline" : "default"}
                    onClick={handleReserve}
                    disabled={!student.isProspective && student.isReserved}
                  >
                    {student.isProspective ? 'Sponsor This Candidate' : 'Reserve This Candidate'}
                  </Button>
                  {!student.isProspective && (
                    <Button variant="secondary" className="w-full" onClick={handleDownloadResume}>
                      <Download size={16} className="mr-2" />
                      Download Resume
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <MapPin size={16} className="mr-2 text-gray-500" />
                <span>{student.location}</span>
              </div>
              {student.isProspective ? (
                <>
                  <div className="flex items-center text-gray-700">
                    <User size={16} className="mr-2 text-gray-500" />
                    <span>Background: {student.backgroundType}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar size={16} className="mr-2 text-gray-500" />
                    <span>{student.availableDate}</span>
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-2">About</h3>
            <p className="text-gray-700 mb-6">{student.about}</p>
            
            <h3 className="text-lg font-medium mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {student.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant={student.isProspective ? "outline" : "secondary"}
                  className={student.isProspective ? 'text-accent/80 border-accent/30' : ''}
                >
                  {skill}
                </Badge>
              ))}
            </div>
            
            {student.isProspective ? (
              <div>
                <h3 className="text-lg font-medium mb-2">Sponsorship Program</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Training Duration</div>
                      <div className="font-semibold">16 weeks</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Estimated Start Date</div>
                      <div className="font-semibold">Within 30 days of sponsorship</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Program Cost</div>
                      <div className="font-semibold">$15,000 (includes tuition and living stipend)</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Hiring Guarantee</div>
                      <div className="font-semibold">100% job placement upon successful completion</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
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
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TalentCard;
