import {Hono} from 'hono'
import {zValidator} from '@hono/zod-validator'
import {signInSchema} from "@/features/auth/schemas/sign-in-schema";
import {signUpSchema} from "@/features/auth/schemas/sign-up-schema";
import {createAdminClient} from "@/lib/appwrite";
import {ID} from "node-appwrite";
import {deleteCookie, setCookie} from "hono/cookie";
import {AUTH_COOKIE} from "@/features/auth/constant";

const app = new Hono()
    .post('/login', zValidator("json", signInSchema), async (c) => {
            const {email, password} = await c.req.json();
            const {account} = await createAdminClient();
            const session = await account.createEmailPasswordSession(
                email,
                password,
            );

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30
            });

            return c.json({data: session});
        }
    )
    .post('/register', zValidator("json", signUpSchema), async (c) => {
            const {name, email, password} = await c.req.json();
            const {account} = await createAdminClient();
            const user = await account.create(
                ID.unique(),
                email,
                password,
                name,
            );

            const session = await account.createEmailPasswordSession(
                email,
                password,
            );

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30
            });
            return c.json({data: user});
        }
    )
    .post("/logout", (c) => {
        deleteCookie(c, AUTH_COOKIE);
        return c.json({success: true})
    })


export default app
