"use client"

import {Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {MenuIcon} from "lucide-react";
import Sidebar from "@/components/sidebar";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

export const MobileSidebar = () => {
    const [isopen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false)
    }, [pathname]);
    return (
        <Sheet modal={false} open={isopen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild={true}>
                <Button variant="secondary" className="lg:hidden size-8">
                    <MenuIcon size="4" className="text-neutral-500"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                    Primary site navigation menu
                </SheetDescription>
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}
