export default function CreateUser() {
  return (
    <main className="rounded-[5px] bg-white border border-[#d4d4d4] mt-10 mb-12 w-[90%] sm:max-w-[544px]  sm:p-[0px] flex   flex-col mx-auto">
      <div className="p-[25px]">
        <h1 className="bold text-[19px]">Create your account</h1>
        <form className="w-full flex flex-col gap-2 mt-4">
          <label className="text-[#171717] medium">Profile image</label>
          <input type="file" />
          <label className="text-[#171717] medium">Name</label>
          <input
            className="bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]"
            type="text"
          />
          <label className="text-[#171717] medium">User Name</label>
          <input
            className="bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]"
            type="text"
          />
          <label className="text-[#171717] medium">Email</label>
          <input
            className="bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]"
            type="text"
          />
          <label className="text-[#171717] medium">Password</label>
          <input
            className="bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]"
            type="text"
          />
          <label className="text-[#171717] medium">Password Confirmation</label>
          <input
            className="bg-white p-[8px] h-[39px] rounded-[5px] border border-[#d4d4d4] focus:border-[#3b49df]"
            type="text"
          />
          <button className="h-[48px] bg-[#3b49df] mt-8 text-white hover:bg-[#2f3ab2] rounded-[5px] w-[100px]">
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
