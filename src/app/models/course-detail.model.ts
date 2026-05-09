export interface Video {

  courseId: number;
  title: string;
  description: string;

}

export interface VideoDTO {

  id: number;
  title: string;
  description: string;
  video_link: string[];

}

export interface CourseDetail {

  id: number;

  name: string;

  description: string;

  likes: number;

  views: number;

  liked: boolean;

  author_name: string;

  category_name: string;

  videos: VideoDTO[];

}