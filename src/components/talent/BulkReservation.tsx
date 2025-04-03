
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { UsersRound, AlertCircle, ArrowRight } from 'lucide-react';
import ReservationModal from './ReservationModal';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  
  const availableAmount = calculateAvailableTalent();
  const gapAmount = quantity[0] - availableAmount;
  const percentAvailable = Math.round((availableAmount / quantity[0]) * 100);
  
  return (
    <>
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <UsersRound size={20} className="text-primary" />
            Reserve by Hiring Need
          </CardTitle>
          <p className="text-sm text-gray-600">
            Tell us your requirements and we'll match you with available candidates
          </p>
        </CardHeader>
        
        <CardContent className="pb-4">
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
            
            <Separator className="my-6" />
            
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-amber-500" size={20} />
                <h3 className="font-medium text-amber-800">Talent Availability Alert</h3>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">
                  Available candidates matching your criteria:
                </span>
                <span className="text-lg font-bold">
                  <span className={percentAvailable < 70 ? "text-amber-600" : "text-emerald-600"}>
                    {availableAmount}
                  </span>
                  <span className="text-gray-400">/</span>
                  <span>{quantity[0]}</span>
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    percentAvailable < 50 ? "bg-amber-500" : "bg-emerald-500"
                  }`} 
                  style={{ width: `${percentAvailable}%` }} 
                />
              </div>
              
              {gapAmount > 0 && (
                <p className="mt-3 text-sm text-gray-700">
                  <strong className="text-amber-700">{gapAmount} more candidates needed</strong> to 
                  fulfill your request. Consider Tandem Sponsorship to close this gap.
                </p>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3 pt-2">
          <Button 
            className="w-full" 
            onClick={handleReserve}
            disabled={!location || !skillSet || !timeframe}
          >
            Reserve {availableAmount} Available Candidates
          </Button>
          
          {gapAmount > 0 && (
            <Alert variant="default" className="bg-primary/5 border-primary/20">
              <AlertDescription className="flex justify-between items-center">
                <span className="text-sm">Close your talent gap with Tandem Sponsorship</span>
                <Button variant="outline" size="sm" className="flex items-center gap-1 border-primary/30">
                  Learn More <ArrowRight size={14} />
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
      
      {showReservationModal && (
        <ReservationModal 
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
          reservedStudents={[]} // In bulk mode, we don't have specific students
          bulkReservation={true}
          bulkAmount={availableAmount}
        />
      )}
    </>
  );
};

export default BulkReservation;
