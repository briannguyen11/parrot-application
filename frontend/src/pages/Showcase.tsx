import ShowcaseGrid from "../components/ShowcaseGrid";

const Showcase = () => {
  return (
    <div className="pt-5 lg:pl-5">
      <div>
        <h2 className="text-2xl font-semibold">Project Showcase</h2>
        <p className="font-normal text-sm text-gray-500">
          Find Inspiration for your next project
        </p>
      </div>

      <ShowcaseGrid />
    </div>
  );
};

export default Showcase;
