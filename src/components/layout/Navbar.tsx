
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, GraduationCap, Building2, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useBreakpoint } from '@/hooks/use-breakpoint';

const Navbar = () => {
  const isAboveMd = useBreakpoint("md");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Tandem</span>
          </Link>
          
          {isAboveMd ? (
            <nav className="flex space-x-6">
              <Link to="/talent-request" className="flex items-center space-x-1 text-secondary font-medium border-b-2 border-secondary">
                <BriefcaseBusiness size={18} />
                <span>Talent</span>
              </Link>
              <Link to="/academic-partners" className="flex items-center space-x-1 text-gray-600 hover:text-secondary">
                <GraduationCap size={18} />
                <span>Academic Partners</span>
              </Link>
              <Link to="/employer-dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-secondary">
                <Building2 size={18} />
                <span>Dashboard</span>
              </Link>
            </nav>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={24} />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link 
                    to="/talent-request"
                    className="flex items-center space-x-2 text-secondary font-medium p-2 rounded-md hover:bg-secondary/10"
                  >
                    <BriefcaseBusiness size={18} />
                    <span>Talent</span>
                  </Link>
                  <Link 
                    to="/academic-partners"
                    className="flex items-center space-x-2 text-gray-600 p-2 rounded-md hover:bg-gray-100"
                  >
                    <GraduationCap size={18} />
                    <span>Academic Partners</span>
                  </Link>
                  <Link 
                    to="/employer-dashboard"
                    className="flex items-center space-x-2 text-gray-600 p-2 rounded-md hover:bg-gray-100"
                  >
                    <Building2 size={18} />
                    <span>Dashboard</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" className="relative p-2">
            <Bell size={20} />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              2
            </Badge>
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium">TechCorp Inc.</div>
              <div className="text-xs text-gray-500">Employer</div>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-secondary text-secondary-foreground">TC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
