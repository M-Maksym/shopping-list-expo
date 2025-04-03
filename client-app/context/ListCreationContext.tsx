import React, { createContext } from "react";

type ListCreationType = {
  selectedEmoji: string;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  setSelectedEmoji: (emoji: string) => void;
};

const ListCreationContext = createContext<ListCreationType | undefined>(
  undefined
);

export function ListCreationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedEmoji, setSelectedEmoji] = React.useState("🤑");
  const [selectedColor, setSelectedColor] = React.useState("blue");

  return (
    <ListCreationContext.Provider
      value={{
        selectedEmoji,
        selectedColor,
        setSelectedColor,
        setSelectedEmoji,
      }}
    >
      {children}
    </ListCreationContext.Provider>
  );
}

export function useListCreation() {
  const context = React.useContext(ListCreationContext);
  if (!context) {
    throw new Error(
      "useListCreation must be used within a ListCreationProvider"
    );
  }
  return context;
}
