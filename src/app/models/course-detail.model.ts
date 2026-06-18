export interface VideoDTO {
  id?: number;
  courseId: number;
  title: string;
  description: string;
  videoLink: string[];
}

export interface CourseDetail {
  id: number;

  name: string;

  description: string;

  likes: number;

  views: number;

  liked: boolean;

  price: number;
  courseType: 'FREE' | 'PAID';

  authorName: string;

  categoryName: string;

  videos: VideoDTO[];
}
