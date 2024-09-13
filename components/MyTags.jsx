import jsonData from "@/public/icons.json";
import SecondaryButton from "./SecondaryButton";

export default function MyTags() {
  return (
    <div className="flex flex-col gap-1 pl-9 overflow-y-auto h-[300px]">
      <h2 className="mt-7 mb-3 bold pl-3">My Tags</h2>
      {jsonData?.[0]?.myTags.map((button, index) => {
        return (
          <SecondaryButton
            href="/"
            text={button.text}
            key={`${index}-${button.text}`}
          />
        );
      })}
    </div>
  );
}
