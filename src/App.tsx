import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ItemsPage } from './pages/ItemsPage';
import { ItemDetailsPage } from './pages/ItemDetailsPage';
import { CreateItemPage } from './pages/CreateItemPage';
import { MyItemsPage } from './pages/MyItemsPage';
import { UpdateStatusPage } from './pages/UpdateStatusPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { EditItemPage } from './pages/EditItemPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              {/* Public routes without header */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Routes with header */}
              <Route path="/" element={<><Header /><Home /></>} />
              <Route path="/items" element={<><Header /><ItemsPage /></>} />
              <Route path="/items/:id" element={<><Header /><ItemDetailsPage /></>} />
              <Route path="/items/:id/update-status" element={<><Header /><UpdateStatusPage /></>} />
              <Route path="/edit/:id" element={<EditItemPage />} />
              <Route path="/create" element={<><Header /><CreateItemPage /></>} />
              <Route path="/my-items" element={<><Header /><MyItemsPage /></>} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}