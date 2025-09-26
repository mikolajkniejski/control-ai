"use client";
import { useEffect } from "react";
import { type Country, EU_COUNTRIES } from "./utils/meps";
import { useContactStore } from "./utils/useContactStore";

export default function Home() {
  const {
    country,
    fullName,
    address,
    selectedMep,
    template,
    mepsForCountry,
    setCountry,
    setFullName,
    setAddress,
    setSelectedMep,
    generateTemplate,
    sendEmail,
  } = useContactStore();

  useEffect(() => {
    if (country) {
      // setCountry already loads MEPs from MEPS_BY_COUNTRY
      useContactStore.getState().setCountry(country);
    }
  }, [country]);

  const isValid = country && fullName && address && selectedMep;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Write to your representative in European Parliament
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join concerned citizens urging action on AI extinction risks. Generate
          and send an email to your European Parliament representative.
        </p>

        <div className="bg-white shadow-md p-6 space-y-6">
          {/* Step 1: Country */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="country-select"
            >
              Country
            </label>
            <select
              id="country-select"
              value={country}
              onChange={(e) => setCountry(e.target.value as Country)}
              className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select your country</option>
              {EU_COUNTRIES.map((c: Country) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Personal Info */}
          {country && (
            <>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="full-name"
                >
                  Full Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="address"
                >
                  Postal Code
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your postal code"
                  required
                />
              </div>

              {/* Step 3: Representative Selection */}
              {mepsForCountry.length > 0 && (
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="mep-select"
                  >
                    Select Representative
                  </label>
                  <select
                    id="mep-select"
                    value={selectedMep}
                    onChange={(e) => setSelectedMep(e.target.value)}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose a representative</option>
                    {mepsForCountry.map((mep: string) => (
                      <option key={mep} value={mep}>
                        {mep}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Generate Button */}
              {isValid && !template && (
                <button
                  type="button"
                  onClick={generateTemplate}
                  className="w-full bg-blue-600 text-white py-3 hover:bg-blue-700"
                >
                  Generate Email Template
                </button>
              )}

              {/* Template Preview */}
              {template && (
                <div className="bg-gray-100 p-4 text-sm">
                  <h3 className="font-medium mb-2">Preview:</h3>
                  <pre className="whitespace-pre-wrap">{template}</pre>
                </div>
              )}

              {/* Send Button */}
              {template && (
                <button
                  type="button"
                  onClick={sendEmail}
                  className="w-full bg-green-600 text-white py-3 hover:bg-green-700"
                >
                  Send Email
                </button>
              )}
            </>
          )}

          <p className="text-xs text-gray-500 text-center mt-4">
            Not in the EU? Contact us about representatives in other regions.
          </p>
        </div>
      </div>
    </div>
  );
}
