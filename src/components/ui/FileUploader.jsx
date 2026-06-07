import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { instance } from "@/libs/client";
import generateFileUrl from "@/utils/generateFileUrl";
import { settingsStore } from "@/stores/settings.store";
import { Loader } from "@/assets/icons/stepsIcons"; // generic loader
// Thumbnail icons – adjust import path if icons live elsewhere
import { PdfIcon, FileIcon, ImageIcon } from "@/assets/icons/stepsIcons";

/**
 * FileUploader component
 *
 * Props:
 *   - value: currently uploaded file identifier (url or CDN id)
 *   - onChange: (fileInfo) => void – called after successful upload
 *   - title: string – label shown next to the uploader
 *   - subTitle: optional string – secondary description
 *   - disabled: boolean – disables interactions
 */
const FileUploader = ({ value, onChange, title, subTitle, disabled = false }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  // Accept typical document types – extend as needed
  const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ];
  const MAX_SIZE = 10 * 1024 * 1024; // 10 MiB

  const uploadFile = useCallback(
    async (file) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const { data } = await instance({
          method: "post",
          url: "file/upload",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        onChange?.(data.file);
      } catch (e) {
        toast.error(t("fileInput:uploadFileError"));
      } finally {
        setLoading(false);
      }
    },
    [onChange, t]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error("Unsupported file type");
        return;
      }
      if (file.size > MAX_SIZE) {
        toast.error("File size exceeds 10 MB");
        return;
      }
      uploadFile(file);
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES.reduce((obj, type) => {
      obj[type] = [];
      return obj;
    }, {}),
    maxSize: MAX_SIZE,
    noClick: !!value,
  });

  const rootProps = disabled ? {} : getRootProps();

  const renderThumbnail = () => {
    if (!value) return null;
    const url = value.includes("https://cdn.upu.io") ? value : generateFileUrl(value);
    // Determine file type from extension
    const lower = url.toLowerCase();
    if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.gif')) {
      return (
        <img
          src={url}
          alt="Uploaded"
          className="absolute inset-0 w-full h-full object-contain rounded"
          onClick={(e) => {
            e.stopPropagation();
            window.open(url, "_blank");
          }}
        />
      );
    }
    if (lower.endsWith('.pdf')) {
      return <PdfIcon width={48} height={48} />;
    }
    // Fallback generic file icon
    return <FileIcon width={48} height={48} />;
  };

  return (
    <div
      className={`flex w-full items-center gap-3 cursor-pointer ${disabled ? "opacity-60" : ""}`}
      {...rootProps}
    >
      {/* Thumbnail / placeholder */}
      <div className="relative flex items-center justify-center w-[64px] h-[48px] bg-[#F5F5F5] dark:bg-[#0F0F0F]">
        {loading ? (
          <Loader currentColor="currentColor" currentFill="currentFill" />
        ) : value ? (
          renderThumbnail()
        ) : (
          <ImageIcon width={48} height={48} color={settingsStore.theme === "light" ? "#D0D5DD" : "#424242"} />
        )}
      </div>

      {/* Textual info */}
      <div className="flex flex-col">
        {title && (
          <p className="text-base font-semibold text-[#344054] dark:text-[#D6D6D6]">{title}</p>
        )}
        {subTitle && (
          <p className="text-sm text-[#667085] dark:text-[#D6D6D6]">{subTitle}</p>
        )}
        {value ? (
          <div className="flex gap-2 text-sm mt-1">
            <button
              className="text-[#667085] dark:text-[#D6D6D6] hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                const url = value.includes("https://cdn.upu.io") ? value : generateFileUrl(value);
                window.open(url, "_blank");
              }}
            >
              Preview
            </button>
            <button
              className="text-[#D92D20] hover:text-red-700 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.("");
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <p className="underline text-sm text-[#667085] dark:text-[#D6D6D6]">
            {t("fileInput:uploadFile") || "Upload file"}
          </p>
        )}
      </div>

      {/* Hidden input */}
      <input type="file" className="sr-only" disabled={disabled} {...getInputProps()} />
    </div>
  );
};

export default FileUploader;



//how to use
// import FileUploader from "@/components/ui/FileUploader";

// function DocumentSection() {
//   const [file, setFile] = useState("");

//   return (
//     <FileUploader
//       value={file}
//       onChange={setFile}
//       title="Attachment"
//       subtitle="PDF, Word, Excel, images up to 10 MB"
//     />
//   );
// }