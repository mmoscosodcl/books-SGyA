import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { setFilters, clearFilters } from '../../../shared/store/slices/booksSlice';

export function BookFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.books.filters);
  const books = useAppSelector((state) => state.books.items);

  const categories = Array.from(new Set(books.map((b) => b.categoria).filter(Boolean)));

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-6">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Author</label>
        <input
          type="text"
          className="w-full border p-2 rounded text-sm"
          placeholder="Filter by author..."
          value={filters.author}
          onChange={(e) => dispatch(setFilters({ author: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
        <select
          className="w-full border p-2 rounded text-sm"
          value={filters.category}
          onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Min Price</label>
        <input
          type="number"
          className="w-full border p-2 rounded text-sm"
          placeholder="Min price..."
          value={filters.minPrice}
          onChange={(e) => dispatch(setFilters({ minPrice: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Max Price</label>
        <input
          type="number"
          className="w-full border p-2 rounded text-sm"
          placeholder="Max price..."
          value={filters.maxPrice}
          onChange={(e) => dispatch(setFilters({ maxPrice: e.target.value }))}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() => dispatch(clearFilters())}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm font-semibold transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}