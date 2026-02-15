import type { HtmlHTMLAttributes } from "react";

function MenuHamburgerButton( props: HtmlHTMLAttributes<HTMLButtonElement> ){
  const
    {className = "", ...others} = props;
  return(
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded p-2 hover:bg-gray-100 cursor-pointer ${className}`}
      aria-controls="mobile-nav"
      aria-expanded="false"
      // onClick="toggleMobileNav(this)"
      {...others}
    >
      <span className="sr-only">Toggle navigation</span>
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6h16M4 12h16M4 18h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

export default MenuHamburgerButton;