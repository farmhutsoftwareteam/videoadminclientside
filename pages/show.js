import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createShow } from '../functions/createShow'; // Ensure this path is correct
import { getCategories } from '@/functions/getCategories'; // Ensure this path is correct
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function CreateShow() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) {
        setCategory(data[0].id); // Set the first category as default
      }
    };
    fetchCategories();
  }, []);

  const handleFileUpload = async (file, container) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('container', container);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      return result.url; // Get the URL from the response
    } else {
      throw new Error(result.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Uploading thumbnail...");
      const thumbnailURL = await handleFileUpload(thumbnailFile, "1");
      console.log("Thumbnail uploaded:", thumbnailURL);

      const showDetails = {
        title,
        category,
        thumbnail: thumbnailURL,
        description,
        isFree,
      };

      const response = await createShow(showDetails);
      console.log('Show created successfully:', response);
      alert('Show created successfully!');
      
      router.push(`/show`);
    } catch (error) {
      console.error('Show creation failed:', error);
      alert('Show creation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <button
          className="mb-4 text-gray-700 dark:text-gray-300 flex items-center"
          onClick={() => router.push('/')}
        >
          <ChevronLeft className="mr-2" />
          Back to Home
        </button>
        <h2 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-6 text-center">Create a New Show</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-700 dark:text-gray-100 mb-2">
              Title
            </label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              placeholder="Enter the title of the show"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-bold text-gray-700 dark:text-gray-100 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-lg p-2"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="thumbnail" className="block text-sm font-bold text-gray-700 dark:text-gray-100 mb-2">
              Thumbnail File
            </label>
            <Input
              type="file"
              id="thumbnail"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              className="w-full"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Upload a valid image file.</p>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-gray-700 dark:text-gray-100 mb-2">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
              placeholder="Provide a brief description of the show"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-100 mb-2">
              Is this show free?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isFree"
                  value="true"
                  checked={isFree === true}
                  onChange={() => setIsFree(true)}
                  className="form-radio h-5 w-5 text-red-600 dark:text-red-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-100">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isFree"
                  value="false"
                  checked={isFree === false}
                  onChange={() => setIsFree(false)}
                  className="form-radio h-5 w-5 text-red-600 dark:text-red-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-100">No</span>
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Show'}
          </Button>
        </form>
      </div>
    </div>
  );
}
