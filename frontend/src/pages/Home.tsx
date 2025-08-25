import Hero from "../components/common/Hero";
import Stats from "../components/common/Stats";
import Footer from "../components/common/Footer";
import Features from "../components/common/Features";
import EventsTypes from "../components/events/EventsTypes";
import Testimonial from "../components/common/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <Stats />

      {/* Testimonial Section */}
      <Testimonial />

      {/* Event Types Section */}
      <EventsTypes />

      {/* Footer */}
      <Footer />
    </div>
  );
}
