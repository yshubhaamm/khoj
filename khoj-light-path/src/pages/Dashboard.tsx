import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Calendar, TrendingUp, TrendingDown, Users, MapPin, Shield, BarChart3, Activity, Zap, Database, Brain, Eye, Target, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter
} from "recharts";

// Mock data based on the uploaded images
const totalMissingData = [
  { state: "West Bengal", total: 150000, color: "#8b5cf6" },
  { state: "Maharashtra", total: 140000, color: "#a855f7" },
  { state: "Madhya Pradesh", total: 110000, color: "#c084fc" },
  { state: "Delhi", total: 85000, color: "#ddd6fe" },
  { state: "Rajasthan", total: 80000, color: "#e879f9" },
  { state: "Tamil Nadu", total: 75000, color: "#f0abfc" },
  { state: "Odisha", total: 70000, color: "#fbbf24" },
  { state: "Chhattisgarh", total: 65000, color: "#fb923c" },
  { state: "Karnataka", total: 60000, color: "#f87171" },
  { state: "Telangana", total: 55000, color: "#60a5fa" }
];

const recoveryData = [
  { state: "Kerala", percentage: 95, color: "#10b981" },
  { state: "Telangana", percentage: 90, color: "#059669" },
  { state: "Arunachal Pradesh", percentage: 85, color: "#047857" },
  { state: "Tripura", percentage: 82, color: "#065f46" },
  { state: "Andhra Pradesh", percentage: 80, color: "#064e3b" },
  { state: "Assam", percentage: 78, color: "#6b7280" },
  { state: "Puducherry", percentage: 76, color: "#4b5563" },
  { state: "Manipur", percentage: 74, color: "#374151" },
  { state: "Karnataka", percentage: 72, color: "#1f2937" },
  { state: "Nagaland", percentage: 70, color: "#111827" }
];

const missing2022Data = [
  { state: "Maharashtra", missing: 45000, color: "#3b82f6" },
  { state: "West Bengal", missing: 38000, color: "#1d4ed8" },
  { state: "Madhya Pradesh", missing: 32000, color: "#1e40af" },
  { state: "Rajasthan", missing: 28000, color: "#1e3a8a" },
  { state: "Tamil Nadu", missing: 25000, color: "#172554" },
  { state: "Delhi", missing: 22000, color: "#0f172a" },
  { state: "Telangana", missing: 20000, color: "#020617" },
  { state: "Karnataka", missing: 18000, color: "#0c4a6e" },
  { state: "Odisha", missing: 16000, color: "#075985" },
  { state: "Chhattisgarh", missing: 14000, color: "#0369a1" }
];

const aiPerformanceData = [
  { metric: "Accuracy", score: 98.5, target: 99.9, color: "#10b981" },
  { metric: "Speed", score: 87.8, target: 94, color: "#3b82f6" },
  { metric: "Precision", score: 98.1, target: 99, color: "#8b5cf6" },
  { metric: "Recall", score: 98.5, target: 100, color: "#f59e0b" },
  { metric: "F1-Score", score: 98.1, target: 99.5, color: "#ef4444" }
];

const realTimeData = [
  { time: "00:00", active: 142, processing: 23, alerts: 8 },
  { time: "04:00", active: 98, processing: 15, alerts: 3 },
  { time: "08:00", active: 267, processing: 45, alerts: 12 },
  { time: "12:00", active: 324, processing: 67, alerts: 18 },
  { time: "16:00", active: 298, processing: 52, alerts: 15 },
  { time: "20:00", active: 187, processing: 31, alerts: 9 }
];

