// src/components/common/NotificationsDropdown.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../../api/notifications';
import { timeAgo } from '../../utils/timeFormat';
import { getNotificationTypeConfig } from '../../utils/notificationTypes';

const POLL_INTERVAL = 30_000; // 30s : rafraichissement automatique

// Bouton cloche du header : fetch + polling + dropdown avec types de notif
// (success/danger/warning/info/primary), marquage lu/non-lu, click -> navigue
// si un lien est fourni.
export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const load = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch {
      // silencieux : une erreur de notif ne doit pas casser le header
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (notif) => {
    if (!notif.read) {
      setNotifications((prev) => prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)));
      markNotificationRead(notif.id).catch(() => {});
    }
    if (notif.link) navigate(notif.link);
    setOpen(false);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    markAllNotificationsRead().catch(() => {});
  };

  let content;
  if (loading) {
    content = <div className="px-4 py-6 text-center text-sm text-slate-400">Chargement...</div>;
  } else if (notifications.length === 0) {
    content = <div className="px-4 py-6 text-center text-sm text-slate-400">Aucune notification</div>;
  } else {
    content = notifications.map((notif) => {
      const { icon: TypeIcon, iconColor, bg } = getNotificationTypeConfig(notif.type);
      return (
        <button
          key={notif.id}
          onClick={() => handleItemClick(notif)}
          className={`w-full flex items-start gap-2.5 px-4 py-3 text-left border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer ${
            !notif.read ? bg : ''
          }`}
        >
          <TypeIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: iconColor }} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{notif.title}</p>
            <p className="text-sm text-slate-600 line-clamp-2">{notif.message}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{timeAgo(notif.createdAt)}</p>
          </div>
        </button>
      );
    });
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 text-slate-500 hover:text-crmPrimary rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <Bell className="w-5 h-5" style={{ color: '#94A3B8', strokeWidth: 2 }} />
        {unreadCount > 0 && (
          <span
            className="absolute flex items-center justify-center rounded-full text-white leading-none"
            style={{
              top: '5px',
              right: '4px',
              width: '16px',
              height: '19px',
              background: '#EF4444',
              border: '2px solid #FFFFFF',
              borderRadius: '9999px',
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: 400,
              fontSize: '10px',
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-96 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <span className="font-semibold text-sm text-slate-800">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} className="text-xs text-crmPrimary hover:underline cursor-pointer">
                Tout marquer comme lu
              </button>
            )}
          </div>

          <div className="overflow-y-auto">{content}</div>
        </div>
      )}
    </div>
  );
}