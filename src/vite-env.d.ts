/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PASSWORD: string;
    readonly VITE_TWITTER_URL: string;
    readonly VITE_GITHUB_URL: string;
    readonly VITE_FETCH_WORKS_URL: string;
    readonly VITE_FETCH_WORKS_PARAMS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}