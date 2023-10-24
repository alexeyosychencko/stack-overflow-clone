export interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: string;
  upvotes: number;
  views: number;
  answers: number;
  createdAt: string;
  clerkId?: string | null;
}
