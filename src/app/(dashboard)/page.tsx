"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

import {useCurrent} from "@/features/auth/api/use-current";
import {UserButton} from "@/features/auth/components/user-button";

const DashboardPage = () => {
    const router = useRouter();
    const {data, isLoading} = useCurrent();

    useEffect(() => {
        if (!data && !isLoading) {
            router.push("/sign-in");
        }
    }, [data, isLoading, router]);

    if (isLoading) {
        return <div className="text-sm text-neutral-500">Loading dashboard...</div>;
    }

    if (!data) {
        return null;
    }

    return (
        <div>
            THis is home page
        </div>
    );
};

export default DashboardPage;
