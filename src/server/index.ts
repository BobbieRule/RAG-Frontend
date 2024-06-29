import axios from "axios";

export const get = async (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = [];
  let message = "";
  let status;

  await axios
    .get(url)
    .then((res) => {
      data = res.data.data;
      message = res.data.message;
      status = res.data.status;
    })
    .catch((error) => {
      if (error.response) {
        data = error.response.data.data;
        message = error.response.data.message;
        status = error.response.data.status;
      } else {
        data = null;
        message = "No server response";
        status = false;
      }
    });

  return { status, message, data };
};

export const post = async (url: string, payload = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = [];
  let message = "";
  let status;

  await axios
    .post(url, payload)
    .then((res) => {
      data = res.data.data;
      message = res.data.message;
      status = res.data.status;
    })
    .catch((error) => {
      if (error.response) {
        data = error.response.data.data;
        message = error.response.data.message;
        status = error.response.data.status;
      } else {
        data = null;
        message = "No server response";
        status = false;
      }
    });

  return { status, message, data };
};
