import Link from "next/link";
import clsx from "clsx";

export default function PrimaryButton({ text, href, underline }) {
  return (
    <Link
      href={href}
      className={clsx(
        "text-[#3b49df] block h-[40px] border border-[#3b49df] pt-[8px] pb-[8px] pl-[12px] pr-[12px] rounded-[5px] hover:bg-[#3b49df] hover:text-[#ffffff] hover:border-[#2f3ab2]",
        {
          "hover:underline decoration-solid": underline,
        }
      )}
    >
      {text}
    </Link>
  );
}
