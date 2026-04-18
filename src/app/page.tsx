"use client"
import {useRouter} from "next/navigation";
import {useCurrent} from "@/features/auth/api/use-current";
import {useEffect} from "react";
import {useLogout} from "@/features/auth/api/use-logout";
import {Button} from "@base-ui/react";

export default function Home() {
    const router = useRouter();
    const {data, isLoading} = useCurrent();
    const {mutateAsync, isPending} = useLogout();

    useEffect(() => {
        if (!data && !isLoading) {
            router.push('/sign-in');
        }
    }, [data, isLoading, router])
    return (
        <>
            <h1 className="underline font-bold text-blue-500">
                only available for authorized users
            </h1>
            <Button
                disabled={isPending}
                onClick={async () => {
                    await mutateAsync();
                    router.push('/sign-in');
                }}
            >
                {isPending ? "Logging out..." : "Logout"}
            </Button>
        </>

    );
}
