# Events Board Application

A modern, full-stack events management platform built with Next.js, TypeScript, and Tailwind CSS. This application allows users to browse, book, and manage events with a complete payment system integration.

## 🚀 Features

- **Event Management**: Browse and view detailed event information
- **User Authentication**: Secure login/logout with NextAuth.js
- **Booking System**: Complete event booking with multiple ticket options
- **Payment Integration**: Stripe payment processing
- **Shopping Cart**: Add multiple events and manage bookings
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Admin Panel**: Event creation and management
- **Database Integration**: PostgreSQL with Prisma ORM
- **Real-time Updates**: React Query for data synchronization

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Material-UI, Bootstrap
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Deployment**: AWS Amplify ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mariya-kindrat/events-board.git
   cd events-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db-seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── events-board/   # Events listing pages
│   │   ├── event/          # Individual event pages
│   │   ├── booking/        # Booking management
│   │   ├── cart/           # Shopping cart
│   │   └── payment/        # Payment processing
│   ├── components/         # Reusable React components
│   ├── dummy-store/        # Sample data
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── scripts/                # Build and deployment scripts
```

## 🎯 Key Features

### Event Management
- Browse events by categories (Art, Photo, Music, Dance)
- Detailed event pages with descriptions, dates, and pricing
- Event image galleries and information

### Booking System
- Multiple ticket types (Standard, Premium, VIP)
- Real-time availability checking
- Booking confirmation and management

### Payment Processing
- Secure Stripe integration
- Multiple payment methods
- Order confirmation and receipts

### User Experience
- Responsive design for all devices
- Loading states and error handling
- Toast notifications for user feedback
- Countdown timers for events

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### AWS Amplify
The application is configured for AWS Amplify deployment with:
- `amplify.yml` for build configuration
- Environment variable validation
- Automated testing setup

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db-push` - Push database schema changes
- `npm run db-seed` - Seed database with sample data
- `npm run validate-env` - Validate environment variables

## 🔧 Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Optional
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment tools
- Stripe for payment processing
- Prisma for database management
- Tailwind CSS for styling utilities

## 📞 Support

For support, email support@events-board.com or create an issue in this repository.

---

Built with ❤️ by [Mariya Kindrat](https://github.com/mariya-kindrat)