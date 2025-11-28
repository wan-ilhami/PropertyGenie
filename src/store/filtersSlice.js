// src/store/filtersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  HomeIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import Api from '@/api/data';

const INITIAL_STATE = {
  data: [],
  filteredData: [],
  loading: false,
  error: null,
  searchQuery: '',
  categories: [],
  bedrooms: [],
  bathrooms: [],
  tenure: [],
  furnishing: [],
  isAuction: false,
  priceRange: {
    min: '',
    max: ''
  }
};

export const PROPERTY_CATEGORIES = [
  { id: 'residential', label: 'Residential', icon: HomeIcon },
  { id: 'apartment', label: 'Apartment', icon: BuildingOfficeIcon },
  { id: 'commercial', label: 'Commercial', icon: BuildingStorefrontIcon },
  { id: 'industrial', label: 'Industrial', icon: TruckIcon },
];

export const BEDROOM_OPTIONS = ['1', '2', '3', '4', '5+'];
export const BATHROOM_OPTIONS = ['1', '2', '3', '4+'];
export const TENURE_OPTIONS = ['Freehold', 'Leasehold'];
export const FURNISHING_OPTIONS = ['furnished', 'partially furnished', 'unfurnished', 'fully furnished'];

// Async thunk
export const GetData = createAsyncThunk('filters/getAllData', Api.handler);

// Filter function
const applyFilters = (data, filters) => {
  if (!data || data.length === 0) return [];

  return data.filter(property => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        property.name.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.id.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.state.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.categories.length > 0) {
      if (!filters.categories.includes(property.category)) return false;
    }

    // Bedroom filter
    if (filters.bedrooms.length > 0) {
      const propertyBeds = property.bedRooms.toString();
      const matchesBeds = filters.bedrooms.some(bed => {
        if (bed === '5+') return property.bedRooms >= 5;
        return propertyBeds === bed;
      });
      if (!matchesBeds) return false;
    }

    // Bathroom filter
    if (filters.bathrooms.length > 0) {
      const propertyBaths = property.bathRooms.toString();
      const matchesBaths = filters.bathrooms.some(bath => {
        if (bath === '4+') return property.bathRooms >= 4;
        return propertyBaths === bath;
      });
      if (!matchesBaths) return false;
    }

    // Furnishing filter
    if (filters.furnishing.length > 0) {
      if (!filters.furnishing.includes(property.furnishings)) return false;
    }

    // Price range filter
    if (filters.priceRange.min || filters.priceRange.max) {
      const price = property.price;
      const min = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
      const max = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
      
      if (price < min || price > max) return false;
    }

    return true;
  });
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: INITIAL_STATE,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredData = applyFilters(state.data, state);
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter(c => c !== category);
      } else {
        state.categories.push(category);
      }
      state.filteredData = applyFilters(state.data, state);
    },
    toggleBedroom: (state, action) => {
      const bedroom = action.payload;
      if (state.bedrooms.includes(bedroom)) {
        state.bedrooms = state.bedrooms.filter(b => b !== bedroom);
      } else {
        state.bedrooms.push(bedroom);
      }
      state.filteredData = applyFilters(state.data, state);
    },
    toggleBathroom: (state, action) => {
      const bathroom = action.payload;
      if (state.bathrooms.includes(bathroom)) {
        state.bathrooms = state.bathrooms.filter(b => b !== bathroom);
      } else {
        state.bathrooms.push(bathroom);
      }
      state.filteredData = applyFilters(state.data, state);
    },
    setBedrooms: (state, action) => {
      state.bedrooms = action.payload;
      state.filteredData = applyFilters(state.data, state);
    },
    setBathrooms: (state, action) => {
      state.bathrooms = action.payload;
      state.filteredData = applyFilters(state.data, state);
    },
    setTenure: (state, action) => {
      state.tenure = action.payload;
      state.filteredData = applyFilters(state.data, state);
    },
    setFurnishing: (state, action) => {
      state.furnishing = action.payload;
      state.filteredData = applyFilters(state.data, state);
    },
    setIsAuction: (state, action) => {
      state.isAuction = action.payload;
      state.filteredData = applyFilters(state.data, state);
    },
    setPriceRange: (state, action) => {
      state.priceRange = { ...state.priceRange, ...action.payload };
      state.filteredData = applyFilters(state.data, state);
    },
    updateAllFilters: (state, action) => {
      Object.keys(action.payload).forEach(key => {
        if (key !== 'data' && key !== 'filteredData' && key !== 'loading' && key !== 'error') {
          state[key] = action.payload[key];
        }
      });
      state.filteredData = applyFilters(state.data, state);
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.categories = [];
      state.bedrooms = [];
      state.bathrooms = [];
      state.tenure = [];
      state.furnishing = [];
      state.isAuction = false;
      state.priceRange = { min: '', max: '' };
      state.filteredData = state.data;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(GetData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.items || action.payload;
        state.filteredData = applyFilters(state.data, state);
        state.error = null;
      })
      .addCase(GetData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error?.message;
      });
  },
});

export const {
  setSearchQuery,
  toggleCategory,
  toggleBedroom,
  toggleBathroom,
  setBedrooms,
  setBathrooms,
  setTenure,
  setFurnishing,
  setIsAuction,
  setPriceRange,
  updateAllFilters,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

// Selectors
export const selectFilters = (state) => state.filters;
export const selectFilteredData = (state) => state.filters.filteredData;
export const selectActiveFilterCount = (state) => {
  const { categories, bedrooms, bathrooms, tenure, furnishing, isAuction, priceRange } = state.filters;

  return (
    categories.length +
    bedrooms.length +
    bathrooms.length +
    tenure.length +
    furnishing.length +
    (isAuction ? 1 : 0) +
    ((priceRange.min || priceRange.max) ? 1 : 0)
  );
};