import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import {
  BarChart2,
  TrendingUp,
  Users,
  Building,
  Award,
  ExternalLink,
} from "lucide-react";

const MarketAnalysis = () => {
  // Supply/demand data by tech field
  const supplyDemandData = [
    { field: "Cybersecurity", supply: 35, demand: 100, gap: 65 },
    { field: "Cloud Computing", supply: 42, demand: 85, gap: 43 },
    { field: "Data Analytics", supply: 50, demand: 80, gap: 30 },
    { field: "Software Dev", supply: 60, demand: 95, gap: 35 },
    { field: "UX/UI Design", supply: 45, demand: 70, gap: 25 },
    { field: "Project Mgmt", supply: 55, demand: 75, gap: 20 },
  ];

  // Hiring timeline data
  const hiringTimelineData = [
    { month: "Jan", traditional: 62, sponsored: 30 },
    { month: "Feb", traditional: 58, sponsored: 32 },
    { month: "Mar", traditional: 65, sponsored: 34 },
    { month: "Apr", traditional: 70, sponsored: 35 },
    { month: "May", traditional: 68, sponsored: 36 },
    { month: "Jun", traditional: 72, sponsored: 38 },
  ];

  // Case studies data
  const caseStudies = [
    {
      company: "HealthFirst",
      industry: "Healthcare",
      role: "Medical Assistant",
      sponsored: 24,
      timeline: "4 months",
      success: "96%",
      description:
        "HealthFirst faced critical shortages in staffing their expanding clinics. Through sponsorship, they successfully trained and hired 24 Certified Medical Assistants within 4 months, reducing their vacancy rate by 85%.",
    },
    {
      company: "Helios HVAC",
      industry: "Facilities Management",
      role: "HVAC Technician",
      sponsored: 18,
      timeline: "5 months",
      success: "94%",
      description:
        "Helios HVAC struggled to find qualified technicians for their commercial contracts. By sponsoring 18 trainees, they were able to fully staff their projects and increase their service capacity by 40%.",
    },
    {
      company: "SecureNet",
      industry: "Cybersecurity",
      role: "Security Analyst",
      sponsored: 15,
      timeline: "4 months",
      success: "100%",
      description:
        "SecureNet needed to quickly scale their security operations center. Through sponsorship, they developed 15 analysts trained specifically on their security stack, enabling them to take on larger enterprise contracts.",
    },
  ];

  // ROI comparison data
  const roiData = [
    {
      metric: "Average Time-to-Hire",
      traditional: "90+ days",
      sponsored: "30-45 days",
    },
    {
      metric: "Hiring Cost",
      traditional: "$18,000-$25,000",
      sponsored: "$15,000 fixed",
    },
    { metric: "First Year Retention", traditional: "65%", sponsored: "92%" },
    {
      metric: "Skill Match to Needs",
      traditional: "70-80%",
      sponsored: "95-100%",
    },
    { metric: "Ramp-Up Time", traditional: "2-3 months", sponsored: "2 weeks" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart2 size={20} className="text-primary" />
            Talent Market Analysis
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="gap">
            <TabsList className="mb-4">
              <TabsTrigger value="gap">Talent Gap</TabsTrigger>
              <TabsTrigger value="timeline">Hiring Timeline</TabsTrigger>
              <TabsTrigger value="roi">ROI Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="gap">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-base font-medium mb-2 text-blue-800">
                    Critical Talent Shortage
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    The tech industry is facing a significant gap between
                    available talent and market demand. Currently, active
                    candidates only represent 23-40% of the total need,
                    highlighting the strategic value of talent pipeline
                    development.
                  </p>
                </div>

                <div className="">
                  <ChartContainer
                    config={{
                      supply: { color: "#93C5FD" },
                      demand: { color: "#1E3A8A" },
                      gap: { color: "#FE9878" },
                    }}
                  >
                    <BarChart
                      data={supplyDemandData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.2}
                      />
                      <XAxis dataKey="field" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar
                        dataKey="supply"
                        name="Available Talent"
                        fill="var(--color-supply)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="demand"
                        name="Market Demand"
                        fill="var(--color-demand)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>

                <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                  <div className="flex items-start gap-4 justify-between">
                    <div>
                      <h3 className="text-base font-medium mb-1">
                        Sponsorship Solution
                      </h3>
                      <p className="text-sm text-gray-600">
                        Sponsoring talent allows you to close this gap with
                        candidates trained specifically for your needs,
                        guaranteeing qualified personnel without competing in
                        the limited active talent market.
                      </p>
                    </div>
                    <Button size="sm" className="whitespace-nowrap">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-base font-medium mb-2 text-blue-800">
                    Hiring Timeline Comparison
                  </h3>
                  <p className="text-sm text-gray-700">
                    Traditional hiring processes typically take 60-90 days from
                    posting to onboarding, while sponsored candidates can be
                    ready for placement in as little as 30-45 days after
                    training program initiation.
                  </p>
                </div>

                <div className="">
                  <ChartContainer
                    config={{
                      traditional: { color: "#94A3B8" },
                      sponsored: { color: "#8B5CF6" },
                    }}
                  >
                    <LineChart
                      data={hiringTimelineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis
                        label={{
                          value: "Days to Hire",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="traditional"
                        name="Traditional Hiring"
                        stroke="var(--color-traditional)"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sponsored"
                        name="Sponsored Talent"
                        stroke="var(--color-sponsored)"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>

                <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-4">
                    <TrendingUp size={40} className="text-accent" />
                    <div>
                      <h3 className="text-base font-medium">
                        Faster Time-to-Value
                      </h3>
                      <p className="text-sm text-gray-600">
                        Sponsored candidates can be employed up to 50% faster
                        than traditional hiring methods, reducing operational
                        gaps and project delays.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="roi">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-base font-medium mb-1 text-blue-800">
                    ROI Comparison
                  </h3>
                  <p className="text-sm text-gray-700">
                    When comparing traditional hiring with talent sponsorship,
                    the return on investment extends beyond just time-to-hire to
                    include long-term retention and performance metrics.
                  </p>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Metric</TableHead>
                        <TableHead>Traditional Hiring</TableHead>
                        <TableHead>Talent Sponsorship</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roiData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {row.metric}
                          </TableCell>
                          <TableCell>{row.traditional}</TableCell>
                          <TableCell className="text-accent font-medium">
                            {row.sponsored}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                  <div className="flex items-start gap-4 justify-between">
                    <div>
                      <h3 className="text-base font-medium mb-1">
                        Long-term Savings
                      </h3>
                      <p className="text-sm text-gray-600">
                        The higher retention rate and reduced onboarding time of
                        sponsored candidates can save an average of $45,000 per
                        hire over a three-year period.
                      </p>
                    </div>
                    <Button size="sm" className="whitespace-nowrap">
                      Calculate ROI
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Building size={20} className="text-primary" />
            Success Stories
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-lg">{study.company}</h3>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Badge variant="outline">{study.industry}</Badge>
                        <span>•</span>
                        <span>{study.role}</span>
                      </div>
                    </div>
                    <Award className="text-yellow-500" size={24} />
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Sponsored</div>
                      <div className="font-semibold flex items-center">
                        <Users size={16} className="mr-1 text-accent" />
                        {study.sponsored} candidates
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Timeline</div>
                      <div className="font-semibold">{study.timeline}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Success Rate</div>
                      <div className="font-semibold text-emerald-600">
                        {study.success}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm">{study.description}</p>

                  <div className="mt-4 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-primary">
                      Read Full Case Study
                      <ExternalLink size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-primary/5 p-4 rounded-lg border border-primary/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-medium">
                  Ready to create your success story?
                </h3>
                <p className="text-sm text-gray-600">
                  Join these organizations in building your talent pipeline
                  through sponsored training and guaranteed placement.
                </p>
              </div>
              <Button>Start Sponsorship Program</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalysis;
