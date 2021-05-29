export const imageResize = async (
  originalFile: File,
  maxWidth: number,
  maxHeight: number,
): Promise<File> => {
  let file: File;
  const image = new Image();

  const reader = new FileReader();
  reader.readAsDataURL(originalFile);
  return new Promise(
    (resolve, reject) =>
      (reader.onloadend = async () => {
        // @ts-ignore
        image.src = reader.result || "";

        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let imageWidth = image.width;
          let imageHeghit = image.height;

          if (imageWidth > imageHeghit) {
            if (imageWidth > maxWidth) {
              imageHeghit *= maxWidth / imageWidth;
              imageWidth = maxWidth;
            }
          } else {
            if (imageHeghit > maxHeight) {
              imageWidth *= maxHeight / imageHeghit;
              imageHeghit = maxHeight;
            }
          }

          canvas.width = imageWidth;
          canvas.height = imageHeghit;

          ctx?.drawImage(image, 0, 0, imageWidth, imageHeghit);

          const url = canvas.toDataURL("image/png");

          const blobBin = atob(url.split(",")[1]); // base64 데이터 디코딩

          let array = [];
          for (let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
          }

          file = new File(
            [new Uint8Array(array)],
            `${new Date().getTime()}.png`,
            {
              type: "image/png",
            },
          );

          resolve(file);
        };
      }),
  );
};
