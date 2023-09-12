import React from "react";

function Navbar() {
  return (
    <nav className="sticky  top-0 left-0 !z-[70] h-[61px] w-full border-b border-gray-200 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="h-[61px] bg-custom px-3 py-2 print:hidden lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <a to="/" className="ml-2 flex md:mr-24">
              <span className="self-center whitespace-nowrap text-xl font-semibold text-white md:text-2xl">
                ByteWave
              </span>
            </a>
          </div>
          <div className="!z-[999] flex items-center justify-center gap-5">
            <div>
              <h1>Usuario</h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
