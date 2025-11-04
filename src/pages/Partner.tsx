import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Partner() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    companyName: '',
    jobTitle: '',
    phoneNumber: '',
    serviceRequired: '',
    specialtyNeeded: '',
    officeLocation: '',
    details: '',
    agreeToContact: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'partner',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.businessEmail,
          phoneNumber: formData.phoneNumber,
          companyName: formData.companyName,
          jobTitle: formData.jobTitle,
          serviceRequired: formData.serviceRequired,
          specialtyNeeded: formData.specialtyNeeded,
          officeLocation: formData.officeLocation,
          details: formData.details,
          agreeToNewsletter: false,
          agreeToContact: formData.agreeToContact,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({ type: 'success', text: 'Thank you for your interest in partnering with us! We will contact you soon.' });
        setFormData({
          firstName: '',
          lastName: '',
          businessEmail: '',
          companyName: '',
          jobTitle: '',
          phoneNumber: '',
          serviceRequired: '',
          specialtyNeeded: '',
          officeLocation: '',
          details: '',
          agreeToContact: false
        });
      } else {
        setSubmitMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage({ type: 'error', text: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="bg-gradient-to-br from-gray-900 via-[#0d0d0d] to-gray-900 py-20 px-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <h1 className="text-5xl font-bold text-white mb-6">Partner With Us</h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Looking for top talent or workforce solutions?
                Partner with a leader in professional staffing,
                workforce consulting, resource solutions and
                strategic hiring.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="h-[calc(5rem+1.5rem)]"></div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-8 font-semibold text-base transition-colors flex flex-col items-start justify-end rounded-lg group flex-1 min-h-[160px]">
                  <span className="text-left mb-2">Looking for a new job? Find Your Next Role!</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-8 font-semibold text-base transition-colors flex flex-col items-start justify-end rounded-lg group flex-1 min-h-[160px]">
                  <span className="text-left mb-2">Have a general inquiry? Contact us here!</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-12 rounded-sm">
            <h2 className="text-4xl font-serif text-white mb-12">How It Works</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    Fill out the form to get connected with an Azenia staffing expert who understands your industry.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    An Azenia representative will contact you right away to learn more about your business needs and goals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    Gain access to our exclusive network of thousands of qualified candidates and the guidance of our workforce
                    solutions team to help you scale, streamline or transform your operations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                </div>
                <div>
                  <p className="text-gray-300 leading-relaxed">
                    If more details are needed, our team will collaborate with you to scope a customized staffing and workforce solution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-white mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-white mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessEmail" className="block text-sm font-semibold text-white mb-2">
                    Business email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    required
                    placeholder="Business email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-white mb-2">
                    Company name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Company name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-semibold text-white mb-2">
                    Job title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                    placeholder="Your job title goes here"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-white mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Phone number"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Service required <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceRequired"
                      value="staff-augmentation"
                      checked={formData.serviceRequired === 'staff-augmentation'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-300">Staff Augmentation (Temporary/Contract/Contract-to-Hire)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceRequired"
                      value="direct-hire"
                      checked={formData.serviceRequired === 'direct-hire'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-300">Direct Hire or Executive Search</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceRequired"
                      value="professional-services"
                      checked={formData.serviceRequired === 'professional-services'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-300">Professional Services & Consulting</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceRequired"
                      value="other"
                      checked={formData.serviceRequired === 'other'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-300">Other (please specify)</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="specialtyNeeded" className="block text-sm font-semibold text-white mb-2">
                  Specialty needed <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-400 mb-2">
                  Let us know which team can best support your hiring or workforce strategy.
                </p>
                <select
                  id="specialtyNeeded"
                  name="specialtyNeeded"
                  value={formData.specialtyNeeded}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors bg-white"
                >
                  <option value="">Please Select</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance & Accounting</option>
                  <option value="legal">Legal</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="energy">Energy & Utilities</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="officeLocation" className="block text-sm font-semibold text-white mb-2">
                  Azenia office location <span className="text-red-500">*</span>
                </label>
                <select
                  id="officeLocation"
                  name="officeLocation"
                  value={formData.officeLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors bg-white"
                >
                  <option value="">Please select</option>
                  <option value="atlanta">Atlanta</option>
                  <option value="boston">Boston</option>
                  <option value="chicago">Chicago</option>
                  <option value="dallas">Dallas</option>
                  <option value="denver">Denver</option>
                  <option value="houston">Houston</option>
                  <option value="los-angeles">Los Angeles</option>
                  <option value="new-york">New York</option>
                  <option value="san-francisco">San Francisco</option>
                  <option value="seattle">Seattle</option>
                </select>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-semibold text-white mb-2">
                  To help us respond quickly and effectively, please include key details about your hiring or workforce needs—such as the roles you're looking to fill, required skills or experience, timeline, team size or any specific challenges you're facing. <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Please tell us more here"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors resize-none"
                />
              </div>

              <div className="bg-gray-800 p-6 border border-gray-700 text-sm text-gray-300">
                <p className="mb-4">
                  Azenia is committed to protecting and respecting your privacy, and we'll only use your personal information to administer your
                  account and to provide the products and services you requested from us. From time to time, we would like to contact you about our
                  products and services, as well as other content that may be of interest to you. If you consent to us contacting you for this purpose,
                  please tick below to say how you would like us to contact you:
                </p>

                <label className="flex items-start gap-2 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    name="agreeToContact"
                    checked={formData.agreeToContact}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 mt-1"
                  />
                  <span>I agree to receive other communications from Azenia.</span>
                </label>

                <p className="text-xs">
                  You can unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices,
                  and how we are committed to protecting and respecting your privacy, please review our Privacy Policy.
                </p>
                <p className="text-xs mt-2">
                  By submitting this form, you acknowledge and agree that this website is for North American users only. You further agree that you will not
                  provide any personal data that may be covered by the EU's General Data Protection Regulation (GDPR) while utilizing the website. Azenia
                  is not liable for any damages arising under the GDPR from any disclosure of personal data or from any other rights or duties concerning
                  GDPR-covered personal data, where such disclosures, rights or duties relate to your use of the website.
                </p>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded ${submitMessage.type === 'success' ? 'bg-green-900/50 text-green-200 border border-green-700' : 'bg-red-900/50 text-red-200 border border-red-700'}`}>
                  {submitMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 px-6 text-lg font-semibold transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Partner With Us'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
