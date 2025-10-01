# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration to collect form data from both the build wizard and contact form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Unwind Designs - Form Submissions" (or similar)
4. Set up the following columns in row 1 (headers):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Submission Date | Source | First Name | Last Name | Email | Phone | Location | Message | Project Type | Base Kit | Vehicle Type | Fridge Type | Finish | Features | Timeline | Budget | Installation | Marketing Consent |

## Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Name: "unwind-designs-sheets"
   - Description: "Service account for form submissions"
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file

## Step 5: Share the Google Sheet

1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (found in the JSON file as `client_email`)
4. Give it "Editor" permissions
5. Click "Send"

## Step 6: Add Environment Variables

Add these to your `.env.local` file:

```env
# Google Sheets Configuration
GOOGLE_SHEETS_ID=your_spreadsheet_id_here
GOOGLE_PROJECT_ID=your_project_id_from_json
GOOGLE_PRIVATE_KEY_ID=your_private_key_id_from_json
GOOGLE_PRIVATE_KEY="your_private_key_from_json"
GOOGLE_CLIENT_EMAIL=your_client_email_from_json
GOOGLE_CLIENT_ID=your_client_id_from_json
```

**Important:** 
- The `GOOGLE_PRIVATE_KEY` should be wrapped in quotes
- Replace all the values with the actual values from your downloaded JSON file
- The `GOOGLE_SHEETS_ID` is found in your Google Sheet URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/start-your-build` and complete the build wizard
3. Go to `/contact` and submit the contact form
4. Check your Google Sheet - you should see new rows added!

## Data Structure

### Build Wizard Submissions
- **Source**: "build-wizard"
- **All fields**: Populated with user's selections
- **Features**: Comma-separated list of selected features

### Contact Form Submissions  
- **Source**: "contact-form"
- **Populated fields**: Name, Email, Message, Submission Date
- **Empty fields**: All other project-related fields

## Troubleshooting

### Common Issues:

1. **"Google Sheets ID not configured"**
   - Check that `GOOGLE_SHEETS_ID` is set in your environment variables

2. **"Permission denied"**
   - Make sure you've shared the sheet with the service account email
   - Verify the service account has "Editor" permissions

3. **"Invalid credentials"**
   - Double-check all the environment variables
   - Make sure the private key is properly quoted and escaped

4. **"Sheet not found"**
   - Verify the `GOOGLE_SHEETS_ID` is correct
   - Make sure the sheet exists and is accessible

### Testing Locally:

You can test the Google Sheets integration by checking the console logs. Look for:
- "Data added to Google Sheets successfully" - Success
- "Google Sheets error:" - Check the error message for details

## Security Notes

- Never commit the service account JSON file to your repository
- Keep your environment variables secure
- The service account has minimal permissions (only to your specific sheet)
- Consider rotating the service account key periodically

## Next Steps

Once set up, you can:
- View all form submissions in one place
- Export data for analysis
- Set up automated notifications
- Create charts and reports
- Filter by source (build-wizard vs contact-form)
- Track submission trends over time
