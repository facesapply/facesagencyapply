import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS (safe)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    if (!token) return res.status(500).json({ success: false, error: "Missing HUBSPOT_PRIVATE_APP_TOKEN" });

    const body = req.body || {};

    const email = (body.email || "").trim();
    if (!email) return res.status(400).json({ success: false, error: "Missing email" });

    // ✅ Map incoming payload to HubSpot INTERNAL property names
    // HubSpot defaults are: email, firstname, lastname, phone
    const properties: Record<string, any> = {
      email,
      firstname: (body.firstName || "").trim(),
      lastname: (body.lastName || "").trim(),
      phone: (body.mobile || body.phone || "").trim(),
    };

    // Optional custom fields — ONLY keep if these internal names exist in your HubSpot
    // Otherwise remove them to avoid confusion.
    if (body.instagram) properties.instagram = String(body.instagram);
    if (body.whatsapp) properties.whatsapp = String(body.whatsapp);
    if (body.nationality) properties.nationality = String(body.nationality);
    if (body.governorate) properties.governorate = String(body.governorate);
    if (body.district) properties.district = String(body.district);
    if (body.area) properties.area = String(body.area);
    if (body.dateOfBirth) properties.date_of_birth = String(body.dateOfBirth);

    // 1) Search contact by email (so we update instead of creating blanks repeatedly)
    const searchResp = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
        limit: 1,
      }),
    });

    const searchJson = await searchResp.json();
    const existingId = searchJson?.results?.[0]?.id;

    let hsResp: Response;

    if (existingId) {
      // ✅ Update existing
      hsResp = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
      });
    } else {
      // ✅ Create new
      hsResp = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
      });
    }

    const hsText = await hsResp.text();
    if (!hsResp.ok) {
      return res.status(502).json({ success: false, error: "HubSpot API failed", details: hsText, properties });
    }

    const data = JSON.parse(hsText);

    // ✅ Return what we sent so we can verify instantly
    return res.status(200).json({
      success: true,
      action: existingId ? "updated" : "created",
      contactId: data?.id || existingId,
      propertiesSent: properties,
      data,
    });
  } catch (e: any) {
    return res.status(500).json({ success: false, error: e?.message || String(e) });
  }
}
