# Google Sheets Integration - Complete Setup

## ✅ Status: LIVE & WORKING

Your form submissions are now saving to Google Sheets!

---

## 📊 **Your Google Spreadsheet**

**Spreadsheet ID:** `1IodOM-BIxJiixWqkdRdQ5Y1FOO3rJavdYjaJkXH3B98`

**Service Account:** `unwind-sheets@unwinddesigns.iam.gserviceaccount.com`

**Direct Link:** [View Your Spreadsheet](https://docs.google.com/spreadsheets/d/1IodOM-BIxJiixWqkdRdQ5Y1FOO3rJavdYjaJkXH3B98/edit)

---

## 📝 **Columns in Your Sheet**

Your spreadsheet has these columns (already set up correctly):

| Column | Description |
|--------|-------------|
| Submission Date | When the form was submitted (Australian Eastern Time) |
| Source | Either "contact-form" or "build-wizard" |
| First Name | Customer's first name |
| Last Name | Customer's last name (from build wizard) |
| Email | Customer's email address |
| Phone | Customer's phone number (from build wizard) |
| Location | Customer's location/suburb (from build wizard) |
| Message | Customer's message or additional notes |
| Project Type | flat-pack / custom-fitout / consultation |
| Base Kit | wander / roam / premium / custom |
| Vehicle Type | troopcarrier / 4wd / van / other |
| Fridge Type | chest / upright / none |
| Finish | plain-hardwood / eucalyptus-black-hex / birch-black-hex / etc. |
| Features | Comma-separated list of selected features |
| Timeline | asap / 1-month / 2-3-months / 3-6-months / flexible |
| Budget | under-5k / 5k-10k / 10k-20k / 20k-plus / discuss |
| Installation | diy / professional / partial-help |
| Marketing Consent | Yes / No |

---

## 🔄 **How It Works**

### Contact Form (`/contact`)
1. Customer fills out: Name, Email, Message
2. Form submits to your Next.js API
3. Data is sent to:
   - ✅ **Email** → Info@unwinddesigns.com.au (via Resend)
   - ✅ **Google Sheets** → New row added to spreadsheet
4. Customer sees success message

**Columns Filled:**
- Submission Date
- Source (contact-form)
- First Name (from name field)
- Email
- Message
- *(All other columns left empty)*

---

### Build Wizard (`/start-your-build`)
1. Customer completes 4-step wizard
2. Form submits all project details
3. Data is sent to:
   - ✅ **Email** → Info@unwinddesigns.com.au (via Resend)
   - ✅ **Google Sheets** → New row with FULL project details
   - 💬 **Slack** (if you configure `SLACK_WEBHOOK_URL`)
4. Customer sees success screen

**Columns Filled:**
- ALL 18 columns with complete project information

---

## ⚙️ **Environment Variables Configured**

These are now live on Vercel Production:

```bash
GOOGLE_SHEETS_ID=1IodOM-BIxJiixWqkdRdQ5Y1FOO3rJavdYjaJkXH3B98
GOOGLE_PROJECT_ID=unwinddesigns
GOOGLE_PRIVATE_KEY_ID=d729dd6df3919b10523b8a7ad9218a485660561c
GOOGLE_CLIENT_EMAIL=unwind-sheets@unwinddesigns.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=104141331282441412639
GOOGLE_PRIVATE_KEY=[Your private key - securely stored]
```

---

## 🧪 **Test Your Forms**

### Test Contact Form:
1. Go to: https://unwind-designs-gqp1gahu2-jxms-projects-0c2c2aaa.vercel.app/contact
2. Fill out name, email, message
3. Submit
4. Check your Google Sheet for new row
5. Check Info@unwinddesigns.com.au for email

### Test Build Wizard:
1. Go to: https://unwind-designs-gqp1gahu2-jxms-projects-0c2c2aaa.vercel.app/start-your-build
2. Complete all 4 steps
3. Submit
4. Check your Google Sheet for new detailed row
5. Check Info@unwinddesigns.com.au for detailed email

---

## 🔒 **Security & Permissions**

### Service Account Access
Your service account `unwind-sheets@unwinddesigns.iam.gserviceaccount.com` needs these permissions:

1. **Google Sheets API** must be enabled in your Google Cloud project
2. The service account must have **Editor** access to your spreadsheet:
   - Open your spreadsheet
   - Click "Share"
   - Add `unwind-sheets@unwinddesigns.iam.gserviceaccount.com`
   - Give it "Editor" permission

### API Quotas
- Google Sheets API has generous free quotas
- Default: 500 requests per 100 seconds per user
- Default: 100 requests per 100 seconds per project
- More than enough for form submissions!

---

## 🚨 **Troubleshooting**

### Form Submits But No Google Sheets Row

**Check:**
1. Service account has Editor access to the sheet
2. Google Sheets API is enabled in Google Cloud Console
3. Check Vercel logs: `vercel logs`
4. Look for errors mentioning "Google Sheets"

### Row Added But Missing Data

**This is normal for Contact Form:**
- Contact form only fills: Date, Source, Name, Email, Message
- Build wizard fills ALL columns

### Email Works But Sheets Doesn't

**Possible causes:**
1. Service account doesn't have access (share the sheet!)
2. Google Sheets API not enabled
3. Wrong spreadsheet ID

---

## 📧 **Email Notifications**

Both forms also send emails to **Info@unwinddesigns.com.au** via Resend API.

**Email includes:**
- Contact Form: Name, Email, Message
- Build Wizard: Complete project details, budget, timeline, everything

You get BOTH email notifications AND Google Sheets records for every submission!

---

## 💡 **Pro Tips**

### 1. Filter By Source
Use Google Sheets filter to show:
- Only contact forms: `Source = "contact-form"`
- Only build requests: `Source = "build-wizard"`

### 2. Add Conditional Formatting
- Highlight new submissions (today's date)
- Color-code by project type or budget
- Flag "Marketing Consent = Yes" for follow-up

### 3. Create Pivot Tables
- Track submissions over time
- See most popular base kits
- Analyze budget ranges

### 4. Set Up Email Notifications
In Google Sheets:
1. Tools → Notification rules
2. Get emailed when new rows are added
3. Real-time notifications of new submissions!

### 5. Connect to Other Tools
- Export to CRM (HubSpot, Salesforce, etc.)
- Automate follow-ups with Zapier
- Create reports with Google Data Studio

---

## 🎯 **Next Steps (Optional)**

### Add Slack Notifications
Want instant Slack notifications for new builds?

1. Create a Slack incoming webhook
2. Add to Vercel: `vercel env add SLACK_WEBHOOK_URL production`
3. Redeploy

### Add More Sheets
You can create separate sheets for:
- `Sheet1` - All submissions (current)
- `ContactForms` - Only contact forms
- `BuildRequests` - Only build wizard
- `Archive` - Older submissions

Update the `RANGE` variable in `src/lib/google-sheets.ts` to target different sheets.

---

## ✅ **Summary**

**Status:** LIVE ✅  
**Forms Working:** YES ✅  
**Email Working:** YES ✅  
**Google Sheets:** YES ✅  
**Slack:** Not configured (optional)  

**Every form submission now:**
1. ✅ Sends email to Info@unwinddesigns.com.au
2. ✅ Adds row to your Google Spreadsheet
3. ✅ Shows success message to customer

**Your submissions are being tracked automatically!** 🎉

---

**Deployed:** October 10, 2025  
**Production URL:** https://unwind-designs-gqp1gahu2-jxms-projects-0c2c2aaa.vercel.app  
**Domain:** unwinddesigns.com.au (SSL provisioning)

