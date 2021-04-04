import { URL } from "./constants";

export const uploadFile = async (file: File) => {
  const formBody = new FormData();
  formBody.append("file", file);
  return await (
    await fetch(`${URL}/uploads/`, {
      method: "POST",
      body: formBody,
    })
  ).json();
};
