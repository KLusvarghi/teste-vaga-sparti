import { IChildrenProps } from '@/app/types/props'
import React from 'react'

const Title = ({children}: IChildrenProps) => {
  return (
    <h1 className='text-5xl	font-bold mb-6'>{children}</h1>
  )
}

export default Title