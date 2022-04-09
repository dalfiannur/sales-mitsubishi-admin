export interface News {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  thumbnailUrl: string;
  created_at: string;
}

export interface NewsDto extends Omit<News, "id" | "thumbnailUrl" | "created_at"> {}