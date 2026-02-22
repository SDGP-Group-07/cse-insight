import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, hover = true, ...props }) => {
  return (
    <div
      className={twMerge(
        'bg-primary-mid/60 backdrop-blur-md border border-white/10 rounded-2xl p-6',
        hover &&
          'transition-all duration-300 hover:bg-primary-mid/80 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,245,212,0.1)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
