import React, { useState } from 'react';
import { useToast } from './ToastProvider';
import QRCode from 'qrcode';

interface ShareModalProps {
  url: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ url, onClose }) => {
  const { showSuccess, showError } = useToast();
  const [qr, setQr] = useState<string | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showSuccess('Ссылка скопирована');
    } catch (e) {
      showError('Не удалось скопировать ссылку');
    }
  };

  const makeQr = async () => {
    try {
      const data = await QRCode.toDataURL(url);
      setQr(data);
    } catch (e) {
      showError('Ошибка генерации QR');
    }
  };

  const shareWeb = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url });
        showSuccess('Ссылка отправлена');
      } catch {
        showError('Не удалось отправить ссылку');
      }
    } else {
      copy();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-80 space-y-2">
        <h2 className="font-semibold text-lg">Поделиться</h2>
        <button className="w-full bg-gray-100 p-2 rounded" onClick={copy}>
          Копировать ссылку
        </button>
        <button className="w-full bg-gray-100 p-2 rounded" onClick={makeQr}>
          QR-код
        </button>
        {qr && <img src={qr} alt="QR" className="mx-auto" />}
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gray-100 p-2 rounded text-center"
        >
          Telegram
        </a>
        <a
          href={`https://vk.com/share.php?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gray-100 p-2 rounded text-center"
        >
          VK
        </a>
        <button className="w-full bg-gray-100 p-2 rounded" onClick={shareWeb}>
          Web Share API
        </button>
        <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
