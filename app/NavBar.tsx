"use client"
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";


const linkClass = "transition-colors hover:text-zinc-800"

function isActiveThenAddClass(href: string, pathName: string) {
    if (href === pathName) return " text-zinc-900 "
    return " text-zinc-500 "
}

const links = [
    {
        label: "Dashboard", href: "/"
    },
    {
        label: "Issues", href: "/issues"
    }
]

classNames

const Navbar = () => {
    const pathName = usePathname()
    return (
        <nav className="flex gap-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className="flex gap-6">
                {links.map(link => <li key={link.label}>
                    <Link className={classNames(linkClass, {
                        'text-zinc-900': link.href === pathName,
                        'text-zinc-500': link.href !== pathName,

                    })} href={link.href}>{link.label}</Link>
                </li>)}
            </ul>
        </nav>
    );
};

export default Navbar;
