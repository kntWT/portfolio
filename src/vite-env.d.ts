/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PASSWORD: string;
    readonly VITE_TWITTER_URL: string;
    readonly VITE_GITHUB_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}