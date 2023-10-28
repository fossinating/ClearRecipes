'use client'

/* Instruments */
import { ThemeProvider, useTheme } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const Providers = (props: React.PropsWithChildren) => {

    
  const theme = useTheme();
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
          {props.children}
      </ThemeProvider>
    </SessionProvider>
  )
}