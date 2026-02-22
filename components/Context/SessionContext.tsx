"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";

// context type

interface UserSessionType {
  id: string;
  name: string;
  email: string;
  image: string | null;
  emailVerified: true;
}

interface SessionContextType {
  session: {
    user: UserSessionType;
  };
  setSession: (session: any) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
  initialSession: any;
}

// Client provider
export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  initialSession,
}) => {
  const [session, setSession] = useState(initialSession);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook for easier usage
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
