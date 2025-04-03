
import React, { useState } from 'react';
import { Check, ChevronDown, Search, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TalentFilters = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
  const [activeFilters, setActiveFilters] = useState({
    skills: [] as string[],
    location: [] as string[],
    availability: [] as string[],
    academicPartner: [] as string[]
  });
  
  const handleFilterChange = (type: string, value: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[type as keyof typeof newFilters].includes(value)) {
        newFilters[type as keyof typeof newFilters] = newFilters[type as keyof typeof newFilters].filter(
          item => item !== value
        );
      } else {
        newFilters[type as keyof typeof newFilters] = [...newFilters[type as keyof typeof newFilters], value];
      }
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const removeFilter = (type: string, value: string) => {
    handleFilterChange(type, value);
  };
  
  const clearFilters = () => {
    setActiveFilters({
      skills: [],
      location: [],
      availability: [],
      academicPartner: []
    });
    onFilterChange({
      skills: [],
      location: [],
      availability: [],
      academicPartner: []
    });
  };
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search for skills, name, or keywords" 
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Skills <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Skills</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {['Cybersecurity', 'Cloud Computing', 'Data Analysis', 'Software Development', 'UI/UX Design'].map(skill => (
                <DropdownMenuCheckboxItem
                  key={skill}
                  checked={activeFilters.skills.includes(skill)}
                  onCheckedChange={() => handleFilterChange('skills', skill)}
                >
                  {skill}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Location <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Locations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {['Remote', 'San Francisco, CA', 'Austin, TX', 'New York, NY', 'Chicago, IL'].map(location => (
                <DropdownMenuCheckboxItem
                  key={location}
                  checked={activeFilters.location.includes(location)}
                  onCheckedChange={() => handleFilterChange('location', location)}
                >
                  {location}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Availability <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Availability</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {['Available Now', 'Available in 30 days', 'Available in 60 days'].map(availability => (
                <DropdownMenuCheckboxItem
                  key={availability}
                  checked={activeFilters.availability.includes(availability)}
                  onCheckedChange={() => handleFilterChange('availability', availability)}
                >
                  {availability}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Academic Partner <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select Partners</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {['SkillTrade', 'AIM', 'ForgeNow', 'TechAcademy', 'CodeCampus'].map(partner => (
                <DropdownMenuCheckboxItem
                  key={partner}
                  checked={activeFilters.academicPartner.includes(partner)}
                  onCheckedChange={() => handleFilterChange('academicPartner', partner)}
                >
                  {partner}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="flex items-center gap-2" onClick={clearFilters}>
            <Sliders size={16} /> Clear
          </Button>
        </div>
      </div>
      
      {/* Active filters display */}
      {Object.entries(activeFilters).some(([_, values]) => values.length > 0) && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-sm text-gray-500">Active filters:</span>
          {Object.entries(activeFilters).map(([type, values]) => 
            values.map(value => (
              <Badge 
                key={`${type}-${value}`} 
                variant="secondary"
                className="flex items-center gap-1 py-1"
              >
                {value}
                <button 
                  onClick={() => removeFilter(type, value)}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Badge>
            ))
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default TalentFilters;
