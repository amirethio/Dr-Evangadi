import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Activity,
  Heart,
  Shield,
  MessageCircle,
  Users,
  Award,
  Clock,
} from "lucide-react";
import ServiceCard from "../components/ServiceCard";
import Button from "../components/ui/Button";

const LandingPage = () => {
  const services = [
    {
      id: "diabetes",
      title: "Diabetes Risk Check",
      description:
        "Assess your risk factors for Type 2 diabetes using advanced AI analysis",
      icon: Activity,
      path: "/diabetes",
      gradient: "from-blue-500 to-teal-500",
    },
    {
      id: "heart",
      title: "Heart Disease Risk",
      description:
        "Evaluate cardiovascular health risks based on your lifestyle and metrics",
      icon: Heart,
      path: "/heart",
      gradient: "from-red-500 to-pink-500",
    },
    {
      id: "cancer",
      title: "Cancer Risk Assessment",
      description:
        "Screen for potential cancer risk factors with our comprehensive analysis",
      icon: Shield,
      path: "/cancer",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      id: "chat",
      title: "AI Health Assistant",
      description:
        "Chat with our AI assistant for personalized health guidance and support",
      icon: MessageCircle,
      path: "/",
      gradient: "from-green-500 to-teal-500",
      isChat: true,
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Users Helped" },
    { icon: Award, value: "80%", label: "Accuracy Rate" },
    { icon: Clock, value: "24/7", label: "Available Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-blue-50 to-teal-50 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-orange-200 mb-8">
            <Activity className="h-5 w-5 text-orange-800 mr-2" />
            <span className="text-sm font-medium text-orange-800">
              AI-Powered Health Predictions
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Dr. Evangadi
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your AI-powered health risk predictor. Get personalized insights
            about your health risks and take proactive steps towards a healthier
            future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              as={Link}
              to="/diabetes"
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              Check Your Risk
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200"
            >
              Learn More
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/80 rounded-lg mb-3">
                  <Icon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800">{value}</div>
                <div className="text-slate-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Comprehensive Health Risk Assessment
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-16">
            Our AI-powered tools help you understand your health risks and make
            informed decisions about your wellbeing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Why Choose Dr. Evangadi?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-16">
            Advanced AI technology meets compassionate healthcare to provide you
            with the most accurate and personalized health predictions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              Icon={Activity}
              title="AI-Powered Analysis"
              gradient="from-orange-500 to-blue-500"
              description="Our advanced machine learning algorithms analyze your health data to provide accurate risk assessments."
            />
            <Feature
              Icon={Shield}
              title="Secure & Private"
              gradient="from-teal-500 to-blue-500"
              description="Your health data is encrypted and secure. We prioritize your privacy and never share your information."
            />
            <Feature
              Icon={MessageCircle}
              title="24/7 Support"
              gradient="from-orange-500 to-teal-500"
              description="Our AI assistant is available around the clock to answer your questions and provide guidance."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Feature = ({ Icon, title, gradient, description }) => (
  <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
    <div
      className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
    >
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

export default LandingPage;
