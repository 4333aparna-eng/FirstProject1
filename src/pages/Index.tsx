import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-city.jpg";
import { ArrowRight, Zap, Leaf, TrendingUp, MapPin, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Fastest Route",
      description: "AI-optimized paths that get you there in record time",
      color: "text-primary"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Reduce carbon footprint with sustainable route options",
      color: "text-secondary"
    },
    {
      icon: DollarSign,
      title: "Cost Efficient",
      description: "Save money with optimal fuel consumption routes",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "ML-powered traffic forecasts and congestion alerts",
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Live Traffic",
      description: "Real-time traffic updates and incident reporting",
      color: "text-secondary"
    },
    {
      icon: Clock,
      title: "Peak Time Insights",
      description: "Data-driven insights on optimal travel times",
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Smart Urban <span className="gradient-text">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Navigate cities smarter with AI-powered routing, real-time traffic analytics, 
                and predictive insights. Choose from fastest, eco-friendly, or cost-efficient routes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/routes">
                  <Button size="lg" className="gap-2 group">
                    Get Started
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline">
                    View Insights
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
              <img 
                src={heroImage} 
                alt="Smart City Analytics" 
                className="relative rounded-2xl shadow-elevated w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why Choose <span className="gradient-text">GeoSense</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced machine learning meets urban mobility for smarter city navigation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50"
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero text-primary-foreground overflow-hidden">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Transform Your Commute?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Join thousands using GeoSense for smarter, faster, and greener urban navigation
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="gap-2">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>© 2025 GeoSense. Powered by AI for Urban Mobility.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
