export type ChartPoint = { label: string; value: number };

export type ClusterPoint = {
  label: string;
  series: Record<string, number>;
};

export type HistogramBin = {
  rangeLabel: string;
  count: number;
};