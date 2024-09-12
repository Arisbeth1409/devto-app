import Image from "next/image";

export default function LoginButton({ icon, text, href }) {
  return (
    <button className="h-[50px]  bg-white w-full p-2 rounded-[5px] border border-[#d4d4d4] hover:bg-[#ececec]">
      <a href={href || ""} className="flex items-center">
        {icon && (
          <Image
            className="pr-2"
            src={icon}
            alt={text}
            width={35}
            height={35}
          />
        )}
        <span className="text-center w-full text-[15px]">{text}</span>
      </a>
    </button>
  );
}
