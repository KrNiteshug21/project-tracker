const SectionWrapper = ({ children, className = "" }) => {
  return (
    <section className={`min-h-screen py-8 ${className}`}>
      <div className="mx-auto px-4 max-w-screen-xl">{children}</div>
    </section>
  );
};

export default SectionWrapper;
