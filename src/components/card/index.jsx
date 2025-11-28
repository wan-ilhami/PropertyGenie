import React, { useState } from "react";
import { Bed, Bath, Ruler, X, MapPin, User, Phone, Mail, Home, ChevronRight } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function PropertyCard({ property }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price, section) =>
    section === "rent"
      ? `RM ${price.toLocaleString()}/month`
      : `RM ${price.toLocaleString()}`;

  const furnishingColors = {
    furnished: "bg-green-100 text-green-800",
    "fully furnished": "bg-green-100 text-green-800",
    "partially furnished": "bg-yellow-100 text-yellow-800",
    unfurnished: "bg-gray-100 text-gray-800",
  };

  return (
    <>
      {/* Card */}
      <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
        {/* Image Hero */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/70"></div>

          {/* Top-left badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold shadow-md transition-transform duration-300 group-hover:scale-110">
            {property.section === "rent" ? "For Rent" : "For Sale"}
          </span>

          {/* Top-right badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-sm transition-all duration-300 ${
                furnishingColors[property.furnishings] || "bg-gray-100 text-gray-800"
              }`}
            >
              {property.furnishings
                ? property.furnishings.charAt(0).toUpperCase() + property.furnishings.slice(1)
                : "Unknown"}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 truncate transition-colors duration-300 group-hover:text-blue-600">{property.name}</h3>
            <p className="text-gray-500 text-sm truncate mt-1">{property.address}</p>

            <div className="flex items-center gap-4 text-gray-600 mt-4">
              <div className="flex items-center gap-1.5 text-sm transition-transform duration-300 hover:scale-110">
                <Bed className="w-4 h-4 text-blue-600" />
                <span>{property.bedRooms}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm transition-transform duration-300 hover:scale-110">
                <Bath className="w-4 h-4 text-blue-600" />
                <span>{property.bathRooms}</span>
              </div>
              {property.floorSize && (
                <div className="flex items-center gap-1.5 text-sm transition-transform duration-300 hover:scale-110">
                  <Ruler className="w-4 h-4 text-blue-600" />
                  <span>{property.floorSize} sqft</span>
                </div>
              )}
            </div>
          </div>

          {/* Price & View Details */}
          <div className="mt-5 flex justify-between items-center">
            <span className="text-xl sm:text-2xl font-bold text-blue-600 transition-all duration-300 group-hover:scale-105">
              {formatPrice(property.price, property.section)}
            </span>
            <button
              className="px-5 py-2.5 text-white bg-blue-600 rounded-lg text-sm font-semibold shadow-md hover:shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              View Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal with Transition */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all">
                <div className="grid md:grid-cols-2 h-[85vh]">
                  {/* Left Side - Image & Key Info */}
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
                    {/* Main Image */}
                    <div className="relative flex-1 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-6 left-6 flex gap-3">
                        <span className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-semibold shadow-lg">
                          {property.section === "rent" ? "For Rent" : "For Sale"}
                        </span>
                        <span className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow-lg">
                          {property.category.charAt(0).toUpperCase() + property.category.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Property Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h2 className="text-4xl font-bold mb-3">{property.name}</h2>
                      <div className="flex items-start gap-2 text-white/90 mb-6">
                        <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                        <p className="text-sm">{property.address}</p>
                      </div>

                      {/* Key Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
                          <Bed className="w-6 h-6 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{property.bedRooms}</p>
                          <p className="text-xs text-white/80">Bedrooms</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
                          <Bath className="w-6 h-6 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{property.bathRooms}</p>
                          <p className="text-xs text-white/80">Bathrooms</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
                          <Ruler className="w-6 h-6 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{property.floorSize}</p>
                          <p className="text-xs text-white/80">sqft</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl px-6 py-4 inline-block">
                        <p className="text-3xl font-bold">{formatPrice(property.price, property.section)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Details */}
                  <div className="flex flex-col bg-white">
                    {/* Close Button */}
                    <div className="flex justify-end p-6 pb-0">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 group"
                      >
                        <X className="w-6 h-6 text-gray-600 group-hover:text-red-600 group-hover:rotate-90 transition-all duration-300" />
                      </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8">
                      {/* Property Details */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Property Details</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Type</span>
                            <span className="font-semibold text-gray-900 capitalize">{property.type}</span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Furnishing</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${furnishingColors[property.furnishings]}`}>
                              {property.furnishings ? property.furnishings.charAt(0).toUpperCase() + property.furnishings.slice(1) : 'Unknown'}
                            </span>
                          </div>
                          {property.landSize && (
                            <div className="flex justify-between py-3 border-b border-gray-100">
                              <span className="text-gray-600">Land Size</span>
                              <span className="font-semibold text-gray-900">{property.landSize} sqft</span>
                            </div>
                          )}
                          <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Location</span>
                            <span className="font-semibold text-gray-900">{property.city}, {property.state}</span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Postcode</span>
                            <span className="font-semibold text-gray-900">{property.postcode}</span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Listed</span>
                            <span className="font-semibold text-gray-900">{new Date(property.createdAt).toLocaleDateString('en-MY', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>

                      {/* Agent Info */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                          <div className="flex items-center gap-4 mb-5">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                              {property.account.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-lg font-bold text-gray-900">{property.account.name}</p>
                              <p className="text-sm text-gray-600">Property Agent</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mb-5">
                            <a href={`tel:${property.account.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                              <Phone className="w-5 h-5 text-blue-600" />
                              <span className="font-medium">{property.account.phone}</span>
                            </a>
                            <a href={`mailto:${property.account.email}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                              <Mail className="w-5 h-5 text-blue-600" />
                              <span className="font-medium text-sm">{property.account.email}</span>
                            </a>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <a
                              href={`tel:${property.account.phone}`}
                              className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 text-center text-sm"
                            >
                              Call Now
                            </a>
                            <a
                              href={`mailto:${property.account.email}`}
                              className="px-4 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 text-center text-sm"
                            >
                              Send Email
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
                        <div className="bg-gray-50 rounded-2xl p-5 text-center">
                          <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 mb-2">Coordinates</p>
                          <p className="text-gray-900 font-mono text-sm mb-4">
                            {property.coordinates.latitude}, {property.coordinates.longitude}
                          </p>
                          <a
                            href={`https://www.google.com/maps?q=${property.coordinates.latitude},${property.coordinates.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300"
                          >
                            View on Maps
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}