/* eslint-disable react-refresh/only-export-components */

// import { AboutPage } from "@/views/www/about/About";
// import { ContactUs } from "@/views/www/contact-us/ContactUs";
// import { HomePage } from "@/views/www/home/HomePage";
// import { LearnMore } from "@/views/www/learn-more/LearnMore";
// import Login from "@/views/app/authentication/Login";
// import Products from "@/views/www/products/Products";
// import PublicOutlet from "@/components/outlets/PublicOutlet";

import loadable from "@loadable/component";

const AboutPage = loadable(() => import("@/views/www/about/About"));
const ContactUs = loadable(() => import("@/views/www/contact-us/ContactUs"));
const HomePage = loadable(() => import("@/views/www/home/HomePage"));
const LearnMore = loadable(() => import("@/views/www/learn-more/LearnMore"));
const Login = loadable(() => import("@/views/app/authentication/Login"));
const Products = loadable(() => import("@/views/www/products/Products"));
const PublicOutlet = loadable(() => import("@/components/outlets/PublicOutlet"));

export const publicRoutes = [
  {
    path: "/",
    element: <PublicOutlet />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/learn-more",
        element: <LearnMore />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default publicRoutes;
