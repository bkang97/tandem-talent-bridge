
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, Check, ChevronRight, Clock, Download, MapPin, UsersRound } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SupplyDemandChart from '@/components/talent/SupplyDemandChart';

const TalentReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservedStudents, callDetails } = location.state || { 
    reservedStudents: [], 
    callDetails: { companyName: '', contactName: '', email: '', phone: '', scheduledDate: '' } 
  };

  // If no reservation data is present, redirect to main talent request page
  React.useEffect(() => {
    if (!reservedStudents || reservedStudents.length === 0) {
      navigate('/talent-request');
    }
  }, [reservedStudents, navigate]);

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log('Downloading receipt for:', reservedStudents);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reservation Confirmation</h1>
          <p className="text-gray-600">
            You've successfully reserved candidates from our talent pool.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-green-50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      Reservation Complete
                    </CardTitle>
                    <CardDescription>
                      Reference #TND-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleDownloadReceipt}>
                    <Download size={16} className="mr-1" /> Receipt
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Reservation Details</h3>
                    <div className="rounded-md bg-gray-50 p-4">
                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm text-gray-500">Company Name</dt>
                          <dd className="font-medium">{callDetails.companyName}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Contact Person</dt>
                          <dd className="font-medium">{callDetails.contactName}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Email</dt>
                          <dd className="font-medium">{callDetails.email}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Phone</dt>
                          <dd className="font-medium">{callDetails.phone}</dd>
                        </div>
                        <div className="md:col-span-2">
                          <dt className="text-sm text-gray-500">Meeting Scheduled</dt>
                          <dd className="font-medium flex items-center gap-1">
                            <CalendarClock size={16} />
                            {callDetails.scheduledDate}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Reserved Candidates ({reservedStudents.length})</h3>
                    <div className="space-y-3">
                      {reservedStudents.map((student, index) => (
                        <div key={student.id} className="p-3 border rounded-md flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-medium">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.program}</div>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <div className="flex items-center justify-end">
                              <MapPin size={14} className="mr-1" />
                              <span>{student.location}</span>
                            </div>
                            <div className="flex items-center justify-end text-secondary">
                              <Clock size={14} className="mr-1" />
                              <span>Available {student.availableDate}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h4 className="font-semibold mb-2">What happens next?</h4>
                    <p className="text-gray-700 text-sm">
                      We've scheduled a call with our talent team on 
                      <span className="font-semibold"> {callDetails.scheduledDate}</span>. 
                      During this call, we'll discuss the next steps for connecting with your 
                      reserved candidates and answer any questions you may have.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-8">
              <CardHeader className="bg-primary text-white">
                <CardTitle className="flex items-center gap-2">
                  <UsersRound size={18} />
                  Need More Talent?
                </CardTitle>
                <CardDescription className="text-primary-foreground opacity-90">
                  Our talent pool refreshes regularly, but demand is high
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold mb-2">
                      <span className="text-destructive">40%</span> of employers can't find enough qualified talent
                    </h3>
                    <p className="text-gray-500">Source: Tandem Employer Survey 2024</p>
                  </div>
                  
                  <SupplyDemandChart />
                  
                  <div>
                    <h4 className="font-medium mb-2">Secure Your Talent Pipeline</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      With Tandem Sponsorship, you can build a custom talent pipeline tailored to your specific needs, 
                      ensuring you always have access to qualified candidates.
                    </p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full" size="lg">
                  Learn About Sponsorship
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/talent-request')}>
                  Browse Available Talent
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TalentReservationPage;
