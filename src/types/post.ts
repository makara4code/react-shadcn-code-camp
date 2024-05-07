export type Post = {
  id: number;
  status: string;
  sort: any;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  title: string;
  content: string;
  thumbnail: {
    id: string;
  };
};
