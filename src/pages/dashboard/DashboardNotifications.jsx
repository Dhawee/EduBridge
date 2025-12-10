import { BellIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function DashboardNotifications() {
  const notifications = [
    {
      id: 1,
      type: "info",
      message: "School portal will undergo maintenance tomorrow.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "alert",
      message: "You have one new assignment.",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 shadow-lg hover:scale-[1.01] transition"
          >
            <div className="p-3 rounded-full bg-green-500/20">
              {note.type === "info" ? (
                <BellIcon className="w-6 h-6 text-green-400" />
              ) : (
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400" />
              )}
            </div>

            <div className="flex-1">
              <p className="text-gray-900 dark:text-gray-100 text-lg font-medium">
                {note.message}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {note.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
