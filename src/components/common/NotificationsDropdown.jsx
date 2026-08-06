// src/components/common/NotificationsDropdown.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../../api/notifications';

const BellIcon = ({ className, style }) => (
  <svg className={className} style={style} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 19H20L18.595 17.595C18.2139 17.2139 17.9999 16.697 18 16.158V13C18.0003 10.4567 16.3976 8.18933 14 7.341V7C14 5.89617 13.1038 5 12 5C10.8962 5 10 5.89617 10 7V7.341C7.67 8.165 6 10.388 6 13V16.159C6 16.697 5.786 17.214 5.405 17.595L4 19H9M15 19V20C15 21.6557 13.6557 23 12 23C10.3443 23 9 21.6557 9 20V19M15 19H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const timeAgo = (dateStr) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "a l'instant";
  if (mins < 60) return `il y a ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `il y a ${hours}h`;
  return `il y a ${Math.floor(hours / 24)}j`;
};

const POLL_INTERVAL = 30_000; // 30s : rafraichissement automatique

// Remplace le bouton cloche statique du header : fetch + polling + dropdown
// avec marquage lu/non-lu, click sur un item -> navigue si un lien est fourni.
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

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 text-slate-500 hover:text-crmPrimary rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <BellIcon className="w-5 h-5" style={{ color: '#94A3B8', strokeWidth: 2 }} />
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

          <div className="overflow-y-auto">
            {loading ? (
              <div className="px-4 py-6 text-center text-sm text-slate-400">Chargement...</div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-slate-400">Aucune notification</div>
            ) : (
              notifications.map((notif) => (
                <button
                  key={notif.id}
                  onClick={() => handleItemClick(notif)}
                  className={`w-full flex items-start gap-2 px-4 py-3 text-left border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer ${
                    !notif.read ? 'bg-emerald-50/40' : ''
                  }`}
                >
                  {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-crmPrimary mt-1.5 shrink-0" />}
                  <div className={!notif.read ? '' : 'pl-3.5'}>
                    <p className="text-sm text-slate-700">{notif.message}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{timeAgo(notif.createdAt)}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}