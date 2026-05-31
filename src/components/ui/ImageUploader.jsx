import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { instance } from "../../libs/client";
import generateFileUrl from "../../utils/generateFileUrl";
import { toast } from "react-toastify";
import { settingsStore } from "../../stores/settings.store";
import { ImageUploader, RoundedImageUploader, Loader } from "../../assets/icons/stepsIcons";

/**
 * ImageUploader – a reusable component for uploading a picture with optional title/sub‑title.
 * Supports black/white theme only (light & dark), rounded (circle) or rectangular display.
 */
const ImageUploader = ({
  onChange,
  value,
  title,
  subTitle,
  rounded = false,
  theme = "light", // "light" | "dark"
  disabled = false,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const acceptedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MiB

  const onDrop = useCallback(
    (acceptedFiles) => {
      setLoading(true);
      const file = acceptedFiles[0];
      if (!file) {
        setLoading(false);
        return;
      }

      if (!acceptedImageTypes.includes(file.type)) {
        setLoading(false);
        toast.error("Only image files are allowed");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setLoading(false);
        toast.error("File size cannot exceed 5 MB");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      instance({
        method: "post",
        url: "file/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(({ data }) => {
          onChange && onChange(data.file);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          toast.error(t("fileInput:uploadImageError"));
        });
    },
    [onChange, t]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxSize: MAX_FILE_SIZE,
    noClick: Boolean(value),
  });

  const rootProps = disabled ? {} : getRootProps();

  // Theme colours (black/white only)
  const bgColor = theme === "dark" ? "#0F0F0F" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FAFAFA" : "#0A0A0A";

  return (
    <div
      className={`flex w-full items-center cursor-pointer ${disabled ? "opacity-60" : ""}`}
      {...rootProps}
    >
      <div className="relative flex items-center gap-3">
        {/* Image / placeholder */}
        <div
          className={`relative flex items-center justify-center overflow-hidden ${
            rounded ? "w-12 h-12" : "w-16 h-12"
          } bg-${theme === "dark" ? "gray-900" : "gray-100"}`}
          style={{ backgroundColor: bgColor, color: textColor }}
        >
          {loading ? (
            <Loader currentColor="currentColor" currentFill="currentFill" />
          ) : value ? (
            <img
              src={value.includes("https://cdn.upu.io") ? value : generateFileUrl(value)}
              alt="uploaded"
              onClick={() => window.open(generateFileUrl(value), "_blank")}
              className={`w-full h-full object-contain ${rounded ? "rounded-full" : "rounded"}`}
            />
          ) : (
            <span className="flex items-center justify-center">
              {rounded ? (
                <RoundedImageUploader
                  bgColor={bgColor}
                  color={theme === "dark" ? "#D0D5DD" : "#737373"}
                  width="48"
                  height="48"
                />
              ) : (
                <ImageUploader
                  color={theme === "dark" ? "#D0D5DD" : "#424242"}
                  width="64"
                  height="48"
                />
              )}
            </span>
          )}
        </div>
        {/* Textual info */}
        <div className="flex flex-col">
          {title && (
            <p className="text-base font-semibold" style={{ color: textColor }}>{title}</p>
          )}
          {subTitle && (
            <p className="text-sm" style={{ color: textColor }}>{subTitle}</p>
          )}
        </div>
      </div>
      <input disabled={disabled} type="file" className="sr-only" {...getInputProps()} />
    </div>
  );
};

export default ImageUploader;
