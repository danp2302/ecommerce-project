"use client";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { AlertColor } from "@mui/material";
import { ReactNode } from "react";

interface ActionFeedback {
  message?: string;
  color?: AlertColor;
  autoHideDuration?: number;
  open: boolean;
}

interface ActionFeedbackAlert {
  alert: ActionFeedback;
  setAlert: Dispatch<SetStateAction<ActionFeedback>>;
}

interface Props {
  children: ReactNode;
}

const ActionFeedbackContext = createContext<ActionFeedbackAlert>({
  alert: { open: false },
  setAlert: () => {},
});

const ActionFeedbackProvider = ({ children }: Props) => {
  const [alert, setAlert] = useState<ActionFeedback>({
    open: false,
  });

  return (
    <ActionFeedbackContext.Provider value={{ alert, setAlert }}>
      {children}
    </ActionFeedbackContext.Provider>
  );
};

export { ActionFeedbackContext, ActionFeedbackProvider };
