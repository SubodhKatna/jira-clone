import React from "react";

import Sidebar from "@/components/sidebar";
import {Navbar} from "@/components/navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({children}: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="flex h-full w-full">
                <div className="fixed top-0 left-0 hidden h-full overflow-y-auto bg-slate-200 lg:block lg:w-64">
                    <Sidebar/>
                </div>

                <div className="min-h-screen flex-1 lg:pl-64 flex flex-row justify-between">
                    <div className="mx-auto h-full w-full max-w-screen-2xl">
                        <Navbar/>
                        <main className="flex h-full flex-col px-6 py-8">{children}</main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
