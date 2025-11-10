import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map, BarChart3, Route, User, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Navigation = () => {
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const navLinks = [
    { path: "/", label: "Home", icon: Map },
    { path: "/routes", label: "Smart Routes", icon: Route },
    { path: "/dashboard", label: "Insights", icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="GeoSense Logo" className="h-10 w-10 transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold gradient-text">GeoSense</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around mt-3 pt-3 border-t border-border">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="gap-1 flex-col h-auto py-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{link.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
