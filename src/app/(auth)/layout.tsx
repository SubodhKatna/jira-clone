"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

interface AuthLayoutProps {
    children?: React.ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) => {
    const pathname = usePathname();
    // The header CTA flips between the two auth routes.
    const isSignInPage = pathname === "/sign-in";

    return (
        <main
            className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef4ff_100%)]">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
                <nav
                    className="flex items-center justify-between rounded-full border border-white/70 bg-white/75 px-4 py-3 shadow-sm backdrop-blur">
                    <div className="flex items-center gap-3">
                        <div
                            className="relative size-11 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                            <Image
                                src="/logo.svg"
                                alt="Jira logo"
                                fill
                                className="object-contain p-1.5"
                                priority
                            />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold tracking-[0.18em] text-slate-900 uppercase">
                                Orbit
                            </p>
                            <p className="text-xs text-slate-500">
                                Project operations platform
                            </p>
                        </div>
                    </div>

                    <Button asChild variant="secondary" className="bg-slate-950 text-white hover:bg-slate-800">
                        <Link href={isSignInPage ? "/sign-up" : "/sign-in"}>
                            {isSignInPage ? "Create account" : "Sign in"}
                        </Link>
                    </Button>
                </nav>

                <div className="flex flex-1 items-center py-8 lg:py-12">
                    <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                        {/* Desktop-only brand panel that balances the form column visually. */}
                        <section
                            className="relative hidden min-h-170 overflow-hidden rounded-[2rem] bg-slate-950 p-10 text-white shadow-2xl lg:flex lg:flex-col lg:justify-between">
                            <div
                                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.38),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.22),transparent_30%)]"/>
                            <div className="absolute -left-16 top-28 size-48 rounded-full border border-white/10"/>
                            <div className="absolute bottom-12 right-10 size-32 rounded-full bg-white/10 blur-3xl"/>

                            <div className="relative space-y-5">
                                <span
                                    className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase text-white/80">
                                    Team workspace
                                </span>
                                <div className="space-y-4">
                                    <h1 className="max-w-lg text-4xl font-semibold leading-tight">
                                        Plan, track, and ship work with a calmer auth experience.
                                    </h1>
                                    <p className="max-w-md text-sm leading-6 text-slate-300">
                                        Everything your team needs to organize projects, manage delivery,
                                        and keep execution visible in one place.
                                    </p>
                                </div>
                            </div>

                            <div className="relative grid gap-4 sm:grid-cols-3">
                                {[
                                    {label: "Active teams", value: "120+"},
                                    {label: "Tasks closed", value: "48K"},
                                    {label: "Weekly uptime", value: "99.9%"},
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
                                    >
                                        <p className="text-2xl font-semibold">{item.value}</p>
                                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* The active auth page renders here via the route group's children. */}
                        <section className="flex items-center justify-center">
                            <div className={cn("w-full max-w-lg")}>
                                {children}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default AuthLayout
