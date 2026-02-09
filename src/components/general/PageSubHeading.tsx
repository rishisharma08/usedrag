import type { HtmlHTMLAttributes } from "react";

function PageSubHeading( props: HtmlHTMLAttributes <HTMLHeadingElement> ){
  const {className = "", ...others} = props;
  return <h2
    className={`text-lg font-medium ${className}`}
    {...others}
  />;
}

export default PageSubHeading;