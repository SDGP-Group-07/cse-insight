# CSE Insight 📈

**CSE Insight** is a next-generation financial intelligence platform designed for the Colombo Stock Exchange (CSE). It combines real-time market data with advanced AI analytics to empower investors with actionable insights.

For a technical deep dive, check out our [High-Level Architecture](./ARCHITECTURE.md).

![CSE Insight Hero](src/assets/logo.png)

## 🚀 Features

-   **Dynamic Dashboard**: Real-time overview of market performance, top gainers/losers, and market indices.
-   **AI Chatbot**: An intelligent assistant to answer your financial queries and provide market summaries.
-   **Advanced Charting**: Interactive price charts with toggleable **Candle** and **Line** views, including technical indicators.
-   **Company Analysis**: Detailed company profiles with fundamental data, peer comparison, and historical performance.
-   **Notification System**: Subscribe to companies and receive alerts for price changes and news.
-   **Knowledge Base (Wiki)**: Educational resources to help users understand financial concepts.
-   **Tools Suite**:
    -   **Dividend Calendar**: Track upcoming dividend payments.
    -   **Brokers Directory**: Find and compare authorized stockbrokers.
    -   **Technical Analysis**: Advanced tools for technical market analysis.
    -   **Document Analyzer (RAG)**: AI-powered analysis of financial reports (Coming Soon).
    -   **Price Predictions**: AI-driven stock price forecasting (Coming Soon).

## 🛠️ Tech Stack

-   **Frontend Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Charting**: [Recharts](https://recharts.org/)
-   **State Management**: React Context API
-   **Routing**: React Router v7
-   **HTTP Client**: Axios

## 📂 Project Structure

```
cse-insight/
├── src/
│   ├── assets/          # Images, GIFs, and static assets
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Generic components (Button, Card, Header, Footer)
│   │   ├── dashboard/   # Dashboard-specific widgets
│   │   ├── company/     # Company analysis components (PriceChart, CompanyHeader)
│   │   └── ...
│   ├── context/         # Global state providers
│   │   ├── AuthContext.jsx         # Authentication state
│   │   ├── ThemeContext.jsx        # Dark/Light mode
│   │   ├── NotificationContext.jsx # Notifications & Subscriptions
│   │   └── MarketDataContext.jsx   # Market data management
│   ├── pages/           # Application pages (Dashboard, Company, Login, etc.)
│   ├── services/        # API integration services
│   │   ├── api.js           # Axios instance configuration
│   │   └── authService.js   # Auth API calls (Login, Register)
│   ├── routes.jsx       # Route definitions
│   ├── App.jsx          # Root component with providers
│   └── main.jsx         # Entry point
└── ...
```

## ⚡ Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/cse-insight.git
    cd cse-insight
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## 🔐 Authentication & Demo Access

The application currently uses a mock authentication service for demonstration purposes.

**Demo Credentials:**
-   **Email**: `demo@cse.lk`
-   **Password**: `Password123!`

You can also register a new account via the **Sign Up** page (data is stored locally in your browser session).

## 📡 API & Services

The project is structured to easily switch between mock data and a real backend.

-   **`src/services/api.js`**: Configures the Axios instance with base URLs and interceptors for JWT tokens.
-   **`src/services/authService.js`**: Handles login, registration, and token management. Currently mocks responses but contains commented-out code for real API integration.

## 🎨 Theme System

The application supports **Dark** (default) and **Light** modes. The theme is persisted in `localStorage` and managed via `ThemeContext`.

-   **Dark Mode**: Optimized for trading environments with deep blues and neon accents.
-   **Light Mode**: Clean, high-contrast interface for readability.

## 🔔 Notifications

Users can subscribe to specific companies by clicking the **Bell Icon** on the company page. Notifications are managed locally via `NotificationContext` and displayed in the header dropdown.

---

**© 2025 CSE Insight. All rights reserved.**
