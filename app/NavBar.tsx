import Link from "next/link";
import { AiFillBug } from "react-icons/ai";


const linkClass = "text-zinc-500 transition-colors hover:text-zinc-800"

const links = [
    {
        label: "Dashboard", href: "/"
    },
    {
        label: "Issues", href: "/issues"
    }
]

const Navbar = () => {
    return (
        <nav className="flex gap-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className="flex gap-6">
                {links.map(link => <li key={link.label}>
                    <Link className={linkClass} href={link.href}>{link.label}</Link>
                </li>)}
            </ul>
        </nav>
    );
};

export default Navbar;
