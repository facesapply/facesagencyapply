/**
 * Debug component to test HubSpot integration
 * Add this to your page to test the connection
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { syncToHubSpot } from '@/lib/hubspot';

// Generate unique phone number for each test
const getUniquePhone = () => Math.floor(10000000 + Math.random() * 89999999).toString();

const testFormData = {
  gender: "male" as const,
  firstName: "DebugTest",
  middleName: "",
  lastName: "Component",
  dateOfBirth: "1995-06-15",
  nationality: "Lebanese",
  email: `test${Date.now()}@example.com`,
  mobile: getUniquePhone(),
  mobileCountryCode: "+961",
  whatsapp: getUniquePhone(),
  whatsappCountryCode: "+961",
  otherNumber: "",
  otherNumberCountryCode: "+961",
  otherNumberRelationship: "",
  otherNumberPersonName: "",
  instagram: "",
  hasWhishAccount: "",
  whishNumber: "",
  whishCountryCode: "+961",
  governorate: "Beirut",
  district: "Beirut",
  area: "Hamra",
  languages: ["English"],
  languageLevels: { English: 4 },
  customLanguage: "",
  height: "175",
  weight: "70",
  pantSize: "30",
  jacketSize: "M",
  shoeSize: "42",
  bust: "",
  waist: "",
  hips: "",
  eyeColor: "Brown",
  hairColor: "Black",
  hairType: "Straight",
  hairLength: "Short",
  skinTone: "Medium",
  hasTattoos: false,
  hasPiercings: false,
  customEyeColor: "",
  customHairColor: "",
  shoulders: "",
  talents: [],
  talentLevels: {},
  sports: [],
  sportLevels: {},
  modeling: [],
  customTalent: "",
  customSport: "",
  customModeling: "",
  experience: "",
  interestedInExtra: "",
  hasCar: "",
  hasLicense: "",
  isEmployed: "",
  canTravel: "",
  hasPassport: "",
  hasMultiplePassports: "",
  passports: [],
  comfortableWithSwimwear: null
};

export default function HubSpotDebug() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const envInfo = {
    DEV: import.meta.env.DEV,
    MODE: import.meta.env.MODE,
    TOKEN_EXISTS: !!import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN,
    TOKEN_LENGTH: import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN?.length || 0,
    TOKEN_PREVIEW: import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN?.substring(0, 15) + '...',
  };

  const handleTest = async () => {
    setLoading(true);
    setResult('Starting test...\n');

    try {
      setResult(prev => prev + 'Calling syncToHubSpot...\n');
      const response = await syncToHubSpot(testFormData);
      setResult(prev => prev + `\nResult: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(prev => prev + `\nError: ${error instanceof Error ? error.message : String(error)}\n`);
      setResult(prev => prev + `\nStack: ${error instanceof Error ? error.stack : 'No stack'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectFetch = async () => {
    setLoading(true);
    setResult('Testing direct fetch to proxy...\n');

    try {
      const response = await fetch('/api/hubspot/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            firstname: 'DirectFetch',
            lastname: 'Test',
            faces_mobile: '+961 70222333',
          }
        }),
      });

      const data = await response.json();
      setResult(prev => prev + `\nStatus: ${response.status}\n`);
      setResult(prev => prev + `\nResponse: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(prev => prev + `\nFetch Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">HubSpot Debug Panel</h2>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <h3 className="font-semibold mb-2">Environment Info:</h3>
        <pre className="text-sm whitespace-pre-wrap">
          {JSON.stringify(envInfo, null, 2)}
        </pre>
      </div>

      <div className="flex gap-2 mb-4">
        <Button onClick={handleTest} disabled={loading}>
          {loading ? 'Testing...' : 'Test syncToHubSpot'}
        </Button>
        <Button onClick={handleDirectFetch} disabled={loading} variant="outline">
          {loading ? 'Testing...' : 'Test Direct Fetch'}
        </Button>
      </div>

      {result && (
        <div className="bg-black text-green-400 p-4 rounded font-mono text-sm whitespace-pre-wrap max-h-96 overflow-auto">
          {result}
        </div>
      )}
    </div>
  );
}
