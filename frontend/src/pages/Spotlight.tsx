import SpotlightGrid from "../components/SpotlightGrid";

const Spotlight = () => {
  return (
    <div>
      <h1 className="text-xl">Spotlight</h1>
      <p className="text-sm text-gray-500">
        A collection of unique projects presented below.
      </p>

      <SpotlightGrid />
    </div>
  );
};

export default Spotlight;
