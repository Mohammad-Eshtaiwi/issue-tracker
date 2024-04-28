"use client";
import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Button,
  Avatar,
} from "@radix-ui/themes";
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

  return (
    // flex gap-6 items-center
    <nav className="border-b mb-5 px-5">
      <Container>
        <Flex gap="6" align="center" className="h-14" justify="between">
          <Flex gap="6" align="center">
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    className="cursor-pointer"
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                  ></Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Sign Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
