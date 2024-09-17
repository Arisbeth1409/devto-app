import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

export default function LoginNav() {
  return (
    <div className="flex flex-col gap-0 pl-0 sm:gap-1 sm:pl-9">
      <div className="bg-white w-[100%] sm:w-[300px] p-3 border border-[#d4d4d4] rounded-[5px] mb-5 text-center sm:text-left">
        <h2 className="bold text-[21px] leading-[25px] w-[100%] sm:w-[200px]">
          {" "}
          DEV Community is a community of 2,039,945 amazing developers
        </h2>
        <p className="text-[#575757] mt-4 w-[100%] sm:w-[200px]">
          We're a place where coders share, stay up-to-date and grow their
          careers.
        </p>
        <div className="mt-6 flex flex-col gap-3 w-full text-center">
          <PrimaryButton
            text="
            Create account
          "
            href="/new-user"
            underline={true}
          />
          <SecondaryButton
            className="w-[76px]"
            text="Log in"
            underline={true}
            justify="justify-center"
            href="/login"
          />
        </div>
      </div>
    </div>
  );
}
