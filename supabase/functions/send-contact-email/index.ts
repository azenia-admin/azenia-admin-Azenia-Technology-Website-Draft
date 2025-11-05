import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ContactSubmission {
  type: 'contact' | 'partner';
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  category?: string;
  message?: string;
  companyName?: string;
  jobTitle?: string;
  serviceRequired?: string;
  specialtyNeeded?: string;
  officeLocation?: string;
  details?: string;
  agreeToNewsletter: boolean;
  agreeToContact: boolean;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const submission: ContactSubmission = await req.json();

    const { data: insertedData, error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        type: submission.type,
        first_name: submission.firstName,
        last_name: submission.lastName,
        email: submission.email,
        phone_number: submission.phoneNumber,
        category: submission.category,
        message: submission.message,
        company_name: submission.companyName,
        job_title: submission.jobTitle,
        service_required: submission.serviceRequired,
        specialty_needed: submission.specialtyNeeded,
        office_location: submission.officeLocation,
        details: submission.details,
        agree_to_newsletter: submission.agreeToNewsletter,
        agree_to_contact: submission.agreeToContact,
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    const emailSubject = submission.type === 'contact' 
      ? 'New Contact Form Submission'
      : 'New Partner With Us Form Submission';

    let emailBody = `
      <h2>${emailSubject}</h2>
      <p><strong>Name:</strong> ${submission.firstName} ${submission.lastName}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
    `;

    if (submission.phoneNumber) {
      emailBody += `<p><strong>Phone:</strong> ${submission.phoneNumber}</p>`;
    }

    if (submission.type === 'contact') {
      if (submission.category) {
        emailBody += `<p><strong>Category:</strong> ${submission.category}</p>`;
      }
      if (submission.message) {
        emailBody += `<p><strong>Message:</strong></p><p>${submission.message}</p>`;
      }
    } else {
      if (submission.companyName) {
        emailBody += `<p><strong>Company:</strong> ${submission.companyName}</p>`;
      }
      if (submission.jobTitle) {
        emailBody += `<p><strong>Job Title:</strong> ${submission.jobTitle}</p>`;
      }
      if (submission.serviceRequired) {
        emailBody += `<p><strong>Service Required:</strong> ${submission.serviceRequired}</p>`;
      }
      if (submission.specialtyNeeded) {
        emailBody += `<p><strong>Specialty Needed:</strong> ${submission.specialtyNeeded}</p>`;
      }
      if (submission.officeLocation) {
        emailBody += `<p><strong>Office Location:</strong> ${submission.officeLocation}</p>`;
      }
      if (submission.details) {
        emailBody += `<p><strong>Details:</strong></p><p>${submission.details}</p>`;
      }
    }

    emailBody += `<p><strong>Newsletter Subscription:</strong> ${submission.agreeToNewsletter ? 'Yes' : 'No'}</p>`;
    emailBody += `<p><strong>Agree to Contact:</strong> ${submission.agreeToContact ? 'Yes' : 'No'}</p>`;
    emailBody += `<p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>`;

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: true, message: 'Submission saved but email not configured' }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Azenia Technology Group <noreply@azenia.org>',
        to: ['admin@azenia.org'],
        subject: emailSubject,
        html: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Email send failed:', errorText);
      return new Response(
        JSON.stringify({ success: true, message: 'Submission saved but email failed to send' }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    await supabase
      .from('contact_submissions')
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      })
      .eq('id', insertedData.id);

    return new Response(
      JSON.stringify({ success: true, message: 'Submission received and email sent' }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing submission:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
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