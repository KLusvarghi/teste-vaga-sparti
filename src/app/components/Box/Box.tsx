import { IChildrenProps } from '@/app/types/props';

const Box = ({ children }: IChildrenProps) => {
  return <div className="flex flex-col items-center justify-center bg-box my-4 mx-8 py-8 px-4 rounded-lg shadow-xl w-2/3">{children}</div>;
};

export default Box;
