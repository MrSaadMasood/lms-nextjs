import { ChartType } from 'chart.js';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    verticalHoverLine: boolean
  }
}

