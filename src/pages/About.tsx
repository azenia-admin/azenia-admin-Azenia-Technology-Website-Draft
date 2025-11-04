import {
  Award,
  Target,
  Users,
  Zap,
  Heart,
  TrendingUp,
  Shield,
  Cloud
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Client-Focused",
      description: "Your success is our success. We're committed to delivering solutions that drive real business results."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation First",
      description: "We stay ahead of technology trends to provide cutting-edge solutions that give you a competitive advantage."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality & Security",
      description: "We never compromise on quality or security. Every solution is built to enterprise standards."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "People Matter",
      description: "We invest in our team and foster a culture of collaboration, growth, and excellence."
    }
  ];

  const milestones = [
    { year: "2009", event: "Founded", description: "Started with a vision to transform businesses through technology" },
    { year: "2012", event: "50 Projects", description: "Reached milestone of 50 successful project deliveries" },
    { year: "2015", event: "Global Expansion", description: "Expanded operations across multiple countries" },
    { year: "2018", event: "Salesforce Partner", description: "Achieved Salesforce consulting partner status" },
    { year: "2020", event: "100+ Team", description: "Grew team to over 100 talented professionals" },
    { year: "2023", event: "Ridge Track", description: "Joined Salesforce Ridge Partner track" },
    { year: "2025", event: "500+ Projects", description: "Delivered 500+ successful projects across industries" }
  ];

  const leadership = [
    {
      name: "Sherjil Baig",
      role: "Chief Executive Officer & Co-Founder",
      bio: "10+ years of technology leadership experience"
    },
    {
      name: "Michael Wright",
      role: "Chief Operations Officer",
      bio: "Expert in enterprise architecture and Salesforce solutions"
    },
    {
      name: "Samya Pasha",
      role: "Vice President - Data & Analytics & Co-Founder",
      bio: "Transforming data into actionable intelligence."
    },
    {
      name: "Ahmad Abdullah",
      role: "VP of Client Success",
      bio: "Ensuring exceptional client experiences and outcomes"
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
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Salesforce Ridge Partner Track</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About AzeniaTechnology
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Your preferred consulting service for innovative technology solutions. We're transforming businesses through Salesforce excellence and comprehensive technology services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage. We're committed to delivering excellence in every engagement.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-12">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-white mb-6">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To be the most trusted technology partner for enterprises worldwide, recognized for our Salesforce expertise, innovation, and commitment to client success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              15+ years of growth, innovation, and success.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-orange-400 hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 lg:text-right">
                    {index % 2 === 0 && (
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-md">
                        <p className="text-3xl font-bold text-blue-400 mb-2">
                          {milestone.year}
                        </p>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {milestone.event}
                        </h3>
                        <p className="text-gray-300">{milestone.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 shadow-lg z-10"></div>
                  </div>

                  <div className="flex-1">
                    {index % 2 !== 0 && (
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 shadow-md">
                        <p className="text-3xl font-bold text-blue-400 mb-2">
                          {milestone.year}
                        </p>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {milestone.event}
                        </h3>
                        <p className="text-gray-300">{milestone.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Leadership
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Meet the team driving our vision forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {leader.name}
                </h3>
                <p className="text-blue-400 font-semibold mb-3">{leader.role}</p>
                <p className="text-gray-300 text-sm">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <Cloud className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <p className="text-5xl font-bold mb-2">500+</p>
              <p className="text-blue-100">Projects Delivered</p>
            </div>
            <div>
              <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-blue-100">Enterprise Clients</p>
            </div>
            <div>
              <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-blue-100">Years Experience</p>
            </div>
            <div>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="text-blue-100">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
