type ResponsivePictureProps = {
  alt: string;
  fallbackSrc: string;
  srcSet: string;
  sizes: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export default function ResponsivePicture({
  alt,
  fallbackSrc,
  srcSet,
  sizes,
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
}: ResponsivePictureProps) {
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  );
}
