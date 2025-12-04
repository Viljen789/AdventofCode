import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-red-50 font-sans dark:bg-black">
      <Link
        href={`/`}
        className="px-4 py-2 rounded-md shadow hover:bg-gray-700"
      >
        Back
      </Link>
      <h1>Advent of Code 2025 solutions</h1>
    </header>
  );
};
export default Header;
