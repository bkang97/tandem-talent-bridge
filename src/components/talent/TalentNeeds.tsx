
import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, User, ArrowRight, Users } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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

interface TalentNeedsProps {
  availableCurrentStudents: number;
  availableProspectiveStudents: number;
  className?: string;
}

const TalentNeeds = ({ availableCurrentStudents, availableProspectiveStudents, className }: TalentNeedsProps) => {
  const [neededCandidates, setNeededCandidates] = useState<number>(10);
  const [location, setLocation] = useState<string>('');
  const [skillSet, setSkillSet] = useState<string>('');
  const [currentAvailable, setCurrentAvailable] = useState<number>(0);
  const [prospectiveNeeded, setProspectiveNeeded] = useState<number>(0);
  
  useEffect(() => {
    // Calculate how many candidates are available from current pool (max 3)
    const availableCurrent = Math.min(availableCurrentStudents, 3);
    setCurrentAvailable(availableCurrent);
    
    // Calculate how many more candidates need to be sponsored
    const needed = Math.max(0, neededCandidates - availableCurrent);
    setProspectiveNeeded(needed);
  }, [neededCandidates, availableCurrentStudents]);
  
  return (
    <Card className={`bg-white overflow-hidden border-none shadow-sm ${className}`}>
      <CardContent className="p-0">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold mb-2">Define Your Hiring Needs</h2>
          <p className="text-gray-600 text-sm mb-4">
            Tell us your requirements to see available candidates and sponsorship options
          </p>
          
          <div className="mb-6">
            <div className="flex items-end gap-4">
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
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Current Availability</div>
                <div className="font-semibold text-xl flex items-center">
                  <span className={currentAvailable === 0 ? "text-red-500" : "text-emerald-600"}>
                    {currentAvailable}
                  </span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span>{neededCandidates}</span>
                </div>
              </div>
            </div>
            
            {neededCandidates > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2 bg-gray-100 rounded-full flex-grow">
                  <div 
                    className={`h-2 rounded-full ${currentAvailable === 0 ? "bg-red-500" : "bg-emerald-500"}`} 
                    style={{ width: `${(currentAvailable / neededCandidates) * 100}%` }} 
                  />
                </div>
                {prospectiveNeeded > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="bg-accent text-white">
                          +{prospectiveNeeded} needed
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>You'll need to sponsor additional candidates to fulfill your hiring needs</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
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
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">Current</div>
                  <div className="font-semibold text-lg flex items-center">
                    <Users size={16} className="mr-1 text-primary" />
                    {currentAvailable} available
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-accent/30">
                  <div className="text-xs text-gray-500 mb-1">Sponsor</div>
                  <div className="font-semibold text-lg flex items-center text-accent">
                    <User size={16} className="mr-1" />
                    {prospectiveNeeded} needed
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="default" className="flex-1 md:flex-none">
                Find Candidates
              </Button>
              {prospectiveNeeded > 0 && (
                <Button variant="outline" className="flex-1 md:flex-none text-accent border-accent/30 hover:bg-accent/5">
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
