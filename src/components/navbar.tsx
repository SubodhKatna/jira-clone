import {UserButton} from "@/features/auth/components/user-button";
import {MobileSidebar} from "@/components/mobile-sidebar";

export const Navbar = () => {
    return (
        <nav className="flex w-full items-center justify-between px-6 py-8">
            <div className="flex items-center gap-2">
                <MobileSidebar/>
                <div className="flex-col hidden lg:flex">
                    <h1 className="text-2xl font-semibold">
                        Home
                    </h1>
                    <p className="text-muted-foreground">
                        Monitor all your task and projects
                    </p>
                </div>
            </div>
            <UserButton/>
        </nav>
    )
}
