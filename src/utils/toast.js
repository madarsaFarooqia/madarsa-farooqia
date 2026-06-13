import { toast } from "react-toastify";

export const Toast = (type, text, toastId, opts = {}) => {
  const baseOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    toastId: toastId || (type === "error" ? text : undefined),
    ...opts,
  };

  switch (type) {
    case "error":
      return toast.error(text, baseOptions);
    case "success":
      return toast.success(text, baseOptions);
    case "info":
      return toast.info(text, baseOptions);
    case "warning":
      return toast.warning(text, baseOptions);
    case "loading":
      return toast.loading(text, baseOptions);
    case "dismiss":
      return toast.dismiss(toastId);
    case "update":
      if (!toastId) return null;
      return toast.update(toastId, { ...baseOptions, render: baseOptions.render || text });
    case "promise":
      // expect `text` to be an object: { promise, pending, success, error }
      if (!text || !text.promise) return null;
      return toast.promise(text.promise, {
        pending: text.pending || "Please wait...",
        success: text.success || "Success",
        error: text.error || "Error",
        ...baseOptions,
      });
    default:
      return toast(text, baseOptions);
  }
};

export default Toast;
