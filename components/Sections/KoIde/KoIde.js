const KoIde = () => {
  return (
    <section>
      <div className="relative">
        <input
          type="checkbox"
          name="idem"
          id="idem"
          className="peer appearance-none cursor-pointer border border-gray-300 rounded-full checked:border-gray-900 w-12 h-7"
        />
        <span className="peer-checked:left-6 peer-checked:bg-gray-900 transition-all duration-500 pointer-events-none w-5 h-5 block absolute top-1 left-1 rounded-full bg-gray-300"></span>
      </div>
    </section>
  );
};

export default KoIde;
