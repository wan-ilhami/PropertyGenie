// src/components/filter/large.filter.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { SectionTitle, FilterChip } from './components';
import {
  selectFilters,
  updateAllFilters,
  resetFilters,
  PROPERTY_CATEGORIES,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
  TENURE_OPTIONS,
  FURNISHING_OPTIONS
} from '@/store/filtersSlice';

export default function FilterModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [localFilters, setLocalFilters] = useState({
    categories: [],
    bedrooms: [],
    bathrooms: [],
    tenure: [],
    furnishing: [],
    isAuction: false,
    priceRange: { min: '', max: '' }
  });

  // Sync with Redux store when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        categories: [...filters.categories],
        bedrooms: [...filters.bedrooms],
        bathrooms: [...filters.bathrooms],
        tenure: Array.isArray(filters.tenure) ? [...filters.tenure] : [],
        furnishing: Array.isArray(filters.furnishing) ? [...filters.furnishing] : [],
        isAuction: filters.isAuction,
        priceRange: { ...filters.priceRange }
      });
    }
  }, [isOpen, filters]);

  const handleToggleMulti = (key, value) => {
    setLocalFilters(prev => {
      const current = prev[key];
      const newValues = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handleApply = () => {
    dispatch(updateAllFilters(localFilters));
    onClose();
  };

  const handleClear = () => {
    setLocalFilters({
      categories: [],
      bedrooms: [],
      bathrooms: [],
      tenure: [],
      furnishing: [],
      isAuction: false,
      priceRange: { min: '', max: '' }
    });
  };

  const handleReset = () => {
    dispatch(resetFilters());
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FunnelIcon className="w-6 h-6 text-blue-600" />
              Advanced Filters
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Price Range */}
            <section>
              <SectionTitle>Price Range</SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Min Price (RM)</label>
                  <input
                    type="number"
                    value={localFilters.priceRange.min}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, min: e.target.value }
                    }))}
                    placeholder="e.g. 100000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Max Price (RM)</label>
                  <input
                    type="number"
                    value={localFilters.priceRange.max}
                    onChange={(e) => setLocalFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, max: e.target.value }
                    }))}
                    placeholder="e.g. 500000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Property Categories */}
            <section>
              <SectionTitle>Property Category</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_CATEGORIES.map(cat => (
                  <FilterChip
                    key={cat.id}
                    label={cat.label}
                    icon={cat.icon}
                    isSelected={localFilters.categories.includes(cat.id)}
                    onClick={() => handleToggleMulti('categories', cat.id)}
                  />
                ))}
              </div>
            </section>

            {/* Bedrooms */}
            <section>
              <SectionTitle>Bedrooms</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {BEDROOM_OPTIONS.map(opt => (
                  <FilterChip
                    key={opt}
                    label={opt}
                    isSelected={localFilters.bedrooms.includes(opt)}
                    onClick={() => handleToggleMulti('bedrooms', opt)}
                  />
                ))}
              </div>
            </section>

            {/* Bathrooms */}
            <section>
              <SectionTitle>Bathrooms</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {BATHROOM_OPTIONS.map(opt => (
                  <FilterChip
                    key={opt}
                    label={opt}
                    isSelected={localFilters.bathrooms.includes(opt)}
                    onClick={() => handleToggleMulti('bathrooms', opt)}
                  />
                ))}
              </div>
            </section>

            {/* Furnishing */}
            <section>
              <SectionTitle>Furnishing</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {FURNISHING_OPTIONS.map(opt => (
                  <FilterChip
                    key={opt}
                    label={opt.charAt(0).toUpperCase() + opt.slice(1)}
                    isSelected={localFilters.furnishing.includes(opt)}
                    onClick={() => handleToggleMulti('furnishing', opt)} 
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClear}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-white transition"
            >
              Clear
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-white transition"
            >
              Reset All
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition"
            >
              Apply Filters
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}