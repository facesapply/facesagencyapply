/**
 * Serverless API endpoint for HubSpot form submissions
 *
 * This proxies requests to HubSpot to avoid CORS issues.
 * Deploy to Vercel, Netlify, or any serverless platform.
 */

export const config = {
  runtime: 'edge',
};

const HUBSPOT_API_URL = 'https://api.hubapi.com';

export default async function handler(request: Request): Promise<Response> {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get access token from environment (support both variable names)
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!accessToken) {
    return new Response(JSON.stringify({ error: 'HubSpot not configured - missing HUBSPOT_ACCESS_TOKEN or HUBSPOT_PRIVATE_APP_TOKEN' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { properties, action, contactId } = body;

    let hubspotResponse: Response;

    if (action === 'search') {
      // Search for existing contact
      hubspotResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body.searchParams),
      });
    } else if (action === 'update' && contactId) {
      // Update existing contact
      hubspotResponse = await fetch(`${HUBSPOT_API_URL}/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      });
    } else {
      // Create new contact
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
      return new Response(JSON.stringify({
        success: false,
        error: data.message || 'HubSpot API error',
        details: data
      }), {
        status: hubspotResponse.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      contactId: data.id,
      data
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: String(error)
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
