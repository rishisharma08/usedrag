import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, type RouteObject } from "react-router";
import routes from './routeConfig.tsx';
import './index.css';

const router = createBrowserRouter(routes as RouteObject[]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
