"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FheContext = createContext<any>(null);

export function FheProvider({ children }: { children: React.ReactNode }) {
  const [instance, setInstance] = useState<any>(null);

  useEffect(() => {
    (async () => {

        const { initSDK, createInstance, SepoliaConfig } = await import ('@zama-fhe/relayer-sdk/bundle')
        await initSDK(); 
        // const config = { ...SepoliaConfig, network: window.ethereum };
        const fhe = await createInstance(SepoliaConfig);

      setInstance(fhe);
    })();
  }, []);

  return <FheContext.Provider value={instance}>{children}</FheContext.Provider>;
}

export function useFhe() {
  return useContext(FheContext);
}
