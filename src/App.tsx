import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { LayoutDashboard, Calendar, CalendarDays, Plus, Menu } from 'lucide-react';
import { cn } from './lib/utils';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Admin Pages
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { BookingManagementPage } from './pages/bookings/BookingManagementPage';
import { CalendarViewPage } from './pages/bookings/CalendarViewPage';
import { ServiceManagementPage } from './pages/services/ServiceManagementPage';
import { EmployeeManagementPage } from './pages/employees/EmployeeManagementPage';
import { CustomerManagementPage } from './pages/customers/CustomerManagementPage';
import { CRMDashboardPage } from './pages/crm/CRMDashboardPage';
import { LoyaltyProgramPage } from './pages/loyalty/LoyaltyProgramPage';
import { PaymentBillingPage } from './pages/payments/PaymentBillingPage';
import { InventoryManagementPage } from './pages/inventory/InventoryManagementPage';
import { MembershipPackagesPage } from './pages/membership/MembershipPackagesPage';
import { RoomManagementPage } from './pages/rooms/RoomManagementPage';
import { AttendancePage } from './pages/attendance/AttendancePage';
import { AnalyticsReportingPage } from './pages/analytics/AnalyticsReportingPage';
import { MarketingHubPage } from './pages/marketing/MarketingHubPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { GiftCardsPage as AdminGiftCardsPage } from './pages/giftcards/GiftCardsPage';
import { CouponsPage } from './pages/coupons/CouponsPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { IntegrationsPage } from './pages/integrations/IntegrationsPage';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ContactPage } from './pages/public/ContactPage';
import { PackagesPage } from './pages/public/PackagesPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { BlogPage } from './pages/public/BlogPage';
import { GiftCardsPage } from './pages/public/GiftCardsPage';
import { CareersPage } from './pages/public/CareersPage';
import { CancellationPage, PrivacyPage, TermsPage } from './pages/public/LegalPages';
import { PublicLayout } from './components/layout/public/PublicLayout';

// Admin Details & Forms
import { BookingDetailPage } from './pages/bookings/BookingDetailPage';
import { NewBookingPage } from './pages/bookings/NewBookingPage';
import { CustomerDetailPage } from './pages/customers/CustomerDetailPage';
// For now, mapping NewCustomer to placeholders or generic forms if needed
const NewCustomerPage = () => <div className="p-8">New Customer Page Coming Soon...</div>;
const NewServicePage = () => <div className="p-8">New Service Page Coming Soon...</div>;


// Customer Pages
import { CustomerLayout } from './components/layout/customer/CustomerLayout';
import { BookingPage } from './pages/customer/BookingPage';
import { AppointmentsPage } from './pages/customer/AppointmentsPage';
import { ProfilePage } from './pages/customer/ProfilePage';
import { PaymentsPage } from './pages/customer/PaymentsPage';
import { LoyaltyPage } from './pages/customer/LoyaltyPage';
import { WishlistPage } from './pages/customer/WishlistPage';
import { SettingsPage } from './pages/customer/SettingsPage';
import { CustomerPortalPage } from './pages/portal/CustomerPortalPage'; // Keep for reference

import './App.css';

