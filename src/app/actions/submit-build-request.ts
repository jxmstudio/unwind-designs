"use server";

import { Resend } from "resend";
import { buildWizardSchema, type BuildWizardData } from "@/lib/build-wizard-schema";
import { addToGoogleSheets, getCurrentTimestamp, type BuildRequestData } from "@/lib/google-sheets";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitBuildRequest(data: BuildWizardData) {
  try {
    // Validate the data
    const validatedData = buildWizardSchema.parse(data);
    
    // Extract form data
    const { step1, step2, step3, step4 } = validatedData;
    
    // Format the project details for email
    const projectDetails = {
      // Project Info
      projectType: step1.projectType,
      baseKit: step1.baseKit,
      vehicleType: step2.vehicleType,
      fridgeType: step2.fridgeType,
      finish: step2.finish,
      features: step2.features,
      
      // Timeline & Budget
      timeline: step3.timeline,
      budget: step3.budget,
      installationPreference: step3.installationPreference,
      
      // Contact Info
      firstName: step4.firstName,
      lastName: step4.lastName,
      email: step4.email,
      phone: step4.phone,
      location: step4.location,
      message: step4.message,
      marketingConsent: step4.marketingConsent,
    };

    // Create email content
    const emailContent = createEmailContent(projectDetails);
    
    // Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const emailResult = await resend.emails.send({
        from: "Build Requests <noreply@unwinddesigns.com.au>",
        to: ["jxmstudioweb@gmail.com"],
        subject: `New Build Request from ${step4.firstName} ${step4.lastName}`,
        html: emailContent,
        replyTo: step4.email,
      });

      if (emailResult.error) {
        console.error("Email send error:", emailResult.error);
      }
    }

    // Send to Slack webhook if configured
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `🚐 New Build Request`,
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: "🚐 New Build Request"
                }
              },
              {
                type: "section",
                fields: [
                  { type: "mrkdwn", text: `*Name:* ${step4.firstName} ${step4.lastName}` },
                  { type: "mrkdwn", text: `*Email:* ${step4.email}` },
                  { type: "mrkdwn", text: `*Phone:* ${step4.phone}` },
                  { type: "mrkdwn", text: `*Location:* ${step4.location}` },
                  { type: "mrkdwn", text: `*Project:* ${formatProjectType(step1.projectType)}` },
                  { type: "mrkdwn", text: `*Base Kit:* ${step1.baseKit ? formatBaseKit(step1.baseKit) : 'N/A'}` },
                  { type: "mrkdwn", text: `*Budget:* ${formatBudget(step3.budget)}` },
                  { type: "mrkdwn", text: `*Timeline:* ${formatTimeline(step3.timeline)}` }
                ]
              }
            ]
          }),
        });
      } catch (slackError) {
        console.error("Slack notification error:", slackError);
      }
    }

    // Save to Google Sheets
    const sheetsData: BuildRequestData = {
      firstName: step4.firstName,
      lastName: step4.lastName,
      email: step4.email,
      phone: step4.phone,
      location: step4.location,
      message: step4.message,
      marketingConsent: step4.marketingConsent,
      projectType: step1.projectType,
      baseKit: step1.baseKit,
      vehicleType: step2.vehicleType,
      fridgeType: step2.fridgeType,
      finish: step2.finish,
      features: step2.features,
      timeline: step3.timeline,
      budget: step3.budget,
      installationPreference: step3.installationPreference,
      submissionDate: getCurrentTimestamp(),
      source: 'build-wizard'
    };

    const sheetsResult = await addToGoogleSheets(sheetsData);
    if (!sheetsResult.success) {
      console.error("Google Sheets error:", sheetsResult.message);
      // Don't fail the entire request if Sheets fails
    }

    return { success: true, message: "Build request submitted successfully!" };
    
  } catch (error) {
    console.error("Submit build request error:", error);
    return { 
      success: false, 
      message: "Failed to submit build request. Please try again." 
    };
  }
}

