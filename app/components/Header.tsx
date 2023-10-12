import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="h-64 bg-gradient-to-r  from-[#01161e] to-[#69969d]  p-2">
      <div className="text-center mt-10">
        <h1 className="text-white text-5xl font-bold mb-2">
          Seamless Reservations, Memorable Moments{" "}
        </h1>
        <SearchBar />
        <p className="text-center text-white my-2">
          Table for Two or Twenty, We've Got You Covered!!
        </p>
      </div>
    </div>
  );
}
