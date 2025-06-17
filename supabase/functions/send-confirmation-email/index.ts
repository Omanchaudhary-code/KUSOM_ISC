export async function handler(req: Request) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method === "GET") {
    return new Response(JSON.stringify({ message: "Send a POST request with JSON body to send email." }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Expected application/json content-type" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    const { team_name, leader_name, leader_email, team_size } = await req.json();
    if (!team_name || !leader_name || !leader_email || !team_size) {
      return new Response(JSON.stringify({ error: "Missing required fields in JSON body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const apiKey = Deno.env.get("SENDGRID_API_KEY");
    if (!apiKey) throw new Error("SENDGRID_API_KEY is not set in environment");

    const emailData = {
      personalizations: [{
        to: [{ email: leader_email }],
        subject: "Hack for Business ✅ Registration Confirmed!"
      }],
      from: {
        email: "noreply@yourdomain.com", // Replace with verified sender
        name: "KUSOM IS Club"
      },
      content: [{
        type: "text/html",
        value: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 20px; border-radius: 10px; color: white;">
              <h2>Hack for Business</h2>
              <p>Hi <strong>${leader_name}</strong>,</p>
              <p>Your team <strong>${team_name}</strong> (size: ${team_size}) has successfully registered!</p>
              <p>We look forward to your participation.</p>
              <p>Best regards,<br/>KUSOM IS Club</p>
            </div>
          </body>
        </html>
        `
      }]
    };

    const sendgridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailData)
    });

    if (!sendgridResponse.ok) {
      const errorResponse = await sendgridResponse.text();
      console.error("SendGrid API error:", errorResponse);
      return new Response(JSON.stringify({ error: "Failed to send email", details: errorResponse }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}
