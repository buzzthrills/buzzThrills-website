import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./pages/Home";
import Subscribe from "./pages/Subscribe";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
// import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow min-h-[90vh] pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subscribe" element={<Subscribe />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

          </Routes>
        </main>
        <Footer />
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
