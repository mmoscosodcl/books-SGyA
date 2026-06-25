import Plot from 'react-plotly.js';
import type { HistogramBin } from './types';

type Props = { title: string; bins: HistogramBin[] };

export function HistogramChart({ title, bins }: Props) {
  return (
    <Plot
      data={[
        {
          type: 'bar',
          x: bins.map((b) => b.rangeLabel),
          y: bins.map((b) => b.count),
        },
      ]}
      layout={{ title, margin: { t: 40, l: 40, r: 20, b: 40 }, height: 340 }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: '100%' }}
    />
  );
}