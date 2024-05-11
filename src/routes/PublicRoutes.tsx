import About from "@/views/www/about/About";
import { ContactUs } from "@/views/www/contact-us/ContactUs";
import { HomePage } from "@/views/www/home/HomePage";
import { LearnMore } from "@/views/www/learn-more/LearnMore";
import Login from "@/views/app/authentication/Login";
import PublicOutlet from "@/components/outlets/PublicOutlet";

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
        element: <About />,
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
