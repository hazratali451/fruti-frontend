import toast from "react-hot-toast";

export const errorToast = (message = "Something went wrong!") => {
  toast.error(message, {
    id: "1",
  });
};

export const successToast = (message = "Success!") => {
  toast.success(message, {
    id: "1",
  });
};

export const loadingToast = (message = "Loading...") => {
  toast.loading(message, {
    id: "1",
  });
};
