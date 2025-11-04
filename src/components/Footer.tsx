import { Cloud, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-bold">AzeniaTechnology</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your preferred consulting service for innovative technology solutions.
            </p>
            <div className="inline-flex items-center space-x-2 bg-purple-900/30 text-purple-400 px-3 py-1.5 rounded-full text-xs font-medium">
              <Award className="w-3 h-3" />
              <span>Ridge Partner Track</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Salesforce Solutions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI & ML</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Financial Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Healthcare</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Retail & E-commerce</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Manufacturing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Education</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-sm">
          <p>Member of Azenia Holding Group © 2025 Azenia Technology Group, LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
