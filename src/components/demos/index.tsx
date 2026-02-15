import { NavLink } from "react-router";
import PageSubHeading from "../general/PageSubHeading";

const DemosIndex = () => {
  return (
    <div className="group">
      <PageSubHeading
        className="mt-8"
      >
        <NavLink to="useDrag">useDrag</NavLink>
      </PageSubHeading>
    </div>
  );
};

export default DemosIndex;