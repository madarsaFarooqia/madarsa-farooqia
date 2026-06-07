
export const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    case "refunded":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusLabel = (status, t) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return t?.("admin:completed", "Completed");
    case "pending":
      return t?.("admin:pending", "Pending");
    case "failed":
      return t?.("admin:failed", "Failed");
    case "refunded":
      return t?.("admin:refunded", "Refunded");
    default:
      return status;
  }
};