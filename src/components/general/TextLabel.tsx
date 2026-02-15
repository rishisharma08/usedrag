import type { HtmlHTMLAttributes } from "react";

function TextLabel( props: HtmlHTMLAttributes<HTMLElement> ){
  const {className = "", ...others} = props;
  return <span
    className={`font-medium mr-1 ${className}`}
    {...others}
  />;
}

export default TextLabel;