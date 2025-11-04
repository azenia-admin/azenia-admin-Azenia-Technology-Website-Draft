import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    category: '',
    message: '',
    agreeToNewsletter: false,
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
          type: 'contact',
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({ type: 'success', text: 'Thank you for contacting us! We will get back to you soon.' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          category: '',
          message: '',
          agreeToNewsletter: false,
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
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Have a question or need assistance? We're here to help. Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-12 rounded-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-blue-400 mb-2">
                  First name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors rounded"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-blue-400 mb-2">
                  Last name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors rounded"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-400 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors rounded"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-blue-400 mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors rounded"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-blue-400 mb-2">
                What best describes you? <span className="text-red-400">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors rounded appearance-none cursor-pointer"
              >
                <option value="">Please Select</option>
                <option value="job-seeker">Job Seeker</option>
                <option value="employer">Employer/Client</option>
                <option value="vendor">Vendor/Partner</option>
                <option value="media">Media/Press</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-blue-400 mb-2">
                How can we help you? <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none rounded"
              />
            </div>

            <div className="text-sm text-blue-400">
              <p className="mb-4">
                Stay up to date on all things Azenia Technology Group! Subscribe to our newsletter.
              </p>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToNewsletter"
                  checked={formData.agreeToNewsletter}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500"
                />
                <span className="text-white">Sign me up</span>
              </label>
            </div>

            <div className="text-xs text-gray-400 space-y-3">
              <p>
                Azenia Technology Group is committed to protecting and respecting your privacy, and we'll only use your personal information to administer your account and to provide the products and services you requested from us. From time to time, we would like to contact you about our products and services, as well as other content that may be of interest to you. If you consent to us contacting you for this purpose, please tick below to say how you would like us to contact you:
              </p>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToContact"
                  checked={formData.agreeToContact}
                  onChange={handleChange}
                  className="w-5 h-5 mt-0.5 text-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-blue-500"
                />
                <span className="text-white">I agree to receive other communications from Azenia Technology Group.</span>
              </label>

              <p>
                You can unsubscribe from these communications at any time. For more information on how to unsubscribe, our privacy practices, and how we are committed to protecting and respecting your privacy, please review our <span className="text-blue-400 underline cursor-pointer">Privacy Policy</span>.
              </p>
              <p>
                By submitting this form, you acknowledge and agree that the website is for North American users only. You further agree that you will not provide any personal data that may be covered by the EU's General Data Protection Regulation (GDPR) while utilizing the website. Azenia Technology Group is not liable for any damages arising under the GDPR from any disclosure of personal data or from any other rights or duties concerning GDPR-covered personal data, where such disclosures, rights or duties relate to your use of the website.
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
              className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 px-6 text-lg font-semibold transition-colors rounded flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
