import { Outlet, useMatches } from 'react-router';
import PageHeading from './components/general/PageHeading';


function Demos() {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const title = (currentRoute?.handle as { title?: string })?.title;

  return (
    <div id="app">
      <div className="group">
        {title && <PageHeading
        >{title}</PageHeading>}
      </div>
      <Outlet/>
    </div>
  )
}

export default Demos;