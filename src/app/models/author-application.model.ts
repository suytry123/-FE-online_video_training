export interface AuthorApplicationRequest {
  education: string;
  address: string;
  authorBio: string;
  authorExpertise: string;
}

export interface AuthorApplicationResponse {
  applicationId: number;
  userId: number;
  username: string;
  status: string;
  education: string;
  address: string;
  authorBio: string;
  authorExpertise: string;
  submittedAt: string;
  message: string;
}

export interface AuthorApplicationSearchParams {
  pageNumber: number;
  pageLimit: number;
  username?: string;
  status?: string;
}
