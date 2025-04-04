import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { UsersRound, AlertCircle, ArrowRight, Check, GraduationCap } from 'lucide-react';
import ReservationModal from './ReservationModal';
import SponsorshipModal from './SponsorshipModal';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const programInfo = {
  "certified-medical-assistant": {
    title: "Certified Medical Assistant",
    description: "Learn essential clinical and administrative skills to assist physicians in healthcare settings.",
    duration: "20 Weeks",
    certification: "CCMA",
    format: "Hybrid & Online",
  },
  "surgical-technologist": {
    title: "Surgical Technologist",
    description: "Prepare for a career assisting surgeons in the operating room with proper techniques and protocols.",
    duration: "24 Weeks",
    certification: "CST",
    format: "Hybrid",
  },
  "sterile-processing": {
    title: "Sterile Processing Technician",
    description: "Learn to clean, sterilize, and prepare medical instruments and equipment for surgeries and procedures.",
    duration: "16 Weeks",
    certification: "CRCST",
    format: "Online with Labs",
  },
};

const jobRoleMap = {
  "medical-assistant": "certified-medical-assistant",
  "surgical-tech": "surgical-technologist",
  "sterile-processing-tech": "sterile-processing",
  "patient-care-tech": "certified-medical-assistant",
  "medical-administrative-assistant": "certified-medical-assistant",
};

const BulkReservation = () => {
  const [location, setLocation] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [quantity, setQuantity] = useState([5]);
  const [timeframe, setTimeframe] = useState('90days');
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);
  
  const selectedProgram = jobRole ? programInfo[jobRoleMap[jobRole]] : null;
  
  const calculateAvailableTalent = () => {
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
      <Card className="border-primary/20 shadow-sm">
        <CardHeader className="pb-4 bg-primary/5 border-b border-primary/20">
          <CardTitle className="text-xl flex items-center gap-2">
            <UsersRound size={20} className="text-primary" />
            Reserve by Hiring Need
          </CardTitle>
          <p className="text-sm text-gray-600">
            Tell us your requirements and we'll match you with available candidates
          </p>
        </CardHeader>
        
        <CardContent className="pb-4 pt-4">
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
              <label className="text-sm font-medium mb-1 block">Job Role</label>
              <Select value={jobRole} onValueChange={setJobRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical-assistant">Medical Assistant</SelectItem>
                  <SelectItem value="surgical-tech">Surgical Technologist</SelectItem>
                  <SelectItem value="sterile-processing-tech">Sterile Processing Technician</SelectItem>
                  <SelectItem value="patient-care-tech">Patient Care Technician</SelectItem>
                  <SelectItem value="medical-administrative-assistant">Medical Administrative Assistant</SelectItem>
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
            
            {selectedProgram && (
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <GraduationCap size={18} className="text-primary" />
                  {selectedProgram.title} Program
                </h3>
                <p className="text-sm text-gray-600 mb-3">{selectedProgram.description}</p>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-white rounded border border-primary/10">
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-medium text-primary text-sm">{selectedProgram.duration}</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-primary/10">
                    <div className="text-xs text-gray-500">Certification</div>
                    <div className="font-medium text-primary text-sm">{selectedProgram.certification}</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-primary/10">
                    <div className="text-xs text-gray-500">Format</div>
                    <div className="font-medium text-primary text-sm">{selectedProgram.format}</div>
                  </div>
                </div>
              </div>
            )}
            
            <Separator className="my-4" />
            
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
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
            disabled={!location || !jobRole || !timeframe}
          >
            Reserve {availableAmount} Available Candidates
          </Button>
          
          {gapAmount > 0 && (
            <Alert variant="default" className="bg-primary/5 border-primary/20">
              <AlertDescription className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-primary">Close your talent gap with Tandem Sponsorship</div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-600">Fulfills your exact hiring needs with targeted talent</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 border-primary/30 text-primary whitespace-nowrap"
                  onClick={() => setShowSponsorshipModal(true)}
                >
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

      {showSponsorshipModal && (
        <SponsorshipModal 
          isOpen={showSponsorshipModal} 
          onClose={() => setShowSponsorshipModal(false)} 
        />
      )}
    </>
  );
};

export default BulkReservation;
