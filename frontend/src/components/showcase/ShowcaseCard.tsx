type ShowcaseCardProps = {
  projectName: string;
  imageUrls: string[]; // Define a type for imageUrls prop as an array of strings
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  projectName,
  imageUrls,
}) => {
  return (
    <div className="aspect-spotlight bg-gray-50 relative rounded-sm shadow-light hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
      <img
        src={imageUrls[0]}
        alt="placeholder"
        className="object-cover w-full h-full "
        draggable="false"
      />
      <div className="absolute bottom-0 left-0 w-full h-full  bg-card-hover opacity-0 hover:opacity-100">
        <div className="flex items-end h-full w-full">
          <div className="m-6 flex justify-between w-full items-center">
            <h2 className="text-primary text-white text-sm bg-white rounded-lg p-2 backdrop-filter backdrop-blur-xl bg-opacity-30">
              {projectName}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
