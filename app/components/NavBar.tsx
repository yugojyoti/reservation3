"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";

export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {" "}
        Food<span className="text-cyan-700 font-bold">Point</span>{" "}
      </Link>
      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <button
                className="bg-red-500 text-white border py-1 px-4 mr-3 rounded font-bold hover:bg-red-800"
                onClick={signout}
              >
                Logout
              </button>
            ) : (
              <>
                <SigninModal />
                <SignupModal />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
