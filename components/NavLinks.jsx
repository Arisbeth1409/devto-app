import jsonData from "@/public/icons.json";
import SecondaryButton from "./SecondaryButton";

export default function NavLinks({ navLinks }) {
  const data = navLinks
    ? jsonData?.[0]?.navButtons
    : jsonData?.[0]?.navButtonsOther;
  return (
    <div className="flex flex-col gap-1 pl-9">
      {!navLinks && <h2 className="mt-7 mb-3 bold pl-3">Other</h2>}
      {data.map((button, index) => {
        return (
          <SecondaryButton
            href={button.to}
            text={button.text}
            icon={button.icon}
            underline={button.underline}
            key={`${index}-${button.text}`}
            iconButton={true}
          />
        );
      })}
    </div>
  );
}