function createEmailContent(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  projectType: string;
  baseKit?: string;
  vehicleType: string;
  fridgeType?: string;
  finish?: string;
  features: string[];
  timeline: string;
  budget: string;
  installationPreference: string;
  message?: string;
  marketingConsent: boolean;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Build Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #8B4513; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; color: #8B4513; }
        .value { margin-left: 10px; }
        .features { display: flex; flex-wrap: wrap; gap: 5px; }
        .feature-tag { background: #e0e0e0; padding: 3px 8px; border-radius: 12px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚐 New Build Request</h1>
        </div>
        <div class="content">
          <div class="section">
            <h2>Contact Information</h2>
            <p><span class="label">Name:</span><span class="value">${data.firstName} ${data.lastName}</span></p>
            <p><span class="label">Email:</span><span class="value">${data.email}</span></p>
            <p><span class="label">Phone:</span><span class="value">${data.phone}</span></p>
            <p><span class="label">Location:</span><span class="value">${data.location}</span></p>
          </div>
          
          <div class="section">
            <h2>Project Details</h2>
            <p><span class="label">Project Type:</span><span class="value">${formatProjectType(data.projectType)}</span></p>
            ${data.baseKit ? `<p><span class="label">Base Kit:</span><span class="value">${formatBaseKit(data.baseKit)}</span></p>` : ''}
            <p><span class="label">Vehicle Type:</span><span class="value">${formatVehicleType(data.vehicleType)}</span></p>
            ${data.fridgeType ? `<p><span class="label">Fridge Type:</span><span class="value">${formatFridgeType(data.fridgeType)}</span></p>` : ''}
            ${data.finish ? `<p><span class="label">Finish:</span><span class="value">${formatFinish(data.finish)}</span></p>` : ''}
          </div>

          ${data.features.length > 0 ? `
          <div class="section">
            <h2>Selected Features</h2>
            <div class="features">
              ${data.features.map((feature: string) => `<span class="feature-tag">${formatFeature(feature)}</span>`).join('')}
            </div>
          </div>
          ` : ''}
          
          <div class="section">
            <h2>Timeline & Budget</h2>
            <p><span class="label">Timeline:</span><span class="value">${formatTimeline(data.timeline)}</span></p>
            <p><span class="label">Budget:</span><span class="value">${formatBudget(data.budget)}</span></p>
            <p><span class="label">Installation:</span><span class="value">${formatInstallation(data.installationPreference)}</span></p>
          </div>

          ${data.message ? `
          <div class="section">
            <h2>Additional Message</h2>
            <p>${data.message}</p>
          </div>
          ` : ''}

          <div class="section">
            <p><span class="label">Marketing Consent:</span><span class="value">${data.marketingConsent ? 'Yes' : 'No'}</span></p>
            <p><small>Submitted on ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}</small></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Formatting helpers
function formatProjectType(type: string): string {
  const types = {
    'flat-pack': 'Flat Pack Solution',
    'custom-fitout': 'Custom Fitout',
    'consultation': 'Consultation Only'
  };
  return types[type as keyof typeof types] || type;
}

function formatBaseKit(kit: string): string {
  const kits = {
    'wander': 'Wander Kit (Budget)',
    'roam': 'Roam Kit (Popular)',
    'premium': 'Premium Kit (Luxury)',
    'custom': 'Custom Solution'
  };
  return kits[kit as keyof typeof kits] || kit;
}

function formatVehicleType(type: string): string {
  const types = {
    'troopcarrier': 'Toyota Troopcarrier',
    '4wd': '4WD Vehicle',
    'van': 'Van/Campervan',
    'other': 'Other Vehicle'
  };
  return types[type as keyof typeof types] || type;
}

function formatFridgeType(type: string): string {
  const types = {
    'chest': 'Chest Fridge',
    'upright': 'Upright Fridge',
    'none': 'No Fridge'
  };
  return types[type as keyof typeof types] || type;
}

function formatFinish(finish: string): string {
  const finishes = {
    'plain-hardwood': 'Plain Hardwood',
    'eucalyptus-black-hex': 'Eucalyptus Black Hex',
    'birch-black-hex': 'Birch Black Hex',
    'black-hex': 'Black Hex',
    'white': 'White',
    'plain-birch': 'Plain Birch',
    'premium': 'Premium Multi-tone'
  };
  return finishes[finish as keyof typeof finishes] || finish;
}

function formatFeature(feature: string): string {
  const features = {
    'storage-drawers': 'Storage Drawers',
    'kitchen-setup': 'Kitchen Setup',
    'bed-platform': 'Bed Platform',
    'electrical-system': 'Electrical System',
    'water-system': 'Water System',
    'lighting': 'LED Lighting',
    'solar-panel': 'Solar Panel',
    'inverter': 'Power Inverter'
  };
  return features[feature as keyof typeof features] || feature;
}

function formatTimeline(timeline: string): string {
  const timelines = {
    'asap': 'ASAP',
    '1-month': '1 Month',
    '2-3-months': '2-3 Months',
    '3-6-months': '3-6 Months',
    'flexible': 'Flexible'
  };
  return timelines[timeline as keyof typeof timelines] || timeline;
}

function formatBudget(budget: string): string {
  const budgets = {
    'under-5k': 'Under $5,000',
    '5k-10k': '$5,000 - $10,000',
    '10k-20k': '$10,000 - $20,000',
    '20k-plus': '$20,000+',
    'discuss': 'Prefer to Discuss'
  };
  return budgets[budget as keyof typeof budgets] || budget;
}

function formatInstallation(pref: string): string {
  const prefs = {
    'diy': 'DIY Installation',
    'professional': 'Professional Installation',
    'partial-help': 'Some Professional Help'
  };
  return prefs[pref as keyof typeof prefs] || pref;
}
