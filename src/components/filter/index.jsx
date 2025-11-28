// src/components/filter/index.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import BedsAndBathsMenu from "./small.filter";
import FilterModal from "./large.filter";
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { setSearchQuery, selectFilters, selectActiveFilterCount, resetFilters } from '@/store/filtersSlice';

export default function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const activeFilterCount = useSelector(selectActiveFilterCount);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearAll = () => {
    dispatch(resetFilters());
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col gap-4">
          {/* Top Row: Search + Actions */}
          <div className="flex flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={handleSearch}
                placeholder="Search by location, property name, or ID..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 shadow-sm transition relative"
              >
                <FunnelIcon className="w-5 h-5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-600 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <BedsAndBathsMenu />

              {activeFilterCount > 0 && (
                <button
                  onClick={handleClearAll}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition"
                >
                  <XMarkIcon className="w-5 h-5" />
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-medium text-gray-500">Active filters:</span>
              
              {filters.categories.map(cat => (
                <span key={cat} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {cat}
                </span>
              ))}

              {filters.bedrooms.map(bed => (
                <span key={bed} className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  {bed} bed{bed !== '1' ? 's' : ''}
                </span>
              ))}

              {filters.bathrooms.map(bath => (
                <span key={bath} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {bath} bath{bath !== '1' ? 's' : ''}
                </span>
              ))}

              {filters.furnishing.map(furn => (
                <span key={furn} className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full capitalize">
                  {furn}
                </span>
              ))}

              {(filters.priceRange.min || filters.priceRange.max) && (
                <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                  RM {filters.priceRange.min || '0'} - {filters.priceRange.max || '∞'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}