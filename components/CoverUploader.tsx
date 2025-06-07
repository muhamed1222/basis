import React, { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { CroppedArea, getCroppedImg } from '../utils/cropImage';

interface Props {
  onChange?: (dataUrl: string | null) => void;
}

export const CoverUploader: React.FC<Props> = ({ onChange }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
  const [cover, setCover] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Неверный тип файла');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('Размер файла превышает 4MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  const onCropComplete = useCallback(
    (_: unknown, croppedArea: CroppedArea) => {
      setCroppedAreaPixels(croppedArea);
    },
    []
  );

  const saveCrop = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCover(cropped);
      onChange?.(cropped);
      setImageSrc(null);
    }
  }, [imageSrc, croppedAreaPixels, onChange]);

  const remove = () => {
    setCover(null);
    onChange?.(null);
  };

  return (
    <div className="space-y-2">
      <div
        className="w-full h-32 sm:h-48 bg-gray-200 overflow-hidden relative flex items-center justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {cover ? (
          <img src={cover} alt="cover" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500">Обложка 16:9</span>
        )}
        {imageSrc && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
            <div className="relative w-64 h-36 bg-white">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={saveCrop}>
                Ок
              </button>
              <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setImageSrc(null)}>
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" onChange={onInputChange} className="hidden" />
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded" onClick={() => inputRef.current?.click()}>
          Загрузить
        </button>
        {cover && (
          <button className="px-3 py-1 text-sm bg-red-500 text-white rounded" onClick={remove}>
            Удалить
          </button>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};
