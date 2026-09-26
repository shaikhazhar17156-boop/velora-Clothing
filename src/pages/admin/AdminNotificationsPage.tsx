import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useRouter } from '../../context/NavigationContext';
import { Bell, Check, Trash2, ShoppingBag, AlertTriangle, User, Star, ExternalLink } from 'lucide-react';

export const AdminNotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } = useStore();
  const { navigate } = useRouter();

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'stock':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'customer':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'review':
        return <Star className="w-4 h-4 text-[#B08D57]" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <div>
          <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#111111] dark:text-white">
            System Activity & Notifications ({notifications.length})
          </h2>
          <p className="text-xs text-[#666666] dark:text-[#AAAAAA]">
            Real-time automated alerts for orders, warehouse stock limits, reviews, and customer sign-ups.
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="px-4 py-2 border border-[#E5E5E5] dark:border-[#383838] hover:border-[#111111] text-xs font-semibold uppercase tracking-wider text-[#111111] dark:text-white"
        >
          Mark All As Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A]">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`p-4 flex items-center justify-between gap-4 transition-colors ${
              !n.read ? 'bg-[#F9F5EE]/40 dark:bg-[#B08D57]/10' : 'hover:bg-[#FAFAFA] dark:hover:bg-[#252525]'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#F7F7F7] dark:bg-[#252525] flex items-center justify-center shrink-0 border border-[#E5E5E5] dark:border-[#383838]">
                {getIcon(n.type)}
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-2">
                  <strong className="font-semibold text-[#111111] dark:text-white">{n.title}</strong>
                  <span className="text-[10px] text-[#888888]">{n.date}</span>
                </div>
                <p className="text-[#666666] dark:text-[#CCCCCC] mt-0.5">{n.message}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {n.link && (
                <button
                  onClick={() => navigate(n.link!)}
                  className="p-1.5 text-[#666666] hover:text-[#B08D57] dark:text-[#AAAAAA]"
                  title="Navigate to resource"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              {!n.read && (
                <button
                  onClick={() => markNotificationAsRead(n.id)}
                  className="p-1.5 text-[#666666] hover:text-emerald-600"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => deleteNotification(n.id)}
                className="p-1.5 text-[#666666] hover:text-red-600"
                title="Delete notification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
