import { IChildrenProps } from '@/app/types/props'

const Box = ({children}: IChildrenProps) => {
  return (
    <div className='bg-box my-4 mx-8 '>{children}</div>
  )
}

export default Box