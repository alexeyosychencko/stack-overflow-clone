export interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes?: string[];
  views?: number;
  answers?: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}
