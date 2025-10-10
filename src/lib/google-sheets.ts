// Google Sheets API integration for form submissions
import { google } from 'googleapis';

// Your Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const RANGE = 'Sheet1!A:Z'; // Adjust range as needed

export interface BuildRequestData {
  // Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  message?: string;
  marketingConsent: boolean;
  
  // Project Details
  projectType: string;
  baseKit?: string;
  vehicleType: string;
  fridgeType?: string;
  finish?: string;
  features: string[];
  
  // Timeline & Budget
  timeline: string;
  budget: string;
  installationPreference: string;
  
  // Metadata
  submissionDate: string;
  source: 'build-wizard' | 'contact-form';
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  submissionDate: string;
  source: 'contact-form';
}

export async function addToGoogleSheets(data: BuildRequestData | ContactFormData) {
  try {
    if (!SPREADSHEET_ID) {
      throw new Error('Google Sheets ID not configured');
    }

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    
    // Initialize sheets with auth
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // Prepare row data based on source
    let rowData: any[] = [];
    
    if (data.source === 'build-wizard') {
      const buildData = data as BuildRequestData;
      rowData = [
        buildData.submissionDate,
        buildData.source,
        buildData.firstName,
        buildData.lastName,
        buildData.email,
        buildData.phone,
        buildData.location,
        buildData.message || '',
        buildData.projectType,
        buildData.baseKit || '',
        buildData.vehicleType,
        buildData.fridgeType || '',
        buildData.finish || '',
        buildData.features.join(', '),
        buildData.timeline,
        buildData.budget,
        buildData.installationPreference,
        buildData.marketingConsent ? 'Yes' : 'No'
      ];
    } else {
      const contactData = data as ContactFormData;
      rowData = [
        contactData.submissionDate,
        contactData.source,
        contactData.name,
        '', // lastName
        contactData.email,
        '', // phone
        '', // location
        contactData.message,
        '', // projectType
        '', // baseKit
        '', // vehicleType
        '', // fridgeType
        '', // finish
        '', // features
        '', // timeline
        '', // budget
        '', // installationPreference
        '' // marketingConsent
      ];
    }

    // Append data to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      }
    });

    console.log('Data added to Google Sheets:', response.data);
    return { success: true, message: 'Data added to Google Sheets successfully' };

  } catch (error) {
    console.error('Google Sheets error:', error);
    return { 
      success: false, 
      message: 'Failed to add data to Google Sheets',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Helper function to get current timestamp
export function getCurrentTimestamp(): string {
  return new Date().toLocaleString('en-AU', { 
    timeZone: 'Australia/Melbourne',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}
