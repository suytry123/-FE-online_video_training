export interface Course {
  id?: number;
  name: string;
  price: number;
  categoryId?: number;
  authorId?: number;
  imageCover?: string;
}