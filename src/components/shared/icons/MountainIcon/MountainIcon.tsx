// src/icons/MountainIcon/MountainIcon.tsx
import { SVGProps } from "react";

export default function MountainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      width='1em'
      height='1em'
      fill='none'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props} /* allows className, onClick, etc. */
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 8L5 16H15L14.032 14.452L13.065 12.9L10 8Z'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11 16H19L15 10L13.065 12.9'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
