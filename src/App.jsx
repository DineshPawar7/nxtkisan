import React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Sidebar from "./components/Sidebar";
import Advertisement from "./components/Advertisement";
import Chatbot from "./pages/Chatbot";
import MandiBhav from "./pages/MandiBhav";
import Profile from "./pages/Profile";
import Login from "./auth/Login";
import Register from "./auth/Register";

// Animation wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Feed /></PageWrapper>} />
        <Route path="/create" element={<PageWrapper><CreatePost /></PageWrapper>} />
        <Route path="/chatbot" element={<PageWrapper><Chatbot /></PageWrapper>} />
        <Route path="/mandibhav" element={<PageWrapper><MandiBhav /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
};

// Motion wrapper for smooth transition
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Advertisement />
      <div className="flex-1">
        <AnimatedRoutes />
      </div>
    </div>
  );
}

export default App;
