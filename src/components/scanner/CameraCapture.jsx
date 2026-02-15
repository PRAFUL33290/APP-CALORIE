import { useRef, useCallback } from 'react';
import { Camera, ImageIcon } from 'lucide-react';

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      onCapture(dataUrl);
    }
  }, [onCapture]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCapture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-full">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center"
        >
          <ImageIcon size={22} className="text-white" />
        </button>
        <button
          onClick={capturePhoto}
          className="w-[70px] h-[70px] rounded-full border-4 border-white flex items-center justify-center"
          style={{ animation: 'pulse 2s infinite' }}
        >
          <div className="w-[58px] h-[58px] rounded-full bg-white/90" />
        </button>
        <button className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
          <Camera size={22} className="text-white" />
        </button>
      </div>
    </div>
  );
}
