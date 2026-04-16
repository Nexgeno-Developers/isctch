import { NextResponse } from 'next/server';
import type { FormDataByType, FormSubmitRequest, FormType } from '@/lib/forms/types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORM_TYPE_MAP: Record<FormType, string> = {
  subscription: 'subscription',
  get_in_touch: 'get_in_touch',
  message: 'message',
  contact: 'contact',
};

const PLACEHOLDER_VALUES = new Set(['select function', 'select option', 'select country', 'select title']);
const MAX_FIELD_LENGTH = 50;
const MAX_MESSAGE_LENGTH = 200;

const BACKEND_FIELD_MAP: Record<FormType, Record<string, string>> = {
  subscription: {
    email: 'email',
  },
  get_in_touch: {
    name: 'firstName',
    email: 'emailAddress',
    phone: 'phoneNumber',
    message: 'message',
  },
  message: {
    name: 'firstName',
    first_name: 'firstName',
    last_name: 'lastName',
    email: 'emailAddress',
    phone: 'phoneNumber',
    message: 'message',
  },
  contact: {
    name: 'firstName',
    first_name: 'firstName',
    last_name: 'lastName',
    email: 'emailAddress',
    phone: 'phoneNumber',
    company_name: 'companyName',
    company_url: 'websiteUrl',
    job_function: 'jobFunction',
    job_title: 'jobTitle',
    country: 'countryRegion',
    interests: 'interestedIn',
    interested_products: 'products',
    message: 'message',
  },
};

function buildFormsSubmitUrl(baseUrl: string): string {
  const trimmed = baseUrl.replace(/\/+$/, '');
  if (!trimmed) return '';

  if (/\/api\/v1$/i.test(trimmed)) {
    return `${trimmed}/forms/submit`;
  }

  if (/\/api$/i.test(trimmed)) {
    return `${trimmed}/v1/forms/submit`;
  }

  return `${trimmed}/api/v1/forms/submit`;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isPlaceholder(value: string): boolean {
  return PLACEHOLDER_VALUES.has(value.trim().toLowerCase());
}

function normalizePhone(value: string): { raw: string; digits: string } {
  const raw = value.trim();
  const digits = raw.replace(/\D/g, '');
  return { raw, digits };
}

function addMaxLengthError(
  fieldErrors: Record<string, string>,
  fieldKey: string,
  label: string,
  value: string,
  maxLength: number,
) {
  if (value.length > maxLength) {
    fieldErrors[fieldKey] = `${label} must be ${maxLength} characters or fewer.`;
  }
}

function extractBackendFieldErrors(
  formType: FormType,
  responseBody: unknown,
): Record<string, string> | undefined {
  const bodyRecord = asRecord(responseBody);
  const errorsRecord = asRecord(bodyRecord?.errors);
  if (!errorsRecord) return undefined;

  const fieldMap = BACKEND_FIELD_MAP[formType];
  const mapped: Record<string, string> = {};

  for (const [key, value] of Object.entries(errorsRecord)) {
    const mappedKey = fieldMap[key];
    if (!mappedKey) continue;

    let message: string | undefined;
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
      message = value[0];
    } else if (typeof value === 'string') {
      message = value;
    }

    if (message) {
      mapped[mappedKey] = message;
    }
  }

  return Object.keys(mapped).length > 0 ? mapped : undefined;
}

