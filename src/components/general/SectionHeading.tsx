import type { HtmlHTMLAttributes } from "react";

function SectionHeading( props: HtmlHTMLAttributes <HTMLHeadingElement> ){
  const {className = "", ...others} = props;
  return <h2
    className={`text-md font-medium ${className}`}
    {...others}
  />;
}

export default SectionHeading;