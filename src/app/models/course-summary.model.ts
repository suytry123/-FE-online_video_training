export interface CourseSummary {

  id: number;
  name: string;
  category_id: number;
  author_name: string;

  views: number;
  likes: number;

  image_cover?: string;
  price: number;

  liked: boolean;
  viewed?: boolean;

}