export interface CroppedArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (e) => reject(e));
    img.src = url;
  });
}

export async function getCroppedImg(
  imageSrc: string,
  croppedArea: CroppedArea
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = croppedArea.width;
  canvas.height = croppedArea.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return imageSrc;
  ctx.drawImage(
    image,
    croppedArea.x,
    croppedArea.y,
    croppedArea.width,
    croppedArea.height,
    0,
    0,
    croppedArea.width,
    croppedArea.height
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return resolve(imageSrc);
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, 'image/png');
  });
}
