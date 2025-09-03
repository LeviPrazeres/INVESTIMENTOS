# Overview

This is an investment simulator application that helps users calculate and visualize compound interest returns on investments. The application allows users to input initial investment amounts, monthly contributions, interest rates, and time periods to see how their investments will grow over time. It provides detailed calculations, interactive charts, and educational content about investment strategies.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application uses a modern React-based frontend with TypeScript, built using Vite as the development and build tool. The UI is constructed with shadcn/ui components built on top of Radix UI primitives, providing a comprehensive design system with accessibility features. The styling is handled through Tailwind CSS with custom CSS variables for theming support.

Key architectural decisions:
- **Component-based architecture**: Modular React components for different parts of the investment simulator (forms, charts, results display)
- **Type safety**: Full TypeScript implementation with proper type definitions for investment calculations and data structures
- **Client-side calculations**: Investment calculations are performed entirely on the frontend using compound interest formulas, eliminating the need for backend processing
- **Responsive design**: Mobile-first approach with responsive layouts using Tailwind CSS

## Backend Architecture

The backend is built with Express.js and serves as a minimal API server. Currently, it provides basic routing infrastructure and serves static files, with the potential to expand into full CRUD operations for user data and simulation storage.

Key architectural decisions:
- **Express.js server**: Simple and lightweight web server framework
- **In-memory storage**: Current implementation uses in-memory storage for user data, suitable for development and simple deployments
- **Modular routing**: Organized route handlers with separation of concerns between storage and API logic
- **Development optimization**: Integrated with Vite for hot module replacement and development workflow

## Data Storage Solutions

The application is configured to use PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The database schema includes tables for users and investment simulations.

Key architectural decisions:
- **Drizzle ORM**: Type-safe database operations with automatic TypeScript type generation
- **PostgreSQL**: Robust relational database for storing user accounts and simulation data
- **Schema-first approach**: Database schema defined in TypeScript with Zod validation
- **Migration support**: Database versioning and migration capabilities through Drizzle Kit

## Authentication and Authorization

The application includes infrastructure for user authentication with session-based authentication using PostgreSQL session storage.

Key architectural decisions:
- **Session-based authentication**: Uses express-session with PostgreSQL store for persistent sessions
- **User management**: Basic user creation and authentication flow prepared in the storage interface
- **Security considerations**: Proper session configuration and secure cookie handling

# External Dependencies

## UI and Styling
- **shadcn/ui**: Complete UI component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Lucide React**: Icon library for consistent iconography

## Charts and Visualization
- **Chart.js**: Dynamically loaded charting library for investment growth visualization
- **Recharts**: Alternative charting solution integrated into the component system

## Database and ORM
- **Drizzle ORM**: Type-safe database toolkit and query builder
- **@neondatabase/serverless**: Serverless PostgreSQL database driver
- **Drizzle Kit**: Database migration and management tool

## Form Handling and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **@hookform/resolvers**: Integration between React Hook Form and Zod validation

## State Management and Data Fetching
- **TanStack Query**: Data fetching, caching, and synchronization library
- **Wouter**: Lightweight routing library for single-page application navigation

## Development and Build Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds