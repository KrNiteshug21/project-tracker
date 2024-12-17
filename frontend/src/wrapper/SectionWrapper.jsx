const SectionWrapper = ({ children }) => {
  return (
    <section className="items-center grid scroll-m-6 mx-auto px-4 max-w-screen-xl min-h-screen text-primary dark:text-dark-text">
      {children}
    </section>
  );
};

export default SectionWrapper;
