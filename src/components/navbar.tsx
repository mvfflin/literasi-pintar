import Link from "next/link";
import { BiSolidGraduation } from "react-icons/bi";

const Navbar = () => {
  const onScroll = () => {
    if (scrollY == 0) {
      document.getElementById("container")?.classList.toggle("bg-");
    }
  };

  return (
    <>
      <div
        className="block w-full h-20 backdrop-blur-md sticky top-0 shadow-xl"
        id="container"
      >
        <div className="flex justify-center pt-5">
          <div className="text-4xl font-bold pr-2">
            <BiSolidGraduation />
            {"  "}
          </div>
          <h1 className="text-3xl font-bold text-neutral-300 tracking-wide">
            Literasi Pintar
          </h1>
          <div className="ml-52">
            <ul className="justify-between">
              <Link href={"/"}>
                <li className="inline-block btn-navbar-dark mx-5">
                  <button>Home</button>
                </li>
              </Link>
              <Link href={"/search"}>
                <li className="inline-block btn-navbar-dark mx-5">
                  <button>Search Books</button>
                </li>
              </Link>
              <li className="inline-block btn-navbar-dark mx-5">
                <button>Creators</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
