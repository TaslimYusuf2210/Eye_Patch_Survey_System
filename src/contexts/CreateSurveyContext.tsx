import React, { createContext, useContext, useState, type ReactNode } from 'react';
// import type ReactNode from 'react';

interface CreateSurveyContextType {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

const CreateSurveyContext = createContext<CreateSurveyContextType | undefined>(undefined);

export function CreateSurveyProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<string>('');

  return (
    <CreateSurveyContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </CreateSurveyContext.Provider>
  );
}

export function useCreateSurveyContext() {
  const context = useContext(CreateSurveyContext);
  if (context === undefined) {
    throw new Error('useCreateSurveyContext must be used within a CreateSurveyProvider');
  }
  return context;
}
