import React, { useEffect } from 'react';
import * as d3 from 'd3';

const barData = [
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

// eslint-disable-next-line arrow-body-style
export const BarChart: React.FC = (props) => {
  useEffect(() => {
    const element = document.getElementById('bar-chart');

    // Setting dimensions
    const margin = { top: 40, right: 20, bottom: 50, left: 50 };
    const width = 900 - margin.left - margin.right;
    const height = 480 - margin.top - margin.bottom;

    // Setting X,Y scale ranges
    const xScale = d3.scaleBand().range([0, width]).padding(0.1);

    const yScale = d3.scaleLinear().range([height, 0]);

    // Appending svg to a selected element
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('viewBox', `0 40 ${width + 80} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Formatting the data
    barData.forEach((d) => {
      d.value = +d.value;
    });

    // Scaling the range of the data in the domains
    xScale.domain(barData.map((d) => d.name));
    yScale.domain([0, d3.max(barData, (d) => d.value)]);

    // Appending the rectangles for the bar chart
    svg
      .selectAll('.bar')
      .data(barData)
      .enter()
      .append('rect')
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
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));

    // Adding the y Axis
    svg.append('g').call(d3.axisLeft(yScale));
  });

  return <div id='bar-chart' />;
};
