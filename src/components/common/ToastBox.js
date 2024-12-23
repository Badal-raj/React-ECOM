import { ToastContainer } from "react-toastify";

export const ToastBox = () => (
  <ToastContainer
    className="errorState"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    position={"top-right"}
    theme="light"
    style={{
      width: '450px', // Set a specific width
      maxWidth: '100%', // Make sure the width is responsive
    }}
  />
);
