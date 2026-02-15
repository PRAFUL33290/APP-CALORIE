import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ImageIcon, Camera } from 'lucide-react';
import ScanOverlay from '../components/scanner/ScanOverlay';
import AnalysisLoader from '../components/scanner/AnalysisLoader';
import { analyserPhoto } from '../services/claude-api';

export default function Scanner() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aliments, setAliments] = useState([]);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1024 }, height: { ideal: 1024 } }
      });
      setStream(mediaStream);
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      // Camera not available, use file upload
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      canvas.width = Math.min(video.videoWidth || 640, 1024);
      canvas.height = Math.min(video.videoHeight || 480, 1024);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      handlePhoto(dataUrl);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handlePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePhoto = async (dataUrl) => {
    setPhoto(dataUrl);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setAnalyzing(true);

    try {
      const base64 = dataUrl.split(',')[1];
      const result = await analyserPhoto(base64);
      setAliments(result.aliments || []);
      // Store result for results page
      sessionStorage.setItem('scan-result', JSON.stringify(result));
      sessionStorage.setItem('scan-photo', dataUrl);
      navigate('/results/new');
    } catch {
      setAnalyzing(false);
      // Show demo result on error
      const demoResult = {
        nom_plat: 'Repas analysé',
        aliments: [
          { nom: 'Poulet grillé', portion_g: 150, calories: 250, proteines: 35, glucides: 0, lipides: 8, position: { x: 40, y: 40 } },
          { nom: 'Salade verte', portion_g: 100, calories: 25, proteines: 2, glucides: 3, lipides: 0, position: { x: 60, y: 60 } },
        ],
        total: { calories: 275, proteines: 37, glucides: 3, lipides: 8 },
        score_sante: 8,
        commentaire: 'Bon équilibre protéique, ajoutez des glucides complexes.',
      };
      sessionStorage.setItem('scan-result', JSON.stringify(demoResult));
      sessionStorage.setItem('scan-photo', dataUrl);
      navigate('/results/new');
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {photo ? (
        <img src={photo} alt="Captured" className="w-full h-full object-cover" />
      ) : (
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      )}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <X size={24} className="text-white" />
        </button>
        <span className="text-white text-base font-semibold">Scan en cours</span>
        <div className="w-10" />
      </div>

      <ScanOverlay aliments={aliments} />
      {analyzing && <AnalysisLoader />}

      {/* Capture buttons */}
      {!photo && !analyzing && (
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8 z-20">
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
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center"
          >
            <Camera size={22} className="text-white" />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
}
