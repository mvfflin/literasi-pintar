import Image from "next/image";
import { Inter } from "next/font/google";
import { BiSearch, BiSolidGraduation } from "react-icons/bi";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == "authenticated") {
      console.log(session);
    }
  }, [status]);

  return (
    <main className={`max-w-screen h-screen`}>
      <div className="main">
        <div className="title mx-auto justify-center text-center w-max mt-52">
          <h1 className="text-5xl lg:text-7xl mx-auto w-max">
            <BiSolidGraduation />
          </h1>
          <h1 className="text-5xl lg:text-7xl font-bold">Literasi Pintar</h1>
          <h1 className="text-lg lg:text-2xl font-medium mt-5">
            Tempat kamu mencari buku kesukaanmu!
          </h1>
          {session && (
            <>
              <h1 className="text-base lg:text-xl mt-5">
                Selamat datang kembali, {session?.user?.name}
              </h1>
              <button
                onClick={() => signOut()}
                className="btn-primary text-sm mt-2"
              >
                Sign Out
              </button>
            </>
          )}

          <h1 className="text-base lg:text-xl mt-10">Cari buku</h1>
          <div className="flex justify-center">
            <input
              className="outline-none bg-gray-800 p-2 rounded-lg px-4 mt-2 text-base lg:text-lg text-left"
              placeholder="Cari buku..."
            />
            <button className="ml-4 bg-blue-950 p-2 px-4 mt-2 text-base lg:text-lg rounded-lg">
              <BiSearch />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
