import Image from "next/image";

export default function LoginButton({ icon, text }) {
  return (
    <button className="h-[50px] flex items-center bg-white w-full p-2 rounded-[5px] border border-[#d4d4d4] hover:bg-[#ececec]">
      {icon && (
        <Image className="pr-2" src={icon} alt={text} width={35} height={35} />
      )}
      <span className="text-center w-full text-[15px]">{text}</span>
    </button>
  );
}
