import React, { useState } from 'react';
import { Image } from 'lucide-react';
import supabase from '@/lib/supabase';

const ImageUpload = ({ thumbnail, onThumbnailChange }) => {
  const [hover, setHover] = useState(false);
  const [preview, setPreview] = useState(thumbnail);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file);
      
      // Show the preview immediately
      const reader = new FileReader();
      reader.onload = (upload) => {
        setPreview(upload.target.result);
        console.log('Preview updated');
      };
      reader.readAsDataURL(file);

      setLoading(true);

      const fileName = `${Date.now()}-${file.name}`;
      console.log('Generated file name:', fileName);

      const { data, error } = await supabase.storage
        .from('thumbnails')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading file:', error);
        setLoading(false);
        return;
      }

      const { publicUrl } = supabase
        .storage
        .from('thumbnails')
        .getPublicUrl(fileName)
        .data;

      console.log('File uploaded:', publicUrl);

      onThumbnailChange(publicUrl);
      setLoading(false);
      console.log('Upload process completed');
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={preview}
        alt="Thumbnail"
        className="rounded w-full h-full object-cover"
      />
      {hover && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded">
          <Image className="text-white mb-2" size={40} aria-hidden="true" />
          <label className="text-white cursor-pointer">
            {loading ? 'Uploading...' : 'Update Thumbnail'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={loading}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
