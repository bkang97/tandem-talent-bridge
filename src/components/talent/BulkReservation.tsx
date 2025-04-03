
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { UsersRound } from 'lucide-react';
import ReservationModal from './ReservationModal';

const BulkReservation = () => {
  const [location, setLocation] = useState('');
  const [skillSet, setSkillSet] = useState('');
  const [quantity, setQuantity] = useState([5]);
  const [timeframe, setTimeframe] = useState('90days');
  const [showReservationModal, setShowReservationModal] = useState(false);
  
  // Calculate availability based on selected criteria
  const calculateAvailableTalent = () => {
    // In a real app, this would query availability based on the selected criteria
    // For now, we'll return a fixed number that's less than what they need
    return Math.max(1, Math.floor(quantity[0] * 0.6));
  };
  
  const handleReserve = () => {
    setShowReservationModal(true);
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersRound size={20} />
            Reserve by Hiring Need
          </CardTitle>
          <CardDescription>
            Tell us your requirements and reserve candidates that match your needs
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
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
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Number of Candidates Needed</label>
                <span className="text-sm font-semibold">{quantity[0]}</span>
              </div>
              <Slider 
                value={quantity} 
                onValueChange={setQuantity} 
                max={20} 
                min={1} 
                step={1} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Timeframe</label>
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
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md mt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Availability Alert</h4>
                  <p className="text-sm text-amber-800">
                    Based on your requirements, we can currently provide approximately:
                  </p>
                </div>
                <div className="text-2xl font-bold text-amber-600">{calculateAvailableTalent()}/{quantity[0]}</div>
              </div>
              
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: `${(calculateAvailableTalent()/quantity[0])*100}%` }} 
                  />
                </div>
                <p className="text-xs mt-1 text-gray-600">
                  {quantity[0] - calculateAvailableTalent()} more candidates needed to fulfill your request
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            className="w-full" 
            onClick={handleReserve}
            disabled={!location || !skillSet || !timeframe}
          >
            Reserve Available Candidates
          </Button>
          <Button variant="outline" className="w-full">
            Ask About Sponsorship for More Talent
          </Button>
        </CardFooter>
      </Card>
      
      {showReservationModal && (
        <ReservationModal 
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
          reservedStudents={[]} // In bulk mode, we don't have specific students
          bulkReservation={true}
          bulkAmount={calculateAvailableTalent()}
        />
      )}
    </>
  );
};

export default BulkReservation;
