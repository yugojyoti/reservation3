import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className=" flex flex-col gap-4">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <div>
          <Link href="/" className="px-4 py-2 text-white bg-cyan-800 ">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
