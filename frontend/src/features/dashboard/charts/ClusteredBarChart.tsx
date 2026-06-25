import Plot from 'react-plotly.js';
import type { ClusterPoint } from './types';

type Props = {
  title: string;
  data: ClusterPoint[];
  seriesOrder: string[];
};

export function ClusteredBarChart({ title, data, seriesOrder }: Props) {
  const labels = data.map((d) => d.label);

  return (
    <Plot
      data={seriesOrder.map((seriesName) => ({
        type: 'bar',
        name: seriesName,
        x: labels,
        y: data.map((d) => d.series[seriesName] ?? 0),
      }))}
      layout={{
        title,
        barmode: 'group',
        margin: { t: 40, l: 40, r: 20, b: 40 },
        height: 360,
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: '100%' }}
    />
  );
}