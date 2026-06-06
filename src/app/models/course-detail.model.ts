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

  authorName: string;

  categoryName: string;

  videos: VideoDTO[];
}
