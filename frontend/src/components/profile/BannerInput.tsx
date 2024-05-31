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
import DefaultBanner from "../../assets/banners/slo_default.jpg";

interface SetPfpProps {
  banner: string | null;
  setBanner: (value: File) => void;
}

const BannerInput: React.FC<SetPfpProps> = ({ banner, setBanner }) => {
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
          setBanner(croppedFile);
        }
      });
    }
  };

  const renderEditPfpButton = () => {
    return (
      <button className="w-full">
        <div className="opacity-100 hover:opacity-0 rounded-full">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Banner Preview"
              className="h-48 w-full object-cover rounded-2xl object-top"
            />
          )}
          {!imagePreview && banner && (
             <img
              src={banner || DefaultBanner}
              className="h-48 w-full object-cover rounded-2xl object-top"
            />
          )}
          {!imagePreview && !banner && (
            <img
              src={DefaultBanner}
              alt="Default Banner Picture"
              className="h-48 w-full object-cover rounded-2xl object-top"
            />
          )}
        </div>
        <div className="flex w-full h-48 rounded-2xl bg-black text-white absolute top-0 left-0 justify-center items-center opacity-0 hover:opacity-70 transition duration-200 ease-in-out">
          <p className="text-white opacity-100">Edit Banner</p>
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
              initialAspectRatio={1/2}
              aspectRatio={16/3}
              guides={false}
              zoomable={false}
              background={false}
              autoCropArea={1}
              viewMode={1}
              ref={cropperRef}
            />
          </div>
        )}

        {!imagePreview && banner && (
          <img
            src={banner}
            alt="Banner Preview"
            className="w-full aspect-banner object-cover rounded-2xl"
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
            Choose a banner that gives your profile a unique look!
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

export default BannerInput;
