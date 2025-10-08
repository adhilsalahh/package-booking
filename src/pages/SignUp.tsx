import { useState } from 'react';
import { UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SignupPreview } from '../components/SignupPreview';
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateUsername,
  validateFullName,
  validateDateOfBirth,
  getPasswordStrength,
} from '../utils/validation';

interface SignupProps {
  onNavigate: (page: string) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  fullName: string;
  dateOfBirth: string;
  address: string;
  profilePictureUrl: string;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
}

interface FormErrors {
  [key: string]: string;
}

export function Signup({ onNavigate, showToast }: SignupProps) {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
    profilePictureUrl: '',
    preferences: {
      newsletter: false,
      notifications: true,
    },
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { signUp } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name.startsWith('preferences.')) {
        const prefKey = name.split('.')[1];
        setFormData({
          ...formData,
          preferences: { ...formData.preferences, [prefKey]: checked },
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.error!;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error!;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error!;
    }

    const fullNameValidation = validateFullName(formData.fullName);
    if (!fullNameValidation.isValid) {
      newErrors.fullName = fullNameValidation.error!;
    }

    const dobValidation = validateDateOfBirth(formData.dateOfBirth);
    if (!dobValidation.isValid) {
      newErrors.dateOfBirth = dobValidation.error!;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPreview(true);
    }
  };

  const handleConfirmSignup = async () => {
    setLoading(true);
    try {
      await signUp(
        formData.email,
        formData.password,
        formData.username,
        formData.phone,
        {
          full_name: formData.fullName,
          date_of_birth: formData.dateOfBirth,
          address: formData.address || undefined,
          profile_picture_url: formData.profilePictureUrl || undefined,
          preferences: formData.preferences,
        }
      );
      showToast('Account created successfully!', 'success');
      onNavigate('login');
    } catch (error: any) {
      console.error('Signup error:', error);
      showToast(error.message || 'Failed to create account', 'error');
      setShowPreview(false);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-4">
          <SignupPreview
            data={{
              ...formData,
              fullName: formData.fullName,
              dateOfBirth: formData.dateOfBirth,
            }}
            onEdit={() => setShowPreview(false)}
            onConfirm={handleConfirmSignup}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-100 p-3 rounded-full">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Create Account</h1>
          <p className="text-gray-600 text-center mb-8">Join us and start booking your adventures</p>

          <form onSubmit={handlePreview}>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.username ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          <div
                            className={`h-1 flex-1 rounded ${
                              passwordStrength.score >= 2 ? 'bg-red-500' : 'bg-gray-200'
                            }`}
                          ></div>
                          <div
                            className={`h-1 flex-1 rounded ${
                              passwordStrength.score >= 4 ? 'bg-yellow-500' : 'bg-gray-200'
                            }`}
                          ></div>
                          <div
                            className={`h-1 flex-1 rounded ${
                              passwordStrength.score >= 5 ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600">
                          Strength:{' '}
                          <span
                            className={
                              passwordStrength.strength === 'weak'
                                ? 'text-red-600'
                                : passwordStrength.strength === 'medium'
                                ? 'text-yellow-600'
                                : 'text-green-600'
                            }
                          >
                            {passwordStrength.strength.charAt(0).toUpperCase() +
                              passwordStrength.strength.slice(1)}
                          </span>
                        </p>
                      </div>
                    )}
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1234567890"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Picture URL <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      name="profilePictureUrl"
                      value={formData.profilePictureUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-gray-400">(Optional)</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Street address, city, state, zip code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="preferences.newsletter"
                      checked={formData.preferences.newsletter}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      Subscribe to newsletter for latest travel deals and updates
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="preferences.notifications"
                      checked={formData.preferences.notifications}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      Enable notifications for booking updates and reminders
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Preview
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-blue-600 hover:underline font-semibold"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