function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const [unreadNotifications, setUnreadNotifications] = useState(5);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (bottomSentinelRef.current) {
      observer.observe(bottomSentinelRef.current);
    }

    return () => {
      if (bottomSentinelRef.current) {
        observer.unobserve(bottomSentinelRef.current);
      }
    };
  }, []);

  const adminNavItems = [
    { icon: LayoutDashboard, label: 'Home', path: '/admin/dashboard' },
    { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
    { icon: Plus, label: 'New', path: '/admin/bookings/new', isCenter: true },
    { icon: CalendarDays, label: 'Schedule', path: '/admin/calendar' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white flex">
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'md:pl-20' : 'md:pl-72'} pb-20 md:pb-0 overflow-x-hidden`}>
        <Header
          unreadNotifications={unreadNotifications}
          onNotificationClick={() => setUnreadNotifications(0)}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden overflow-y-auto scrollbar-smooth relative">
          <div className="max-w-7xl mx-auto w-full animate-fade-in">
            {children}
          </div>
          <div ref={bottomSentinelRef} className="absolute bottom-0 h-1 w-full pointer-events-none" />
        </main>
      </div>

      {/* Mobile Bottom Navigation for Admin */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: isBottomVisible ? 100 : 0,
          opacity: isBottomVisible ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden fixed bottom-5 left-4 right-4 bg-white/70 backdrop-blur-3xl rounded-full px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/40 z-50"
      >
        <div className="flex items-center justify-between">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl transition-all duration-300 relative",
                  item.isCenter ? "-mt-8" : "p-1",
                  isActive && !item.isCenter ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {isActive && !item.isCenter && (
                  <motion.div
                    layoutId="adminBottomNavIndicator"
                    className="absolute -top-2 w-8 h-1 bg-indigo-600 rounded-full"
                  />
                )}

                <div className={cn(
                  "transition-all flex items-center justify-center",
                  item.isCenter
                    ? "w-14 h-14 bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-full text-white shadow-lg shadow-indigo-500/30 border-4 border-white"
                    : "p-2 rounded-full",
                  isActive && !item.isCenter && "bg-slate-50"
                )}>
                  <Icon className={cn(
                    "transition-all",
                    item.isCenter ? "w-6 h-6" : "w-6 h-6",
                    isActive && !item.isCenter && "text-slate-900"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-bold transition-colors",
                  item.isCenter ? "mt-1" : "",
                  isActive ? "text-slate-900" : "text-slate-500"
                )}>{item.label}</span>
              </Link>
            );
          })}
          {/* Menu Button to toggle Sidebar */}
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="flex flex-col items-center gap-1 p-1 rounded-xl text-slate-500 hover:text-slate-900 transition-all duration-300"
          >
            <div className="p-2 rounded-full">
              <Menu className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold">Menu</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
              },
            }}
          />
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/packages" element={<PublicLayout><PackagesPage /></PublicLayout>} />
            <Route path="/gallery" element={<PublicLayout><GalleryPage /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
            <Route path="/gift-cards" element={<PublicLayout><GiftCardsPage /></PublicLayout>} />
            <Route path="/careers" element={<PublicLayout><CareersPage /></PublicLayout>} />
            <Route path="/cancellation" element={<PublicLayout><CancellationPage /></PublicLayout>} />
            <Route path="/privacy" element={<PublicLayout><PrivacyPage /></PublicLayout>} />
            <Route path="/terms" element={<PublicLayout><TermsPage /></PublicLayout>} />

            {/* Customer Dashboard Routes */}
            <Route path="/customer" element={<ProtectedRoute><CustomerLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="appointments" replace />} />
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="booking" element={<BookingPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="loyalty" element={<LoyaltyPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            {/* Direct route for booking flow outside of dashboard if needed, or keep inside */}
            {/* Direct route for booking flow outside of dashboard if needed, or keep inside */}
            <Route element={<ProtectedRoute><CustomerLayout /></ProtectedRoute>}>
              <Route path="/book" element={<BookingPage />} />
            </Route>


            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/dashboard" element={<Navigate to="/admin/dashboard" />} /> {/* Redirect old path */}

            <Route path="/admin/dashboard" element={<ProtectedRoute><AppLayout><DashboardPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute><AppLayout><BookingManagementPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/bookings/new" element={<ProtectedRoute><AppLayout><NewBookingPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/bookings/:id" element={<ProtectedRoute><AppLayout><BookingDetailPage /></AppLayout></ProtectedRoute>} />

            <Route path="/admin/calendar" element={<ProtectedRoute><AppLayout><CalendarViewPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><AppLayout><ServiceManagementPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/services/new" element={<ProtectedRoute><AppLayout><NewServicePage /></AppLayout></ProtectedRoute>} />

            <Route path="/admin/employees" element={<ProtectedRoute><AppLayout><EmployeeManagementPage /></AppLayout></ProtectedRoute>} />

            <Route path="/admin/customers" element={<ProtectedRoute><AppLayout><CustomerManagementPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/customers/new" element={<ProtectedRoute><AppLayout><NewCustomerPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/customers/:id" element={<ProtectedRoute><AppLayout><CustomerDetailPage /></AppLayout></ProtectedRoute>} />

            <Route path="/admin/crm" element={<ProtectedRoute><AppLayout><CRMDashboardPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/loyalty" element={<ProtectedRoute><AppLayout><LoyaltyProgramPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/payments" element={<ProtectedRoute><AppLayout><PaymentBillingPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/inventory" element={<ProtectedRoute><AppLayout><InventoryManagementPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/memberships" element={<ProtectedRoute><AppLayout><MembershipPackagesPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/rooms" element={<ProtectedRoute><AppLayout><RoomManagementPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/attendance" element={<ProtectedRoute><AppLayout><AttendancePage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute><AppLayout><AnalyticsReportingPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/marketing" element={<ProtectedRoute><AppLayout><MarketingHubPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/gift-cards" element={<ProtectedRoute><AppLayout><AdminGiftCardsPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/coupons" element={<ProtectedRoute><AppLayout><CouponsPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute><AppLayout><ReportsPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/integrations" element={<ProtectedRoute><AppLayout><IntegrationsPage /></AppLayout></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AppLayout><AdminSettingsPage /></AppLayout></ProtectedRoute>} />

            {/* Legacy Portal Route - Redirect to new Appointments */}
            <Route path="/portal" element={<Navigate to="/customer/appointments" />} />

          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
