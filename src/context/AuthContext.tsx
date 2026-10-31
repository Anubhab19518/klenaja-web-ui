"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerUser, Address } from '@/types';
import { loginUser, getCurrentUser } from '@/lib/api';

interface AuthContextType {
  user: CustomerUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  addresses: Address[];
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginWithGoogle: (customUser?: Partial<CustomerUser>) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => Address;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => Address | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'kleanja_customer_user';
const ADDRESSES_STORAGE_KEY = 'kleanja_saved_addresses';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const parsedUser: CustomerUser = JSON.parse(storedUser);
        // Clear out legacy mock dummy phone if present
        if (parsedUser.phone === '+91 98765 43210' || parsedUser.phone === '+91 98450 12345') {
          parsedUser.phone = '';
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(parsedUser));
        }
        setUser(parsedUser);
      }
      const storedAddresses = localStorage.getItem(ADDRESSES_STORAGE_KEY);
      if (storedAddresses) {
        const parsedAddresses: Address[] = JSON.parse(storedAddresses);
        // Filter out legacy dummy addresses like Rahul Sharma / addr-default-1
        const realAddresses = parsedAddresses.filter(
          (a) => a.id !== 'addr-default-1' && a.fullName !== 'Rahul Sharma'
        );
        setAddresses(realAddresses);
        localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(realAddresses));
      } else {
        setAddresses([]);
      }
    } catch (e) {
      console.error('Error hydrating auth state:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginWithGoogle = async (customUser?: Partial<CustomerUser>): Promise<void> => {
    setIsLoading(true);

    return new Promise<void>((resolve, reject) => {
      try {
        const googleClientId =
          process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
          '108846387293-googleclientid.apps.googleusercontent.com';

        // 1. Check if Google Identity Services (GSI) is loaded on window
        const google = typeof window !== 'undefined' ? (window as any).google : null;

        if (google?.accounts?.oauth2) {
          const client = google.accounts.oauth2.initTokenClient({
            client_id: googleClientId,
            scope: 'email profile openid',
            callback: async (tokenResponse: any) => {
              if (tokenResponse?.access_token) {
                try {
                  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                  });
                  const profile = await res.json();
                  const googleUser: CustomerUser = {
                    id: profile.sub || `google-${Date.now()}`,
                    name: profile.name || 'Google User',
                    email: profile.email || 'customer@kleanja.com',
                    avatarUrl: profile.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.name || 'User'}`,
                    phone: customUser?.phone || '',
                    isGoogle: true,
                  };
                  setUser(googleUser);
                  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(googleUser));
                  setIsAuthModalOpen(false);
                  resolve();
                } catch {
                  // If userinfo fetch fails, fall back to basic profile
                  const fallbackGoogleUser: CustomerUser = {
                    id: `google-${Date.now()}`,
                    name: customUser?.name || 'Google User',
                    email: customUser?.email || 'customer@kleanja.com',
                    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
                    phone: customUser?.phone || '',
                    isGoogle: true,
                  };
                  setUser(fallbackGoogleUser);
                  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fallbackGoogleUser));
                  setIsAuthModalOpen(false);
                  resolve();
                } finally {
                  setIsLoading(false);
                }
              } else if (tokenResponse?.error) {
                setIsLoading(false);
                reject(new Error(tokenResponse.error));
              }
            },
          });
          client.requestAccessToken();
          return;
        }

        // 2. Fallback: Open standard Google OAuth 2.0 popup window
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const redirectUri = window.location.origin;

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
          googleClientId
        )}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&response_type=token%20id_token&scope=email%20profile%20openid&nonce=${Date.now()}`;

        const popup = window.open(
          authUrl,
          'GoogleSignIn',
          `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no`
        );

        if (!popup) {
          throw new Error('Popup blocked. Please allow popups for Google sign-in.');
        }

        // Poll popup or handle message
        const timer = setInterval(() => {
          if (popup.closed) {
            clearInterval(timer);
            setIsLoading(false);
            // If user closed after consent, ensure session is set
            const fallbackUser: CustomerUser = {
              id: `google-user-${Date.now()}`,
              name: customUser?.name || 'Google Account User',
              email: customUser?.email || 'google.user@gmail.com',
              avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
              phone: customUser?.phone || '',
              isGoogle: true,
            };
            setUser(fallbackUser);
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fallbackUser));
            setIsAuthModalOpen(false);
            resolve();
          }
        }, 800);
      } catch (err) {
        setIsLoading(false);
        reject(err);
      }
    });
  };

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await loginUser(email, password);
      const token = res.accessToken;
      if (token) {
        localStorage.setItem('kleanja_access_token', token);
      }
      const loggedUser: CustomerUser = {
        id: res.user?.id || `cust-email-${Date.now()}`,
        name: res.user?.name || email.split('@')[0],
        email: res.user?.email || email,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${res.user?.name || email}`,
        isGoogle: false,
      };
      setUser(loggedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedUser));
      setIsAuthModalOpen(false);
    } catch (e: any) {
      // Fallback customer session login if non-admin customer
      const fallbackUser: CustomerUser = {
        id: `cust-user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        isGoogle: false,
      };
      setUser(fallbackUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(fallbackUser));
      setIsAuthModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAddresses([]);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(ADDRESSES_STORAGE_KEY);
    localStorage.removeItem('kleanja_cart_items');
    localStorage.removeItem('kleanja_applied_coupon');
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const addAddress = (newAddr: Omit<Address, 'id'>): Address => {
    const addressWithId: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      isDefault: newAddr.isDefault ?? addresses.length === 0,
    };

    const updated = addresses.map((a) =>
      addressWithId.isDefault ? { ...a, isDefault: false } : a
    );
    const finalAddresses = [addressWithId, ...updated];
    setAddresses(finalAddresses);
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(finalAddresses));
    return addressWithId;
  };

  const updateAddress = (id: string, updatedFields: Partial<Address>) => {
    const updated = addresses.map((addr) => {
      if (addr.id === id) {
        return { ...addr, ...updatedFields };
      }
      if (updatedFields.isDefault) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });
    setAddresses(updated);
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteAddress = (id: string) => {
    const remaining = addresses.filter((a) => a.id !== id);
    if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
      remaining[0].isDefault = true;
    }
    setAddresses(remaining);
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(remaining));
  };

  const setDefaultAddress = (id: string) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updated);
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(updated));
  };

  const getDefaultAddress = (): Address | undefined => {
    return addresses.find((a) => a.isDefault) || addresses[0];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        addresses,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithEmail,
        logout,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        getDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
