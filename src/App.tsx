import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./pages/Home";
import Subscribe from "./pages/Subscribe";
// import Signup from "./pages/Signup";
// import Signin from "./pages/Signin";
// import Dashboard from "./pages/Dashboard";
import Faq from "./pages/Faq";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import BookCallForm from "./components/BookCallForm";
import CallHistory from "./components/CallHistory";
import Profile from "./pages/Profile";
import Recipients from "./pages/Recipients";
import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
import FloatingContactButton from "./components/FloatingContactButton";
import type { User } from "./utils/type";
import { useEffect, useState } from "react";
import NewsletterModal from "./components/NewsletterModal";



function App() {


  const [user, setUser] = useState<User | null>(null);
  const [showNewsletter, setShowNewsletter] = useState<boolean>(false);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);


  useEffect(() => {
    const hasSeenNewsletter = localStorage.getItem("newsletter_seen");

    if (hasSeenNewsletter) return;

    const timer = setTimeout(() => {
      setShowNewsletter(true);
      localStorage.setItem("newsletter_seen", "true");
    }, 5000); // ⏱️ 5 seconds

    return () => clearTimeout(timer);
  }, []);


  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow min-h-[90vh] pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subscribe" element={<Subscribe />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/faqs" element={<Faq />} />
            <Route
              path="/login"
              element={<Login setUser={setUser} />}
            />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/signin" element={<Signin />} /> */}

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="book" element={<BookCallForm />} />
              <Route path="history" element={<CallHistory />} />
              <Route path="recipients" element={<Recipients />} />
              <Route path="profile" element={<Profile />} />
            </Route>

          </Routes>
        </main>
        <Footer />
        <FloatingContactButton />


        <NewsletterModal
          open={showNewsletter}
          onClose={() => setShowNewsletter(false)}
        />


        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              color: "#fff",
              padding: "14px 18px",
              fontSize: "14px",
              border: "1px solid rgba(255,255,255,0.1)",
            },

            // SUCCESS
            success: {
              style: {
                background: "rgba(22, 163, 74, 0.7)",
                boxShadow: "0 0 15px rgba(22, 163, 74, 0.6)",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "transparent",
              },
            },

            // ERROR
            error: {
              style: {
                background: "rgba(220, 38, 38, 0.7)",
                boxShadow: "0 0 15px rgba(220, 38, 38, 0.6)",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "transparent",
              },
            },
          }}
        />

      </div>
    </Router>
  );
}

export default App;
