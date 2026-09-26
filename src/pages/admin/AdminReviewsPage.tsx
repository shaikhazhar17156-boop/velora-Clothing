import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, CheckCircle, EyeOff, Trash2, Check, MessageSquare } from 'lucide-react';
import { ConfirmationModal } from '../../components/admin/ConfirmationModal';
import { Review } from '../../types';

export const AdminReviewsPage: React.FC = () => {
  const { reviews, updateReviewStatus, deleteReview } = useStore();
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  const filteredReviews = reviews.filter(r => {
    if (ratingFilter !== 'all' && r.rating !== ratingFilter) return false;
    return true;
  });

  const confirmDelete = () => {
    if (reviewToDelete) {
      deleteReview(reviewToDelete.id);
      setReviewToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            Customer Feedback & Reviews ({reviews.length})
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Moderate verified buyer ratings, approve testimonials, or hide inappropriate comments.
          </p>
        </div>

        {/* Rating Filter Pills */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-[#1E1E1E] p-1 border border-[#E5E5E5] dark:border-[#2A2A2A] text-xs">
          <button
            onClick={() => setRatingFilter('all')}
            className={`px-3 py-1 font-semibold uppercase ${ratingFilter === 'all' ? 'bg-[#111111] dark:bg-[#B08D57] text-white' : 'text-[#666666]'}`}
          >
            All
          </button>
          {[5, 4, 3, 2, 1].map(r => (
            <button
              key={r}
              onClick={() => setRatingFilter(r)}
              className={`px-2.5 py-1 font-semibold ${ratingFilter === r ? 'bg-[#111111] dark:bg-[#B08D57] text-white' : 'text-[#666666]'}`}
            >
              ★ {r}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7F7F7] dark:bg-[#252525] text-[#888888] uppercase tracking-wider text-[10px]">
                <th className="p-3">Customer</th>
                <th className="p-3">Garment Reviewed</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Feedback</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
              {filteredReviews.map(r => (
                <tr key={r.id} className="hover:bg-[#FAFAFA] dark:hover:bg-[#242424] transition-colors">
                  <td className="p-3 font-semibold text-[#111111] dark:text-white">
                    {r.customerName}
                  </td>
                  <td className="p-3 text-[#555555] dark:text-[#CCCCCC]">
                    {r.productName}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <span>{r.rating}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                    </div>
                  </td>
                  <td className="p-3 text-[#555555] dark:text-[#CCCCCC] max-w-sm">
                    "{r.comment}"
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                      r.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : r.status === 'Hidden'
                        ? 'bg-gray-100 text-gray-700 border-gray-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#888888]">
                    {r.date}
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {r.status !== 'Approved' && (
                        <button
                          onClick={() => updateReviewStatus(r.id, 'Approved')}
                          className="px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold uppercase"
                          title="Approve review"
                        >
                          Approve
                        </button>
                      )}
                      {r.status !== 'Hidden' && (
                        <button
                          onClick={() => updateReviewStatus(r.id, 'Hidden')}
                          className="px-2 py-1 bg-gray-600 text-white text-[10px] font-bold uppercase"
                          title="Hide review"
                        >
                          Hide
                        </button>
                      )}
                      <button
                        onClick={() => setReviewToDelete(r)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!reviewToDelete}
        title="Delete Customer Review"
        message="Are you sure you want to permanently delete this customer feedback?"
        confirmText="Delete Review"
        onConfirm={confirmDelete}
        onCancel={() => setReviewToDelete(null)}
      />

    </div>
  );
};
