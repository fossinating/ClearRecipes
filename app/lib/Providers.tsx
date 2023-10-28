'use client'

/* Instruments */
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { ThemeProvider, useTheme } from '@emotion/react'
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist'
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const Providers = (props: React.PropsWithChildren) => {

    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  
    useEffect(() => {
      // Set up graphql data
      async function init() {
        const cache = new InMemoryCache();
        let newPersistor = new CachePersistor({
          cache,
          storage: new LocalStorageWrapper(window.localStorage),
          debug: true,
          trigger: 'write',
        });
        await newPersistor.restore();
        setClient(
          new ApolloClient({
  
            uri: 'https://api.tarheelcompass.com/graphql',
            cache,
          }),
        );
      }
  
      init().catch(console.error);
    }, []);
    
  const theme = useTheme();

  if (!client) {
    return <h2>Initializing app...</h2>;
  }
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}