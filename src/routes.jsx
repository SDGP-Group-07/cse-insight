import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

// Pages
import TemporaryLandingPage from './pages/TemporaryLandingPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import WikiPage from './pages/WikiPage';
import ChatbotPage from './pages/ChatbotPage';
import RAGPage from './pages/RAGPage';
import PredictionPage from './pages/PredictionPage';
import CompanyPage from './pages/CompanyPage';
import DividendCalendarPage from './pages/DividendCalendar';
import BrokersPage from './pages/BrokersList';
import TechnicalAnalysisPage from './pages/TechnicalAnalysis';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import SectorsPage from './pages/SectorsPage';
import ComparePage from './pages/ComparePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout><LandingPage /></AppLayout>,
    },
    {
        path: '/login',
        element: <AppLayout><LoginPage /></AppLayout>,
    },
    {
        path: '/register',
        element: <AppLayout><RegisterPage /></AppLayout>,
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <AppLayout><DashboardPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/profile',
        element: (
            <ProtectedRoute>
                <AppLayout><ProfilePage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/settings',
        element: (
            <ProtectedRoute>
                <AppLayout><SettingsPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/sectors',
        element: (
            <ProtectedRoute>
                <AppLayout><SectorsPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/compare',
        element: (
            <ProtectedRoute>
                <AppLayout><ComparePage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/wiki',
        element: <AppLayout><WikiPage /></AppLayout>,
    },
    {
        path: '/wiki/:topic',
        element: <AppLayout><WikiPage /></AppLayout>,
    },
    {
        path: '/chatbot',
        element: (
            <ProtectedRoute>
                <AppLayout><ChatbotPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/document-analyzer',
        element: (
            <ProtectedRoute>
                <AppLayout><RAGPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/predictions',
        element: (
            <ProtectedRoute>
                <AppLayout><PredictionPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/company/:symbol',
        element: (
            <ProtectedRoute>
                <AppLayout><CompanyPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/companies',
        element: (
            <ProtectedRoute>
                <AppLayout><DashboardPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/tools/dividends',
        element: (
            <ProtectedRoute>
                <AppLayout><DividendCalendarPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/dividend-calendar',
        element: (
            <ProtectedRoute>
                <AppLayout><DividendCalendarPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/tools/brokers',
        element: <AppLayout><BrokersPage /></AppLayout>,
    },
    {
        path: '/brokers',
        element: <AppLayout><BrokersPage /></AppLayout>,
    },
    {
        path: '/tools/technical-analysis',
        element: (
            <ProtectedRoute>
                <AppLayout><TechnicalAnalysisPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/technical-analysis',
        element: (
            <ProtectedRoute>
                <AppLayout><TechnicalAnalysisPage /></AppLayout>
            </ProtectedRoute>
        ),
    },
]);

export default router;
