import type { HtmlHTMLAttributes } from "react";

function PageHeading( props: HtmlHTMLAttributes <HTMLHeadingElement> ){
  const {className = "", ...others} = props;
  return <h1
    className={`font-bold text-2xl ${className}`}
    {...others}
  />;
}

export default PageHeading;