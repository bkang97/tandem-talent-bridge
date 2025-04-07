
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarClock,
  Check,
  ChevronRight,
  Clock,
  Download,
  MapPin,
  UsersRound,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SupplyDemandChart from "@/components/talent/SupplyDemandChart";
import { Badge } from "@/components/ui/badge";

const TalentReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservedStudents, callDetails, bulkReservation } = location.state || {
    reservedStudents: [],
    callDetails: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      scheduledDate: "",
      activeStudentCount: 0,
      prospectiveCount: 0,
    },
    bulkReservation: false,
  };

  // If no reservation data is present, redirect to main talent request page
  React.useEffect(() => {
    if (!reservedStudents && !bulkReservation) {
      navigate("/talent-request");
    }
  }, [reservedStudents, navigate, bulkReservation]);

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    console.log("Downloading receipt for:", reservedStudents);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://assets.skilltrade.com/production/permanent/skillttrade_logo.svg?dm=1724440579"
                alt="Skilltrade"
                className="h-8"
              />
              <div className="h-6 w-px bg-gray-300"></div>
              <h2 className="text-black font-semibold">
                Employer Talent Portal
              </h2>
            </div>
            <Badge variant="outline" className="border-black/20 text-black">
              Spring 2025 Cohort
            </Badge>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-primary">
            Reservation Confirmation
          </h1>
          <p className="text-gray-600">
            You've successfully reserved candidates from the SkillTrade talent
            pool.
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
                      Reference #STR-
                      {Math.floor(Math.random() * 10000)
                        .toString()
                        .padStart(4, "0")}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadReceipt}
                    className="gap-1.5"
                  >
                    <Download size={16} /> Receipt
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">
                      Reservation Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">Company Name</p>
                        <p className="font-medium">{callDetails.companyName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contact Person</p>
                        <p className="font-medium">{callDetails.contactName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{callDetails.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{callDetails.phone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Meeting Scheduled</p>
                        <p className="font-medium flex items-center gap-1.5">
                          <CalendarClock size={16} />
                          {callDetails.scheduledDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {bulkReservation ? (
                    <div>
                      <h3 className="font-medium text-lg mb-2">
                        Talent Allocation
                      </h3>
                      <div className="p-5 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                          <div>
                            <div className="text-sm text-gray-500">
                              Current Students
                            </div>
                            <div className="font-medium text-2xl">
                              {callDetails.activeStudentCount || 0}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Prospective Students
                            </div>
                            <div className="font-medium text-2xl">
                              {callDetails.prospectiveCount || 0}
                            </div>
                          </div>
                        </div>

                        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                          <div
                            className="h-2.5 bg-primary"
                            style={{
                              width: `${
                                (callDetails.activeStudentCount /
                                  (callDetails.activeStudentCount +
                                    callDetails.prospectiveCount)) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>

                        <div className="flex justify-between text-xs text-gray-500 mb-5">
                          <span>
                            Current:{" "}
                            {Math.round(
                              (callDetails.activeStudentCount /
                                (callDetails.activeStudentCount +
                                  callDetails.prospectiveCount)) *
                                100
                            )}
                            %
                          </span>
                          <span>
                            Prospective:{" "}
                            {Math.round(
                              (callDetails.prospectiveCount /
                                (callDetails.activeStudentCount +
                                  callDetails.prospectiveCount)) *
                                100
                            )}
                            %
                          </span>
                        </div>

                        <div className="text-center font-medium py-1 bg-gray-100 rounded-md">
                          Total:{" "}
                          <span className="text-primary">
                            {(callDetails.activeStudentCount || 0) +
                              (callDetails.prospectiveCount || 0)}{" "}
                            candidates
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-medium text-lg mb-2">
                        Reserved Candidates ({reservedStudents.length})
                      </h3>
                      <div className="space-y-3">
                        {reservedStudents.map((student) => (
                          <div
                            key={student.id}
                            className="p-3 border rounded-md flex justify-between items-center"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-medium">
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div>
                                <div className="font-medium">
                                  {student.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {student.program}
                                </div>
                              </div>
                            </div>
                            <div className="text-right text-sm">
                              <div className="flex items-center justify-end">
                                <MapPin size={14} className="mr-1" />
                                <span>{student.location}</span>
                              </div>
                              <div className="flex items-center justify-end text-primary/80">
                                <Clock size={14} className="mr-1" />
                                <span>
                                  {student.isProspective
                                    ? "Prospective"
                                    : `Available ${student.availableDate}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-1.5">
                      <CalendarClock size={16} className="text-primary" />
                      What happens next?
                    </h4>
                    <p className="text-gray-700">
                      We've scheduled a call with our talent team on
                      <span className="font-medium">
                        {" "}
                        {callDetails.scheduledDate}
                      </span>
                      . During this call, we'll discuss the next steps for
                      connecting with your reserved candidates and answer any
                      questions you may have.
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between border-t pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/talent-request')}
                  className="gap-1.5"
                >
                  Browse More Talent
                </Button>
                <Button onClick={() => window.print()} className="gap-1.5">
                  <Download size={16} />
                  Save Confirmation
                </Button>
              </CardFooter>
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
                      <span className="text-destructive">40%</span> of employers
                      can't find enough qualified talent
                    </h3>
                    <p className="text-gray-500">
                      Source: SkillTrade Employer Survey 2024
                    </p>
                  </div>

                  <SupplyDemandChart />

                  <div>
                    <h4 className="font-medium mb-2">
                      Secure Your Talent Pipeline
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      With SkillTrade Sponsored Talent, you can build a custom
                      talent pipeline tailored to your specific needs, ensuring
                      you always have access to qualified candidates.
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full" size="lg">
                  Why Sponsor?
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/talent-request")}
                >
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
