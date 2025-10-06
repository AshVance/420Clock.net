/*
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // Redirect "/" → "/420clock.html"
        if (url.pathname === "/" || url.pathname === "") {
            url.pathname = "/420clock.html";
            request = new Request(url, request);
        }

        try {
            // Serve files from /public
            return await getAssetFromKV({ request, env, ctx });
        } catch (err) {
            return new Response('Not found', { status: 404 });
        }
    },
};
