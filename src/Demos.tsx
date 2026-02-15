import { Outlet, useMatches } from 'react-router';
import PageHeading from './components/general/PageHeading';


function Demos() {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  const title = (currentRoute?.handle as { title?: string })?.title;

  return (
    <>
      <div className="group">
        {title && <PageHeading
        >
          {title}
        </PageHeading>}
      </div>
      <Outlet/>
    </>
  )
}

export default Demos;