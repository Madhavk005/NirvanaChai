import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useDarkMode, useToggleDarkMode } from '../stores/useStore';

interface DarkModeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const isDarkMode = useDarkMode();
  const toggleDarkMode = useToggleDarkMode();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`
        relative ${sizeClasses[size]} rounded-lg
        bg-gray-100 dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        hover:bg-gray-200 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
        transition-colors duration-200
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {isDarkMode ? (
          <SunIcon className={`${iconSizes[size]} text-amber-500`} />
        ) : (
          <MoonIcon className={`${iconSizes[size]} text-gray-600`} />
        )}
      </motion.div>

      {showLabel && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {isDarkMode ? 'Light' : 'Dark'}
        </motion.span>
      )}
    </motion.button>
  );
};

export default DarkModeToggle; 