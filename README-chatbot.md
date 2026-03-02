# OctaUnitech Chatbot — Setup & Integration Guide

## 1. Overview

A sliding chat drawer that appears from the right side of the page when any
"Talk to an Expert" button is clicked. It guides visitors through a 4-step
conversation, collects their email address, and emails a formatted HTML
transcript to your team via SMTP.

No third-party chat service required — fully self-hosted.

---

## 2. File Structure

```
components/ChatPanel.jsx          ← Sliding chat drawer (React, 'use client')
styles/ChatPanel.module.css       ← All panel CSS (CSS Modules)
app/api/send-email/route.js       ← Nodemailer email API (App Router)
.env.local.example                ← Environment variable template
README-chatbot.md                 ← This file
```

---

## 3. Step-by-Step Setup

### 3.1 Install Nodemailer

```bash
npm install nodemailer
```

### 3.2 Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your SMTP credentials:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-sender@gmail.com
SMTP_PASS=your-16-char-app-password
ADMIN_EMAIL=sales@octaunitech.com
```

**Gmail App Password (required — your regular password will NOT work):**
1. Go to myaccount.google.com → Security
2. Enable 2-Step Verification
3. Search "App passwords" → create one named "OctaUnitech"
4. Paste the generated 16-character password into `SMTP_PASS`

### 3.3 ChatPanel is Already Wired

The component is already added to `app/page.tsx`:

```tsx
import ChatPanel from '@/components/ChatPanel'

export default function Home() {
  return (
    <>
      {/* ...existing page content... */}
      <ChatPanel />   {/* ← already here */}
    </>
  )
}
```

---

## 4. How the "Talk to an Expert" Button is Wired

Any element with the attribute `data-chat-trigger="true"` will open the panel
when clicked. The ChatPanel listens for clicks on these elements automatically
after it mounts.

**Already wired in this project:**
- `Navbar.tsx` — desktop nav link + mobile menu link
- `CTA.tsx` — the main CTA section button

**To add more triggers anywhere in the codebase:**

```tsx
// React component
<button type="button" data-chat-trigger="true" className="your-class">
  Talk to an Expert
</button>

// Plain HTML (e.g. in a static page)
<button data-chat-trigger="true">Talk to an Expert</button>
```

No additional JavaScript needed — the ChatPanel picks it up automatically.

---

## 5. Conversation Flow

```
Panel opens
    │
    ▼
[Bot] "👋 Welcome to OctaUnitech! How may I help you today?"
[Bot] "Please select a service below, or type your question:"
    │
    ├── User clicks a service button ─────────────┐
    │                                              │
    └── User types a service name/question        │
              │                                   │
              ▼                                   ▼
    [Bot] 2-3 sentence service description   [Bot] Same description
              │                                   │
              └──────────────┬────────────────────┘
                             ▼
         [Bot] "Please provide your email address..."
                             │
                     ┌───────┴───────┐
                     │               │
              Valid email      Invalid email
                     │               │
                     │       [Bot] re-asks (loops)
                     ▼
         [Bot] "✅ Thank you! Our team will reach out..."
         → Input disabled
         → POST /api/send-email
         → Status line: ✅ sent  or  ⚠️ failed
```

---

## 6. Testing the Email API with curl

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "visitorEmail": "test@example.com",
    "transcript": [
      { "role": "bot",  "text": "Welcome!", "time": "10:00" },
      { "role": "user", "text": "Cloud Services", "time": "10:01" },
      { "role": "bot",  "text": "We provide cloud solutions...", "time": "10:01" },
      { "role": "user", "text": "test@example.com", "time": "10:02" }
    ]
  }'
```

Expected response: `{"success":true}`

---

## 7. Customising Colors

All colors in `styles/ChatPanel.module.css` are set to match the existing site
tokens. To change them, edit these values at the top of the file:

| Element          | CSS property       | Current value |
|------------------|--------------------|---------------|
| Panel header     | `background`       | `#1B3A6B`     |
| User bubble      | `background`       | `#F97316`     |
| Service buttons  | `border`, `color`  | `#F97316`     |
| Send button      | `background`       | `#F97316`     |
| Bot bubble       | `background`       | `#f1f1f1`     |

---

## 8. Troubleshooting

### Panel doesn't open when clicking "Talk to an Expert"
- Confirm `<ChatPanel />` is in `app/page.tsx`
- Confirm the button has `data-chat-trigger="true"` attribute
- Check browser console for JS errors

### SMTP / email not sending
- Verify all four env vars are set in `.env.local` (not `.env`)
- For Gmail: confirm you used an App Password, not your account password
- Check the server terminal for `[send-email] SMTP error:` logs
- Test with the curl command in section 6

### TypeScript errors on `data-chat-trigger`
Add this to a `.d.ts` file in your project:
```ts
// types/jsx.d.ts
import 'react'
declare module 'react' {
  interface HTMLAttributes<T> {
    'data-chat-trigger'?: string
  }
}
```

### Panel renders behind other elements
Increase the z-index values in `ChatPanel.module.css`:
```css
.overlay { z-index: 9998; }
.panel   { z-index: 9999; }
```

### Mobile: panel doesn't cover full width
The CSS already sets `width: 100vw` at `max-width: 767px`. If it's still
clipped, check for `overflow: hidden` on a parent element.
