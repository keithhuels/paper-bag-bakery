import Link from "next/link";

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}): JSX.Element => {
  return (
    <>
      <div
        className="sidebar-container fixed w-full h-full overflow-hidden justify-center bg-white grid pt-[120px] left-0 z-10"
        style={{
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`,
          border: 10,
        }}
      >
        <button className="absolute right-0 p-5" onClick={toggle}>
          {/* Close icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            />
          </svg>
        </button>

        <ul className="sidebar-nav text-center leading-relaxed text-xl">
          <li>
            <Link href="/about" onClick={toggle}>
              <p>About Us</p>
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={toggle}>
              <p>Services</p>
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={toggle}>
              <p>Contact</p>
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="inline-flex items-center md:hidden"
          onClick={toggle}
        >
          {/* Menu icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path fill="#fff" d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
