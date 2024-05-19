import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DefaultProfile from "../../assets/icons/person-crop-circle-fill-svgrepo-com.svg";

interface SetPfpProps {
  pfp: string | null;
  setPfp: (value: File) => void;
}

const PhotoInput: React.FC<SetPfpProps> = ({ pfp, setPfp }) => {
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

  const renderPhotoInput = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-60 h-60 rounded-full"
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
            className="bg-black text-white py-1 px-2 rounded-lg"
          >
            Upload Photo
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
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
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl w-full max-w-[70%] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Select Photo</DialogTitle>
          <DialogDescription>
            This photo is the face of your profile!
          </DialogDescription>
        </DialogHeader>

        <div className="w-full">{renderPhotoInput()}</div>

        {imagePreview && (
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <button className="border border-slate-400 px-2 py-1 rounded-lg hover:border-black">
                Done
              </button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhotoInput;
