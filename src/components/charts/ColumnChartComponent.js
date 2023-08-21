import ChartComponent from './ChartComponent';

const ColumnChartComponent = ({ data, options, width, height }) => {
  return (
    <ChartComponent
      chartType="ColumnChart"
      data={data}
      options={options}
      width={width}
      height={height}
    />
  );
};

export default ColumnChartComponent;