function buildPayload(
  formType: FormType,
  data: FormDataByType[FormType],
): { payload?: Record<string, unknown>; fieldErrors?: Record<string, string> } {
  const fieldErrors: Record<string, string> = {};

  if (formType === 'subscription') {
    const email = normalizeString((data as FormDataByType['subscription']).email);
    if (!email) fieldErrors.email = 'Email is required.';
    else if (!EMAIL_REGEX.test(email)) fieldErrors.email = 'Please enter a valid email address.';
    else addMaxLengthError(fieldErrors, 'email', 'Email', email, MAX_FIELD_LENGTH);

    if (Object.keys(fieldErrors).length) return { fieldErrors };

    return {
      payload: {
        form_name: FORM_TYPE_MAP[formType],
        email,
      },
    };
  }

  if (formType === 'get_in_touch') {
    const typed = data as FormDataByType['get_in_touch'];
    const firstName = normalizeString(typed.firstName);
    const lastName = normalizeString(typed.lastName);
    const email = normalizeString(typed.emailAddress);
    const { raw: phoneRaw, digits: phoneDigits } = normalizePhone(normalizeString(typed.phoneNumber));
    const message = normalizeString(typed.message);
    const name = [firstName, lastName].filter(Boolean).join(' ').trim();

    if (!name) fieldErrors.firstName = 'Name is required.';
    if (!email) fieldErrors.emailAddress = 'Email address is required.';
    else if (!EMAIL_REGEX.test(email)) fieldErrors.emailAddress = 'Please enter a valid email address.';
    else addMaxLengthError(fieldErrors, 'emailAddress', 'Email address', email, MAX_FIELD_LENGTH);

    if (name) addMaxLengthError(fieldErrors, 'firstName', 'Name', name, MAX_FIELD_LENGTH);

    if (phoneRaw) {
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        fieldErrors.phoneNumber = 'Phone number must contain 10 to 15 digits.';
      }
    }

    if (message) {
      addMaxLengthError(fieldErrors, 'message', 'Message', message, MAX_MESSAGE_LENGTH);
    }

    if (Object.keys(fieldErrors).length) return { fieldErrors };

    const payload: Record<string, unknown> = {
      form_name: FORM_TYPE_MAP[formType],
      name,
      email,
    };

    if (phoneDigits) {
      payload.phone = phoneDigits;
    }

    if (message) {
      payload.message = message;
    }

    return {
      payload,
    };
  }

  if (formType === 'message') {
    const typed = data as FormDataByType['message'];
    const firstName = normalizeString(typed.firstName);
    const lastName = normalizeString(typed.lastName);
    const email = normalizeString(typed.emailAddress);
    const { raw: phoneRaw, digits: phoneDigits } = normalizePhone(normalizeString(typed.phoneNumber));
    const message = normalizeString(typed.message);

    if (!firstName) fieldErrors.firstName = 'First name is required.';
    if (!lastName) fieldErrors.lastName = 'Last name is required.';
    if (firstName) addMaxLengthError(fieldErrors, 'firstName', 'First name', firstName, MAX_FIELD_LENGTH);
    if (lastName) addMaxLengthError(fieldErrors, 'lastName', 'Last name', lastName, MAX_FIELD_LENGTH);
    if (!email) fieldErrors.emailAddress = 'Email address is required.';
    else if (!EMAIL_REGEX.test(email)) fieldErrors.emailAddress = 'Please enter a valid email address.';
    else addMaxLengthError(fieldErrors, 'emailAddress', 'Email address', email, MAX_FIELD_LENGTH);

    if (phoneRaw) {
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        fieldErrors.phoneNumber = 'Phone number must contain 10 to 15 digits.';
      }
    }

    if (message) {
      addMaxLengthError(fieldErrors, 'message', 'Message', message, MAX_MESSAGE_LENGTH);
    }

    if (Object.keys(fieldErrors).length) return { fieldErrors };

    const payload: Record<string, unknown> = {
      form_name: FORM_TYPE_MAP[formType],
      first_name: firstName,
      last_name: lastName,
      email,
    };

    if (phoneDigits) {
      payload.phone = phoneDigits;
    }

    if (message) {
      payload.message = message;
    }

    return { payload };
  }

  const typed = data as FormDataByType['contact'];
  const firstName = normalizeString(typed.firstName);
  const lastName = normalizeString(typed.lastName);
  const email = normalizeString(typed.emailAddress);
  const phoneInput = normalizeString(typed.phoneNumber);
  const { raw: phoneRaw, digits: phoneDigits } = normalizePhone(phoneInput);
  const companyName = normalizeString(typed.companyName);
  const websiteUrl = normalizeString(typed.websiteUrl);
  const jobFunction = normalizeString(typed.jobFunction);
  const jobTitle = normalizeString(typed.jobTitle);
  const countryRegion = normalizeString(typed.countryRegion);
  const interestedIn = normalizeString(typed.interestedIn);
  const message = normalizeString(typed.message);
  const products = Array.isArray(typed.products)
    ? typed.products.map((product) => product.trim()).filter(Boolean)
    : [];
  const productsText = products.join(', ');

  if (!firstName) fieldErrors.firstName = 'First name is required.';
  if (!lastName) fieldErrors.lastName = 'Last name is required.';
  if (firstName) addMaxLengthError(fieldErrors, 'firstName', 'First name', firstName, MAX_FIELD_LENGTH);
  if (lastName) addMaxLengthError(fieldErrors, 'lastName', 'Last name', lastName, MAX_FIELD_LENGTH);
  if (!email) fieldErrors.emailAddress = 'Email address is required.';
  else if (!EMAIL_REGEX.test(email)) fieldErrors.emailAddress = 'Please enter a valid email address.';
  else addMaxLengthError(fieldErrors, 'emailAddress', 'Email address', email, MAX_FIELD_LENGTH);
  if (!companyName) fieldErrors.companyName = 'Company name is required.';
  else addMaxLengthError(fieldErrors, 'companyName', 'Company name', companyName, MAX_FIELD_LENGTH);
  if (websiteUrl) addMaxLengthError(fieldErrors, 'websiteUrl', 'Company website URL', websiteUrl, MAX_FIELD_LENGTH);
  if (!jobTitle || isPlaceholder(jobTitle)) fieldErrors.jobTitle = 'Job title is required.';
  else addMaxLengthError(fieldErrors, 'jobTitle', 'Job title', jobTitle, MAX_FIELD_LENGTH);
  if (!countryRegion || isPlaceholder(countryRegion)) {
    fieldErrors.countryRegion = 'Please select a country/region.';
  } else {
    addMaxLengthError(fieldErrors, 'countryRegion', 'Country/Region', countryRegion, MAX_FIELD_LENGTH);
  }
  if (!jobFunction || isPlaceholder(jobFunction)) fieldErrors.jobFunction = 'Please select a job function.';
  else addMaxLengthError(fieldErrors, 'jobFunction', 'Job function', jobFunction, MAX_FIELD_LENGTH);
  if (!interestedIn || isPlaceholder(interestedIn))
    fieldErrors.interestedIn = 'Please select an option.';
  else addMaxLengthError(fieldErrors, 'interestedIn', 'Interest', interestedIn, MAX_FIELD_LENGTH);

  if (!productsText) fieldErrors.products = 'Please select at least one product.';
  else if (productsText.length > MAX_FIELD_LENGTH) {
    fieldErrors.products = 'Please select fewer products (max 50 characters).';
  }

  if (phoneRaw && (phoneDigits.length < 10 || phoneDigits.length > 15)) {
    fieldErrors.phoneNumber = 'Phone number must contain 10 to 15 digits.';
  }

  if (message) addMaxLengthError(fieldErrors, 'message', 'Message', message, MAX_MESSAGE_LENGTH);

  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const payload: Record<string, unknown> = {
    form_name: FORM_TYPE_MAP[formType],
    first_name: firstName,
    last_name: lastName,
    email,
    company_name: companyName,
    job_function: jobFunction,
    job_title: jobTitle,
    country: countryRegion,
    interests: interestedIn,
    interested_products: productsText,
  };

  if (websiteUrl) {
    payload.company_url = websiteUrl;
  }

  if (phoneDigits) {
    payload.phone = phoneDigits;
  }

  if (message) {
    payload.message = message;
  }

  return {
    payload,
  };
}