const monthlyTrendData = [
  { month: "Jan", cases: 2400, recovered: 1800 },
  { month: "Feb", cases: 2200, recovered: 1900 },
  { month: "Mar", cases: 2800, recovered: 2100 },
  { month: "Apr", cases: 3200, recovered: 2400 },
  { month: "May", cases: 3800, recovered: 2800 },
  { month: "Jun", cases: 4200, recovered: 3100 },
  { month: "Jul", cases: 4600, recovered: 3400 },
  { month: "Aug", cases: 4800, recovered: 3600 },
  { month: "Sep", cases: 4400, recovered: 3300 },
  { month: "Oct", cases: 4000, recovered: 3000 },
  { month: "Nov", cases: 3600, recovered: 2700 },
  { month: "Dec", cases: 3200, recovered: 2400 }
];

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const totalCases = totalMissingData.reduce((sum, item) => sum + item.total, 0);
  const avgRecoveryRate = recoveryData.reduce((sum, item) => sum + item.percentage, 0) / recoveryData.length;
  const cases2022 = missing2022Data.reduce((sum, item) => sum + item.missing, 0);
  const aiAccuracy = 98.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 animate-pulse"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Khoj AI - Advanced Analytics Command Center
                </h1>
                <p className="text-blue-200/80">Real-time AI-powered missing persons intelligence dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400">
                <Activity className="w-3 h-3 mr-1" />
                Live System
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                <Calendar className="w-3 h-3 mr-1" />
                Updated: Real-time
              </Badge>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Export Intelligence Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Advanced Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-300 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Total Cases Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-100">{totalCases.toLocaleString()}</div>
              <p className="text-xs text-blue-400 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% this quarter
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border-emerald-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-300 flex items-center gap-2">
                <Target className="w-4 h-4" />
                AI Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-100">{aiAccuracy}%</div>
              <p className="text-xs text-emerald-400 mt-1 flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                +2.3% vs baseline
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-300 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Neural Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-100">{cases2022.toLocaleString()}</div>
              <p className="text-xs text-purple-400 mt-1 flex items-center">
                <Activity className="w-3 h-3 mr-1" />
                Real-time processing
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-300 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Active Surveillance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-100">324</div>
              <p className="text-xs text-orange-400 mt-1">Live camera feeds</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-900/50 to-rose-800/30 border-rose-500/30 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-rose-300 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Network Nodes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-100">127</div>
              <p className="text-xs text-rose-400 mt-1">Connected agencies</p>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/30 border border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600/50 data-[state=active]:text-white">Neural Overview</TabsTrigger>
            <TabsTrigger value="realtime" className="data-[state=active]:bg-purple-600/50 data-[state=active]:text-white">Real-time Intelligence</TabsTrigger>
            <TabsTrigger value="states" className="data-[state=active]:bg-emerald-600/50 data-[state=active]:text-white">Geospatial Analysis</TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-orange-600/50 data-[state=active]:text-white">AI Performance</TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-rose-600/50 data-[state=active]:text-white">Predictive Models</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Neural Pattern Recognition
                  </CardTitle>
                  <CardDescription className="text-gray-400">Advanced AI analysis of missing persons database</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={totalMissingData.slice(0, 8)}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="state" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                        stroke="#9ca3af"
                      />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                        formatter={(value) => [value.toLocaleString(), "Cases Processed"]} 
                      />
                      <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="w-5 h-5 text-emerald-400" />
                    Recovery Success Matrix
                  </CardTitle>
                  <CardDescription className="text-gray-400">AI-enhanced recovery rate optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={recoveryData.slice(0, 6)}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="state" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                      <Radar name="Recovery Rate" dataKey="percentage" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-black/30 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="w-5 h-5 text-purple-400" />
                    Live System Activity
                  </CardTitle>
                  <CardDescription className="text-gray-400">Real-time processing and alert generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={realTimeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line type="monotone" dataKey="active" stroke="#8b5cf6" strokeWidth={3} />
                      <Line type="monotone" dataKey="processing" stroke="#f59e0b" strokeWidth={2} />
                      <Line type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-sm">System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Active Nodes</span>
                    <span className="text-green-400 font-bold">324</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Processing Queue</span>
                    <span className="text-yellow-400 font-bold">67</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Alert Level</span>
                    <span className="text-red-400 font-bold">HIGH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">System Health</span>
                    <span className="text-green-400 font-bold">98.7%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="states" className="space-y-6">
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  Geospatial Distribution Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">State-wise missing persons cases with AI insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={missing2022Data}>
                    <defs>
                      <linearGradient id="colorStates" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="state" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={12}
                      stroke="#9ca3af"
                    />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value) => [value.toLocaleString(), "Missing in 2022"]} 
                    />
                    <Bar dataKey="missing" fill="url(#colorStates)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Brain className="w-5 h-5 text-orange-400" />
                    AI Performance Metrics
                  </CardTitle>
                  <CardDescription className="text-gray-400">Neural network efficiency and accuracy analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={aiPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="metric" stroke="#9ca3af" />
                      <YAxis domain={[0, 100]} stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="score" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="#374151" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Neural Network Health</CardTitle>
                  <CardDescription className="text-gray-400">Real-time AI system diagnostics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {aiPerformanceData.map((metric, index) => (
                    <div key={metric.metric} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{metric.metric}</span>
                        <span className="text-sm font-bold text-white">{metric.score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500" 
                          style={{
                            width: `${metric.score}%`,
                            backgroundColor: metric.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-rose-400" />
                  Predictive Analytics & Trends
                </CardTitle>
                <CardDescription className="text-gray-400">AI-powered forecasting and pattern analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={monthlyTrendData}>
                    <defs>
                      <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="cases" 
                      stackId="1"
                      stroke="#ef4444" 
                      fill="url(#colorCases)"
                      strokeWidth={2}
                      name="Cases Reported"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="recovered" 
                      stackId="2"
                      stroke="#10b981" 
                      fill="url(#colorRecovered)"
                      strokeWidth={2}
                      name="Cases Recovered"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Advanced CTA */}
        <Card className="mt-8 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-blue-900/30 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Advanced Intelligence System Ready
            </h3>
            <p className="text-blue-200/80 mb-6 max-w-2xl mx-auto">
              Leverage cutting-edge AI analytics and real-time surveillance networks to enhance your missing persons recovery operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Full Intelligence Report
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10">
                <Eye className="w-4 h-4 mr-2" />
                Access Live Command Center
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;