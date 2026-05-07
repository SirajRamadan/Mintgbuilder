import { useState, useEffect } from "react";
import { Route, Switch, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { LoadingScreen } from "./components/LoadingScreen";
import { Landing } from "./pages/Landing";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { Builder } from "./pages/Builder";
import { Pricing } from "./pages/Pricing";
import { Templates } from "./pages/Templates";
import "./styles.css";

function AppRoutes() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/builder/:id" component={Builder} />
        <Route path="/builder" component={Builder} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/templates" component={Templates} />
        <Route>
          <div className="min-h-screen flex items-center justify-center" style={{ background: "#050508" }}>
            <div className="text-center">
              <div className="text-6xl font-bold gradient-text mb-4" style={{ fontFamily: "Clash Display, sans-serif" }}>404</div>
              <p style={{ color: "rgba(255,255,255,0.5)" }}>Page not found</p>
              <a href="#/" className="inline-block mt-4 btn-primary px-6 py-2.5 rounded-xl text-sm">Go Home</a>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  // Auto-complete loader after 3s max regardless
  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 3200);
    return () => clearTimeout(t);
  }, []);

  if (showLoader) {
    return <LoadingScreen onComplete={() => setShowLoader(false)} />;
  }

  return <AppRoutes />;
}
