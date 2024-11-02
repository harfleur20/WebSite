export type UserRole = 'candidate' | 'jury' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photo?: string;
}

export interface Submission {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  candidateId: string;
  competitionId: string;
  createdAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  score?: number;
}

export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'completed';
  prizePool: number;
  category: string;
}

export interface Evaluation {
  id: string;
  submissionId: string;
  juryId: string;
  scores: {
    creativity: number;
    technique: number;
    presentation: number;
  };
  comment: string;
  createdAt: Date;
}