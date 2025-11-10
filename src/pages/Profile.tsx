import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Shield, Download, FileText, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);
      loadRouteHistory(user.id);
      setLoading(false);
    };

    getUser();
  }, [navigate]);

  const loadRouteHistory = async (userId: string) => {
    const { data, error } = await supabase
      .from('route_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error loading routes:', error);
      return;
    }

    setRoutes(data || []);
  };

  const handleGenerateReport = async (format: 'csv' | 'json') => {
    if (!user) return;

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-report', {
        body: { userId: user.id, format }
      });

      if (error) throw error;

      if (format === 'csv') {
        // Download CSV
        const blob = new Blob([data.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.filename;
        a.click();
        toast.success('CSV report downloaded!');
      } else {
        // Show JSON report summary
        toast.success('Report generated! Check console for details.');
        console.log('Report:', data);
      }
    } catch (error: any) {
      console.error('Report error:', error);
      toast.error(error.message || 'Failed to generate report');
    } finally {
      setGenerating(false);
    }
  };

  const handleDeleteRoute = async (routeId: string) => {
    try {
      const { error } = await supabase
        .from('route_history')
        .delete()
        .eq('id', routeId);

      if (error) throw error;

      setRoutes(routes.filter(r => r.id !== routeId));
      toast.success('Route deleted!');
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete route');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold">
              Your <span className="gradient-text">Profile</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your GeoSense account and route history
            </p>
          </div>

          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your GeoSense account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Calendar className="h-5 w-5 text-secondary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Shield className="h-5 w-5 text-accent" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Account Status</p>
                  <Badge variant="secondary" className="mt-1">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Usage Statistics</CardTitle>
                  <CardDescription>Your GeoSense activity overview</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleGenerateReport('csv')}
                    disabled={generating || routes.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleGenerateReport('json')}
                    disabled={generating || routes.length === 0}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{routes.length}</p>
                  <p className="text-sm text-muted-foreground">Routes Saved</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-secondary">
                    {routes.reduce((sum, r) => sum + parseFloat(r.distance || '0'), 0).toFixed(1)} km
                  </p>
                  <p className="text-sm text-muted-foreground">Total Distance</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-accent">
                    ${routes.reduce((sum, r) => sum + parseFloat(r.cost?.replace('$', '') || '0'), 0).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Recent Route History</h3>
                {routes.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No routes saved yet. Start planning routes to see them here!</p>
                ) : (
                  routes.map((route) => (
                    <Card key={route.id} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <p className="font-medium">{route.origin} → {route.destination}</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="capitalize">{route.route_type}</span>
                              <span>•</span>
                              <span>{route.distance}</span>
                              <span>•</span>
                              <span>{route.duration}</span>
                              <span>•</span>
                              <Badge variant={route.traffic_level === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                                {route.traffic_level}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(route.created_at).toLocaleString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteRoute(route.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
