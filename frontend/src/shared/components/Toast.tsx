import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { removeNotification } from '../store/slices/notificationsSlice';
import type { Notification } from '../store/slices/notificationsSlice';

const STYLES: Record<Notification['type'], string> = {
  success: 'bg-green-50 border-green-400 text-green-800',
  error:   'bg-red-50 border-red-400 text-red-800',
  warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
  info:    'bg-blue-50 border-blue-400 text-blue-800',
};

const ICONS: Record<Notification['type'], string> = {
  success: '✅',
  error:   '❌',
  warning: '⚠️',
  info:    'ℹ️',
};

interface ToastProps {
  notification: Notification;
  duration?: number;
}

export function Toast({ notification, duration = 4000 }: ToastProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, duration);

    return () => clearTimeout(timer);
  }, [notification.id, duration, dispatch]);

  return (
    <div
      className={`flex items-start gap-3 w-80 p-4 rounded-lg border shadow-md
        animate-slide-in ${STYLES[notification.type]}`}
    >
      <span className="text-lg">{ICONS[notification.type]}</span>
      <p className="flex-1 text-sm font-medium">{notification.message}</p>
      <button
        onClick={() => dispatch(removeNotification(notification.id))}
        className="text-gray-400 hover:text-gray-600 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}