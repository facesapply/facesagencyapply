import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Serverless API endpoint for HubSpot form submissions
 * Standard Node.js runtime for better compatibility
 */

const HUBSPOT_API_URL = 'https://api.hubapi.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get access token from environment
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!accessToken) {
    return res.status(500).json({
      error: 'HubSpot not configured - missing HUBSPOT_ACCESS_TOKEN'
    });
  }

  try {
    const { properties, action, contactId, searchParams } = req.body;

    let hubspotResponse: Response;

    if (action === 'search') {
      hubspotResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });
    } else if (action === 'update' && contactId) {
      hubspotResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      });
    } else {
      hubspotResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      });
    }

    const data = await hubspotResponse.json();

    if (!hubspotResponse.ok) {
      return res.status(hubspotResponse.status).json({
        success: false,
        error: data.message || 'HubSpot API error',
        details: data
      });
    }

    return res.status(200).json({
      success: true,
      contactId: data.id,
      data
    });
  } catch (error) {
    console.error('HubSpot API error:', error);
    return res.status(500).json({
      success: false,
      error: String(error)
    });
  }
}
