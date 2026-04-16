'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitForm } from '@/lib/forms/client';

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
  interestedProduct: string;
  interestedMarketingSupportService: string;
  interestedTechnicalSupportService: string;
  message: string;
};

const INTERESTED_PRODUCT_OPTIONS = [
  'Select product',
  'Roll Fed Packaging (Standard Products)',
  'Sleeve Packaging (LamiSleeve)',
  'LamiCap (Laminated Cap)',
  'LamiStraw (Laminated Straw)',
  'One Pack One Code',
  'Other',
];

const INTERESTED_MARKETING_SUPPORT_OPTIONS = [
  'Select marketing support service',
  'Business Intelligence',
  'Recipe Support',
  'Creative Consultancy',
  'Sales Distribution',
  'Other',
];

const INTERESTED_TECHNICAL_SUPPORT_OPTIONS = [
  'Select technical support service',
  'LamiCare - Maintenance, Support, Parts & Training',
  'LamiPremium - Commitment, Conversion, Installation & Maintenance',
  'LamiPartner - Automation, Startup & Digital',
  'Other',
];

const JOB_FUNCTION_OPTIONS = [
  'Select function',
  'C-suite',
  'Product',
  'R&D',
  'Supply Chain',
  'Quality Assurance',
  'Engineering',
  'Marketing',
  'Sales',
  'Customer Service',
  'Procurement',
  'Other',
];

const JOB_TITLE_OPTIONS = [
  'Select title',
  'Director',
  'Manager',
  'Senior',
  'Junior',
  'Assistant',
  'Designer',
  'Analyst',
];

const INTEREST_OPTIONS = [
  'Select option',
  'Products & Services',
  'Job Opportunity',
  'Becoming Our Supplier',
  'Downloading Resources',
  'Other',
];

const COUNTRY_OPTIONS = [
  'Select country',
  'America',
  'Andorra',
  'United',
  'Afghanistan',
  'Antigua',
  'Albania',
  'Armenia',
  'Angola',
  'Argentina',
  'Austria',
  'Australia',
  'Aruba',
  'Azerbaijan',
  'Bosnia',
  'Barbados',
  'Bangladesh',
  'Belgium',
  'Burkina',
  'Bulgaria',
  'Bahrain',
  'Burundi',
  'Benin',
  'Bermuda',
  'Brunei',
  'Bolivia',
  'Brazil',
  'Bahamas',
  'Bhutan',
  'Botswana',
  'Belarus',
  'Belize',
  'Canada',
  'Democratic',
  'Central',
  'Democratic',
  'Switzerland',
  'Chile',
  'Cameroon',
  'China',
  'Colombia',
  'Costa',
  'Cuba',
  'Cape',
  'Cyprus',
  'Czech',
  'Germany',
  'Djibouti',
  'Denmark',
  'Dominica',
  'Dominican',
  'Algeria',
  'Ecuador',
  'Estonia',
  'Egypt',
  'Eritrea',
  'Spain',
  'Ethiopia',
  'Finland',
  'Fiji',
  'Falkland',
  'Micronesia',
  'Faroe',
  'France',
  'Gabon',
  'United',
  'Grenada',
  'Georgia',
  'Ghana',
  'Gibraltar',
  'Gambia',
  'Guinea',
  'Equatorial',
  'Greece',
  'Guatemala',
  'Guinea',
  'Guyana',
  'Hong',
  'Honduras',
  'Croatia',
  'Haiti',
  'Hungary',
  'Indonesia',
  'Ireland',
  'Israel',
  'India',
  'Iraq',
  'Iran',
  'Iceland',
  'Italy',
  'Jamaica',
  'Jordan',
  'Japan',
  'Kenya',
  'Kyrgyzstan',
  'Cambodia',
  'Kiribati',
  'Comoros',
  'Saint',
  'North',
  'South',
  'Kuwait',
  'Cayman',
  'Kazakhstan',
  'Laos',
  'Lebanon',
  'Saint',
  'Liechtenstein',
  'Sri',
  'Liberia',
  'Lesotho',
  'Lithuania',
  'Luxembourg',
  'Latvia',
  'Libya',
  'Morocco',
  'Monaco',
  'Moldova',
  'Montenegro',
  'Madagascar',
  'Macedonia',
  'Mali',
  'Myanmar',
  'Mongolia',
  'Macao',
  'Mauritania',
  'Malta',
  'Mauritius',
  'Maldives',
  'Malawi',
  'Mexico',
  'Malaysia',
  'Mozambique',
  'Namibia',
  'Niger',
  'Nigeria',
  'Nicaragua',
  'Netherlands',
  'Norway',
  'Nepal',
  'Nauru',
  'New',
  'Oman',
  'Panama',
  'Peru',
  'Papua',
  'Philippines',
  'Pakistan',
  'Poland',
  'Puerto',
  'Palestine',
  'Portugal',
  'Palau',
  'Paraguay',
  'Qatar',
  'Romania',
  'Serbia',
  'Russia',
  'Rwanda',
  'Saudi',
  'Solomon',
  'Seychelles',
  'Sudan',
  'Sweden',
  'Singapore',
  'Slovenia',
  'Slovak',
  'Sierra',
  'San',
  'Senegal',
  'Somalia',
  'Suriname',
  'Sao',
  'El',
  'Syria',
  'Swaziland',
  'Chad',
  'Togo',
  'Thailand',
  'Tajikistan',
  'Turkmenistan',
  'Tunisia',
  'Tonga',
  'Turkey',
  'Trinidad',
  'Tuvalu',
  'Taiwan',
  'Tanzania',
  'Ukraine',
  'Uganda',
  'Uruguay',
  'Uzbekistan',
  'Saint',
  'Venezuela',
  'British',
  'Vietnam',
  'Vanuatu',
  'Wallis',
  'Western',
  'Yemen',
  'South',
  'Zambia',
  'Zimbabwe',
];

