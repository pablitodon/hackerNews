import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "@/components/HomePage/HomePage";
import NewsPage from "@/components/NewsPage/NewsPage";

export const appRouter = createBrowserRouter([
    {
        element: <App />,
        errorElement: <div>Error</div>,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/:id", element: <NewsPage /> }

        ]
    }
])