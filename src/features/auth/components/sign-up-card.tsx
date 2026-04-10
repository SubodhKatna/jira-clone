"use client";

import {FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import Link from "next/link";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {DottedSeparator} from "@/components/dotted-seaparator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {signUpSchema, type SignUpFormData} from "@/features/auth/schemas/sign-up-schema";

const legalContent = {
    privacy: {
        title: "Privacy Policy",
        description: "A simple explanation of how this personal project handles your information.",
        sections: [
            "This project only asks for the details needed to let you create and access your account, such as your name, email address, and password.",
            "Your information is used to authenticate you, keep your account working, and improve the app over time. It is not collected for advertising or data resale.",
            "Because this is a personal project, the data is handled with care but should still be treated as experimental while the product is being improved.",
            "If social sign-in is added, the project will only use the profile information returned by that provider that is necessary to sign you in.",
        ],
    },
    terms: {
        title: "Terms & Conditions",
        description: "Ground rules for using this personal project.",
        sections: [
            "This app is a personal project built for learning, experimentation, and portfolio use. Features may change, break, or be removed without notice.",
            "You are responsible for the information you submit and for using the project in a lawful and respectful way.",
            "Do not upload harmful content, attempt to abuse the service, or try to access data that does not belong to you.",
            "There are no guarantees of uptime, support, or long-term storage. Use the project with that limitation in mind.",
        ],
    },
};

// Small reusable dialog so legal copy stays close to the sign-up card.
const LegalDialog = ({
    title,
    description,
    sections,
}: {
    title: string;
    description: string;
    sections: string[];
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="font-medium text-blue-600 underline-offset-4 hover:underline"
                >
                    {title}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-3 text-sm leading-6 text-slate-700">
                    {sections.map((section) => (
                        <p key={section}>{section}</p>
                    ))}
                </div>

                <DialogFooter showCloseButton />
            </DialogContent>
        </Dialog>
    );
};

export const SignUpCard = () => {
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        // Defaults keep all fields controlled before the user starts typing.
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: SignUpFormData) => {
        console.log(data);

        // 👉 connect your API here
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            {/* Header */}
            <CardHeader className="text-center p-7 space-y-3">
                <CardTitle className="text-3xl font-semibold tracking-tight">
                    Create your account
                </CardTitle>

                <CardDescription className="text-sm text-muted-foreground">
                    Create an account to try this personal project. By signing up, you agree to the{" "}
                    <LegalDialog {...legalContent.privacy} />{" "}
                    and{" "}
                    <LegalDialog {...legalContent.terms} />
                    .
                </CardDescription>
            </CardHeader>

            <DottedSeparator/>

            {/* Form */}
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        {/* Labels are intentionally omitted; placeholders provide the field meaning. */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} id="name" placeholder="Full name"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

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
                                            placeholder="Create password"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {/* Keep one explicit hint for the password requirements. */}
                                        Must be at least 8 characters.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full h-11"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "Creating..." : "Create Account"}
                        </Button>

                        <p className="text-sm text-center text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/sign-in"
                                className="text-blue-600 hover:underline cursor-pointer font-medium"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </Form>
            </CardContent>

            <div className="px-7">
                <DottedSeparator/>
            </div>

            {/* Alternate auth actions are separated from the email/password flow. */}
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button variant="secondary" size="lg" className="w-full">
                    <FcGoogle className="size-5 mr-2"/>
                    Sign up with Google
                </Button>

                <Button variant="secondary" size="lg" className="w-full">
                    <FaGithub className="size-5 mr-2"/>
                    Sign up with Github
                </Button>
            </CardContent>
        </Card>
    );
};
