"use client";

import {FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-seaparator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form";
import {type SignInFormData, signInSchema} from "@/features/auth/schemas/sign-in-schema";
import {useLogin} from "@/features/auth/api/use-login";
import z from "zod";
import Link from "next/link";
import {useRouter} from "next/navigation";

export const SignInCard = () => {
    const router = useRouter();
    const {mutateAsync, isPending} = useLogin();

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        // Keep the form controlled from first render to avoid uncontrolled input warnings.
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (value: z.infer<typeof signInSchema>) => {
        await mutateAsync({json: value});
        router.push("/");
    };

    return (
        <Card className="w-full h-full md:w-121.75 border-none shadow-none">

            {/* Header */}
            <CardHeader className="text-center p-7 space-y-2">
                <CardTitle className="text-3xl font-semibold tracking-tight">
                    Welcome back
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Log in to continue to your account
                </p>
            </CardHeader>

            <DottedSeparator/>

            {/* Form */}
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                        {/* Placeholders carry the field context, messages handle validation feedback. */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="email"
                                            type="email"
                                            placeholder="Email address"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full h-11 font-medium"
                            disabled={isPending}
                        >
                            {isPending ? "Signing in..." : "Sign In"}
                        </Button>

                        <p className="text-sm text-center text-muted-foreground">
                            Don’t have an account?{" "}
                            <Link href="/sign-up" className="text-blue-600 hover:underline cursor-pointer font-medium">
                                Sign up
                            </Link>
                        </p>

                    </form>
                </Form>
            </CardContent>

            <div className="px-7">
                <DottedSeparator/>
            </div>

            {/* Social sign-in buttons stay visually separate from the credential form. */}
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button variant="secondary" size="lg" className="w-full">
                    <FcGoogle className="size-5 mr-2"/>
                    Login with Google
                </Button>

                <Button variant="secondary" size="lg" className="w-full">
                    <FaGithub className="size-5 mr-2"/>
                    Login with Github
                </Button>
            </CardContent>

        </Card>
    );
};
