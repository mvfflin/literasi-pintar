import Link from "next/link";
import { BiLogoGithub, BiLogoDiscord } from "react-icons/bi";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();
  console.log(session?.user?.name);
  if (session) {
    window.location.href = "/";
  }

  return (
    <div className="mx-auto w-max">
      <h1 className="text-3xl font-bold mt-52 text-center mb-5">
        Login to access page
      </h1>
      <form>
        <div className="container w-auto sm:w-[500px] h-[500px] border-2 rounded-md border-gray-800 p-10">
          <div>
            <label
              htmlFor="username"
              className="block text-xl font-semibold mb-1"
            >
              Username
            </label>
            <input
              className="bg-white p-2 px-4 outline-none text-neutral-900 w-full rounded-sm"
              placeholder="Username..."
              id="username"
              name="username"
              required
            />
          </div>
          <div className="mt-10">
            <label
              htmlFor="password"
              className="block text-xl font-semibold mb-1"
            >
              Password
            </label>
            <input
              className="bg-white p-2 px-4 outline-none text-neutral-900 w-full rounded-sm"
              placeholder="Password..."
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <button className="btn-primary w-full mt-7">Login</button>
          {/* Or login with (Divider) */}
          <div className="flex items-center mt-7">
            <hr className="flex-grow border-t border-gray-500" />
            <span className="px-3 text-gray-500">Or</span>
            <hr className="flex-grow border-t border-gray-500" />
          </div>

          <div className="text-center mt-2">
            <button
              type="button"
              className="btn-dark w-full flex text-xl items-center"
              onClick={() => signIn("github")}
            >
              <BiLogoGithub />
              <span className="text-center w-full">Login with Github</span>
            </button>

            <button
              className="btn-discord w-full flex text-xl items-center mt-5"
              onClick={() => signIn("discord")}
            >
              <BiLogoDiscord />
              <span className="text-center w-full">Login with Discord</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
