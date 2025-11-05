import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock, User, X, Upload } from 'lucide-react';
import { supabase, Job } from '../lib/supabase';

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchQuery, locationQuery, selectedDepartment, jobs]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.department.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query)
      );
    }

    if (locationQuery) {
      const query = locationQuery.toLowerCase();
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(query)
      );
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter((job) => job.department === selectedDepartment);
    }

    setFilteredJobs(filtered);
  };

  const departments = ['all', ...Array.from(new Set(jobs.map((job) => job.department)))];

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData({ ...applicationData, resume: e.target.files[0] });
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !applicationData.resume) return;

    setSubmitting(true);

    try {
      const fileExt = applicationData.resume.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('job-applications')
        .upload(filePath, applicationData.resume, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('job-applications')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('job_applications')
        .insert({
          job_id: selectedJob.id,
          first_name: applicationData.firstName,
          last_name: applicationData.lastName,
          email: applicationData.email,
          phone: applicationData.phone,
          resume_url: publicUrl,
        });

      if (dbError) throw dbError;

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-application-email`;
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: applicationData.firstName,
          lastName: applicationData.lastName,
          email: applicationData.email,
          phone: applicationData.phone,
          resumeUrl: publicUrl,
          jobTitle: selectedJob.title,
          jobId: selectedJob.id,
        }),
      });

      setSubmitSuccess(true);
      setApplicationData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        resume: null,
      });

      setTimeout(() => {
        setShowApplicationForm(false);
        setSubmitSuccess(false);
        setSelectedJob(null);
      }, 3000);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="bg-gradient-to-br from-gray-900 via-[#0d0d0d] to-gray-900 text-white border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold mb-4">Job Search</h1>
          <p className="text-gray-300 text-lg mb-12">Utilize our new jobs database</p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 items-end">
            <div className="md:col-span-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="project manager"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
                />
              </div>
            </div>

            <div className="md:col-span-5">
              <p className="text-sm mb-2">Add City & State to begin</p>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <button
                onClick={() => filterJobs()}
                className="w-full bg-blue-900 hover:bg-blue-950 text-white px-6 py-4 rounded font-medium transition-colors shadow-lg"
              >
                Search Jobs
              </button>
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <button className="text-white hover:text-blue-200 underline underline-offset-4 transition-colors">
              Search Remote Jobs
            </button>
            <button className="text-white hover:text-blue-200 transition-colors">
              View and browse all of our listed jobs
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-blue-400 mb-4">REFINE YOUR SEARCH</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Job Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="department"
                        value="all"
                        checked={selectedDepartment === 'all'}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-300">
                        All Departments ({jobs.length})
                      </span>
                    </label>
                    {departments
                      .filter((dept) => dept !== 'all')
                      .map((dept) => {
                        const count = jobs.filter((job) => job.department === dept).length;
                        return (
                          <label key={dept} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="department"
                              value={dept}
                              checked={selectedDepartment === dept}
                              onChange={(e) => setSelectedDepartment(e.target.value)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="ml-2 text-sm text-gray-300">
                              {dept} ({count})
                            </span>
                          </label>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-white">
                    {filteredJobs.length.toLocaleString()}{' '}
                    <span className="text-lg font-normal text-gray-400">
                      jobs available for search.
                    </span>
                  </p>
                </div>
                <div className="text-sm text-gray-400">Filtered by most recent.</div>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-red-500 rounded"></div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-400">Loading jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg">
                <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-lg text-gray-400">No jobs found matching your criteria</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-blue-400 hover:text-blue-500">
                              {job.title}
                            </h3>
                            {job.is_new && (
                              <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-3">
                            Posted: {new Date(job.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-gray-300">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                            <MapPin className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Location:</p>
                            <p className="font-medium">{job.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                            <Briefcase className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Type:</p>
                            <p className="font-medium">Full Time</p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Department:</p>
                            <p className="font-medium">{job.department}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition-colors"
                        >
                          Apply Now
                        </button>
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-blue-400 px-6 py-3 rounded font-medium transition-colors border border-gray-600"
                        >
                          View Job Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedJob && !showApplicationForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
                    {selectedJob.is_new && (
                      <span className="px-3 py-1 text-xs font-semibold bg-white text-blue-700 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-blue-100">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{selectedJob.department}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{selectedJob.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-white hover:text-gray-200 text-3xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-8 py-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                  Job Description
                </h3>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedJob.description}
                </div>
              </div>

              {selectedJob.requirements && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600">
                    Requirements
                  </h3>
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedJob.requirements}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
                >
                  Apply for this position
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedJob && showApplicationForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowApplicationForm(false);
            setSelectedJob(null);
          }}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Apply for Position</h2>
                  <p className="text-blue-100">{selectedJob.title}</p>
                </div>
                <button
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSelectedJob(null);
                  }}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="px-8 py-8">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for your interest. We'll review your application and get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicationData.firstName}
                        onChange={(e) =>
                          setApplicationData({ ...applicationData, firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicationData.lastName}
                        onChange={(e) =>
                          setApplicationData({ ...applicationData, lastName: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicationData.email}
                      onChange={(e) =>
                        setApplicationData({ ...applicationData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicationData.phone}
                      onChange={(e) =>
                        setApplicationData({ ...applicationData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              required
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                        {applicationData.resume && (
                          <p className="text-sm text-green-600 font-medium mt-2">
                            Selected: {applicationData.resume.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowApplicationForm(false);
                        setSelectedJob(null);
                      }}
                      className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
