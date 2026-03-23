'use client';

import { useMemo, useState } from 'react';

type InterestedProduct = 'Aseptic Bricks' | 'Aseptic Pillows' | 'Eco-Friendly Board' | 'U Straws';

type FormState = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  companyName: string;
  websiteUrl: string;
  jobFunction: string;
  jobTitle: string;
  countryRegion: string;
  interestedIn: string;
  products: InterestedProduct[];
  message: string;
};

const PRODUCT_OPTIONS: InterestedProduct[] = [
  'Aseptic Bricks',
  'Aseptic Pillows',
  'Eco-Friendly Board',
  'U Straws',
];

const JOB_FUNCTION_OPTIONS = [
  'Select function',
  'Sales & Partnerships',
  'Technical Support',
  'Marketing',
  'Operations',
];

const INTEREST_OPTIONS = [
  'Select option',
  'Partnership opportunities',
  'Technical consultation',
  'Product information',
  'Other inquiry',
];

export default function ContactUsMessageLeft() {
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    companyName: '',
    websiteUrl: '',
    jobFunction: 'Select function',
    jobTitle: '',
    countryRegion: '',
    interestedIn: 'Select option',
    products: [],
    message: '',
  });

  const selectedProductsSet = useMemo(() => new Set(formData.products), [formData.products]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleProduct = (product: InterestedProduct) => {
    setFormData((prev) => {
      const has = prev.products.includes(product);
      const products = has ? prev.products.filter((p) => p !== product) : [...prev.products, product];
      return { ...prev, products };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary handling (no backend yet)
    console.log('Send inquiry form submitted:', formData);
    setFormData({
      firstName: '',
      lastName: '',
      emailAddress: '',
      phoneNumber: '',
      companyName: '',
      websiteUrl: '',
      jobFunction: 'Select function',
      jobTitle: '',
      countryRegion: '',
      interestedIn: 'Select option',
      products: [],
      message: '',
    });
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
        Send us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="firstName">
              First Name <span className="text-[#333]">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Jane"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="lastName">
              Last Name <span className="text-[#333]">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            />
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="emailAddress">
              Email Address <span className="text-[#333]">*</span>
            </label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={handleChange}
              required
              placeholder="jane@company.com"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            />
          </div>
        </div>

        {/* Third row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="companyName">
              Company Name <span className="text-[#333]">*</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Enter company name"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="websiteUrl">
              Company Website URL
            </label>
            <input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="https://www.example.com"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            />
          </div>
        </div>

        {/* Fourth row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="jobFunction">
              Job Function <span className="text-[#333]">*</span>
            </label>
            <select
              id="jobFunction"
              name="jobFunction"
              value={formData.jobFunction}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            >
              {JOB_FUNCTION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="jobTitle">
              Job Title <span className="text-[#333]">*</span>
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              placeholder="Select title"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            />
          </div>
        </div>

        {/* Fifth row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="countryRegion">
              Country/Region <span className="text-[#333]">*</span>
            </label>
            <input
              id="countryRegion"
              name="countryRegion"
              type="text"
              value={formData.countryRegion}
              onChange={handleChange}
              required
              placeholder="e.g. United Kingdom"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="interestedIn">
              What are you interested in? <span className="text-[#333]">*</span>
            </label>
            <select
              id="interestedIn"
              name="interestedIn"
              value={formData.interestedIn}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base"
            >
              {INTEREST_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products */}
        <div>
          <p className="text-sm font-medium text-gray-900 mb-3">Interested Products</p>
          <div className="flex flex-wrap gap-4">
            {PRODUCT_OPTIONS.map((product) => {
              const checked = selectedProductsSet.has(product);
              return (
                <label key={product} className="inline-flex items-center gap-2 text-sm text-gray-900">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleProduct(product)}
                    className="h-4 w-4 accent-[#009FE8]"
                  />
                  <span className="select-none">{product}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="How can we help you?"
            className="w-full px-6 py-4 rounded-[15px] border border-gray-200  focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-gray-900 placeholder-gray-400 text-base resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer justify-center inline-flex items-center bg-[#009FE8] text-white text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#0077B6] transition-colors group py-4 rounded-[50px]"
        >
          Send Inquiry
        </button>
      </form>
    </div>
  );
}

