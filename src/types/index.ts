export interface FormField {
  type: string;
  label: string;
  name: string;
  validation: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    options?: string[];
  };
}

export interface Form {
  _id: string;
  title: string;
  fields: FormField[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
}