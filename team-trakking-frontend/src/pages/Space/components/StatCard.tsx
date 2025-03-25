interface StatCardProps {
  title: string;
  value: number;
  icon: string;
}

export const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="stat-card bg-white p-4 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-text-default text-sm">{title}</h3>
        <p className="text-2xl text-text-default font-bold">{value}</p>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  </div>
);
