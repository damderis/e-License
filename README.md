# e-License Portal

A modern, full-stack web application for managing license applications (Pasar and Penjaja licenses) built with Next.js, Firebase, and TypeScript.

## 🌟 Features

### For Applicants
- **User Authentication**: Secure login and registration system
- **Multi-Step Application Form**: 
  - Personal information collection
  - Pasar license application (optional)
  - Penjaja license application
  - Terms & conditions agreement
- **File Upload**: Support for uploading required documents (images and PDFs)
- **Application Tracking**: View application status and history
- **PDF License Generation**: Download approved licenses as PDF documents
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### For Administrators
- **Admin Dashboard**: Comprehensive overview of all applications
- **Application Review**: View detailed application information
- **Status Management**: Approve or reject applications
- **License PDF Generation**: Generate and download license PDFs for approved applications
- **Statistics**: View application statistics and metrics
- **Role-Based Access**: Secure admin authentication

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives

### Backend & Services
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - NoSQL database
- **Firebase Storage** - File storage for documents
- **Vercel Analytics** - Web analytics

### PDF Generation
- **@react-pdf/renderer** - PDF document generation

### Additional Libraries
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **bun** package manager
- **Firebase account** with a project set up

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/e-License.git
cd e-License
```

### 2. Install Dependencies

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
# or
yarn install
# or
bun install
```

### 3. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - **Authentication** (Email/Password)
   - **Cloud Firestore**
   - **Storage**

3. Create a Firebase configuration file at `frontend/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
```

### 4. Admin Configuration

Configure admin emails in `frontend/lib/admin.ts`:

```typescript
export const ADMIN_EMAILS = [
  'your-admin@email.com',
  // Add more admin emails here
] as const
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
e-License/
├── frontend/
│   ├── app/                    # Next.js app directory
│   │   ├── admin/              # Admin dashboard page
│   │   ├── apply/              # Application form page
│   │   ├── dashboard/          # User dashboard page
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── admin/              # Admin-specific components
│   │   ├── apply/              # Application form components
│   │   ├── auth/               # Authentication components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── layout/             # Layout components
│   │   ├── pdf/               # PDF generation components
│   │   ├── sections/          # Home page sections
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and configurations
│   ├── public/                 # Static assets
│   └── styles/                 # Global styles
```

## 📝 License Types

### Lesen Pasar (Market License)
- **Jenis Pasar**: Pilih jenis pasar (Pagi/Malam/Lambak/Sehari)
- **Lokasi Pasar**: Pilih lokasi pasar (maksimum 3 lokasi)
- **Jenis Jualan**: Tambah kategori dan penerangan jualan
- **Jumlah Lot**: Peruntukan lot tapak (1-10)
- **Pelan Pasar**: Muat naik gambar atau PDF pelan pasar

### Lesen Penjaja (Hawker License)
- **Jenis Penjaja**: Pilih jenis penjaja (Bergerak/Tetap/Food Truck)
- **Alamat Operasi**: Masukkan alamat operasi
- **Produk/Perkhidmatan**: Nyatakan produk atau perkhidmatan
- **Waktu Operasi**: Pilih waktu mula dan tamat operasi
- **Jenis Kenderaan**: Pilih jenis kenderaan (Motosikal/Van/Lori/Gerai/Kereta)
- **Nombor Pendaftaran Kenderaan**: Masukkan nombor pendaftaran
- **Gambar Tempat Operasi**: Muat naik gambar tempat operasi

## 🔐 User Roles

### Regular Users
- Can register and login
- Can submit license applications
- Can view their application status
- Can download approved licenses as PDF

### Administrators
- All regular user features
- Access to admin dashboard
- Can view all applications
- Can approve/reject applications
- Can generate license PDFs for approved applications
- View application statistics

## 🔄 Application Workflow

1. **User Registration/Login**: Create account or sign in
2. **Submit Application**: Fill out multi-step application form
3. **File Upload**: Upload required documents (images/PDFs)
4. **Review**: Admin reviews the application
5. **Approval/Rejection**: Admin approves or rejects with feedback
6. **License Generation**: Approved applications can generate PDF licenses

## 🎨 Customization

### Branding
- Replace logo files in `frontend/public/`:
  - `placeholder-logo.png` - Main logo
  - `placeholder-logo.svg` - SVG version
- Update metadata in `frontend/app/layout.tsx`
- Customize colors in `tailwind.config.js`

### Styling
- Theme configuration in `frontend/components/theme-provider.tsx`
- Global styles in `frontend/app/globals.css`
- Component styles using Tailwind CSS

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🧪 Development

```bash
# Run development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## 🗄️ Database Schema

### Applications Collection
```typescript
{
  userId: string
  userEmail: string
  personalInfo: {
    fullName: string
    icNumber: string
    address: string
    phone: string
    race: string
    gender: "male" | "female"
  }
  applyForPasar: boolean
  pasarLicense?: {
    jenisPasar: string
    lokasiPasar: string
    jenisJualan: Array<{ category: string; description: string }>
    pelanPasar: string
    jumlahLot: string
  }
  hawkerLicense: {
    hawkerType: string
    address: string
    product: string
    workingHours: string
    vehicleType: string
    vehicleRegNo: string
    placeImageUrl: string
  }
  agreedToTerms: boolean
  status: "pending" | "approved" | "rejected"
  createdAt: Timestamp
  updatedAt: Timestamp
  reviewedBy?: string
  reviewedAt?: Timestamp
}
```

## 📄 License Generation

The system generates professional PDF licenses for approved applications:
- **License Number**: Auto-generated unique identifier
- **Expiry Date**: 1 year from approval date
- **License Details**: All relevant information from the application
- **Digital Signature**: Electronically generated document

## 🔒 Security Features

- Firebase Authentication for secure user management
- Role-based access control for admin functions
- File upload validation (type and size)
- Secure file storage in Firebase Storage
- Input validation and sanitization

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- Adam Idris - Initial work

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Firebase](https://firebase.google.com/)

---

**Made with ❤️ for efficient license management**

