import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Button, Stack } from '@mui/material';
import { TSelection } from 'src/d3Types';

const initialData = [
  { value: 2400, name: 'Chevrolet' },
  { value: 1230, name: 'Honda' },
  { value: 330, name: 'Nissan' },
  { value: 2200, name: 'Hyundai' },
  { value: 1200, name: 'VW' },
  { value: 210, name: 'Infinity' },
  { value: 2000, name: 'Mazda' },
  { value: 1200, name: 'Ford' },
  { value: 6550, name: 'Toyota' },
  { value: 420, name: 'BMW' },
  { value: 2013, name: 'KIA' },
  { value: 1500, name: 'Lexus' },
  { value: 1200, name: 'Mercedes' },
];

const margin = { top: 40, right: 20, bottom: 50, left: 50 };
const width = 900 - margin.left - margin.right;
const height = 480 - margin.top - margin.bottom;

export const BarChart: React.FC = (props) => {
  const [data, setData] = useState(initialData);

  const [svg, setSvg] = useState<null | TSelection>(null);

  const svgRef = useRef<null | SVGSVGElement>(null);

  useEffect(() => {
    if (!svg) {
      setSvg(d3.select(svgRef.current));
      return;
    }

    // d3.select(element).select('svg').remove();

    // Setting dimensions

    // Setting X,Y scale ranges
    const xScale = d3.scaleBand().range([0, width]).padding(0.1);

    const yScale = d3.scaleLinear().range([height, 0]);

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('viewBox', `0 40 ${width + 80} ${height}`);

    // Appending svg to a selected element
    const chartGroup = svg.select('.chartGroup');

    // Formatting the data
    data.forEach((d) => {
      d.value = +d.value;
    });

    // Scaling the range of the data in the domains
    xScale.domain(data.map((d) => d.name));
    yScale.domain([0, d3.max(data, (d) => d.value)]);

    chartGroup.selectChildren().remove();

    // Appending the rectangles for the bar chart
    chartGroup
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.name))
      .attr('width', xScale.bandwidth())
      .style('fill', '#339cd9')
      .attr('y', () => height)
      .attr('height', 0)
      .transition()
      .duration(800)
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => height - yScale(d.value))
      .delay((d, i) => i * 100);

    // Adding the x Axis
    chartGroup.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));

    // Adding the y Axis
    chartGroup.append('g').call(d3.axisLeft(yScale));
  }, [data, svg]);

  return (
    <>
      <Stack>
        <Button
          variant='contained'
          onClick={() => {
            setData((currData) => [...currData, { value: Math.round(Math.random() * 6000) + 500, name: `Item${currData.length}` }]);
          }}
        >
          Add Data
        </Button>
        <svg ref={svgRef}>
          <g className='chartGroup' transform={`translate(${margin.left},${margin.top})`}></g>
        </svg>
      </Stack>
    </>
  );
};
