const Tag = ({ name }: { name: string }) => {
  const colorMap: { [key: string]: string } = {
    python: "bg-parrot-red",
    java: "bg-parrot-purple",
    javascript: "bg-parrot-yellow",
    react: "bg-parrot-blue",
    django: "bg-parrot-green",
    "node.js": "bg-parrot-yellow",
  };

  const getColor = (name: string) => {
    const technology = name.toLowerCase();
    return colorMap[technology] || "bg-gray-400";
  };

  return (
    <div>
      <h3
        className={`inline-block text-sm text-white rounded-lg py-2 px-4 ${getColor(
          name
        )}`}
      >
        {name}
      </h3>
    </div>
  );
};
export default Tag;
