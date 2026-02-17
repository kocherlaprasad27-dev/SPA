import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for development
const DEMO_ADMIN: User = {
  id: '1',
  email: 'admin@spabook.com',
  firstName: 'Admin',
  lastName: 'User',
  avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=F08080&color=fff',
  role: 'super_admin',
  permissions: ['*'],
};

const DEMO_CUSTOMER: User = {
  id: '2',
  email: 'customer@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=A0C4FF&color=fff',
  role: 'customer',
  permissions: ['view_services', 'book_appointment'],
};

const DEMO_MANAGER: User = {
  id: '3',
  email: 'manager@spabook.com',
  firstName: 'Sarah',
  lastName: 'Connor',
  avatar: 'https://ui-avatars.com/api/?name=Sarah+Connor&background=FFD700&color=fff',
  role: 'manager',
  permissions: ['manage_bookings', 'view_reports', 'manage_staff', 'manage_inventory'],
};

const DEMO_RECEPTIONIST: User = {
  id: '4',
  email: 'receptionist@spabook.com',
  firstName: 'Pam',
  lastName: 'Beesly',
  avatar: 'https://ui-avatars.com/api/?name=Pam+Beesly&background=98FB98&color=fff',
  role: 'receptionist',
  permissions: ['manage_bookings', 'check_in_guest', 'process_payments'],
};

const DEMO_THERAPIST: User = {
  id: '5',
  email: 'therapist@spabook.com',
  firstName: 'Phoebe',
  lastName: 'Buffay',
  avatar: 'https://ui-avatars.com/api/?name=Phoebe+Buffay&background=DDA0DD&color=fff',
  role: 'therapist',
  permissions: ['view_schedule', 'update_service_status'],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('auth_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    } else {
      // No auto-login for now, let them login manually to test roles
      // or default to null
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    let loggedInUser = DEMO_CUSTOMER;

    if (email === 'admin@spabook.com') {
      loggedInUser = DEMO_ADMIN;
    } else if (email === 'manager@spabook.com') {
      loggedInUser = DEMO_MANAGER;
    } else if (email === 'receptionist@spabook.com') {
      loggedInUser = DEMO_RECEPTIONIST;
    } else if (email === 'therapist@spabook.com') {
      loggedInUser = DEMO_THERAPIST;
    } else {
      loggedInUser = {
        ...DEMO_CUSTOMER,
        email: email,
      };
    }

    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    localStorage.setItem('auth_token', 'demo_token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  };

  const register = async (data: RegisterData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'customer',
      permissions: ['view_services', 'book_appointment'],
      avatar: `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=random`
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('auth_token', 'demo_token');
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    if (user.permissions.includes('*')) return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register,
      hasPermission,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
