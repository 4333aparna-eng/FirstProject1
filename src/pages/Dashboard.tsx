import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { TrendingUp, Clock, MapPin, Users, AlertTriangle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [liveData, setLiveData] = useState({ activeUsers: 1247, congestion: 65 });

  useEffect(() => {
    // Simulate real-time traffic updates
    const interval = setInterval(() => {
      setLiveData({
        activeUsers: Math.floor(1200 + Math.random() * 100),
        congestion: Math.floor(50 + Math.random() * 40)
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const trafficData = [
    { hour: "6 AM", congestion: 45, predicted: 42 },
    { hour: "9 AM", congestion: 85, predicted: 88 },
    { hour: "12 PM", congestion: 65, predicted: 63 },
    { hour: "3 PM", congestion: 70, predicted: 72 },
    { hour: "6 PM", congestion: 95, predicted: 93 },
    { hour: "9 PM", congestion: 40, predicted: 38 },
  ];

  const routeDistribution = [
    { name: "Fastest", value: 45, color: "hsl(217 91% 60%)" },
    { name: "Eco-Friendly", value: 35, color: "hsl(142 76% 36%)" },
    { name: "Cheapest", value: 20, color: "hsl(25 95% 53%)" },
  ];

  const weeklyTrends = [
    { day: "Mon", routes: 120, avgSpeed: 45 },
    { day: "Tue", routes: 145, avgSpeed: 42 },
    { day: "Wed", routes: 165, avgSpeed: 38 },
    { day: "Thu", routes: 155, avgSpeed: 40 },
    { day: "Fri", routes: 185, avgSpeed: 35 },
    { day: "Sat", routes: 95, avgSpeed: 52 },
    { day: "Sun", routes: 80, avgSpeed: 55 },
  ];

  const stats = [
    {
      title: "Active Routes",
      value: liveData.activeUsers.toLocaleString(),
      change: "+12.5%",
      icon: MapPin,
      color: "text-primary",
      live: true
    },
    {
      title: "Current Congestion",
      value: `${liveData.congestion}%`,
      change: liveData.congestion > 70 ? "High Traffic" : "Normal",
      icon: AlertTriangle,
      color: "text-accent",
      live: true
    },
    {
      title: "Peak Hour",
      value: "6-8 PM",
      change: "95% congestion",
      icon: Clock,
      color: "text-secondary"
    },
    {
      title: "Total Users",
      value: "12.4K",
      change: "+24.1%",
      icon: Users,
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">
              Urban <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-time analytics and ML-powered traffic predictions
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm text-muted-foreground">Live updates every 5 seconds</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-elevated transition-all relative overflow-hidden">
                  {stat.live && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Zap className="h-3 w-3" />
                        Live
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Traffic Congestion with ML Predictions */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Peak Traffic Hours</CardTitle>
                    <CardDescription>Actual vs ML-predicted congestion levels</CardDescription>
                  </div>
                  <Badge className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    AI Powered
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="hsl(142 76% 36%)" 
                      fill="hsl(142 76% 36% / 0.2)" 
                      strokeWidth={2}
                      name="ML Prediction"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="congestion" 
                      stroke="hsl(217 91% 60%)" 
                      fill="hsl(217 91% 60% / 0.2)" 
                      strokeWidth={2}
                      name="Actual"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Route Distribution */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Route Preferences</CardTitle>
                <CardDescription>Distribution of route type selections</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={routeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {routeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  {routeDistribution.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Trends */}
            <Card className="lg:col-span-2 shadow-card">
              <CardHeader>
                <CardTitle>Weekly Route Activity & Speed Analysis</CardTitle>
                <CardDescription>Routes planned and average speed per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem"
                      }}
                    />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="routes" 
                      stroke="hsl(142 76% 36%)" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(142 76% 36%)", r: 5 }}
                      name="Routes Planned"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="avgSpeed" 
                      stroke="hsl(25 95% 53%)" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(25 95% 53%)", r: 5 }}
                      name="Avg Speed (km/h)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
