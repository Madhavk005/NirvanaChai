import React, { useState, useRef, useEffect } from "react";
import { Loader2, Image as ImageIcon } from "lucide-react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  aspectRatio?: "square" | "video" | "auto";
}

export function LazyImage({
  src,
  alt,
  className = "",
  placeholder,
  fallback = "/placeholder-image.jpg",
  onLoad,
  onError,
  priority = false,
  aspectRatio = "auto",
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      default:
        return "";
    }
  };

  const imageSrc = hasError
    ? fallback
    : isInView
      ? src
      : placeholder || fallback;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${getAspectRatioClass()} ${className}`}
    >
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}

      {/* Error placeholder */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <ImageIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-xs text-gray-500">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

// Optimized image with blur placeholder
interface OptimizedImageProps extends LazyImageProps {
  blurDataURL?: string;
  sizes?: string;
}

export function OptimizedImage({
  blurDataURL,
  sizes = "100vw",
  ...props
}: OptimizedImageProps) {
  return (
    <LazyImage
      {...props}
      className={`${props.className} ${blurDataURL ? "blur-sm" : ""}`}
    />
  );
}

// Image with skeleton loading
export function SkeletonImage({ className = "", ...props }: LazyImageProps) {
  return (
    <div className={`animate-pulse bg-gray-200 ${className}`}>
      <LazyImage {...props} />
    </div>
  );
}
