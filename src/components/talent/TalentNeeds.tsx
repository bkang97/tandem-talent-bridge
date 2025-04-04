
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { UsersRound, AlertCircle, ArrowRight, CalendarClock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface TalentNeedsProps {
  className?: string;
  availableCurrentStudents: number;
  availableProspectiveStudents: number;
  onStartReservation: (data: any) => void;
}

const TalentNeeds = ({
  className,
  availableCurrentStudents,
  availableProspectiveStudents,
  onStartReservation
}: TalentNeedsProps) => {
  const [location, setLocation] = useState('');
  const [skillSet, setSkillSet] = useState('');
  const [quantity, setQuantity] = useState([10]);
  const [timeframe, setTimeframe] = useState('90days');
  
  // Calculate metrics based on inputs
  const neededCandidates = quantity[0];
  const availableActive = Math.min(availableCurrentStudents, neededCandidates);
  const gapAmount = Math.max(0, neededCandidates - availableActive);
  const availablePercent = Math.round((availableActive / neededCandidates) * 100);
  const prospectivePercent = 100 - availablePercent;
  
  const handleStartReservation = () => {
    onStartReservation({
      neededCandidates,
      location,
      skillSet,
      timeframe,
      availableActive,
      gapAmount
    });
  };
  
  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="pb-3 bg-primary/5">
        <CardTitle className="text-lg flex items-center gap-2">
          <UsersRound size={20} className="text-primary" />
          Define Your Hiring Needs
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-4 md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Location</label>
                <Input 
                  placeholder="e.g., San Francisco, Remote, etc." 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Primary Skill Set</label>
                <Select value={skillSet} onValueChange={setSkillSet}>
                  <SelectTrigger>
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
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Candidates Needed</label>
                <span className="text-sm font-semibold">{quantity[0]}</span>
              </div>
              <Slider 
                value={quantity} 
                onValueChange={setQuantity} 
                max={20} 
                min={1} 
                step={1} 
                className="my-4"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Hiring Timeframe</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">Within 30 days</SelectItem>
                  <SelectItem value="60days">Within 60 days</SelectItem>
                  <SelectItem value="90days">Within 90 days</SelectItem>
                  <SelectItem value="6months">Within 6 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <CalendarClock size={16} className="mr-1.5 text-primary" />
              Talent Availability
            </h3>
            
            <div className="mb-4">
              <div className="flex justify-between items-center text-sm">
                <span>Total Hiring Need:</span>
                <span className="font-semibold">{neededCandidates} Candidates</span>
              </div>
              
              <Separator className="my-3" />
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Current Students Available:</span>
                    <span className="font-medium">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {availableActive} / {neededCandidates}
                      </Badge>
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${availablePercent}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Prospective Students Needed:</span>
                    <span className="font-medium">
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        {gapAmount} / {neededCandidates}
                      </Badge>
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${prospectivePercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {gapAmount > 0 && (
              <Alert variant="default" className="bg-amber-50 border-amber-200 mt-3 mb-3">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-800 text-xs">
                  Only {availableActive} current students available.
                  You'll need to sponsor {gapAmount} prospective students to fulfill your needs.
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              className="w-full" 
              onClick={handleStartReservation}
              disabled={!location || !skillSet || !timeframe}
            >
              Reserve Talent Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentNeeds;
