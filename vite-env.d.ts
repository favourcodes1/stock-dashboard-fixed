/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FINNHUB_API_KEY: string;
    // add other VITE_ variables if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  