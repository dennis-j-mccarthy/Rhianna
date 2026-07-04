import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  maxWidth?: number;
  aspectRatio?: string;
  objectPosition?: string;
};

export default function PhotoMoment({
  src,
  alt,
  caption,
  maxWidth = 900,
  aspectRatio = "3 / 2",
  objectPosition = "center",
}: Props) {
  return (
    <section className="photo-moment">
      <figure>
        <div className="pm-media" style={{ maxWidth, aspectRatio }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 980px) 92vw, 900px"
            style={{ objectFit: "cover", objectPosition }}
          />
        </div>
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    </section>
  );
}
