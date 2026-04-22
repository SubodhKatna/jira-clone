import Link from "next/link";
import Image from "next/image";
import {DottedSeparator} from "@/components/dotted-seaparator";
import Navigation from "@/components/navigation";

const Sidebar = () => {
    return (
        <aside className="h-full w-full bg-neutral-100 p-4">
            <Link href="/" className="flex items-center font-semibold text-3xl text-blue-500">
                <Image src="/logo.svg" alt="Logo" width={68} height={68} priority/>
                <p>Orbit</p>
            </Link>

            <DottedSeparator className="my-4"/>
            <Navigation/>
        </aside>
    );
};

export default Sidebar;
