import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DATE_FORMATS } from '@/constants/app';

dayjs.extend(relativeTime);

/**
 * Date formatting utilities
 */
export const formatDate = (date: string | Date, format?: string): string => {
  if (!date) return '';
  return dayjs(date).format(format || DATE_FORMATS.DISPLAY);
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, DATE_FORMATS.DISPLAY_WITH_TIME);
};

export const formatRelativeTime = (date: string | Date): string => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export const isYesterday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
};

/**
 * Number formatting utilities
 */
export const formatNumber = (num: number, decimals = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${formatNumber(value, decimals)}%`;
};

/**
 * String formatting utilities
 */
export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str.split(' ').map(capitalizeFirst).join(' ');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatFullName = (firstName: string, lastName: string): string => {
  return [firstName, lastName].filter(Boolean).join(' ');
};

export const getInitials = (firstName: string, lastName?: string): string => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return first + last;
};

/**
 * Phone number formatting
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // For international numbers, just add spaces
  if (cleaned.length > 10) {
    return cleaned.replace(/(\d{1,3})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
  }
  
  return phone;
};

/**
 * Address formatting
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  // Basic address formatting - can be enhanced based on requirements
  return capitalizeWords(address.trim());
};

/**
 * File size formatting
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Status formatting
 */
export const formatStatus = (status: string): string => {
  if (!status) return '';
  return status.split('_').map(capitalizeFirst).join(' ');
};

/**
 * ID formatting for display
 */
export const formatId = (id: string, prefix?: string): string => {
  if (!id) return '';
  if (prefix) {
    return `${prefix}-${id}`;
  }
  return id;
};

/**
 * Email masking for privacy
 */
export const maskEmail = (email: string): string => {
  if (!email) return '';
  const [username, domain] = email.split('@');
  if (!domain) return email;
  
  const maskedUsername = username.substring(0, 2) + '*'.repeat(Math.max(0, username.length - 2));
  return `${maskedUsername}@${domain}`;
};

/**
 * License plate formatting
 */
export const formatLicensePlate = (plate: string): string => {
  if (!plate) return '';
  return plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
};