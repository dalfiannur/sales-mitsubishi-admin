export interface Testimonial {
  id: number;
  name: string;
  content: string;
  position: string;
  image: string;
  imageUrl: string;
  avatar: string;
  avatarUrl: string;
  created_at: string;
}

export interface TestimonialDto extends Omit<Testimonial, 'id' | 'created_at' | 'imageUrl' | 'avatarUrl'> {}