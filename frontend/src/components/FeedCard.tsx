
import Tag from "./Tag";

const FeedCard = () => {
  return (
    <div className="shadow-light p-7 px-10 max-w-screen-sm border border-border rounded-lg hover:cursor-pointer hover:shadow-light-hover hover:border-gray-400  transition duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Windomi</h2>

        <h4 className="text-secondary py-1 px-6 border rounded-full border-gray-300 hover:bg-primary hover:text-white hover:border-transparent transition duration-300 ease-in-out">
          Join
        </h4>
      </div>

      <div className="mt-4 flex items-center gap-x-3 border-b pb-4">
        <img
          src="https://media.licdn.com/dms/image/D4E03AQFzplx5eTzzyA/profile-displayphoto-shrink_100_100/0/1707245865823?e=1719446400&v=beta&t=9CUlC15B-vH1V5H4vqSy_RZZlXTKGnkM8eU4gLuHfQI"
          alt="profile"
          className="w-7 h-7 rounded-full"
        />

        <div className="flex items-center gap-3 whitespace-nowrap overflow-scroll no-scrollbar">
          <h4 className="text-sm  font-medium text-secondary">Emily Smith</h4>

          <p className="text-md font-light text-secondary-foreground">|</p>

          <p className="text-sm font-light text-secondary-foreground">
            Software Engineer at Cal State Fullerton
          </p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-secondary">
          Windomi will be a website to generate funny names for brands and
          startups. It will use AI to curate responses based on user input.
        </p>
      </div>

      <div className="flex items-center gap-x-4 mt-6">
        <Tag name="Python" />
        <Tag name="Javascript" />
      </div>
    </div>
  );
};

export default FeedCard;
