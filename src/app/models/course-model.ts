export interface Course {
  id: number;
  name: string;
  courseDescription: string;
  courseType: 'FREE' | 'PAID';
  price: number;
  categoryName: string;
  authorName: string;
}
