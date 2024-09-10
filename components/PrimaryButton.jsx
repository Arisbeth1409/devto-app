import Link from "next/link";
import clsx from "clsx";

export default function PrimaryButton({ text, to, underline }) {
  return (
    <Link
      href={to}
      className={clsx(
        "text-[#3b49df] border border-[#3b49df] p-[8px] rounded-[5px] hover:bg-[#3b49df] hover:text-[#ffffff] hover:border-[#2f3ab2]",
        {
          "hover:underline decoration-solid": underline,
        }
      )}
    >
      {text}
    </Link>
  );
}
