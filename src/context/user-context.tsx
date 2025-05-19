"use client";

import { useUser } from "@clerk/nextjs";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

// Define types for our context
interface QrCode {
  id: number;
  name: string;
  url: string;
  hash: string;
  createdAt: string;
  accessCount: number;
  imageUrl?: string;
}

interface UserContextType {
  clerkUser: any;
  isUserLoading: boolean;
  qrCodes: QrCode[];
  qrCodesLoading: boolean;
  qrCodesError: string | null;
  refreshQrCodes: () => Promise<void>;
}

// Create context with default values
const UserContext = createContext<UserContextType>({
  clerkUser: null,
  isUserLoading: true,
  qrCodes: [],
  qrCodesLoading: false,
  qrCodesError: null,
  refreshQrCodes: async () => {},
});

// Hook to use the context
export const useUserContext = () => useContext(UserContext);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();
  const [qrCodes, setQrCodes] = useState<QrCode[]>([]);
  const [qrCodesLoading, setQrCodesLoading] = useState(false);
  const [qrCodesError, setQrCodesError] = useState<string | null>(null);

  // Function to fetch QR codes with caching
  const fetchQrCodes = async () => {
    if (!user?.id) return;

    setQrCodesLoading(true);
    setQrCodesError(null);

    try {
      // Check for cached data first
      const cachedData = localStorage.getItem(`qr_codes_${user.id}`);
      const cachedTimestamp = localStorage.getItem(
        `qr_codes_${user.id}_timestamp`
      );

      // Use cached data if it exists and is less than 5 minutes old
      if (cachedData && cachedTimestamp) {
        const parsedData = JSON.parse(cachedData);
        const timestamp = parseInt(cachedTimestamp);
        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;

        if (timestamp > fiveMinutesAgo) {
          setQrCodes(parsedData);
          setQrCodesLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const response = await axios.get("/api/user/getqrs", {
        params: { creatorId: user.id },
      });

      setQrCodes(response.data.qrCodes);

      localStorage.setItem(
        `qr_codes_${user.id}`,
        JSON.stringify(response.data)
      );
      localStorage.setItem(
        `qr_codes_${user.id}_timestamp`,
        Date.now().toString()
      );
    } catch (error: any) {
      console.error("Failed to fetch QR codes:", error);
      setQrCodesError(error.message || "Failed to fetch QR codes");
    } finally {
      setQrCodesLoading(false);
    }
  };

  // Fetch QR codes when user loads
  useEffect(() => {
    if (isLoaded && user) {
      fetchQrCodes();
    }
  }, [isLoaded, user]);

  return (
    <UserContext.Provider
      value={{
        clerkUser: user,
        isUserLoading: !isLoaded,
        qrCodes,
        qrCodesLoading,
        qrCodesError,
        refreshQrCodes: fetchQrCodes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
