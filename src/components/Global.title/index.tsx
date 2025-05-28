const GlobalTitle = ({title}: {title: string}) => {
  return (
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 md:mb-16 translate-y-8 relative z-10">
          {title}
        </h1>
  );
};

export default GlobalTitle;
