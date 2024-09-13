import jsonData from "@/public/icons.json";
import SecondaryButton from "./SecondaryButton";

export default function SocialNetworks() {
  return (
    <div className="flex pl-9 mt-5 mb-5">
      {jsonData?.[0]?.navButtonsSocialNetwork.map((button, index) => {
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
