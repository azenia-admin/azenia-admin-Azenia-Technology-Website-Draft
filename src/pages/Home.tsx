import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { supabase, ClientLogo } from '../lib/supabase';

export default function Home() {
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);

  const stats = [
    { value: '25+', label: 'Years of Experience' },
    { value: '500+', label: 'Client Engagements' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Industry Awards' }
  ];

  useEffect(() => {
    const fetchLogos = async () => {
      const { data, error } = await supabase
        .from('client_logos')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (!error && data) {
        setClientLogos(data);
      }
    };

    fetchLogos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-[#0d0d0d] to-gray-900 pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left side - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Business professional"
                  className="shadow-2xl w-full h-auto"
                />
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-600 opacity-20 blur-2xl"></div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Workforce solutions, professional services and people <span className="text-blue-400 italic">working together</span>
              </h1>

              {/* Action Boxes */}
              <div className="grid sm:grid-cols-2 gap-4 mt-12">
                {/* Find Business Solutions Box */}
                <Link
                  to="/our-services"
                  className="group relative bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden block"
                >
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    <div className="w-20 h-20 border-4 border-blue-400 transform rotate-45"></div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Find Business Solutions</h3>
                    <ArrowRight className="w-6 h-6 mb-6 group-hover:translate-x-2 transition-transform" />
                    <p className="text-blue-200 text-sm">
                      Project consulting. Hire and engage talent.
                    </p>
                  </div>
                </Link>

                {/* Find Career Opportunities Box */}
                <Link
                  to="/careers"
                  className="group relative bg-gradient-to-br from-blue-600 to-blue-500 text-white p-8 text-left hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden block"
                >
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    <div className="w-16 h-16 bg-blue-300"></div>
                    <div className="w-12 h-12 bg-blue-400 absolute top-4 left-6"></div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Find Career Opportunities</h3>
                    <ArrowRight className="w-6 h-6 mb-6 group-hover:translate-x-2 transition-transform" />
                    <p className="text-blue-200 text-sm">
                      Partners in your career. Search our available jobs.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Carousel */}
      <section className="py-16 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-white text-2xl font-semibold mb-8">Trusted by Leading Organizations</h3>
          {clientLogos.length > 0 ? (
            <div className="relative">
              <div className="flex animate-scroll">
                {/* First set of logos */}
                <div className="flex items-center space-x-16 min-w-full">
                  {clientLogos.map((logo) => (
                    <div key={logo.id} className="flex-shrink-0 w-48 h-24 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20 p-4">
                      <img
                        src={logo.logo_url}
                        alt={logo.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex items-center space-x-16 min-w-full">
                  {clientLogos.map((logo) => (
                    <div key={`dup-${logo.id}`} className="flex-shrink-0 w-48 h-24 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20 p-4">
                      <img
                        src={logo.logo_url}
                        alt={logo.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>No client logos available yet. Add them from the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* Our Founding Section */}
      <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <h3 className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-4">
                OUR FOUNDING
              </h3>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                Azenia Technology Group
              </h2>

              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Derived from the Greek word Xenia (ξενία) — the ancient principle of hospitality and mutual respect — Azenia embodies the spirit of partnership, trust, and collaboration.
                </p>
                <p>
                  Azenia Technology Group was founded by a team of visionary leaders from across the Information Technology landscape, united by a shared mission: to deliver innovative, purpose-built solutions while honoring the timeless value of genuine relationships.
                </p>
                <p>
                  With over a 3 decades of collective expertise spanning research and analysis, implementation, integration, and long-term system support, we take pride in delivering tailored, end-to-end experiences that empower our public- and private-sector partners to thrive in an ever-evolving digital world.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/about"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors rounded"
                >
                  Capabilities
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors rounded"
                >
                  Highlights
                </Link>
                <Link
                  to="/partner"
                  className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white font-medium transition-colors rounded"
                >
                  Partner with Us!
                </Link>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8368353/pexels-photo-8368353.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Molecular structure"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-orange-400 uppercase tracking-wide">
              CAPABILITIES
            </h2>
            <Link
              to="/our-services"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors rounded"
            >
              Learn More About What We Have to Offer Here at Azenia!
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Digital Modernization Card */}
            <div className="bg-white group hover:shadow-xl transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Digital Modernization"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Consulting</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Transformation of Digital Experiences through Human-Centered design principles, Agile Product Management, and Delivery Methodologies
                </p>
              </div>
            </div>

            {/* Project Management Card */}
            <div className="bg-white group hover:shadow-xl transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Project Management"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Staffing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Waterfall , Agile, Scaled Agile and more. Count on us to provide you the right guidance on how to meet your Project Management goals.
                </p>
              </div>
            </div>

            {/* Cyber Security Card */}
            <div className="bg-white group hover:shadow-xl transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Cyber Security"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Managed Services</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Protecting your infrastructure, your applications and your data. Preventing security breaches to your company is our goal.
                </p>
              </div>
            </div>

            {/* Datatech & Analytics Card */}
            <div className="bg-white group hover:shadow-xl transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Datatech & Analytics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Training</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Data-Driven Intelligent Solutions to produce valuable insights from large and complex data sets. Let us identify where your company can grow most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries/Knowledge Section */}
      <section className="py-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-900 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-800 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our knowledge and expertise
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
              We offer a complete suite of workforce solutions, specialized consulting and staffing services to clients across market sectors, industries and professional skill sets.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              'Administrative & Professional',
              'Digital & Creative',
              'Financial',
              'Government Services',
              'Healthcare',
              'Human Resources',
              'Legal',
              'Life Sciences',
              'National Security',
              'Technology'
            ].map((industry, index) => (
              <Link
                key={index}
                to="/industries"
                className="group bg-blue-600 hover:bg-blue-700 text-white p-6 text-left transition-all hover:shadow-lg block"
              >
                <h3 className="font-semibold text-lg mb-2">{industry}</h3>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/our-services"
              className="group bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 text-left hover:shadow-2xl transition-all block"
            >
              <h3 className="text-2xl font-bold mb-3">Azenia Services</h3>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/partner"
              className="group bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 text-left hover:shadow-2xl transition-all block"
            >
              <h3 className="text-2xl font-bold mb-3">Partner With Us</h3>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise Solutions Section */}
      <section className="py-24 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-96 opacity-20">
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Team collaboration"
            className="w-full h-full object-cover rounded-l-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Need enterprise-wide integrated talent solutions such as MSP, VMS, RPO, and direct sourcing?
            </h2>
            <button className="px-8 py-4 bg-white text-blue-900 font-semibold hover:bg-blue-50 transition-colors inline-flex items-center space-x-2">
              <span>Managed Services and Workforce Solutions</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose AzeniaTechnology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Partner with a trusted leader in technology consulting and digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 text-blue-400 mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Proven Expertise</h3>
              <p className="text-gray-300 leading-relaxed">
                Over 25 years of experience delivering successful technology solutions across diverse industries.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 text-blue-400 mb-4">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Client-Centric Approach</h3>
              <p className="text-gray-300 leading-relaxed">
                Dedicated to understanding your unique needs and delivering solutions that exceed expectations.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 text-blue-400 mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Measurable Results</h3>
              <p className="text-gray-300 leading-relaxed">
                Focus on delivering tangible outcomes that drive business growth and operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Let's discuss how our expertise can help you achieve your technology goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 font-medium transition-colors flex items-center justify-center space-x-2">
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-white hover:bg-white/10 text-white font-medium transition-colors">
              View Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
