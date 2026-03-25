export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  totalReacts?: number;
  totalComments?: number;
  attachment?: string[];
  caption?: string;
};