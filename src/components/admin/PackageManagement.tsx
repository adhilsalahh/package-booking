import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, X } from 'lucide-react';
import { supabase, Package, PackageDate } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface PackageManagementProps {
  showToast: (message: string, type: 'success' | 'error') => void;
}

export function PackageManagement({ showToast }: PackageManagementProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [selectedPackageForDates, setSelectedPackageForDates] = useState<Package | null>(null);
  const [packageDates, setPackageDates] = useState<PackageDate[]>([]);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    duration: '',
    images: '',
  });

  const [dateFormData, setDateFormData] = useState({
    available_date: '',
    seats: 0,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      showToast('Failed to load packages', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchPackageDates = async (packageId: string) => {
    try {
      const { data, error } = await supabase
        .from('package_dates')
        .select('*')
        .eq('package_id', packageId)
        .order('available_date');

      if (error) throw error;
      setPackageDates(data || []);
    } catch (error) {
      console.error('Error fetching dates:', error);
      showToast('Failed to load dates', 'error');
    }
  };

  const openAddModal = () => {
    setEditingPackage(null);
    setFormData({ title: '', description: '', price: 0, duration: '', images: '' });
    setShowModal(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      images: pkg.images.join('\n'),
    });
    setShowModal(true);
  };

  const openDateModal = (pkg: Package) => {
    setSelectedPackageForDates(pkg);
    setDateFormData({ available_date: '', seats: 0 });
    fetchPackageDates(pkg.id);
    setShowDateModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const imageArray = formData.images
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url);

    const packageData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      duration: formData.duration,
      images: imageArray,
      created_by: user?.id,
    };

    try {
      if (editingPackage) {
        const { error } = await supabase
          .from('packages')
          .update(packageData)
          .eq('id', editingPackage.id);

        if (error) throw error;
        showToast('Package updated successfully', 'success');
      } else {
        const { error } = await supabase.from('packages').insert(packageData);

        if (error) throw error;
        showToast('Package created successfully', 'success');
      }

      setShowModal(false);
      fetchPackages();
    } catch (error: any) {
      console.error('Error saving package:', error);
      showToast(error.message || 'Failed to save package', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const { error } = await supabase.from('packages').delete().eq('id', id);

      if (error) throw error;
      showToast('Package deleted successfully', 'success');
      fetchPackages();
    } catch (error: any) {
      console.error('Error deleting package:', error);
      showToast(error.message || 'Failed to delete package', 'error');
    }
  };

  const handleDateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPackageForDates) return;

    try {
      const { error } = await supabase.from('package_dates').insert({
        package_id: selectedPackageForDates.id,
        available_date: dateFormData.available_date,
        seats: dateFormData.seats,
      });

      if (error) throw error;
      showToast('Date added successfully', 'success');
      setDateFormData({ available_date: '', seats: 0 });
      fetchPackageDates(selectedPackageForDates.id);
    } catch (error: any) {
      console.error('Error adding date:', error);
      showToast(error.message || 'Failed to add date', 'error');
    }
  };

  const handleDeleteDate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this date?')) return;

    try {
      const { error } = await supabase.from('package_dates').delete().eq('id', id);

      if (error) throw error;
      showToast('Date deleted successfully', 'success');
      if (selectedPackageForDates) {
        fetchPackageDates(selectedPackageForDates.id);
      }
    } catch (error: any) {
      console.error('Error deleting date:', error);
      showToast(error.message || 'Failed to delete date', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Package Management</h2>
        <button
          onClick={openAddModal}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Package
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pkg.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{pkg.duration}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{pkg.price.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openDateModal(pkg)}
                        className="text-green-600 hover:text-green-700"
                        title="Manage Dates"
                      >
                        <CalendarIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openEditModal(pkg)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Edit"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {editingPackage ? 'Edit Package' : 'Add Package'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                      <input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g., 3 Days 2 Nights"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URLs (one per line)
                    </label>
                    <textarea
                      value={formData.images}
                      onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                      rows={3}
                      placeholder="https://example.com/image1.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {editingPackage ? 'Update' : 'Create'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showDateModal && selectedPackageForDates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Manage Dates - {selectedPackageForDates.title}
                </h3>
                <button onClick={() => setShowDateModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleDateSubmit} className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={dateFormData.available_date}
                      onChange={(e) => setDateFormData({ ...dateFormData, available_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
                    <input
                      type="number"
                      value={dateFormData.seats || ''}
                      onChange={(e) => setDateFormData({ ...dateFormData, seats: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      min="1"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Date
                </button>
              </form>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-4">Available Dates</h4>
                <div className="space-y-2">
                  {packageDates.map((date) => (
                    <div
                      key={date.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {new Date(date.available_date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-sm text-gray-600">{date.seats} seats available</p>
                      </div>
                      <button
                        onClick={() => handleDeleteDate(date.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  {packageDates.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No dates added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
