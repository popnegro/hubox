export interface Brand {
  id: string;
  name: string;
  category: string;
  activeFranchises: number;
  totalLocations: number;
}

export interface Franchise {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
  owner: string;
  ownerEmail: string;
  ownerPhone: string;
  location: string; // e.g. "Buenos Aires", "Córdoba"
  status: 'active' | 'pending' | 'warning' | 'suspended';
  startYear: number;
  openingsPending: number;
  complianceScore: number; // 0-100
  monthlySales: number;
  checklistProgress: number; // 0-100
  checklist: ChecklistItem[];
  timeline: TimelineEvent[];
  documents: DocumentItem[];
  tickets: TicketItem[];
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  dueDate: string;
  assignee: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  type: 'milestone' | 'audit' | 'training' | 'ticket';
  description: string;
  status: 'completed' | 'pending' | 'alert';
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'legal' | 'finance' | 'manual' | 'audit' | 'infrastructure';
  uploadedAt: string;
  size: string;
}

export interface TicketItem {
  id: string;
  code: string;
  title: string;
  category: 'operations' | 'marketing' | 'infrastructure' | 'legal';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  franchiseName: string;
}

export interface Prospect {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  brandInterest: string;
  investmentBudget: string;
  stage: 'initial' | 'meeting' | 'qualification' | 'evaluation' | 'contract' | 'won';
  status: 'active' | 'on_hold' | 'lost';
  company: string;
  notes: Note[];
  activities: Activity[];
}

export interface Note {
  id: string;
  author: string;
  date: string;
  text: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'task';
  title: string;
  date: string;
  completed: boolean;
}

export interface Manual {
  id: string;
  title: string;
  category: 'operation' | 'marketing' | 'expansion' | 'administration' | 'hygiene';
  summary: string;
  lastUpdated: string;
  pages: { title: string; content: string }[];
}

export interface Course {
  id: string;
  title: string;
  category: 'management' | 'customer_service' | 'kitchen' | 'barista' | 'safety';
  duration: string;
  progress: number; // 0-100
  videoUrl?: string;
  lessonsCount: number;
  completed: boolean;
  evaluation: {
    question: string;
    options: string[];
    correctIndex: number;
    score?: number;
  };
}

export interface SystemAlert {
  id: string;
  title: string;
  type: 'warning' | 'alert' | 'success' | 'info';
  franchise: string;
  time: string;
}

export interface GlobalKPIs {
  brandsCount: number;
  franchisesCount: number;
  locationsCount: number;
  usersCount: number;
  ticketsCount: number;
  auditsCount: number;
  coursesCount: number;
  projectsCount: number;
}
