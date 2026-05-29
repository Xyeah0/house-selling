import { getPaginationRange } from "../lib/pagination";

interface CollectionPaginationProps {
  current: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function CollectionPagination({
  current,
  totalPages,
  onChange,
}: CollectionPaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPaginationRange(current, totalPages);

  return (
    <nav className="collection-pagination reveal" aria-label="房源分页">
      <button
        type="button"
        className="collection-pagination__control"
        disabled={current <= 1}
        onClick={() => onChange(current - 1)}
        aria-label="上一页"
      >
        上一页
      </button>

      <ul className="collection-pagination__pages">
        {items.map((item, index) =>
          item === "ellipsis" ? (
            <li key={`ellipsis-${index}`} className="collection-pagination__ellipsis" aria-hidden>
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={`collection-pagination__page${
                  item === current ? " is-active" : ""
                }`}
                aria-current={item === current ? "page" : undefined}
                onClick={() => onChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className="collection-pagination__control"
        disabled={current >= totalPages}
        onClick={() => onChange(current + 1)}
        aria-label="下一页"
      >
        下一页
      </button>
    </nav>
  );
}
