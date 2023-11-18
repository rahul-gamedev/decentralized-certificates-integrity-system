import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Auth, AuthContext, AuthStateProvider } from "../context";
import { useState } from "react";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "goerli";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId="484fd8e9bbd0e70c590632c5597069cd"
      activeChain={activeChain}
    >
      <AuthStateProvider>
        <Component {...pageProps} />
      </AuthStateProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
