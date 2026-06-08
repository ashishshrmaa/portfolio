# Ashish Sharma - Portfolio (Next.js)

A Next.js conversion of the personal portfolio HTML template with working contact form.

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Email (Required for contact form)

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
```

**How to get Gmail App Password:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already done
3. Go to **App Passwords** (search for it in Security)
4. Generate a new app password for "Mail"
5. Copy the 16-character password into `EMAIL_PASS`

> All form submissions (Contact & Get a Quote) will be delivered to **ashishshrmaa@outlook.com**

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

## Project Structure

```
portfolio-nextjs/
├── app/
│   ├── api/
│   │   ├── contact/route.ts   # Contact form API → sends email
│   │   └── quote/route.ts     # Quote form API → sends email
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── Resume.tsx
│   ├── Testimonials.tsx
│   ├── ContactForm.tsx
│   ├── QuoteModal.tsx
│   └── Scripts.tsx
└── public/assets/            # All CSS, JS, images from original template
```

## Deployment

Deploy to [Vercel](https://vercel.com) (recommended for Next.js):
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables: `EMAIL_USER` and `EMAIL_PASS`
4. Deploy!
"# portfolio" 
"# portfolio" 
