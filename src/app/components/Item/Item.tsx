import { IChildrenProps } from '@/app/types/props'
import React from 'react'

const Item = ({children}: IChildrenProps) => {
  return (
    <li className='list-none'>{children}</li>
  )
}

export default Item