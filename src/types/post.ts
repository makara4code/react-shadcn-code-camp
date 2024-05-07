export type Post = {
  slug: string;
  status: string;
  sort: any;
  date_created: string;
  user_updated: string;
  date_updated: string;
  title: string;
  content: string;
  user_created: {
    last_name: string;
    first_name: string;
  },
  thumbnail: {
    id: string;
  };
};
