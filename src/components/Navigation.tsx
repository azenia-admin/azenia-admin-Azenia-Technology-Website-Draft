import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, ArrowRight } from 'lucide-react';

interface SubmenuSection {
  title: string;
  items: { label: string; href: string; description?: string }[];
}

interface NavItem {
  label: string;
  href: string;
  submenu?: {
    tabs: { label: string; href: string }[];
    sections: SubmenuSection[];
  };
}

export default function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [exitingDropdown, setExitingDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [closeTimeout, setCloseTimeout] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: NavItem[] = [
    {
      label: 'Solutions',
      href: '/our-services',
      submenu: {
        tabs: [
          { label: 'Our Services', href: '/our-services' },
          { label: 'Why Choose Us', href: '/about' },
          { label: 'Partner With Us', href: '/partner' }
        ],
        sections: [
          {
            title: 'Consulting Services',
            items: [
              { label: 'Salesforce CRM Solutions', href: '/our-services' },
              { label: 'Strategy Consulting', href: '/our-services' },
              { label: 'Enterprise Architecture', href: '/our-services' },
              { label: 'Project Management', href: '/our-services' }
            ]
          },
          {
            title: 'Managed Services',
            items: [
              { label: 'IT Infrastructure Management', href: '/our-services' },
              { label: 'Cloud Services', href: '/our-services' },
              { label: 'Application Support', href: '/our-services' },
              { label: 'Security Operations', href: '/our-services' }
            ]
          },
          {
            title: 'Intelligence',
            items: [
              { label: 'AI & ML', href: '/our-services' },
              { label: 'DataTech & Analytics', href: '/our-services' },
              { label: 'MarTech', href: '/our-services' },
              { label: 'Identity Management', href: '/our-services' }
            ]
          },
          {
            title: 'Risk & Security',
            items: [
              { label: 'Cybersecurity', href: '/our-services' },
              { label: 'GRC & Compliance', href: '/our-services' },
              { label: 'Risk Assessment', href: '/our-services' },
              { label: 'Penetration Testing / Threat Modeling', href: '/our-services' }
            ]
          }
        ]
      }
    },
    {
      label: 'Industries',
      href: '/industries',
      submenu: {
        tabs: [],
        sections: [
          {
            title: '',
            items: [
              {
                label: 'Business, Consulting & Technology Services',
                href: '/our-services#industry-solutions',
                description: 'Modern Compliance Solutions for Consulting and Technology Firms That Can\'t Miss a Deadline'
              },
              {
                label: 'Financial Services',
                href: '/our-services#industry-solutions',
                description: 'Proactive Compliance Software Built for Banks, Insurers, Credit Unions, and Investment Firms'
              },
              {
                label: 'Hospitality & Retail',
                href: '/our-services#industry-solutions',
                description: 'Compliance Software Built to Keep Up With Every Shift, Store, and Staff Member'
              },
              {
                label: 'Manufacturing & Construction',
                href: '/our-services#industry-solutions',
                description: 'Compliance Software to Keep Your Worksites Safe and Your Factories Running Smoothly'
              }
            ]
          },
          {
            title: '',
            items: [
              {
                label: 'Education',
                href: '/our-services#industry-solutions',
                description: 'Dynamic Compliance Solutions Designed to Safeguard Your Institution — and the Learners and Leaders Who Depend on It'
              },
              {
                label: 'Government',
                href: '/our-services#industry-solutions',
                description: 'Defensible Compliance Software Built to Help Federal, State, and Local Teams Respond Stay Audit-Ready'
              },
              {
                label: 'Insurance',
                href: '/our-services#industry-solutions',
                description: 'Compliance Solutions to Keep Every Policy Defensible and Audit-Ready — Including Your Own'
              },
              {
                label: 'Media & Entertainment',
                href: '/our-services#industry-solutions',
                description: 'Technology Solutions Built for Content, Confidentiality, and Everything Behind the Scenes'
              }
            ]
          },
          {
            title: '',
            items: [
              {
                label: 'Energy & Utilities',
                href: '/our-services#industry-solutions',
                description: 'Compliance Solutions to Help You Stay Current and Compliant Across Pipelines, Platforms, and Plants'
              },
              {
                label: 'Healthcare',
                href: '/our-services#industry-solutions',
                description: 'Automated Compliance Solutions to Protect People, Data, and Patient Care Delivery'
              },
              {
                label: 'Law Firm Practice & Management',
                href: '/our-services#industry-solutions',
                description: 'Automation & Compliance Built to Empower Law Firms — and the Teams Running Them'
              }
            ]
          }
        ]
      }
    },
    {
      label: 'About',
      href: '/about',
      submenu: {
        tabs: [],
        sections: [
          {
            title: '',
            items: [
              { label: 'Who We Are', href: '/about' },
              { label: 'Leadership', href: '/about' },
              { label: 'News & Resources', href: '/about' },
              { label: 'Job Openings', href: '/jobs' }
            ]
          }
        ]
      }
    },
    { label: 'Careers', href: '/jobs' }
  ];

  return (
    <>
      {/* Backdrop overlay when dropdown is active */}
      {activeDropdown && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-700 pointer-events-none"
        />
      )}

      <header className={`sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-[#0d0d0d] border-b border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="transition-opacity hover:opacity-80"
            >
              <img
                src="/Logo-06.png"
                alt="AzeniaTechnology"
                className="h-10 w-auto"
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.submenu) {
                      // Clear any pending close timeout
                      if (closeTimeout) {
                        clearTimeout(closeTimeout);
                        setCloseTimeout(null);
                      }
                      setExitingDropdown(null);
                      setActiveDropdown(item.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.submenu) {
                      setExitingDropdown(item.label);
                      const timeout = setTimeout(() => {
                        setActiveDropdown(null);
                        setExitingDropdown(null);
                      }, 300);
                      setCloseTimeout(timeout as unknown as number);
                    }
                  }}
                >
                  {item.submenu ? (
                    <button
                      className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                        location.pathname === item.href
                          ? 'text-blue-400'
                          : 'text-white hover:text-gray-300'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`text-sm font-medium transition-colors flex items-center space-x-1 ${
                        location.pathname === item.href
                          ? 'text-blue-400'
                          : 'text-white hover:text-gray-300'
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}

                  {item.submenu && (activeDropdown === item.label || exitingDropdown === item.label) && (
                    <div
                      className={`absolute top-full pt-6 z-50 ${exitingDropdown === item.label ? 'dropdown-exit' : 'dropdown-enter'} ${item.label === 'About' ? 'left-0' : '-left-40 w-[1000px]'}`}
                    >
                      {item.label === 'About' ? (
                        /* Simple white dropdown for About */
                        <div className="bg-white shadow-xl border border-gray-200 p-4 rounded-sm min-w-[220px]">
                          <ul className="space-y-1">
                            {item.submenu.sections[0].items.map((subItem, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  to={subItem.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Blue Header Bar with Tabs - Floating */}
                          <div className="bg-blue-600 shadow-lg px-6 py-4 rounded-sm">
                            {item.label === 'Industries' ? (
                              <Link
                                to="/our-services#industry-solutions"
                                onClick={() => setActiveDropdown(null)}
                                className="text-left block w-full group"
                              >
                                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-100 transition-colors">Industry Solutions</h3>
                                <p className="text-blue-100 text-sm">Purpose-built solutions trusted across industries — empowering you to stay ahead in a rapidly evolving world.</p>
                              </Link>
                            ) : (
                              <div className="flex items-center space-x-8">
                                {item.submenu.tabs.map((tab, idx) => (
                                  <Link
                                    key={idx}
                                    to={tab.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="text-white hover:text-blue-100 font-medium text-sm transition-colors"
                                  >
                                    {tab.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* White Content Box - Floating Separately */}
                          <div className="bg-white shadow-xl border border-gray-200 p-8 rounded-sm">
                            <div className={`grid gap-8 ${item.label === 'Industries' ? 'grid-cols-3' : 'grid-cols-4'}`}>
                              {item.submenu.sections.map((section, sectionIdx) => (
                                <div key={sectionIdx}>
                                  {section.title && (
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                                      {section.title}
                                    </h3>
                                  )}
                                  <ul className={item.label === 'Industries' ? 'space-y-6' : 'space-y-3'}>
                                    {section.items.map((subItem, itemIdx) => (
                                      <li key={itemIdx}>
                                        <Link
                                          to={subItem.href}
                                          onClick={() => setActiveDropdown(null)}
                                          className="text-left block group"
                                        >
                                          <div className={`font-semibold transition-colors ${item.label === 'Industries' ? 'text-gray-900 text-base mb-2 group-hover:text-blue-600' : 'text-blue-600 group-hover:text-blue-700 text-sm'}`}>
                                            {subItem.label}
                                          </div>
                                          {subItem.description && (
                                            <div className="text-sm text-gray-600 leading-relaxed">
                                              {subItem.description}
                                            </div>
                                          )}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>

                            {/* Footer CTA */}
                            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                              <Link
                                to={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-2 group"
                              >
                                <span>Explore All {item.label}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Link>
                              {item.label === 'Solutions' && (
                                <Link
                                  to="/partner"
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-2 group"
                                >
                                  <span>Partner With Us</span>
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/contact"
                className="px-5 py-2 text-sm font-medium transition-colors rounded"
                style={{ backgroundColor: '#deeefe', color: '#014171' }}
              >
                Contact Us
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-[#0d0d0d] z-40 overflow-y-auto border-t border-gray-800">
          <div className="px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <button
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-blue-400 bg-gray-800'
                        : 'text-white hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-blue-400 bg-gray-800'
                        : 'text-white hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
                {item.submenu && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.sections.map((section, sectionIdx) => (
                      <div key={sectionIdx} className="mt-3">
                        <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          {section.title}
                        </p>
                        {section.items.map((subItem, itemIdx) => (
                          <Link
                            key={itemIdx}
                            to={subItem.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 px-4">
              <button className="w-full px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
