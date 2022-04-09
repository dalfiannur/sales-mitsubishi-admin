export interface Banner {
  id: number;
  source: string;
  source_url: string;
  created_at: string;
}

export interface BannerDto extends Omit<Banner, 'id' | 'created_at' | 'source' | 'source_url'> {
  image: string;
}