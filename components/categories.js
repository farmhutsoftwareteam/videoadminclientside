import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategories, updateCategory, deleteCategory } from '../functions/getCategories';
import {createCategory } from '../functions/createCategory'; // Ensure this path is correct
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Assuming these components are part of your design system
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"; // Assuming these components are part of your design system
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editCategory, setEditCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [confirmText, setConfirmText] = useState('');
  const categoriesPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCategory({
      ...editCategory,
      [name]: value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createCategory(newCategory);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      setNewCategory({ name: '', description: '' });
      toast.success('Category created successfully!');
    } catch (error) {
      setError('Failed to create category');
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateCategory(editCategory.id, editCategory);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      setEditCategory(null);
      toast.success('Category updated successfully!');
    } catch (error) {
      setError('Failed to update category');
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirmText !== 'HEART AND SOUL BROADCASTING') {
      setError('Confirmation text does not match');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await deleteCategory(categoryToDelete.id);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      toast.success('Category deleted successfully!');
      setDeleteDialogOpen(false); // Close the dialog
    } catch (error) {
      setError('Failed to delete category');
      console.error(`Error deleting category with ID ${categoryToDelete.id}:`, error);
    } finally {
      setLoading(false);
      setConfirmText('');
    }
  };

  const openEditDialog = (category) => {
    setEditCategory(category);
  };

  const openDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-500">Categories</h2>
          <Dialog>
            <DialogTrigger>
              <Button className="p-2 bg-red-500 text-white rounded">Create Category</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new category.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    placeholder="Category Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    placeholder="Category Description"
                    required
                  />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Category'}
                  </Button>
                  <DialogClose>
                    <Button type="button">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Input
          type="text"
          className="mb-4 p-2 w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg border border-gray-300 dark:border-gray-600"
          placeholder="Search by category name..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-500 border-b border-gray-300 dark:border-gray-600">Name</th>
              <th className="py-2 px-4 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-500 border-b border-gray-300 dark:border-gray-600">Description</th>
              <th className="py-2 px-4 bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-500 border-b border-gray-300 dark:border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map(category => (
              <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">
                  <Link href={`/categories/${category.id}`} className="hover:underline">
                    {category.name}
                  </Link>
                </td>
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">
                  {category.description}
                </td>
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger>
                        <Button onClick={() => openEditDialog(category)} className="p-2 bg-blue-500 text-white rounded">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Category</DialogTitle>
                          <DialogDescription>
                            Modify the details below to update the category.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdate}>
                          <div className="mb-4">
                            <Input
                              type="text"
                              name="name"
                              value={editCategory ? editCategory.name : ''}
                              onChange={handleEditInputChange}
                              placeholder="Category Name"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <Input
                              type="text"
                              name="description"
                              value={editCategory ? editCategory.description : ''}
                              onChange={handleEditInputChange}
                              placeholder="Category Description"
                              required
                            />
                          </div>
                          {error && <div className="text-red-500 mb-4">{error}</div>}
                          <DialogFooter>
                            <Button type="submit" disabled={loading}>
                              {loading ? 'Updating...' : 'Update Category'}
                            </Button>
                            <DialogClose>
                              <Button type="button">Cancel</Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button onClick={() => openDeleteDialog(category)} className="p-2 bg-red-600 text-white rounded">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this category? Please type <strong>HEART AND SOUL BROADCASTING</strong> to confirm.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <form onSubmit={handleDelete}>
                          <div className="mb-4">
                            <Input
                              type="text"
                              name="confirmText"
                              value={confirmText}
                              onChange={(e) => setConfirmText(e.target.value)}
                              placeholder="Type to confirm"
                              required
                            />
                          </div>
                          {error && <div className="text-red-500 mb-4">{error}</div>}
                          <AlertDialogFooter>
                            <Button type="submit" disabled={loading || confirmText !== 'HEART AND SOUL BROADCASTING'}>
                              {loading ? 'Deleting...' : 'Delete'}
                            </Button>
                            <AlertDialogTrigger>
                              <Button type="button">Cancel</Button>
                            </AlertDialogTrigger>
                          </AlertDialogFooter>
                        </form>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-red-500 text-white rounded flex items-center disabled:opacity-50"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          <span className="text-black dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-red-500 text-white rounded flex items-center disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
