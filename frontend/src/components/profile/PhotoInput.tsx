import React, { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>();
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const dataURL = croppedCanvas.toDataURL("image/png");
      setImagePreview(dataURL);

      croppedCanvas.toBlob((blob) => {
        if (blob && fileName) {
          const croppedFile = new File([blob], fileName, {
            type: "image/png",
          });
          setPfp(croppedFile);
        }
      });
    }
  };

  const renderEditPfpButton = () => {
    return (
      <button className="w-full h-full">
        <div className="w-full h-full opacity-100 hover:opacity-0 rounded-full">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="h-full w-full aspect-square rounded-full object-cover border-4 border-white"
            />
          )}
          {!imagePreview && pfp && (
            <img
              src={pfp || DefaultProfile}
              alt="profile_picture"
              className="h-full w-full rounded-full object-cover border-4 border-white"
            />
          )}
          {!imagePreview && !pfp && (
            <img
              src={DefaultProfile}
              alt="Default Profile Picture"
              className="h-full w-full rounded-full object-cover border-4 border-white"
            />
          )}
        </div>
        <div className="flex w-full h-full rounded-full bg-black text-white absolute top-0 left-0 justify-center items-center opacity-0 hover:opacity-70 border-4 transition duration-200 ease-in-out">
          <p className="text-white opacity-100">Edit</p>
        </div>
      </button>
    );
  };

  const renderPhotoInput = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        {imagePreview && (
          <div className="mx-auto max-w-full max-h-full relative">
            <Cropper
              src={imagePreview}
              style={{ width: "100%", height: 400 }}
              // Cropper.js options
              initialAspectRatio={1}
              aspectRatio={1}
              guides={false}
              zoomable={false}
              background={false}
              autoCropArea={1}
              viewMode={1}
              ref={cropperRef}
            />
          </div>
        )}

        {!imagePreview && pfp && (
          <img
            src={pfp}
            alt="Profile Preview"
            className="w-60 h-60 rounded-full"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="pfpInput"
        />

        <div className="mt-4 flex gap-2">
          <label
            htmlFor="pfpInput"
            className="bg-black text-white py-1 px-2 rounded-lg"
          >
            {imagePreview ? "Change Photo" : "Upload Photo"}
          </label>

          {imagePreview && (
            <button
              className="text-black px-2 py-1 hover:underline"
              onClick={() => setImagePreview(null)}
            >
              Back
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{renderEditPfpButton()}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl w-full max-w-[70%] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Select Photo</DialogTitle>
          <DialogDescription>
            This photo is the face of your profile!
          </DialogDescription>
        </DialogHeader>
        {renderPhotoInput()}
        {imagePreview && (
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <button
                className="border border-slate-400 px-2 py-1 rounded-lg hover:border-black"
                onClick={handleCrop}
              >
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
