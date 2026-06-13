import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css"; // ensure tailwind utilities are loaded

export const ToastProvider = () => (
  <ToastContainer
    position="top-right"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    toastClassName="custom-toast" // custom class for styling
  />
);
