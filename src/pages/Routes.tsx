import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { Zap, Leaf, DollarSign, Navigation as NavigationIcon, Clock, TrendingUp, Save, Sparkles, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RouteOption {
  type: "fastest" | "eco" | "cheapest";
  icon: any;
  color: string;
  distance: string;
  duration: string;
  cost: string;
  ecoScore: number;
  trafficLevel: "Low" | "Medium" | "High";
}

const Routes = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [showRoutes, setShowRoutes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const routeOptions: RouteOption[] = [
    {
      type: "fastest",
      icon: Zap,
      color: "text-primary border-primary",
      distance: "12.4 km",
      duration: "18 min",
      cost: "$4.20",
      ecoScore: 65,
      trafficLevel: "Medium"
    },
    {
      type: "eco",
      icon: Leaf,
      color: "text-secondary border-secondary",
      distance: "14.1 km",
      duration: "22 min",
      cost: "$3.50",
      ecoScore: 92,
      trafficLevel: "Low"
    },
    {
      type: "cheapest",
      icon: DollarSign,
      color: "text-accent border-accent",
      distance: "13.2 km",
      duration: "20 min",
      cost: "$3.10",
      ecoScore: 78,
      trafficLevel: "Low"
    }
  ];

  const handlePlanRoute = async () => {
    if (origin && destination) {
      setLoading(true);
      try {
        // Get traffic prediction
        const { data: predictionData, error: predError } = await supabase.functions.invoke('predict-traffic', {
          body: { origin, destination, currentTime: new Date().toISOString() }
        });

        if (predError) throw predError;
        
        setPrediction(predictionData);
        setShowRoutes(true);
        toast.success('Routes generated with AI prediction!');
      } catch (error: any) {
        console.error('Prediction error:', error);
        toast.error(error.message || 'Failed to generate predictions');
        setShowRoutes(true); // Show routes anyway
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveRoute = async (route: RouteOption) => {
    if (!user) {
      toast.error('Please sign in to save routes');
      navigate('/auth');
      return;
    }

    try {
      const { error } = await supabase.from('route_history').insert({
        user_id: user.id,
        origin,
        destination,
        route_type: route.type,
        distance: route.distance,
        duration: route.duration,
        cost: route.cost,
        eco_score: route.ecoScore,
        traffic_level: route.trafficLevel
      });

      if (error) throw error;
      
      toast.success('Route saved to history!');
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to save route');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">
              Smart <span className="gradient-text">Route Planner</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Get optimized routes with AI-powered insights
            </p>
          </div>

          {/* Route Input Card */}
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <NavigationIcon className="h-5 w-5 text-primary" />
                Plan Your Journey
              </CardTitle>
              <CardDescription>
                Enter your origin and destination to discover optimal routes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input
                    id="origin"
                    placeholder="e.g., Downtown Station"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., City Airport"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={handlePlanRoute} 
                className="w-full"
                size="lg"
                disabled={!origin || !destination || loading}
              >
                {loading ? 'Analyzing...' : 'Find Routes'}
              </Button>
            </CardContent>
          </Card>

          {/* AI Prediction Alert */}
          {showRoutes && prediction && (
            <Alert className="animate-fade-in border-primary/50 bg-primary/5">
              <Sparkles className="h-5 w-5 text-primary" />
              <AlertDescription className="ml-2">
                <div className="space-y-2">
                  <p className="font-semibold">AI Traffic Prediction</p>
                  <p className="text-sm">
                    <strong>Congestion:</strong> {prediction.congestionLevel}% 
                    <span className="ml-2 text-muted-foreground">
                      (Confidence: {Math.round(prediction.confidence * 100)}%)
                    </span>
                  </p>
                  <p className="text-sm"><strong>Factors:</strong> {prediction.factors?.join(', ')}</p>
                  <p className="text-sm text-accent"><strong>Recommendation:</strong> {prediction.recommendation}</p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Route Results */}
          {showRoutes && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-center">Available Routes</h2>
              
              <div className="grid gap-6">
                {routeOptions.map((route) => {
                  const Icon = route.icon;
                  return (
                    <Card key={route.type} className={`hover:shadow-elevated transition-all border-2 ${route.color}`}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg bg-background ${route.color}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <CardTitle className="capitalize">{route.type} Route</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Clock className="h-3 w-3" />
                                {route.duration} • {route.distance}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant={route.trafficLevel === "High" ? "destructive" : route.trafficLevel === "Medium" ? "default" : "secondary"}>
                            Traffic: {route.trafficLevel}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Cost</p>
                            <p className="text-lg font-semibold">{route.cost}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Eco Score</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-secondary rounded-full transition-all"
                                  style={{ width: `${route.ecoScore}%` }}
                                />
                              </div>
                              <span className="text-lg font-semibold">{route.ecoScore}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">ETA</p>
                            <p className="text-lg font-semibold flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-primary" />
                              {route.duration}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <Button variant="outline" onClick={() => handleSaveRoute(route)}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Route
                          </Button>
                          <Button>Select Route</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Routes;
