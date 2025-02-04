// Core Data Types
export interface UserData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface FormData extends Omit<UserData, 'id'> {}

export interface EditorContent {
  type: string;
  children: { text: string }[];
}

// Component Props
export interface CounterProps {
  initialCount?: number;
}

export interface UserFormProps {
  onSave?: (data: UserData) => void;
}

// Error Handling
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// API Response
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}