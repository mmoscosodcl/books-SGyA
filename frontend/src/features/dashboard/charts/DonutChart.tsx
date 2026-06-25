import Plot from 'react-plotly.js';
import type { ChartPoint } from './types';

type Props = { title: string; data: ChartPoint[] };

export function DonutChart({ title, data }: Props) {
  return (
    <Plot
      data={[
        {
          type: 'pie',
          hole: 0.55,
          labels: data.map((d) => d.label),
          values: data.map((d) => d.value),
        },
      ]}
      layout={{ title, margin: { t: 40, l: 20, r: 20, b: 20 }, height: 340 }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: '100%' }}
    />
  );
}