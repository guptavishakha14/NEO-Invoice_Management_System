import { Chart } from 'react-google-charts';

const ChartComponent = ({ chartType, data, options, width, height }) => {
  return (
    <Chart
      chartType={chartType}
      data={data}
      options={options}
      width={width}
      height={height}
    />
  );
};

export default ChartComponent;