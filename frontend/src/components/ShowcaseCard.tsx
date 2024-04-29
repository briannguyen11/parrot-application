type ShowcaseCardProps = {
  projectName: string;
  //   user: string;
  //   userPicture: string;
  imageUrls: string[]; // Define a type for imageUrls prop as an array of strings
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  projectName,
  //   user,
  //   userPicture,
  imageUrls,
}) => {
  return (
    <div className="aspect-spotlight bg-gray-50 relative rounded-3xl shadow-light hover:cursor-pointer overflow-clip hover:scale-103 transition duration-300 ease-in-out select-none">
      <img
        src={imageUrls[0]}
        alt="placeholder"
        className="object-cover w-full h-spotlight-img rounded-t-3xl"
        draggable="false"
      />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-700 flex items-center justify-center rounded-b-3xl">
        <h2 className="text-center text-gray-50">{projectName}</h2>
      </div>
    </div>
  );
};

export default ShowcaseCard;
