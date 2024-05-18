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

interface Photo {
  photo: File;
  caption: string;
}

interface AddPhotoProps {
  addPhoto: (photo: Photo) => void;
}

const PictureInput: React.FC<AddPhotoProps> = ({ addPhoto }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File>();
  const [caption, setCapption] = useState<string>("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setPhoto(file);
    }
  };

  const handleAddPhoto = () => {
    if (photo) {
      const photoData: Photo = {
        photo: photo,
        caption: caption,
      };
      addPhoto(photoData);
      setImagePreview(null);
      setCapption("");
    }
  };

  const renderPicuteInput = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Profile Preview"
            className="w-[70%] h-[70%] rounded-xl mb-2 "
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="pictureInput"
        />
        <div className="flex gap-2">
          <label
            htmlFor="pictureInput"
            className="text-white px-2 py-1 bg-blue-600 rounded-md"
          >
            Upload
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
        <button className="px-2 py-1 bg-slate-200 hover:bg-slate-200 rounded-lg hover:bg-slate-100">
          Add Photo
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl w-full max-w-[70%] bg-white top-[30%] rounded-xl">
        <DialogHeader>
          <DialogTitle>Select Photo</DialogTitle>
          <DialogDescription>
            Add photo and caption to your project
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 ">
          <div className="w-full">{renderPicuteInput()}</div>

          {imagePreview && (
            <div className="w-full">
              <textarea
                value={caption}
                placeholder="Enter caption for this photo"
                onChange={(e) => setCapption(e.target.value)}
                className="border border-slate-200 py-1 px-2 rounded-md outline-none min-h-10 max-h-38 resize-none w-full"
              />
            </div>
          )}
        </div>
        {imagePreview && (
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <button
                className="border border-slate-400 px-2 py-1 rounded-lg hover:border-black"
                onClick={() => handleAddPhoto()}
              >
                Add
              </button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PictureInput;
