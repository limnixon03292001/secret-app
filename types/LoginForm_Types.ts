import { FormEvent, MouseEventHandler, SubmitEventHandler } from "react";

export interface LoginFormProps {
  activeTab: "signin" | "signup";
  isLoading: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleRegisterSubmit: SubmitEventHandler<HTMLFormElement>;
  handleLoginSubmit: SubmitEventHandler<HTMLFormElement>;
  handleOAuthSubmit: MouseEventHandler;
}

export interface InputFieldProps {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  required?: boolean;
  suffix?: React.ReactNode;
  nameId: string;
}
