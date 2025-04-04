
import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, User, ArrowRight, Users, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TalentNeedsProps {
  availableCurrentStudents: number;
  availableProspectiveStudents: number;
  className?: string;
  onStartReservation?: (data: {
    neededCandidates: number;
    location: string;
    skillSet: string;
  }) => void;
}

const TalentNeeds = ({ 
  availableCurrentStudents, 
  availableProspectiveStudents, 
  className,
  onStartReservation
}: TalentNeedsProps) => {
  const [neededCandidates, setNeededCandidates] = useState<number>(10);
  const [location, setLocation] = useState<string>('');
  const [skillSet, setSkillSet] = useState<string>('');
  const [currentAvailable, setCurrentAvailable] = useState<number>(0);
  const [prospectiveNeeded, setProspectiveNeeded] = useState<number>(0);
  
  useEffect(() => {
    // Calculate how many candidates are available from current pool (max availableCurrentStudents)
    const availableCurrent = Math.min(availableCurrentStudents, neededCandidates);
    setCurrentAvailable(availableCurrent);
    
    // Calculate how many more candidates need to be sponsored
    const needed = Math.max(0, neededCandidates - availableCurrent);
    setProspectiveNeeded(needed);
  }, [neededCandidates, availableCurrentStudents]);

  const handleStartReservation = () => {
    if (onStartReservation) {
      onStartReservation({
        neededCandidates,
        location,
        skillSet
      });
    }
  };
  
  return (
    <Card className={`bg-white overflow-hidden border-none shadow-sm ${className}`}>
      <CardContent className="p-0">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold mb-2 text-purple-900">Define Your Hiring Needs</h2>
          <p className="text-gray-600 text-sm mb-4">
            Tell us your requirements to see available SkillTrade candidates and sponsorship options
          </p>
          
          <div className="mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-4">
              <div className="flex-grow">
                <Label htmlFor="candidates" className="block mb-2 text-base font-medium">
                  How many candidates do you need?
                </Label>
                <div className="flex">
                  <Input
                    id="candidates"
                    type="number"
                    min={1}
                    value={neededCandidates}
                    onChange={(e) => setNeededCandidates(parseInt(e.target.value) || 0)}
                    className="text-xl h-14 text-center font-semibold"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <Alert className="bg-purple-50 border-purple-100 text-purple-800">
                  <Info className="h-4 w-4 text-purple-500" />
                  <AlertDescription className="text-xs">
                    Currently only {availableCurrentStudents} active candidates available from SkillTrade.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
            
            {neededCandidates > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-purple-900">Talent Allocation Preview</h3>
                  <div className="text-sm text-gray-500">
                    Total need: <span className="font-medium">{neededCandidates}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className="flex items-center">
                      <Users size={12} className="mr-1 text-purple-700" />
                      Current Students
                    </span>
                    <span className="font-medium text-purple-800">{currentAvailable} candidates</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div 
                      className="h-3 rounded-full bg-purple-700" 
                      style={{ width: `${(currentAvailable / neededCandidates) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className="flex items-center">
                      <User size={12} className="mr-1 text-purple-400" />
                      Prospective Students
                    </span>
                    <span className="font-medium text-purple-600">{prospectiveNeeded} candidates</span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div 
                      className="h-3 rounded-full bg-purple-400" 
                      style={{ width: `${(prospectiveNeeded / neededCandidates) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap mt-3 gap-1 items-center">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                    {currentAvailable} Ready Now
                  </Badge>
                  {prospectiveNeeded > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className="bg-purple-50 text-purple-600 border-purple-200">
                            +{prospectiveNeeded} To Sponsor
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-[200px]">These candidates need to be sponsored for SkillTrade's training program to fulfill your hiring needs</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  
                  {prospectiveNeeded > availableProspectiveStudents && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 ml-auto">
                      {prospectiveNeeded - availableProspectiveStudents} additional needed
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="block mb-2">
                Location
              </Label>
              <div className="relative">
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-9"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            
            <div>
              <Label htmlFor="skill" className="block mb-2">
                Primary Skill Set
              </Label>
              <div className="relative">
                <Select value={skillSet} onValueChange={setSkillSet}>
                  <SelectTrigger className="pl-9">
                    <SelectValue placeholder="Select skill set" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="cloudcomputing">Cloud Computing</SelectItem>
                    <SelectItem value="dataanalytics">Data Analytics</SelectItem>
                    <SelectItem value="softwaredevelopment">Software Development</SelectItem>
                    <SelectItem value="uiuxdesign">UI/UX Design</SelectItem>
                    <SelectItem value="projectmanagement">Project Management</SelectItem>
                  </SelectContent>
                </Select>
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={16} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 border-t border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <div className="text-xs text-gray-500 mb-1">Current Students</div>
                  <div className="font-semibold text-lg flex items-center text-purple-900">
                    <Users size={16} className="mr-1 text-purple-700" />
                    {availableCurrentStudents} available
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <div className="text-xs text-gray-500 mb-1">Prospective</div>
                  <div className="font-semibold text-lg flex items-center text-purple-700">
                    <User size={16} className="mr-1" />
                    {availableProspectiveStudents} available
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Button 
                variant="default" 
                className="flex-1 md:flex-none bg-purple-700 hover:bg-purple-800"
                disabled={!neededCandidates || (!location && !skillSet)}
                onClick={handleStartReservation}
              >
                Find Candidates
              </Button>
              {prospectiveNeeded > 0 && (
                <Button variant="outline" className="flex-1 md:flex-none text-purple-700 border-purple-200 hover:bg-purple-50">
                  <span>Sponsorship Options</span>
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentNeeds;
