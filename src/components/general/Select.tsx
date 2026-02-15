import type { SelectHTMLAttributes } from "react";
import DownArrow from "src/assets/down-arrow.svg?react";
import { twMerge } from "tailwind-merge";

function Select( props: SelectHTMLAttributes<HTMLSelectElement> ){
  const { className = "", multiple = false, ...others } = props;
  return(
    <div
      className="relative"
    >
      <select
        className={twMerge( `w-full p-2 cursor-pointer border border-gray-300 appearance-none`, className )}
        {...{multiple}}
        {...others}
      ></select>
      {!multiple && <DownArrow
        className="size-7 absolute stroke-gray-300 right-1 top-1/2 -translate-y-1/2 pointer-events-none"
      />}
    </div>
  );
}

export default Select;