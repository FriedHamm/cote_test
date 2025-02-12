export default function AccountLayout({ children }) {
  return (
    <div className="bg-[#FFFAF0] flex min-h-full flex-1 flex-col justify-center pt-[104px] pb-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Nossi.Dev"
          src="/logo.webp"
          className="mx-auto h-10 w-auto"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          {children}
        </div>
      </div>
    </div>
  );
}