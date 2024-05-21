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

interface Photo {
  photo: File;
  caption: string;
}

interface AddPhotoProps {
  addPhoto: (photo: Photo) => void;
}

const PictureInput: React.FC<AddPhotoProps> = ({ addPhoto }) => {
  const [caption, setCaption] = useState<string>("");
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

  const handleAddPhoto = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        if (blob && fileName) {
          const croppedFile = new File([blob], fileName, { type: "image/png" });
          const photoData: Photo = {
            photo: croppedFile,
            caption: caption,
          };
          addPhoto(photoData);
          setImagePreview("");
          setCaption("");
        }
      }, "image/png");
    }
  };

  const renderPicuteInput = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        {imagePreview && (
          <div className="mx-auto max-w-full max-h-full relative">
            <Cropper
              src={imagePreview}
              style={{ width: "100%", height: 400 }}
              // Cropper.js options
              initialAspectRatio={16 / 9}
              aspectRatio={16 / 9}
              guides={false}
              zoomable={false}
              background={false}
              autoCropArea={1}
              viewMode={1}
              ref={cropperRef}
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="pictureInput"
        />
        <div className="flex gap-2 mt-2">
          <label
            htmlFor="pictureInput"
            className="text-white px-2 py-1 bg-blue-600 rounded-md"
          >
            {imagePreview ? "Change Photo" : "Upload Photo"}
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
      <DialogContent className="sm:max-w-2xl w-full max-w-[70%] bg-white rounded-xl">
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
                onChange={(e) => setCaption(e.target.value)}
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
