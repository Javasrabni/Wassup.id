import React from 'react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const Content = ({ children }: Props) => {
    return (
        <>
            {children}
        </>
    )
}

export default Content
