# QR Thing

A Next.js application for generating customizable QR codes with security features.

## Features

### Current Features

- [x] Web Risk checking for malicious URLs
- [x] Location tracking for QR code scans
- [x] TypeScript full implementation
- [x] Basic QR code generation
- [x] Custom QR codes with favicon overlay
- [x] Prisma database integration for URL tracking

### TODO

- [ ] Enhanced Frontend UI
- [ ] Batch QR code creation
- [ ] Custom domain configuration
- [ ] Analytics dashboard

## API Routes

### Generate Basic QR Code

```
POST /api/generate
```

Request body:

```json
{
  "url": "https://example.com"
}
```

Response:

```json
{
  "success": true,
  "path": "/output/filename.png"
}
```

### Generate Custom QR Code with Favicon

```
POST /api/generate/custom
```

Request body:

```json
{
  "url": "https://example.com"
}
```

Response:

```json
{
  "success": true,
  "path": "/output/filename_custom.png"
}
```

### Scan QR Code

```
GET /api/scan/[hash]
```

Redirects to the original URL associated with the hash.

## Setup and Development

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- Clerk account (for authentication)

### Environment Variables

Create a `.env` file in the project root with:

```
DATABASE_URL="postgresql://username:password@localhost:5432/qrthing"
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
RISK_CHECK_API_KEY=your_virustotal_api_key
API_LINK=your_api_domain_or_localhost
```

### Installation

```bash
# Install dependencies
npm install

# Setup database
npx prisma migrate dev

# Run development server
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL via Prisma ORM
- **Authentication**: Clerk
- **Security**: VirusTotal API for URL risk assessment
- **QR Code Generation**: qrcode, sharp libraries

## Project Structure

```
src/
  app/            # Next.js App Router components and routes
    api/          # API endpoints
    page.tsx      # Main application page
  components/     # Reusable React components
  lib/            # Utilities and configuration
  middleware/     # Request middleware for security and auth
```

## License

[MIT License](LICENSE)
