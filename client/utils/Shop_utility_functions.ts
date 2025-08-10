export function getCategoryColor(category: string): string {
  const colors = {
    "Black Tea": "bg-amber-100 text-amber-700",
    "Green Tea": "bg-emerald-100 text-emerald-700",
    "Flavored Tea": "bg-purple-100 text-purple-700",
    default: "bg-gray-100 text-gray-700",
  };
  return colors[category as keyof typeof colors] || colors.default;
}

export function getOriginColor(origin: string): string {
  const colors = {
    India: "bg-orange-100 text-orange-700",
    Kenya: "bg-green-100 text-green-700",
    China: "bg-red-100 text-red-700",
    default: "bg-blue-100 text-blue-700",
  };
  return colors[origin as keyof typeof colors] || colors.default;
}
