# High-Level Architecture: CSE Insight

## 1. System Overview

CSE Insight is a Single Page Application (SPA) built using React, designed to provide real-time market data, analytics, and educational resources for the Colombo Stock Exchange. The application follows a modular, component-based architecture emphasizing reusability, maintainability, and performance.

```mermaid
graph TD
    User[User] -->|HTTPS| CDN[CDN / Web Server]
    CDN -->|Serves| SPA[React SPA (CSE Insight)]
    
    subgraph "Frontend Layer"
        SPA --> Router[React Router]
        Router --> Pages[Pages / Views]
        Pages --> Components[UI Components]
        Components --> Context[Context API (State)]
        Components --> Services[Service Layer]
    end
    
    subgraph "Data Layer (Current/Mock)"
        Services --> MockData[Local Mock Data]
        Services --> LocalStorage[Browser LocalStorage]
    end
    
    subgraph "Future Backend Integration"
        Services -.->|REST/WebSocket| API[Backend API]
        API -.-> DB[(Database)]
        API -.-> AI[AI Services (RAG/LLM)]
    end
```

## 2. Frontend Architecture

The frontend is structured around three key pillars: **Components**, **Contexts**, and **Services**.

### 2.1 Component Hierarchy
The UI is built using atomic design principles:
-   **Atoms**: Basic building blocks like `Button`, `Input`, `Card`.
-   **Molecules**: Combinations of atoms, e.g., `CompanyHeader`, `NewsCard`.
-   **Organisms**: Complex sections like `PriceChart`, `Navbar`, `Footer`.
-   **Templates/Layouts**: `AppLayout` which defines the common structure.
-   **Pages**: Route-specific views like `DashboardPage`, `CompanyPage`.

### 2.2 State Management (Context API)
Global state is managed using React Context to avoid prop drilling:
-   **`AuthContext`**: Manages user authentication state (user object, token) and methods (login, logout).
-   **`ThemeContext`**: Handles UI theming (Dark/Light mode) persistence.
-   **`MarketDataContext`**: Centralizes market data fetching and caching to prevent redundant API calls.
-   **`NotificationContext`**: Manages user subscriptions and real-time alerts.

### 2.3 Service Layer
All external data interactions are abstracted into a service layer:
-   **`api.js`**: A centralized Axios instance with interceptors for request/response handling (e.g., attaching JWT tokens).
-   **`authService.js`**: Encapsulates authentication logic.
-   **`marketService.js`**: (Planned) For fetching stock data.

## 3. Data Flow

1.  **User Action**: User interacts with the UI (e.g., clicks "Subscribe").
2.  **Component Handler**: The component handles the event.
3.  **Context/Service Call**: The component calls a method from a Context or Service (e.g., `subscribe(symbol)`).
4.  **State Update**: The Context updates its internal state.
5.  **Re-render**: React re-renders dependent components to reflect the new state (e.g., Bell icon turns solid).
6.  **Persistence**: Critical data (Auth token, Theme, Subscriptions) is synced to `localStorage`.

## 4. Key Technical Decisions

-   **Vite**: Chosen for its lightning-fast HMR and build performance.
-   **Tailwind CSS**: Enables rapid UI development with a utility-first approach and easy theming.
-   **Recharts**: Provides composable, responsive charting components essential for financial data visualization.
-   **Lucide React**: A consistent, lightweight icon set.
-   **Mock-First Approach**: Services are designed to return mock data initially, allowing frontend development to proceed independently of backend readiness. Switching to real data only requires uncommenting the API calls in the service files.

## 5. Security Considerations

-   **JWT Handling**: Tokens are stored in `localStorage` (for MVP) and attached to requests via Axios interceptors. *Future improvement: Move to HttpOnly cookies.*
-   **Protected Routes**: A `ProtectedRoute` wrapper ensures unauthenticated users cannot access restricted pages like the Dashboard or Profile.
-   **Input Validation**: Basic validation on forms (Login/Register).

## 6. Future Scalability

The architecture is designed to scale:
-   **Code Splitting**: Vite handles chunking, but manual code splitting can be added for large routes.
-   **Backend Integration**: The Service Layer acts as an adapter. Connecting to a real Python/Node.js backend involves updating the `api.js` base URL and endpoints.
-   **Real-time Data**: `MarketDataContext` can be upgraded to use WebSockets for live price updates without changing the consuming components.
