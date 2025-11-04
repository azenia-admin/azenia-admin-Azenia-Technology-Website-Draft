import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Users,
  TrendingUp,
  Heart,
  Zap,
  Award,
  Coffee
} from 'lucide-react';

export default function Careers() {
  const openPositions = [
    {
      title: "Senior Salesforce Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Lead Salesforce implementations for enterprise clients on our Ridge Partner track."
    },
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build scalable web applications using modern JavaScript frameworks and cloud technologies."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Design and implement CI/CD pipelines and cloud infrastructure automation."
    },
    {
      title: "Cybersecurity Analyst",
      department: "Security",
      location: "Remote",
      type: "Full-time",
      description: "Conduct security assessments and implement enterprise security solutions."
    },
    {
      title: "Solutions Architect",
      department: "Consulting",
      location: "Remote",
      type: "Full-time",
      description: "Design enterprise solutions and guide technical implementations for clients."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description: "Drive product strategy and roadmap for our technology platforms."
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance for you and your family"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Continuous learning opportunities with training budgets and certifications"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Great Culture",
      description: "Collaborative environment with talented professionals and regular team events"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Work-Life Balance",
      description: "Flexible work arrangements and generous PTO to maintain healthy balance"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Competitive Pay",
      description: "Industry-leading compensation packages with performance bonuses"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Remote First",
      description: "Work from anywhere with home office setup stipend and coworking access"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-[#0d0d0d] to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8">
              Build your career with a team that's transforming businesses through technology and innovation.
            </p>
            <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-all shadow-2xl hover:scale-105 inline-flex items-center space-x-2">
              <span>View Open Positions</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Join AzeniaTechnology?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're building something special, and we want you to be part of it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Find your next opportunity and grow your career with us.
            </p>
          </div>

          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {position.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {position.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm">{position.department}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{position.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{position.type}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all whitespace-nowrap flex items-center space-x-2 group-hover:scale-105">
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
                150+
              </p>
              <p className="text-gray-400 font-medium">Team Members</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
                20+
              </p>
              <p className="text-gray-400 font-medium">Countries</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
                15
              </p>
              <p className="text-gray-400 font-medium">Years Growing</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
                95%
              </p>
              <p className="text-gray-400 font-medium">Retention Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Don't See a Perfect Fit?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-50 transition-all shadow-2xl hover:scale-105 inline-flex items-center space-x-2">
            <span>Submit Your Resume</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
