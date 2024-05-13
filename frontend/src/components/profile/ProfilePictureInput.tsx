import { useState } from "react";

import DefaultProfile from "../../assets/icons/person-crop-circle-fill-svgrepo-com.svg";

interface SetPfpProps {
  pfp: string | null;
  setPfp: (value: File) => void;
}

const ProfilePictureInput: React.FC<SetPfpProps> = ({ pfp, setPfp }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(pfp);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setPfp(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile Preview"
            className="w-28 h-28 rounded-full"
          />
        ) : (
          <img
            src={DefaultProfile}
            alt="Default Profile Picture"
            className="w-28 h-28 rounded-full"
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="profilePictureInput"
      />

      <div className="mt-4 flex gap-2">
        <label
          htmlFor="profilePictureInput"
          className="text-black px-2 py-1 hover:underline"
        >
          Edit Photo
        </label>

        {imagePreview && (
          <button
            className="text-black px-2 py-1 hover:underline"
            onClick={() => setImagePreview(null)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureInput;
