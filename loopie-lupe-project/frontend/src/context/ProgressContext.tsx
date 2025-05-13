import { createContext, useContext, useState } from "react";
import type { Type } from "../utils/Types";

type Progress = Record<Type, number>;

const defaultProgress: Progress = {
  Physical: 0,
  Mental: 0,
  Social: 0,
  Reflective: 0,
  Productivity: 0,
};

export const ProgressContext = createContext<{
  progress: Progress;
  addTypeCount: (type: Type) => void;
}>({
  progress: defaultProgress,
  addTypeCount: () => {},
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(defaultProgress);

  const addTypeCount = (type: Type) => {
    setProgress((prev) => ({
      ...prev,
      [type]: Math.min(prev[type] + 1, 20),
    }));
  };

  return (
    <ProgressContext.Provider value={{ progress, addTypeCount }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
