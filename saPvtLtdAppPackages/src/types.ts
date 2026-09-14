/** Shared Akanso domain types — RN-safe, no DOM. Backend remains source of truth. */

export type UserRole = 'customer' | 'provider' | 'admin';

export type ServiceRequestStatus =
  | 'pending'
  | 'accepted'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type QuestionnaireQuestionType =
  | 'text'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'boolean';

export interface QuestionnaireQuestion {
  id: string;
  question: string;
  questionHi?: string;
  type: QuestionnaireQuestionType;
  options?: string[];
  optionsHi?: string[];
  required: boolean;
  placeholder?: string;
  placeholderHi?: string;
}

export interface ServiceCategory {
  id?: string;
  name: string;
  nameHi?: string;
  description?: string;
  descriptionHi?: string;
  isActive?: boolean;
  isPopular?: boolean;
  questionnaire?: QuestionnaireQuestion[];
}

export interface SessionUser {
  id?: string;
  _id?: string;
  name?: string;
  displayName?: string;
  phone?: string;
  phoneNumber?: string;
  role?: UserRole | string;
  customerDisplayId?: number | string | null;
  customerProfileComplete?: boolean;
  canSwitchToPartner?: boolean;
  canSwitchToCustomer?: boolean;
}
