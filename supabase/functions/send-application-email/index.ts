import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  jobTitle: string;
  jobId: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { firstName, lastName, email, phone, resumeUrl, jobTitle, jobId }: ApplicationData = await req.json();

    const emailContent = `
      New Job Application Received
      
      Job Position: ${jobTitle}
      Job ID: ${jobId}
      
      Applicant Information:
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      
      Resume: ${resumeUrl}
      
      Submitted at: ${new Date().toLocaleString()}
    `;

    console.log('Application received:', emailContent);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Application submitted successfully',
        data: {
          firstName,
          lastName,
          email,
          phone,
          jobTitle
        }
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing application:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to process application' 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});