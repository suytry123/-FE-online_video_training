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

  courseType: 'FREE' | 'PAID';

  liked: boolean;
  viewed?: boolean;
}
