export interface ProfileData {
  user: string;
  id: string;
  first_name: string;
  last_name: string;
  school: string;
  major: string;
  bio: string;
  profile_picture: string;
  resume: string;
  linkedin: string;
  github: string;
}

export interface PhotoData {
  photo: string;
  caption: string;
  id: number;
  project: number;
}

export interface TagData {
  tag: string;
  id: number;
  project: number;
}

export interface LikeData {
  id: number;
  project: number;
}

export interface SaveData {
  id: number;
  project: number;
}

export interface CommentData {
  id: number;
  project: number;
  comment: string;
}

export interface ShowcaseData {
  user: string;
  id: number;
  project_name: string;
  description: string;
  post_date: string;
  photos: PhotoData[];
  likes: LikeData[];
  comments: CommentData[];
  tags: TagData[];
}

export interface OpenData {
  user: string;
  id: number;
  project_name: string;
  description: string;
  post_date: string;
  group_size: number;
  level: string;
  open: boolean;
  status: string;
  tags: TagData[];
}

export interface ApplyData {
  user: string;
  id: number;
  status: string;
  project_id: number;
}
