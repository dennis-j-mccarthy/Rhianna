import Link from "next/link";

type Tag = { id: string; name: string; slug: string };

export default function FilterRow({
  tags,
  activeTag,
}: {
  tags: Tag[];
  activeTag: string | null;
}) {
  if (tags.length === 0) return null;

  return (
    <div className="filter-row">
      <Link href="/notebook" className={!activeTag ? "filter active" : "filter"}>
        All Essays
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={`/notebook?tag=${encodeURIComponent(tag.slug)}`}
          className={activeTag === tag.slug ? "filter active" : "filter"}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
