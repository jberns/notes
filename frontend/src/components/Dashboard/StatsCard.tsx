import { DP } from '../Dark';

interface IStatsCardProps {
  title: string;
  stat: number;
  type?: 'percent' | null;
}

interface IStatsCardGridProps {
  children: React.ReactNode;
}

export const StatsCard = (props: IStatsCardProps) => {
  let stat: number | string = props.stat;

  if (props.type === 'percent') {
    stat = stat * 100;
    stat = stat.toFixed(0) + '%';
  }

  return (
    <div className={`${DP.dp12} sm:overflow-hidden rounded-lg shadow`}>
      <div className="px-4 py-5 sm:p-6">
        <dt className="text-sm font-medium text-white truncate text-opacity-l-emp">
          {props.title}
        </dt>
        <dd className="mt-1 text-3xl font-semibold text-white text-opacity-h-emp">
          {stat}
        </dd>
      </div>
    </div>
  );
};

export const StatsCardGrid = ({ children }: IStatsCardGridProps) => {
  return (
    <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">{children}</dl>
  );
};
