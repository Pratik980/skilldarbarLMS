import { useState } from 'react';

/**
 * SafeImage - An image component with built-in error handling.
 * Shows a styled placeholder when the image fails to load.
 */
const SafeImage = ({ src, alt, fallbackIcon, className = '', ...props }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
        style={props.style}
      >
        {fallbackIcon || (
          <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
            <svg className="w-10 h-10 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">No Image</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
          style={props.style}
        />
      )}
      <img
        src={src}
        alt={alt || 'Image'}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </>
  );
};

export default SafeImage;
