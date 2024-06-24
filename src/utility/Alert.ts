import { toast } from "react-toastify";

export const displayErrorAlert = (message: string) => {
  toast.error(message, {
    position: "top-right",
  });
};
