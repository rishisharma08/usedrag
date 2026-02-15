import type { HtmlHTMLAttributes } from "react";

function SectionCaption( props: HtmlHTMLAttributes <HTMLElement> ){
  const {className = "", ...others} = props;
  return <p
    className={`text-sm text-gray-500 ${className}`}
    {...others}
  />;
}

export default SectionCaption;