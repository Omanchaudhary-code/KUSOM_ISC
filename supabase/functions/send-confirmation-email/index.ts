
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  team_name: string;
  leader_name: string;
  leader_email: string;
  team_size: number;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Confirmation email function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { team_name, leader_name, leader_email, team_size }: ConfirmationEmailRequest = await req.json();
    
    console.log("Sending confirmation email to:", leader_email);

    const emailResponse = await resend.emails.send({
      from: "KUSOM IS Club <noreply@resend.dev>",
      to: [leader_email],
      subject: "Hack for Business – Registration Confirmed!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration Confirmed</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Registration Confirmed!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #0891b2; margin-top: 0;">Dear ${leader_name},</h2>
            
            <p>Congratulations! Your team <strong>"${team_name}"</strong> with ${team_size} members has been successfully registered for <strong>Hack for Business</strong>.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0891b2; margin-top: 0;">Event Details:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li><strong>Event:</strong> Hack for Business</li>
                <li><strong>Date:</strong> June 21-23, 2025</li>
                <li><strong>Duration:</strong> 48 Hours</li>
                <li><strong>Venue:</strong> Multi-purpose Hall, Kathmandu University Central Campus</li>
                <li><strong>Team:</strong> ${team_name} (${team_size} members)</li>
              </ul>
            </div>
            
            <h3 style="color: #0891b2;">What's Next?</h3>
            <ul style="padding-left: 20px;">
              <li>Keep an eye on your email for further updates and instructions</li>
              <li>Start brainstorming innovative business solutions</li>
              <li>Prepare your development tools and environment</li>
              <li>Get ready for an exciting 48-hour challenge!</li>
            </ul>
            
            <div style="background: #e6f7ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Important:</strong> Please save this email for your records. You may need to present this confirmation during the event check-in.</p>
            </div>
            
            <p>If you have any questions or need to make changes to your registration, please contact us immediately.</p>
            
            <p>We're excited to see what innovative solutions your team will create!</p>
            
            <p style="margin-bottom: 0;">Best regards,<br>
            <strong>KUSOM Information Systems Club</strong><br>
            Kathmandu University School of Management</p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
