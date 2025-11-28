// src/components/filter/components.jsx
import React from 'react';

export function SectionTitle({ children }) {
  return (
    <h3 className="text-sm font-semibold text-gray-900 mb-3">
      {children}
    </h3>
  );
}

export function FilterChip({ label, icon: Icon, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition
        ${isSelected 
          ? 'bg-blue-600 text-white shadow-sm' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </button>
  );
}