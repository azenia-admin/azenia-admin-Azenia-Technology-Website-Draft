import {
  Building2,
  Heart,
  ShoppingBag,
  Factory,
  GraduationCap,
  Landmark,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function Industries() {
  const industries = [
    {
      icon: <Landmark className="w-10 h-10" />,
      title: "Financial Services",
      description: "Transform banking and fintech operations with secure, scalable solutions",
      solutions: [
        "Core Banking Modernization",
        "Payment Processing Systems",
        "Risk Management Platforms",
        "Regulatory Compliance Solutions"
      ],
      stats: { clients: "15+", projects: "120+" }
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Healthcare",
      description: "Improve patient care with innovative healthcare technology solutions",
      solutions: [
        "Electronic Health Records",
        "Patient Management Systems",
        "Telemedicine Platforms",
        "HIPAA Compliance Solutions"
      ],
      stats: { clients: "20+", projects: "85+" }
    },
    {
      icon: <ShoppingBag className="w-10 h-10" />,
      title: "Retail & E-commerce",
      description: "Drive sales and customer engagement with modern retail solutions",
      solutions: [
        "E-commerce Platforms",
        "Inventory Management",
        "Customer Experience Solutions",
        "Omnichannel Integration"
      ],
      stats: { clients: "30+", projects: "150+" }
    },
    {
      icon: <Factory className="w-10 h-10" />,
      title: "Manufacturing",
      description: "Optimize production and supply chain with Industry 4.0 solutions",
      solutions: [
        "IoT & Smart Manufacturing",
        "Supply Chain Optimization",
        "Quality Management Systems",
        "Predictive Maintenance"
      ],
      stats: { clients: "12+", projects: "75+" }
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: "Education",
      description: "Enhance learning experiences with digital education platforms",
      solutions: [
        "Learning Management Systems",
        "Student Information Systems",
        "Virtual Classroom Solutions",
        "Educational Analytics"
      ],
      stats: { clients: "18+", projects: "65+" }
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "Professional Services",
      description: "Streamline operations for consulting, legal, and accounting firms",
      solutions: [
        "Project Management Tools",
        "Client Relationship Management",
        "Billing & Time Tracking",
        "Document Management"
      ],
      stats: { clients: "25+", projects: "95+" }
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
              Industries We Serve
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Deep industry expertise combined with cutting-edge technology to solve your unique business challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {industry.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {industry.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {industry.description}
                </p>

                {/* Solutions List */}
                <div className="space-y-3 mb-6">
                  {industry.solutions.map((solution, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{solution}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 pt-6 border-t border-gray-700">
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{industry.stats.clients}</p>
                    <p className="text-xs text-gray-400">Clients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{industry.stats.projects}</p>
                    <p className="text-xs text-gray-400">Projects</p>
                  </div>
                </div>

                <button className="mt-6 text-blue-400 font-semibold flex items-center space-x-2 group-hover:space-x-3 transition-all">
                  <span>View case studies</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Industry Expertise Matters
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our deep understanding of industry-specific challenges allows us to deliver solutions that truly make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Compliance Ready</h3>
              <p className="text-gray-300">
                Solutions built with industry regulations and compliance requirements in mind.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Best Practices</h3>
              <p className="text-gray-300">
                Leverage proven methodologies and frameworks specific to your industry.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Faster Delivery</h3>
              <p className="text-gray-300">
                Industry expertise accelerates development and reduces time to market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how our industry expertise can help your business thrive.
          </p>
          <button className="px-8 py-4 rounded-lg font-bold transition-all shadow-2xl hover:scale-105 inline-flex items-center space-x-2" style={{ backgroundColor: '#deeefe', color: '#014171' }}>
            <span>Contact Us</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
