const Tag = ({ name }: { name: string }) => {
  const colorMap: { [key: string]: string } = {
    python: "bg-orange-600",
    java: "bg-blue-400",
    javascript: "bg-purple-500",
    // Add more technology-color mappings here
  };

  const getColor = (name: string) => {
    const technology = name.toLowerCase();
    return colorMap[technology] || "bg-gray-400";
  };

  return (
    <div>
      <h3
        className={`text-sm text-white rounded-lg py-2 px-4 ${getColor(name)}`}
      >
        {name}
      </h3>
    </div>
  );
};
export default Tag;