export async function POST(request: Request) {
  let body: FormSubmitRequest | null = null;

  try {
    body = (await request.json()) as FormSubmitRequest;
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Invalid request payload.' },
      { status: 400 },
    );
  }

  const formType = body?.formType;
  const data = body?.data;

  if (!formType || !data) {
    return NextResponse.json(
      { ok: false, message: 'Form type and data are required.' },
      { status: 400 },
    );
  }

  if (!['subscription', 'get_in_touch', 'message', 'contact'].includes(formType)) {
    return NextResponse.json(
      { ok: false, message: 'Unsupported form type.' },
      { status: 400 },
    );
  }

  if (!asRecord(data)) {
    return NextResponse.json(
      { ok: false, message: 'Invalid form data.' },
      { status: 400 },
    );
  }

  const { payload, fieldErrors } = buildPayload(formType, data as FormDataByType[FormType]);

  if (fieldErrors && Object.keys(fieldErrors).length) {
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', fieldErrors },
      { status: 422 },
    );
  }

  if (!payload) {
    return NextResponse.json(
      { ok: false, message: 'Unable to build payload.' },
      { status: 400 },
    );
  }

  const baseUrl = process.env.COMPANY_API_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { ok: false, message: 'COMPANY_API_BASE_URL is not configured.' },
      { status: 500 },
    );
  }

  const submitUrl = buildFormsSubmitUrl(baseUrl);
  if (!submitUrl) {
    return NextResponse.json(
      { ok: false, message: 'Form submission URL is invalid.' },
      { status: 500 },
    );
  }

  const meta: Record<string, string> = {};
  const userAgent = request.headers.get('user-agent');
  const referer = request.headers.get('referer');
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (userAgent) meta.user_agent = userAgent;
  if (referer) meta.source_url = referer;
  if (forwardedFor) meta.ip = forwardedFor.split(',')[0]?.trim() || forwardedFor;

  const enrichedPayload = Object.keys(meta).length
    ? { ...payload, meta }
    : payload;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(submitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(enrichedPayload),
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';
    const responseBody = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const message =
        typeof responseBody === 'object' &&
        responseBody !== null &&
        'message' in responseBody &&
        typeof responseBody.message === 'string'
          ? responseBody.message
          : 'Failed to submit the form.';

      const backendFieldErrors = extractBackendFieldErrors(formType, responseBody);

      return NextResponse.json(
        {
          ok: false,
          message,
          fieldErrors: backendFieldErrors,
          data: responseBody,
        },
        { status: response.status },
      );
    }

    return NextResponse.json({ ok: true, data: responseBody }, { status: 200 });
  } catch (error) {
    const isAbort =
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      error.name === 'AbortError';

    return NextResponse.json(
      {
        ok: false,
        message: isAbort
          ? 'Form submission timed out. Please try again.'
          : 'Unable to reach the form submission service.',
      },
      { status: isAbort ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
