import { URL } from "./constants";
import { imageResize } from "./imageResize";

export const uploadFile = async (file: File, width: number, height: number) => {
  const smallFile = await imageResize(file, width, height);
  const formBody = new FormData();
  formBody.append("file", file);
  const { url: originalImage } = await (
    await fetch(`${URL}/uploads/`, {
      method: "POST",
      body: formBody,
    })
  ).json();
  formBody.delete("file");
  formBody.append("file", smallFile);
  const { url: smallImage } = await (
    await fetch(`${URL}/uploads/`, {
      method: "POST",
      body: formBody,
    })
  ).json();

  return { originalImage, smallImage };
};
