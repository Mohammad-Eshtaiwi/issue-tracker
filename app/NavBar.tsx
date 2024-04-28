"use client";
import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const linkClass = "transition-colors hover:text-zinc-800";

function isActiveThenAddClass(href: string, pathName: string) {
  if (href === pathName) return " text-zinc-900 ";
  return " text-zinc-500 ";
}

const links = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Issues",
    href: "/issues/list",
  },
];

classNames;

const Navbar = () => {
  const pathName = usePathname();
  const { status, data: session } = useSession();
  console.log(status);

  return (
    <nav className="flex gap-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className={classNames(linkClass, {
                "text-zinc-900": link.href === pathName,
                "text-zinc-500": link.href !== pathName,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Sign Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
