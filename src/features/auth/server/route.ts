import {Hono} from 'hono'
import {zValidator} from '@hono/zod-validator'
import {signInSchema} from "@/features/auth/schemas/sign-in-schema";

const app = new Hono()
    .post('/login', zValidator("json", signInSchema), async (c) => {
            const {email, password} = await c.req.json();
            return c.json({email, password});
        }
    )
    .post('/register', zValidator("json", signInSchema), async (c) => {
            const {name, email, password} = await c.req.json();
            return c.json({name, email, password});
        }
    )

export default app
