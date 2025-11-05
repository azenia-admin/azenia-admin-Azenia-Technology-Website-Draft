import { ArrowRight } from 'lucide-react';

export default function Services() {
  const serviceCategories = [
    {
      title: "Consulting Services",
      services: [
        {
          name: "Salesforce CRM Solutions",
          description: "Comprehensive CRM implementation and optimization services to enhance customer relationships and drive sales growth."
        },
        {
          name: "Strategy Consulting",
          description: "Strategic guidance to align technology initiatives with business objectives and accelerate digital transformation."
        },
        {
          name: "Enterprise Architecture",
          description: "Design and implementation of scalable, robust enterprise solutions that support long-term business goals."
        },
        {
          name: "Project Management",
          description: "Expert project leadership ensuring on-time, on-budget delivery of complex technology initiatives."
        }
      ]
    },
    {
      title: "Managed Services",
      services: [
        {
          name: "IT Infrastructure Management",
          description: "Comprehensive management of IT infrastructure to ensure optimal performance, reliability, and security."
        },
        {
          name: "Cloud Services",
          description: "Cloud strategy, migration, and ongoing management to maximize efficiency and reduce costs."
        },
        {
          name: "Application Support",
          description: "Proactive monitoring and maintenance of business-critical applications to minimize downtime."
        },
        {
          name: "Security Operations",
          description: "24/7 security monitoring and incident response to protect your organization from cyber threats."
        }
      ]
    },
    {
      title: "Intelligence",
      services: [
        {
          name: "AI & ML",
          description: "Advanced artificial intelligence and machine learning solutions to automate processes and gain competitive insights."
        },
        {
          name: "DataTech & Analytics",
          description: "Transform data into actionable insights with advanced analytics and business intelligence solutions."
        },
        {
          name: "MarTech",
          description: "Marketing technology solutions to optimize campaigns, enhance customer engagement, and drive ROI."
        },
        {
          name: "Identity Management",
          description: "Comprehensive identity and access management solutions to secure user access across your organization."
        }
      ]
    },
    {
      title: "Risk & Security",
      services: [
        {
          name: "Cybersecurity",
          description: "Comprehensive security solutions to protect your organization from evolving cyber threats."
        },
        {
          name: "GRC & Compliance",
          description: "Governance, risk, and compliance services to meet regulatory requirements and reduce organizational risk."
        },
        {
          name: "Risk Assessment",
          description: "Thorough evaluation of security posture and vulnerabilities to inform risk mitigation strategies."
        },
        {
          name: "Penetration Testing / Threat Modeling",
          description: "Identify and remediate security vulnerabilities before they can be exploited by malicious actors."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-[#0d0d0d] to-gray-900 py-16 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Comprehensive technology solutions designed to transform your business and drive sustainable growth.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {serviceCategories.map((category, categoryIdx) => (
          <section key={categoryIdx} className="mb-20 last:mb-0">
            {categoryIdx > 0 && (
              <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-purple-600 to-blue-900 mb-20"></div>
            )}
            <h2 className="text-3xl font-bold text-white mb-12 pb-4 border-b-2 border-blue-500">
              {category.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.services.map((service, serviceIdx) => (
                <div key={serviceIdx} className="group">
                  <a href="#" className="block p-6 -m-6 rounded-lg transition-all duration-700 hover:bg-white/5 hover:backdrop-blur-md border border-transparent hover:border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-700 flex items-start">
                      <span>{service.name}</span>
                      <ArrowRight className="w-4 h-4 ml-2 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Knowledge and Expertise Section */}
      <section id="industry-solutions" className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Our knowledge & expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* First row: Description text (2 cols) + 2 tiles */}
            <div className="lg:col-span-2 flex items-center h-[120px]">
              <p className="text-lg text-gray-300 leading-relaxed">
                Beacon Hill recruiters are professionals, highly qualified to help you find the talent you need to grow your business.
              </p>
            </div>
            <div className="group bg-[#1e3a8a] text-white p-6 rounded-lg transition-all duration-700 hover:bg-white/10 hover:backdrop-blur-md border border-[#1e3a8a] hover:border-blue-400 cursor-pointer h-[120px] flex flex-col justify-between">
              <h3 className="font-semibold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Administrative & Professional</h3>
              <div className="flex justify-end">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-700" />
              </div>
            </div>
            <div className="group bg-[#1e3a8a] text-white p-6 rounded-lg transition-all duration-700 hover:bg-white/10 hover:backdrop-blur-md border border-[#1e3a8a] hover:border-blue-400 cursor-pointer h-[120px] flex flex-col justify-between">
              <h3 className="font-semibold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Digital & Creative</h3>
              <div className="flex justify-end">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-700" />
              </div>
            </div>

            {/* Second row: 4 tiles */}
            {[
              'Financial',
              'Government',
              'Healthcare',
              'Human Resources'
            ].map((industry, index) => (
              <div
                key={index}
                className="group bg-[#1e3a8a] text-white p-6 rounded-lg transition-all duration-700 hover:bg-white/10 hover:backdrop-blur-md border border-[#1e3a8a] hover:border-blue-400 cursor-pointer h-[120px] flex flex-col justify-between"
              >
                <h3 className="font-semibold text-lg" style={{ fontFamily: 'Georgia, serif' }}>{industry}</h3>
                <div className="flex justify-end">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-700" />
                </div>
              </div>
            ))}

            {/* Third row: 4 tiles */}
            {[
              'Legal',
              'Life Sciences',
              'National Security',
              'Technology'
            ].map((industry, index) => (
              <div
                key={index}
                className="group bg-[#1e3a8a] text-white p-6 rounded-lg transition-all duration-700 hover:bg-white/10 hover:backdrop-blur-md border border-[#1e3a8a] hover:border-blue-400 cursor-pointer h-[120px] flex flex-col justify-between"
              >
                <h3 className="font-semibold text-lg" style={{ fontFamily: 'Georgia, serif' }}>{industry}</h3>
                <div className="flex justify-end">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#0d0d0d] py-16 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Industry Expertise
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Deep knowledge across multiple industries with proven track records of delivering successful outcomes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Tailored Solutions
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Customized approaches designed specifically for your unique business challenges and objectives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Committed Partnership
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Long-term relationships built on trust, transparency, and a shared commitment to your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Partner With Us
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Let's discuss how our services can help your organization achieve its goals.
          </p>
          <button onClick={() => onNavigate?.('partner')} className="px-8 py-4 bg-white text-blue-600 font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center space-x-2 rounded">
            <span>Get Customized Support</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
