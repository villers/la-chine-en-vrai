'use client';

import { useState, useRef } from 'react';
import { uploadImage, deleteImage, extractImagePathFromUrl, isFirebaseStorageUrl } from '@/lib/firebase/storage';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  folder?: string;
}

export default function ImageUpload({ value, onChange, placeholder = "URL de l'image", folder = "blog" }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('Le fichier est trop volumineux (max 5MB)');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Supprimer l'ancienne image si c'est une image Firebase
      if (value && isFirebaseStorageUrl(value)) {
        const oldImagePath = extractImagePathFromUrl(value);
        if (oldImagePath) {
          try {
            await deleteImage(oldImagePath);
          } catch (error) {
            console.warn('Impossible de supprimer l\'ancienne image:', error);
          }
        }
      }

      // Upload vers Firebase Storage
      const result = await uploadImage(file, folder, (progress) => {
        setUploadProgress(progress.percentage);
      });
      
      onChange(result.url);
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'upload de l\'image');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleRemoveImage = async () => {
    if (value && isFirebaseStorageUrl(value)) {
      const imagePath = extractImagePathFromUrl(value);
      if (imagePath) {
        try {
          await deleteImage(imagePath);
        } catch (error) {
          console.warn('Impossible de supprimer l\'image:', error);
        }
      }
    }
    onChange('');
  };

  return (
    <div className="space-y-4">
      {/* Zone de drop et upload */}
      <div 
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        {uploading ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <span className="ml-2 text-gray-600">Upload en cours...</span>
            </div>
            {uploadProgress > 0 && (
              <div className="w-full max-w-xs">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">{Math.round(uploadProgress)}%</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <svg 
              className="mx-auto h-12 w-12 text-gray-400" 
              stroke="currentColor" 
              fill="none" 
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-red-600">Cliquez pour sélectionner</span> ou glissez une image
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
          </div>
        )}
      </div>

      {/* Séparateur */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">ou</span>
        </div>
      </div>

      {/* Champ URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL de l'image
        </label>
        <input
          type="url"
          value={value}
          onChange={handleUrlChange}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
          placeholder={placeholder}
        />
      </div>

      {/* Prévisualisation */}
      {value && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prévisualisation
          </label>
          <div className="relative">
            <img 
              src={value} 
              alt="Prévisualisation" 
              className="max-w-full h-auto max-h-64 rounded-lg border border-gray-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}