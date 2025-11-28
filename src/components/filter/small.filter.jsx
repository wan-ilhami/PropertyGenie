// src/components/filter/small.filter.jsx
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { 
  selectFilters, 
  selectActiveFilterCount,
  setBedrooms, 
  setBathrooms, 
  BEDROOM_OPTIONS, 
  BATHROOM_OPTIONS 
} from '@/store/filtersSlice';

export default function BedsAndBathsMenu() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const activeCount = useSelector(selectActiveFilterCount);

  const toggleBedroom = (value) => {
    const updated = filters.bedrooms.includes(value)
      ? filters.bedrooms.filter(v => v !== value)
      : [...filters.bedrooms, value];
    dispatch(setBedrooms(updated));
  };

  const toggleBathroom = (value) => {
    const updated = filters.bathrooms.includes(value)
      ? filters.bathrooms.filter(v => v !== value)
      : [...filters.bathrooms, value];
    dispatch(setBathrooms(updated));
  };

  const handleClear = () => {
    dispatch(setBedrooms([]));
    dispatch(setBathrooms([]));
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition">
        Beds & Baths
        {activeCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
            {activeCount}
          </span>
        )}
        <ChevronDownIcon className="w-4 h-4" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-5 space-y-5 focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900">Beds & Baths</h4>
          <button
            onClick={handleClear}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear
          </button>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2.5">BEDROOMS</label>
          <div className="grid grid-cols-3 gap-2">
            {BEDROOM_OPTIONS.map(bed => (
              <div key={bed}>
                <label className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={filters.bedrooms.includes(bed)}
                    onChange={() => toggleBedroom(bed)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{bed}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2.5">BATHROOMS</label>
          <div className="grid grid-cols-3 gap-2">
            {BATHROOM_OPTIONS.map(bath => (
              <div key={bath}>
                <label className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={filters.bathrooms.includes(bath)}
                    onChange={() => toggleBathroom(bath)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{bath}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </MenuItems>
    </Menu>
  );
}
