import App from 'src/App.tsx'
import Demos from 'src/Demos.tsx';
import ImageCropDemo from 'demos/usedrag/components/ImageCropDemo';
import ResizeDemo from 'demos/usedrag/components/ResizeDemo';
import NormalElementBounds from 'demos/usedrag/components/NormalElementBounds';
import ImageElementBounds from 'demos/usedrag/components/ImageElementBounds';
import ImageObjectPosition from 'demos/usedrag/components/ImageObjectPosition';
import Layout from 'src/Layout.tsx';
// import UseDragPage from './components/demos/usedrag';
// import { Navigate } from 'react-router';
import DemosIndex from './components/demos';
import CssEasing from './components/demos/usedrag/components/CssEasing';
import UseDragIndex from './components/demos/usedrag/UseDragIndex';

export interface RouteConfig {
  path?: string;
  index?: boolean;
  element?: React.ReactElement;
  title?: string;
  handle?: { title?: string };
  children?: RouteConfig[];
  showInMenu?: boolean;
}

const routeConfig: RouteConfig[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
        title: "Home"
      },
      {
        path: "demos",
        element: <Demos />,
        title: "Demos",
        children: [
          {
            index: true,
            element: <DemosIndex />,
            handle: { title: "These are all my Demos" }
          },
          {
            path: "usedrag",
            title: "Use Drag",
            handle: { title: "Use Drag" },
            children: [
              {
                index: true,
                // element: <Navigate to="imagecrop" replace/>
                element: <UseDragIndex/>,
                handle: { title: "Use Drag" },
              },
              {
                path: "csseasing",
                element: <CssEasing />,
                title: "CSS Easing",
                handle: { title: "CSS Easing" }
              },
              {
                path: "imagecrop",
                element: <ImageCropDemo />,
                title: "Image Crop",
                handle: { title: "Image Crop" }
              },
              {
                path: "resize",
                element: <ResizeDemo />,
                title: "Resize",
                handle: { title: "Resize" }
              },
              {
                path: "dragwithbounds",
                element: <NormalElementBounds />,
                title: "Drag with Bounds",
                handle: { title: "Drag with Bounds" }
              },
              {
                path: "dragimagewithbounds",
                element: <ImageElementBounds />,
                title: "Drag Image with Bounds",
                handle: { title: "Drag Image with Bounds" }
              },
              {
                path: "dragimagewithobjectposition",
                element: <ImageObjectPosition />,
                title: "Drag Image with Object Position",
                handle: { title: "Drag Image with Object Position" }
              }
            ]
          }
        ]
      },
      {
        path: "*",
        element: <App />,
        title: "Home",
        showInMenu: false,
      }
    ]
  }
];
export default routeConfig;