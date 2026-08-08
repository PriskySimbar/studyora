# Studyora

> A modern full-stack learning platform for managing courses, assignments, and academic activities.

Studyora is a full-stack web application built with Next.js and TypeScript. It provides students with a centralized platform to organize their academic activities through authentication, course management, assignment management, and a personalized dashboard.

## ✨ Features

- 🔐 User registration & login
- 🔒 Secure password hashing with bcrypt
- 📚 Course management
- 📝 Assignment management
- 📊 Personalized dashboard
- ⚙️ User settings
- 📱 Responsive interface
- 🗄️ PostgreSQL database
- 🔄 Server-side data handling with Next.js Server Actions

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js |
| Language | TypeScript |
| UI | React + Tailwind CSS |
| Authentication | Auth.js |
| Backend | Next.js Server Actions |
| ORM | Prisma |
| Database | PostgreSQL |
| Database Hosting | Neon |
| Security | bcrypt |
| Deployment | Vercel |

## 🏗️ Architecture

```text
User
 │
 ▼
Next.js / React
 │
 ├── Authentication ──► Auth.js
 │
 ├── Server Actions
 │        │
 │        ▼
 │      Prisma
 │        │
 │        ▼
 │   PostgreSQL / Neon
 │
 └── Dashboard
      ├── Courses
      ├── Assignments
      └── Settings
```

## 📁 Project Structure

```text
studyora/
├── app/
│   ├── actions/
│   ├── components/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   ├── generated/
│   ├── prisma.ts
│   └── utils.ts
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── public/
├── .env
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/studyora.git
cd studyora
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your-postgresql-connection-string"
AUTH_SECRET="your-auth-secret"
```

> Never commit your `.env` file or expose your database credentials and authentication secrets.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run database migration

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 🗄️ Database

Studyora uses PostgreSQL with Prisma ORM.

Current user model:

```text
User
├── id
├── name
├── email
├── password
└── createdAt
```

Passwords are hashed using bcrypt before being stored in the database.

## 🔐 Authentication Flow

```text
Register
   │
   ▼
Validate Input
   │
   ▼
Check Existing User
   │
   ▼
Hash Password
   │
   ▼
Store User in PostgreSQL
   │
   ▼
Login with Auth.js
   │
   ▼
Authenticated Session
   │
   ▼
Dashboard
```

## 🧪 Development Commands

```bash
npm run dev
```

```bash
npm run lint
```

```bash
npx prisma generate
```

```bash
npx prisma migrate dev
```

## 📌 Roadmap

- [x] Landing page
- [x] Registration
- [x] Login
- [x] PostgreSQL integration
- [x] Prisma ORM
- [x] Dashboard
- [x] Course management
- [x] Assignment management
- [x] Settings
- [ ] Production deployment
- [ ] Assignment reminders
- [ ] Progress analytics
- [ ] Search & filtering

## 🎯 What I Learned

Through this project, I practiced:

- Building full-stack applications with Next.js
- Developing reusable React components
- Using TypeScript
- Implementing authentication
- Designing database schemas with Prisma
- Connecting Next.js to PostgreSQL
- Using Server Actions
- Handling environment variables
- Building responsive interfaces
- Preparing applications for production deployment

## 🌐 Deployment

Planned deployment:

- **Application:** Vercel
- **Database:** Neon PostgreSQL

## 👨‍💻 Author

**Prisky Simbar**

Computer Science Student

Interested in Full-Stack Development, AI, and Software Engineering.

---

⭐ If you find Studyora useful, consider giving this repository a star.
