import { useAppSelector } from '../hooks';
import { Toast } from './Toast';

export function ToastContainer() {
  const { items } = useAppSelector((state) => state.notification);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {items.map((n) => (
        <Toast key={n.id} notification={n} />
      ))}
    </div>
  );
}