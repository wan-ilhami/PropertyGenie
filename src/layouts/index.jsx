// src/layouts/MainLayout.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Home, ChevronRight, Sparkles, Building2, TrendingUp } from "lucide-react";
import Header from "./header";
import Footer from "./footer";
import FilterBar from "@/components/filter";
import PropertyCard from "@/components/card";
import { selectFilters, selectFilteredData, GetData } from "@/store/filtersSlice";

export default function MainLayout() {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(selectFilters);
  const filteredData = useSelector(selectFilteredData);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    dispatch(GetData());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalProperties = data?.length || 0;
  const displayedProperties = filteredData?.length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full">

        {/* Content Container */}
        <div className="max-w-7xl w-full px-6 sm:px-10 py-8 mx-auto">
          {/* Breadcrumbs */}
          <nav className="mb-6" aria-label="breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="#" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </a>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Properties
                </a>
              </li>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <li>
                <span className="font-semibold text-gray-900">All Properties</span>
              </li>
            </ol>
          </nav>

          {/* Filter Bar */}
          <FilterBar />


          {/* Property Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-xl font-semibold text-gray-900 mb-2">Loading Properties</p>
                <p className="text-gray-500">Finding the best listings for you...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-12 text-center shadow-lg">
              <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <p className="text-xl font-bold text-red-900 mb-2">Oops! Something went wrong</p>
              <p className="text-red-700 mb-6">{error}</p>
              <button
                onClick={() => dispatch(GetData())}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          ) : filteredData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredData.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <PropertyCard property={item} />
                  </div>
                ))}
              </div>

            </>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-16 text-center shadow-lg">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-3">No Properties Found</p>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-110 flex items-center justify-center z-40"
          aria-label="Scroll to top"
        >
          <ChevronRight className="w-6 h-6 -rotate-90" />
        </button>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}