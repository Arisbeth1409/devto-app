import clsx from "clsx";

import Image from "next/image";
import Link from "next/link";

export default function SecondaryButton({
  iconButton,
  text,
  underline,
  justify,
  href,
}) {
  return (
    <Link
      href={href}
      className={clsx(
        `flex items-center h-[40px] text-[17px] ${justify} rounded-[5px] text-[#404040] p-[9px] hover:bg-[#e2e1f3] hover:text-[#2f3ab2] hover:border-[#2f3ab2]`,
        {
          "hover:underline decoration-solid": underline,
        }
      )}
    >
      {iconButton && (
        <Image
          className="pr-2"
          src={iconButton}
          alt={text}
          width={35}
          height={35}
        />
      )}
      {text}
    </Link>
  );
}
