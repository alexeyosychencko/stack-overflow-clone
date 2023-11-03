export interface QuestionProps {
  id: string;
  title: string;
  tags: {
    id: string;
    name: string;
  }[];
  author: {
    id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotesLength: number;
  viewsLength: number;
  answersLength: number;
  createdAt: Date;
  clerkId?: string | null;
}