type SearchableSelectProps = {
  id: string;
  name: keyof FormState;
  label: string;
  options: string[];
  value: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onChange: (name: keyof FormState, value: string) => void;
};

function SearchableSelect({
  id,
  name,
  label,
  options,
  value,
  disabled,
  required,
  error,
  onChange,
}: SearchableSelectProps) {
  const placeholder = options[0] || 'Select option';
  const selectable = useMemo(() => options.filter((opt) => opt !== placeholder), [options, placeholder]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return selectable;
    return selectable.filter((opt) => opt.toLowerCase().includes(q));
  }, [selectable, query]);

  const displayValue = value && value !== placeholder ? value : '';

  const handleSelect = (opt: string) => {
    onChange(name, opt);
    setQuery('');
    setOpen(false);
  };

  const handleBlur = () => {
    window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-black mb-2" htmlFor={id}>
        {label} {required ? <span className="text-[#333]">*</span> : null}
      </label>
      <div className="relative">
        <input
          id={id}
          name={String(name)}
          type="text"
          autoComplete="off"
          disabled={disabled}
          required={required}
          value={open ? query : displayValue}
          placeholder={placeholder}
          onFocus={() => {
            setOpen(true);
            setQuery(displayValue);
          }}
          onBlur={handleBlur}
          onChange={(e) => {
            setOpen(true);
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
              return;
            }
            if (e.key === 'Enter') {
              if (filtered[0]) {
                e.preventDefault();
                handleSelect(filtered[0]);
              }
            }
          }}
          className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#7A97A9]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>

        {open ? (
          <div className="absolute z-20 mt-2 w-full rounded-[15px] border border-[#E5F2FA] bg-white shadow-lg">
            <ul
              id={`${id}-listbox`}
              role="listbox"
              className="max-h-56 overflow-auto py-2 text-sm text-black"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-2 text-gray-500">No results found</li>
              ) : (
                filtered.map((opt, idx) => (
                  <li key={`${opt}-${idx}`}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(opt)}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left hover:bg-[#F1FAFF] ${opt === value ? 'bg-[#E5F2FA] font-semibold' : ''
                        }`}
                    >
                      <span>{opt}</span>
                      {opt === value ? (
                        <svg
                          className="h-4 w-4 text-[#009FE8]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : null}
      </div>
      {error ? <p className="mt-2 text-sm text-[#B42318]">{error}</p> : null}
    </div>
  );
}

export default function ContactUsMessageLeft() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    companyName: '',
    websiteUrl: '',
    jobFunction: 'Select function',
    jobTitle: 'Select title',
    countryRegion: 'Select country',
    interestedIn: 'Select option',
    interestedProduct: 'Select product',
    interestedMarketingSupportService: 'Select marketing support service',
    interestedTechnicalSupportService: 'Select technical support service',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const wantsProductsAndServices = formData.interestedIn.trim() === 'Products & Services';

  const updateField = (name: keyof FormState, value: string) => {
    setFormData((prev) => {
      const next: FormState = { ...prev, [name]: value } as FormState;
      if (name === 'interestedIn' && value.trim() !== 'Products & Services') {
        next.interestedProduct = 'Select product';
        next.interestedMarketingSupportService = 'Select marketing support service';
        next.interestedTechnicalSupportService = 'Select technical support service';
      }
      return next;
    });
    if (errorMessage) setErrorMessage(null);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      if (name === 'interestedIn' && value.trim() !== 'Products & Services') {
        delete next.interestedProduct;
        delete next.interestedMarketingSupportService;
        delete next.interestedTechnicalSupportService;
      }
      return next;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof FormState, value);
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof FormState, string>> = {};

    if (formData.jobFunction === 'Select function') {
      errors.jobFunction = 'Please select a job function.';
    }

    if (formData.interestedIn === 'Select option') {
      errors.interestedIn = 'Please select an option.';
    }

    if (formData.countryRegion === 'Select country') {
      errors.countryRegion = 'Please select a country/region.';
    }

    if (!formData.jobTitle.trim() || formData.jobTitle === 'Select title') {
      errors.jobTitle = 'Please select a job title.';
    }

    if (wantsProductsAndServices) {
      if (formData.interestedProduct === 'Select product') {
        errors.interestedProduct = 'Please select an interested product.';
      }
      if (formData.interestedMarketingSupportService === 'Select marketing support service') {
        errors.interestedMarketingSupportService = 'Please select a marketing support service.';
      }
      if (formData.interestedTechnicalSupportService === 'Select technical support service') {
        errors.interestedTechnicalSupportService = 'Please select a technical support service.';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const interestedIn = formData.interestedIn.trim();
    const includeServiceFields = interestedIn === 'Products & Services';

    const result = await submitForm('contact', {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      emailAddress: formData.emailAddress.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      companyName: formData.companyName.trim(),
      websiteUrl: formData.websiteUrl.trim(),
      jobFunction: formData.jobFunction.trim(),
      jobTitle: formData.jobTitle.trim(),
      countryRegion: formData.countryRegion.trim(),
      interestedIn,
      interestedProduct: includeServiceFields ? formData.interestedProduct.trim() : '',
      interestedMarketingSupportService: includeServiceFields
        ? formData.interestedMarketingSupportService.trim()
        : '',
      interestedTechnicalSupportService: includeServiceFields
        ? formData.interestedTechnicalSupportService.trim()
        : '',
      message: formData.message.trim(),
    });

    if (result.ok) {
      router.push('/thank-you?form=contact');
      return;
    }

    setErrorMessage(result.message);
    if (result.fieldErrors) {
      const nextErrors: Partial<Record<keyof FormState, string>> = {};
      for (const [key, value] of Object.entries(result.fieldErrors)) {
        if (key in formData) {
          nextErrors[key as keyof FormState] = value;
        }
      }
      setFieldErrors(nextErrors);
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
        Send us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="firstName">
              First Name <span className="text-[#333]">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
              maxLength={50}
              placeholder="Jane"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
            />
            {fieldErrors.firstName ? (
              <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.firstName}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="lastName">
              Last Name <span className="text-[#333]">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
              maxLength={50}
              placeholder="Doe"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
            />
            {fieldErrors.lastName ? (
              <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.lastName}</p>
            ) : null}
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="emailAddress">
              Email Address <span className="text-[#333]">*</span>
            </label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={handleChange}
              disabled={isSubmitting}
              required
              maxLength={50}
              placeholder="jane@company.com"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
            />
            {fieldErrors.emailAddress ? (
              <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.emailAddress}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={isSubmitting}
              maxLength={20}
              placeholder="+1 (555) 000-0000"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
            />
            {fieldErrors.phoneNumber ? (
              <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.phoneNumber}</p>
            ) : null}
          </div>
        </div>

        {/* Third row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="companyName">
              Company Name <span className="text-[#333]">*</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              disabled={isSubmitting}
              required
              maxLength={50}
              placeholder="Enter company name"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
            />
            {fieldErrors.companyName ? (
              <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.companyName}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="websiteUrl">
              Company Website URL
            </label>
            <input
              id="websiteUrl"
              name="websiteUrl"
              type="text"
              inputMode="url"
              value={formData.websiteUrl}
              onChange={handleChange}
              disabled={isSubmitting}
              maxLength={255}
              placeholder="https://www.example.com"
              className="w-full px-6 py-4 rounded-[15px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base disabled:opacity-70"
            />
            {fieldErrors.websiteUrl ? (
              <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.websiteUrl}</p>
            ) : null}
          </div>
        </div>

        {/* Fourth row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchableSelect
            id="jobFunction"
            name="jobFunction"
            label="Job Function"
            options={JOB_FUNCTION_OPTIONS}
            value={formData.jobFunction}
            disabled={isSubmitting}
            required
            error={fieldErrors.jobFunction}
            onChange={updateField}
          />

          <SearchableSelect
            id="jobTitle"
            name="jobTitle"
            label="Job Title"
            options={JOB_TITLE_OPTIONS}
            value={formData.jobTitle}
            disabled={isSubmitting}
            required
            error={fieldErrors.jobTitle}
            onChange={updateField}
          />
        </div>

        {/* Fifth row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchableSelect
            id="countryRegion"
            name="countryRegion"
            label="Country/Region"
            options={COUNTRY_OPTIONS}
            value={formData.countryRegion}
            disabled={isSubmitting}
            required
            error={fieldErrors.countryRegion}
            onChange={updateField}
          />

          <SearchableSelect
            id="interestedIn"
            name="interestedIn"
            label="What are you interested in?"
            options={INTEREST_OPTIONS}
            value={formData.interestedIn}
            disabled={isSubmitting}
            required
            error={fieldErrors.interestedIn}
            onChange={updateField}
          />
        </div>

        {wantsProductsAndServices ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchableSelect
              id="interestedProduct"
              name="interestedProduct"
              label="Interested Products"
              options={INTERESTED_PRODUCT_OPTIONS}
              value={formData.interestedProduct}
              disabled={isSubmitting}
              required
              error={fieldErrors.interestedProduct}
              onChange={updateField}
            />

            <SearchableSelect
              id="interestedMarketingSupportService"
              name="interestedMarketingSupportService"
              label="Interested Marketing Support Service"
              options={INTERESTED_MARKETING_SUPPORT_OPTIONS}
              value={formData.interestedMarketingSupportService}
              disabled={isSubmitting}
              required
              error={fieldErrors.interestedMarketingSupportService}
              onChange={updateField}
            />

            <div className="md:col-span-2">
              <SearchableSelect
                id="interestedTechnicalSupportService"
                name="interestedTechnicalSupportService"
                label="Interested Technical Support Service"
                options={INTERESTED_TECHNICAL_SUPPORT_OPTIONS}
                value={formData.interestedTechnicalSupportService}
                disabled={isSubmitting}
                required
                error={fieldErrors.interestedTechnicalSupportService}
                onChange={updateField}
              />
            </div>
          </div>
        ) : null}

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-black mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            rows={5}
            maxLength={200}
            placeholder="How can we help you?"
            className="w-full px-6 py-4 rounded-[15px] border border-gray-200  focus:outline-none focus:ring-2 focus:ring-[#009FE8] text-black placeholder-gray-400 text-base resize-none disabled:opacity-70"
          />
          {fieldErrors.message ? (
            <p className="mt-2 text-sm text-[#B42318]">{fieldErrors.message}</p>
          ) : null}
        </div>


        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[250px] mx-auto cursor-pointer justify-center inline-flex items-center bg-[#009FE8] text-white text-base md:text-lg font-bold uppercase tracking-wider hover:bg-[#0077B6] transition-colors group py-4 rounded-[50px] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
          </button>
        </div>


        {errorMessage ? (
          <p className="text-sm text-[#B42318]" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}
