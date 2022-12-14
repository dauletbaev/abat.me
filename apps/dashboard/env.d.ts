/// <reference types="vite/client" />

declare const APP_VERSION: string

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string
  readonly VITE_AUTH_URL: string
  readonly VITE_APP_DOMAIN: string
  readonly VITE_RECAPTCHA_SITE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
