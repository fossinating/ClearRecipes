'use client';

import { useSession } from 'next-auth/react';
import * as React from 'react';

export const AppSetup = (props: React.PropsWithChildren) => {

    const { data: session, status } = useSession();

    
    return (<>{props.children}</>);
}