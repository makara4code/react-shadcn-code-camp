import { createBrowserRouter } from "react-router-dom";
import { privateRoutes } from "./PrivateRoutes";
import { publicRoutes } from "./PublicRoutes";

export const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export default router;