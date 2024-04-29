import ShowcaseGrid from "../components/ShowcaseGrid";

const Showcase = () => {
  return (
    <div>
      <h1 className="text-xl">Showcase</h1>
      <p className="text-sm text-gray-500">
        A collection of unique projects presented below.
      </p>

      <ShowcaseGrid />
    </div>
  );
};

export default Showcase;
