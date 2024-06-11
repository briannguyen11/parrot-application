export interface ProfileData {
  user: string;
  username: string;
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
  header: string;
  banner: string;
}

// For use in open project cards
export interface MinProfileData {
  id : string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  username: string;
  header: string;
}

export interface PhotoData {
  photo: string;
  caption: string;
  id: number;
  project: number;
  order: number;
}

export interface TagData {
  tag: string;
  id: number;
  project: number;
}

export interface LikeData {
  id: number;
  project: number;
  user: string;
}

export interface SaveData {
  id: number;
  project: ShowcaseData;
  user: string;
}

export interface CommentLikesData {
  id: number;
  comment_id: number;
  user_id: string;
}

export interface CommentData {
  id: number;
  user: string;
  project: number;
  content: string;
  created_date: string;
  profile: MinProfileData;
  commentLikes: CommentLikesData[];
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
