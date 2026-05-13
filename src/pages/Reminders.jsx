import { AlertTriangle, Clock, CheckCircle2, Heart, FileText, CalendarDays, Bell } from "lucide-react";
import ReminderCard from "../components/ReminderCard";
import EmotionCard from "../components/EmotionCard";
import { reminders } from "../data/mockData";

const reminderGroups = [
  { name: "Expiry", icon: AlertTriangle, color: "from-red-600 to-rose-500", desc: "Documents expiring soon" },
  { name: "Renewal", icon: Clock, color: "from-yellow-400 to-amber-400", desc: "Time to renew documents" },
  { name: "Correction", icon: FileText, color: "from-orange-500 to-amber-500", desc: "Updates needed" },
  { name: "Application Deadline", icon: CalendarDays, color: "from-blue-600 to-cyan-500", desc: "Important dates" },
  { name: "Child Vaccination", icon: Heart, color: "from-pink-500 to-rose-400", desc: "Family health" },
  { name: "Personal Event", icon: CheckCircle2, color: "from-purple-600 to-fuchsia-500", desc: "Memories & milestones" },
];

export default function Reminders() {
  const total = reminders.length;
  const urgentCount = reminders.filter(r => r.status === "Urgent").length;
  const upcomingCount = reminders.filter(r => r.status === "Upcoming").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Smart Reminders</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Stay ahead of renewals, deadlines, corrections, and family care with emotion-based alerts.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <EmotionCard
          title="Total Reminders"
          description={`${total} items tracked`}
          emotion="reminder"
          icon={Bell}
        >
          <p className="text-2xl font-bold">{total}</p>
        </EmotionCard>
        <EmotionCard
          title="Urgent Items"
          description="Require immediate attention"
          emotion="risk"
          icon={AlertTriangle}
        >
          <p className="text-2xl font-bold">{urgentCount}</p>
        </EmotionCard>
        <EmotionCard
          title="Upcoming"
          description="Scheduled for later"
          emotion="reminder"
          icon={Clock}
        >
          <p className="text-2xl font-bold">{upcomingCount}</p>
        </EmotionCard>
      </div>

      {/* Reminder Groups */}
      <div className="grid gap-6 lg:grid-cols-2">
        {reminderGroups.map((group) => {
          const Icon = group.icon;
          const groupReminders = reminders.filter((reminder) => reminder.group === group.name);

          return (
            <div
              key={group.name}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
            >
              {/* Header with emotion color */}
              <div className={`bg-gradient-to-r ${group.color} text-white p-5 flex items-start justify-between`}>
                <div className="flex items-start gap-3">
                  <Icon size={24} />
                  <div>
                    <h2 className="text-xl font-bold">{group.name}</h2>
                    <p className="text-sm opacity-90">{group.desc}</p>
                  </div>
                </div>
                <span className="bg-white/30 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {groupReminders.length}
                </span>
              </div>

              {/* Reminders List */}
              <div className="p-5 space-y-3">
                {groupReminders.length > 0 ? (
                  groupReminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 py-4">No reminders in this category</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">💡 Reminder Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>• Set phone notifications for urgent reminders</li>
          <li>• Review reminders weekly to stay organized</li>
          <li>• Mark completed tasks to reduce visual clutter</li>
          <li>• Family reminders sync across all family members</li>
        </ul>
      </div>
    </div>
  );
}
