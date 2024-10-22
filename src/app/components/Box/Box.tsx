import { IChildrenProps } from '@/app/types/props';

const Box = ({ children }: IChildrenProps) => {
  return <div className="flex items-center justify-center bg-box my-4 mx-8 w-5/6 h-1/3 rounded-lg shadow-xl">{children}</div>;
};

export default Box;
