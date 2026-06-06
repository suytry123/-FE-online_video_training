export interface CourseSummary {
  id: number;
  name: string;
  categoryId: number;
  authorName: string;
  courseDescription: string;

  views: number;
  likes: number;

  imageCover?: string;
  price: number;

  liked: boolean;
  viewed?: boolean;
}
