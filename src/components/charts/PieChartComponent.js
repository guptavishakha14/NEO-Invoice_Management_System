import ChartComponent from './ChartComponent';

const PieChartComponent = ({ data, options }) => {
  return <ChartComponent chartType="PieChart" data={data} options={options} />;
};

export default PieChartComponent;