/**
 * Validation utilities for forms and data
 */

export const ValidationRules = {
  // Email validation
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address',
    },
  },

  // Password validation
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  },

  // Simple password (less strict)
  simplePassword: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters long',
    },
  },

  // Required field
  required: (fieldName: string) => ({
    required: `${fieldName} is required`,
  }),

  // Phone number validation
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^[\+]?[1-9][\d]{0,15}$/,
      message: 'Please enter a valid phone number',
    },
  },

  // Name validation
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters long',
    },
    maxLength: {
      value: 50,
      message: 'Name must not exceed 50 characters',
    },
    pattern: {
      value: /^[a-zA-Z\s'-]+$/,
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
    },
  },

  // License plate validation
  licensePlate: {
    required: 'License plate is required',
    pattern: {
      value: /^[A-Z0-9]{1,8}$/,
      message: 'License plate must contain only letters and numbers (max 8 characters)',
    },
  },

  // Vehicle year validation
  vehicleYear: {
    required: 'Year is required',
    min: {
      value: 1990,
      message: 'Year must be 1990 or later',
    },
    max: {
      value: new Date().getFullYear() + 1,
      message: 'Year cannot be more than next year',
    },
  },

  // Capacity validation
  capacity: {
    required: 'Capacity is required',
    min: {
      value: 1,
      message: 'Capacity must be at least 1',
    },
    max: {
      value: 100,
      message: 'Capacity cannot exceed 100',
    },
  },

  // Grade validation
  grade: {
    required: 'Grade is required',
    pattern: {
      value: /^(K|[1-9]|1[0-2])$/,
      message: 'Grade must be K or 1-12',
    },
  },

  // Student ID validation
  studentId: {
    required: 'Student ID is required',
    pattern: {
      value: /^[A-Z0-9]{4,20}$/,
      message: 'Student ID must be 4-20 characters (letters and numbers only)',
    },
  },

  // Driver ID validation
  driverId: {
    required: 'Driver ID is required',
    pattern: {
      value: /^[A-Z0-9]{4,20}$/,
      message: 'Driver ID must be 4-20 characters (letters and numbers only)',
    },
  },

  // License number validation
  licenseNumber: {
    required: 'License number is required',
    pattern: {
      value: /^[A-Z0-9]{8,20}$/,
      message: 'License number must be 8-20 characters (letters and numbers only)',
    },
  },

  // Address validation
  address: {
    required: 'Address is required',
    minLength: {
      value: 10,
      message: 'Address must be at least 10 characters long',
    },
    maxLength: {
      value: 200,
      message: 'Address must not exceed 200 characters',
    },
  },

  // Route name validation
  routeName: {
    required: 'Route name is required',
    minLength: {
      value: 3,
      message: 'Route name must be at least 3 characters long',
    },
    maxLength: {
      value: 50,
      message: 'Route name must not exceed 50 characters',
    },
  },

  // School name validation
  schoolName: {
    required: 'School name is required',
    minLength: {
      value: 3,
      message: 'School name must be at least 3 characters long',
    },
    maxLength: {
      value: 100,
      message: 'School name must not exceed 100 characters',
    },
  },

  // District validation
  district: {
    required: 'District is required',
    minLength: {
      value: 3,
      message: 'District name must be at least 3 characters long',
    },
    maxLength: {
      value: 100,
      message: 'District name must not exceed 100 characters',
    },
  },
};

/**
 * Custom validation functions
 */
export const customValidations = {
  confirmPassword: (password: string) => ({
    validate: (value: string) => 
      value === password || 'Passwords do not match',
  }),

  uniqueEmail: (existingEmails: string[]) => ({
    validate: (value: string) =>
      !existingEmails.includes(value.toLowerCase()) || 'Email already exists',
  }),

  uniqueLicensePlate: (existingPlates: string[]) => ({
    validate: (value: string) =>
      !existingPlates.includes(value.toUpperCase()) || 'License plate already exists',
  }),

  futureDate: () => ({
    validate: (value: string) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today || 'Date must be today or in the future';
    },
  }),

  pastDate: () => ({
    validate: (value: string) => {
      const selectedDate = new Date(value);
      const today = new Date();
      return selectedDate <= today || 'Date cannot be in the future';
    },
  }),

  businessHours: () => ({
    validate: (value: string) => {
      const time = new Date(`2000-01-01T${value}`);
      const hours = time.getHours();
      return (hours >= 6 && hours <= 22) || 'Time must be between 6:00 AM and 10:00 PM';
    },
  }),

  positiveNumber: () => ({
    validate: (value: number) =>
      value > 0 || 'Value must be greater than 0',
  }),

  fileSize: (maxSizeInMB: number) => ({
    validate: (files: FileList) => {
      if (!files || files.length === 0) return true;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      return files[0].size <= maxSizeInBytes || `File size must be less than ${maxSizeInMB}MB`;
    },
  }),

  fileType: (allowedTypes: string[]) => ({
    validate: (files: FileList) => {
      if (!files || files.length === 0) return true;
      return allowedTypes.includes(files[0].type) || 'Invalid file type';
    },
  }),
};

/**
 * Utility functions for validation
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[^\w\s@.-]/g, ''); // Keep only alphanumeric, spaces, @, ., -
};