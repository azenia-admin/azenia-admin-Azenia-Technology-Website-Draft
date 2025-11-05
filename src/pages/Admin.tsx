import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, LogOut, Upload, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Job, ClientLogo } from '../lib/supabase';

export default function Admin() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'jobs' | 'logos'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [clientLogos, setClientLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    description: '',
    requirements: '',
    is_new: false,
  });
  const [logoFormData, setLogoFormData] = useState({
    name: '',
    display_order: 0,
    is_active: true,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    fetchJobs();
    fetchLogos();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-jobs`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setJobs(result.data || []);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingJob ? 'PUT' : 'POST';
      const body = editingJob ? { id: editingJob.id, ...formData } : formData;

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-jobs`, {
        method,
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }

      resetForm();
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error saving job. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-jobs`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }

      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job. Please try again.');
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      description: job.description,
      requirements: job.requirements,
      is_new: job.is_new,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      description: '',
      requirements: '',
      is_new: false,
    });
    setEditingJob(null);
    setShowForm(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const fetchLogos = async () => {
    try {
      const { data, error } = await supabase
        .from('client_logos')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setClientLogos(data || []);
    } catch (error) {
      console.error('Error fetching logos:', error);
    }
  };

  const handleLogoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoFile) {
      alert('Please select a logo file');
      return;
    }

    setUploadingLogo(true);

    try {
      const fileExt = logoFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('client-logos')
        .upload(filePath, logoFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('client-logos')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('client_logos')
        .insert({
          name: logoFormData.name,
          logo_url: publicUrl,
          display_order: logoFormData.display_order,
          is_active: logoFormData.is_active,
        });

      if (dbError) throw dbError;

      setLogoFormData({ name: '', display_order: 0, is_active: true });
      setLogoFile(null);
      fetchLogos();
      alert('Logo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Error uploading logo. Please try again.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleDeleteLogo = async (logo: ClientLogo) => {
    if (!confirm(`Delete ${logo.name} logo?`)) return;

    try {
      const path = logo.logo_url.split('/').slice(-2).join('/');

      await supabase.storage
        .from('client-logos')
        .remove([path]);

      const { error } = await supabase
        .from('client_logos')
        .delete()
        .eq('id', logo.id);

      if (error) throw error;

      fetchLogos();
    } catch (error) {
      console.error('Error deleting logo:', error);
      alert('Error deleting logo. Please try again.');
    }
  };

  const handleToggleLogoActive = async (logo: ClientLogo) => {
    try {
      const { error } = await supabase
        .from('client_logos')
        .update({ is_active: !logo.is_active })
        .eq('id', logo.id);

      if (error) throw error;

      fetchLogos();
    } catch (error) {
      console.error('Error updating logo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 mt-1">Manage jobs and client logos</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'jobs'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Job Postings
          </button>
          <button
            onClick={() => setActiveTab('logos')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'logos'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Client Logos
          </button>
        </div>

        {activeTab === 'jobs' && (
          <>
            <div className="flex justify-end mb-4">
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  New Job Posting
                </button>
              )}
            </div>

            {showForm && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Development, Cloud Services"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Remote US, New York, NY"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_new}
                      onChange={(e) =>
                        setFormData({ ...formData, is_new: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-white">
                      Mark as new posting
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Job Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide a detailed job description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Requirements
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="List the job requirements..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {editingJob ? 'Update Job' : 'Create Job'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">
              Current Job Postings ({jobs.length})
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-400">Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No job postings yet. Create your first one!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="px-6 py-4 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {job.title}
                        </h3>
                        {job.is_new && (
                          <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                            New
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-2">
                        <span className="font-medium">{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Created {new Date(job.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(job)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit job"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete job"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
          </>
        )}

        {activeTab === 'logos' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Upload New Client Logo</h2>
              <form onSubmit={handleLogoSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={logoFormData.name}
                      onChange={(e) => setLogoFormData({ ...logoFormData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Company Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={logoFormData.display_order}
                      onChange={(e) => setLogoFormData({ ...logoFormData, display_order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={logoFormData.is_active}
                        onChange={(e) => setLogoFormData({ ...logoFormData, is_active: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-white">Active</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Logo File * (PNG, JPG, SVG, WebP)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    {logoFile && (
                      <span className="text-sm text-green-400">{logoFile.name}</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={uploadingLogo}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-5 h-5" />
                  {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                </button>
              </form>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">
                  Client Logos ({clientLogos.length})
                </h2>
              </div>

              {clientLogos.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No client logos yet. Upload your first one!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {clientLogos.map((logo) => (
                    <div
                      key={logo.id}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4"
                    >
                      <div className="aspect-video bg-white rounded-lg flex items-center justify-center p-4">
                        <img
                          src={logo.logo_url}
                          alt={logo.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{logo.name}</h3>
                        <p className="text-sm text-gray-400">Order: {logo.display_order}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                        <button
                          onClick={() => handleToggleLogoActive(logo)}
                          className={`text-sm px-3 py-1 rounded ${
                            logo.is_active
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-600 text-gray-300'
                          }`}
                        >
                          {logo.is_active ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => handleDeleteLogo(logo)}
                          className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete logo"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
