
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Calendar, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Form validation schema
const reservationFormSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name is required' }),
  contactName: z.string().min(2, { message: 'Contact name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Valid phone number is required' }),
  callDate: z.date({ required_error: 'Please select a date for the call' }),
  activeStudentCount: z.number().optional(),
  hiringNeeds: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationFormSchema>;

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservedStudents: Array<any>;
  bulkReservation?: boolean;
  bulkAmount?: number;
  availableActiveCount?: number;
  totalHiringNeed?: number;
}

const ReservationModal = ({
  isOpen,
  onClose,
  reservedStudents,
  bulkReservation = false,
  bulkAmount = 0,
  availableActiveCount = 3, // Default to 3 active students available
  totalHiringNeed = 10 // Default to 10 total students needed
}: ReservationModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Track the slider value for active students
  const [activeStudentCount, setActiveStudentCount] = useState<number>(availableActiveCount);
  const [prospectiveCount, setProspectiveCount] = useState<number>(
    Math.max(0, totalHiringNeed - availableActiveCount)
  );
  
  // Update prospective count whenever activeStudentCount changes
  useEffect(() => {
    setProspectiveCount(Math.max(0, totalHiringNeed - activeStudentCount));
  }, [activeStudentCount, totalHiringNeed]);

  // Set up form with validation
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      activeStudentCount: availableActiveCount,
      hiringNeeds: '',
    },
  });

  const onSubmit = (data: ReservationFormValues) => {
    // Format the data for submission
    const callDetails = {
      companyName: data.companyName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      scheduledDate: format(data.callDate, 'PPP'),
      hiringNeeds: data.hiringNeeds || 'Not specified',
      activeStudentCount,
      prospectiveCount
    };
    
    // Show success toast
    toast({
      title: "Reservation Confirmed!",
      description: "We've received your information and will be in touch soon.",
    });
    
    // Close the dialog
    onClose();
    
    // Navigate to the confirmation page with the reservation details
    navigate('/talent-reservation', {
      state: {
        reservedStudents,
        callDetails,
        bulkReservation,
        bulkAmount: activeStudentCount + prospectiveCount
      }
    });
  };

  const totalStudents = activeStudentCount + prospectiveCount;
  const activePercentage = (activeStudentCount / totalStudents) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Complete Your Reservation</DialogTitle>
          <DialogDescription>
            {bulkReservation
              ? `You're reserving ${totalStudents} total candidates. We'll schedule a call to discuss your needs.`
              : `You're reserving ${reservedStudents.length} candidate${reservedStudents.length > 1 ? 's' : ''}. Fill in your details to confirm.`
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {(bulkReservation || reservedStudents.length > 0) && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-base font-medium mb-3">Talent Allocation</h3>
                  <Alert className="bg-blue-50 border-blue-200 mb-4">
                    <Info className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-sm text-gray-700">
                      Based on your total hiring need of {totalStudents} candidates, you can reserve up to {availableActiveCount} current students and sponsor the remaining as prospective candidates.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex flex-col space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <FormLabel>Current Students</FormLabel>
                          <span className="text-sm font-medium">{activeStudentCount}</span>
                        </div>
                        <Slider 
                          value={[activeStudentCount]} 
                          onValueChange={(value) => setActiveStudentCount(value[0])}
                          max={availableActiveCount} 
                          min={0} 
                          step={1} 
                          className="my-2"
                        />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${activePercentage}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Badge variant="secondary">
                            {activeStudentCount} Current
                          </Badge>
                          <Badge variant="outline" className="bg-accent/5 text-accent border-accent/30">
                            {prospectiveCount} Prospective
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="flex justify-between text-gray-500">
                          <span>Total Candidates: {totalStudents}</span>
                          <span className="font-medium text-primary">Ready to Reserve</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <FormField
              control={form.control}
              name="callDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Schedule an Intro Call</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 14))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Choose a date within the next two weeks for our intro call.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hiringNeeds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hiring Needs (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Briefly describe your role requirements and timeline"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    This helps us understand your specific requirements.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Complete Reservation
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
