import {hc} from "hono/client";

import {AppType} from "@/app/api/[[...route]]/route";

export const client = hc<AppType>("/", {
    fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, {
            ...init,
            credentials: "same-origin",
        }),
});
