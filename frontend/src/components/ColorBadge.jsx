export default function ColorBadge({ 
  status = "verified", 
  category = "identity", 
  children,
  size = "md",
  className = ""
}) {
  // Map status to colors with meaning
  const statusColors = {
    verified: {
      bg: "bg-emerald-100 dark:bg-emerald-900/50",
      text: "text-emerald-700 dark:text-emerald-300",
      dot: "bg-emerald-500",
      label: "Verified",
    },
    expiring: {
      bg: "bg-red-100 dark:bg-red-900/50",
      text: "text-red-700 dark:text-red-300",
      dot: "bg-red-500",
      label: "Expiring Soon",
    },
    pending: {
      bg: "bg-yellow-100 dark:bg-yellow-900/50",
      text: "text-yellow-700 dark:text-yellow-300",
      dot: "bg-yellow-500",
      label: "Pending",
    },
    shared: {
      bg: "bg-blue-100 dark:bg-blue-900/50",
      text: "text-blue-700 dark:text-blue-300",
      dot: "bg-blue-500",
      label: "Shared",
    },
    family: {
      bg: "bg-pink-100 dark:bg-pink-900/50",
      text: "text-pink-700 dark:text-pink-300",
      dot: "bg-pink-500",
      label: "Family",
    },
    intelligence: {
      bg: "bg-purple-100 dark:bg-purple-900/50",
      text: "text-purple-700 dark:text-purple-300",
      dot: "bg-purple-500",
      label: "AI Summary",
    },
    disabled: {
      bg: "bg-slate-100 dark:bg-slate-800",
      text: "text-slate-600 dark:text-slate-400",
      dot: "bg-slate-400",
      label: "Disabled",
    },
    success: {
      bg: "bg-orange-100 dark:bg-orange-900/50",
      text: "text-orange-700 dark:text-orange-300",
      dot: "bg-orange-500",
      label: "Success",
    },
    risk: {
      bg: "bg-red-100 dark:bg-red-900/50",
      text: "text-red-700 dark:text-red-300",
      dot: "bg-red-500",
      label: "High Risk",
    },
  };

  // Map category to colors for document types
  const categoryColors = {
    identity: statusColors.verified,
    health: statusColors.verified,
    education: statusColors.intelligence,
    finance: { ...statusColors.shared },
    family: statusColors.family,
    vehicle: statusColors.success,
    property: { ...statusColors.disabled, bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-300" },
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const color = statusColors[status] || categoryColors[category] || statusColors.verified;

  return (
    <span className={`inline-flex items-center gap-2 rounded-md font-medium ${sizeClasses[size]} ${color.bg} ${color.text} ${className}`}>
      <span className={`h-2 w-2 rounded-full ${color.dot}`} />
      {children || color.label}
    </span>
  );
}
