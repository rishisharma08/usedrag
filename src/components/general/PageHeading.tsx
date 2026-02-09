import type { HtmlHTMLAttributes } from "react";

function PageHeading( props: HtmlHTMLAttributes <HTMLHeadingElement> ){
  const {className = "", ...others} = props;
  return <h2
    className={`font-bold text-lg ${className}`}
    {...others}
  />;
}

export default PageHeading;