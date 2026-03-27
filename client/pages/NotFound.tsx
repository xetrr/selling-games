import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center space-y-6 py-20">
        <h1 className="text-6xl md:text-7xl font-black text-primary">404</h1>
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Sorry! The page you're looking for doesn't exist. Let's get you back on track.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-primary/20"
        >
          Back to Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
