import ShowcaseGrid from "../components/ShowcaseGrid";

const Showcase = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold">Project Showcase</h2>
        <p className="font-normal text-sm text-gray-500">
          Find Inspiration
        </p>
      </div>

      <ShowcaseGrid />
    </div>
  );
};

export default Showcase;
