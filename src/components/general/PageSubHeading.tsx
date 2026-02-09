import type { HtmlHTMLAttributes } from "react";

function PageSubHeading( props: HtmlHTMLAttributes <HTMLHeadingElement> ){
  const {className = "", ...others} = props;
  return <h3
    className={`${className}`}
    {...others}
  />;
}

export default PageSubHeading;