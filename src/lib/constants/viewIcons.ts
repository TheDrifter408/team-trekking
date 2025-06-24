// viewIcons.ts
import {
  LayoutList,
  KanbanSquare,
  Calendar,
  Clock,
  Map,
  Activity,
  Users,
  GanttChartSquare,
  Brain,
  Table,
  Loader,
} from 'lucide-react';

export const viewIconMap: Record<string, React.FC<{ className?: string }>> = {
  list: LayoutList,
  board: KanbanSquare,
  calendar: Calendar,
  timeline: Clock,
  map: Map,
  activity: Activity,
  team: Users,
  gantt: GanttChartSquare,
  'mind map': Brain,
  table: Table,
  workload: Loader,
};
