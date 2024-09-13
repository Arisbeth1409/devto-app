import clsx from "clsx";

import Link from "next/link";

export default function SecondaryButton({
  iconButton,
  text,
  underline,
  justify,
  href,
  icon,
}) {
  return (
    <Link
      href={href}
      className={clsx(
        `flex gap-2 items-center h-[40px] text-[17px] ${justify} rounded-[5px] text-[#404040] p-[9px] hover:bg-[#e2e1f3] hover:text-[#2f3ab2] hover:border-[#2f3ab2]`,
        {
          "hover:underline decoration-solid": underline,
        }
      )}
    >
      {iconButton && (
        <img className="w-[25px] h-[25px]" alt={text} src={icon} />
      )}
      {text}
    </Link>
  );
}
