import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPlans, updatePlan, deletePlan } from '../functions/getPlans';
import { createPlan } from '../functions/createPlan'; // Ensure this path is correct
import { ChevronLeft, ChevronRight } from 'lucide-react';
import supabase from '../lib/supabase';
import { Button } from "@/components/ui/button"; // Assuming these components are part of your design system
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editPlan, setEditPlan] = useState(null);
  const [formData, setFormData] = useState({
    plan_name: '',
    plan_amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [confirmText, setConfirmText] = useState('');
  const plansPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      const plansData = await getPlans();
      setPlans(plansData);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredPlans = plans.filter(plan =>
    plan.plan_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { plan_name, plan_amount } = formData;
    const { data, error } = await supabase.from('plans').insert([{ plan_name, plan_amount }]);

    if (error) {
      console.error('Error creating plan:', error);
      toast.error('Failed to create plan');
    } else {
      toast.success('Plan created successfully!');
      setFormData({ plan_name: '', plan_amount: '' }); // Clear the form fields
      const updatedPlans = await getPlans(); // Refresh the list of plans
      setPlans(updatedPlans);
    }
    setLoading(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditPlan({
      ...editPlan,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updatePlan(editPlan.id, editPlan);
      const updatedPlans = await getPlans();
      setPlans(updatedPlans);
      setEditPlan(null);
      toast.success('Plan updated successfully!');
    } catch (error) {
      setError('Failed to update plan');
      console.error("Error updating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirmText !== 'CONFIRM DELETE') {
      setError('Confirmation text does not match');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await deletePlan(planToDelete.id);
      const updatedPlans = await getPlans();
      setPlans(updatedPlans);
      toast.success('Plan deleted successfully!');
      setDeleteDialogOpen(false); // Close the dialog
    } catch (error) {
      setError('Failed to delete plan');
      console.error(`Error deleting plan with ID ${planToDelete.id}:`, error);
    } finally {
      setLoading(false);
      setConfirmText('');
    }
  };

  const openEditDialog = (plan) => {
    setEditPlan(plan);
  };

  const openDeleteDialog = (plan) => {
    setPlanToDelete(plan);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-red-600 dark:text-red-500">Plans</h2>
          <Dialog>
            <DialogTrigger>
              <Button className="p-2 bg-red-500 text-white rounded">Create Plan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Plan</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new plan.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreatePlan}>
                <div className="mb-4">
                  <Input
                    type="text"
                    name="plan_name"
                    value={formData.plan_name}
                    onChange={handleInputChange}
                    placeholder="Plan Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="number"
                    name="plan_amount"
                    value={formData.plan_amount}
                    onChange={handleInputChange}
                    placeholder="Plan Amount"
                    required
                  />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Plan'}
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
          placeholder="Search by plan name..."
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
            {currentPlans.map(plan => (
              <tr key={plan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">
                  <Link href={`/plans/${plan.id}`} className="hover:underline">
                    {plan.plan_name}
                  </Link>
                </td>
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">
                  {plan.plan_amount}
                </td>
                <td className="py-2 px-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-600">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger>
                        <Button onClick={() => openEditDialog(plan)} className="p-2 bg-white text-red-600 hover:bg-red-600 hover:text-white rounded">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Plan</DialogTitle>
                          <DialogDescription>
                            Modify the details below to update the plan.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdate}>
                          <div className="mb-4">
                            <Input
                              type="text"
                              name="plan_name"
                              value={editPlan ? editPlan.plan_name : ''}
                              onChange={handleEditInputChange}
                              placeholder="Plan Name"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <Input
                              type="number"
                              name="plan_amount"
                              value={editPlan ? editPlan.plan_amount : ''}
                              onChange={handleEditInputChange}
                              placeholder="Plan Amount"
                              required
                            />
                          </div>
                          {error && <div className="text-red-500 mb-4">{error}</div>}
                          <DialogFooter>
                            <Button type="submit" disabled={loading} className="p-2 bg-red-600 text-white hover:bg-white hover:text-red-600 rounded">
                              {loading ? 'Updating...' : 'Update Plan'}
                            </Button>
                            <DialogClose>
                              <Button type="button" className="p-2 bg-red-600 text-white hover:bg-white hover:text-red-600 rounded">Cancel</Button>
                            </DialogClose>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button onClick={() => openDeleteDialog(plan)} className="p-2 bg-red-600 text-white hover:bg-white hover:text-red-600 rounded">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this plan? Please type <strong>CONFIRM DELETE</strong> to confirm.
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
                            <Button type="submit" disabled={loading || confirmText !== 'CONFIRM DELETE'}>
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

export default Plans;
