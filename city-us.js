var bardata = [];
var barlabel = [];

d3.csv('avg_residents_city.csv', function(d){
	for (key in d){
		bardata.push(d[key].average);
		barlabel.push(d[key].city);
	}

var margin = {top:30, right:30, bottom:120, left:80};

var height = 750 - margin.top - margin.bottom,
	width = 1200- margin.left - margin.right,
	barWidth = 10,
	barOffset = 5;
	
var r = bardata.length;

var colors = d3.scale.linear()
	.domain([0,1])
	.range(['#7A378B','#34A99A']);
	
var yScale = d3.scale.linear()
	.domain([0, 179000])
	.range([0, height]);
	
var xScale = d3.scale.ordinal()
	.domain(d3.range(0, bardata.length))
	.rangeBands([0, width], 0.1);	

var tempColor;

var tooltip = d3.select('body').append('div')
	.style('position','absolute')
	.style('padding', '0px 10px')
	.style('background', '#ffffff')
	.style('opacity', 0)
	

var myChart = d3.select('#chart').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform','translate('+ margin.left +', '+ margin.top +')')
	.selectAll().data(bardata)
	.enter().append('rect')
	.style('fill', function(d,i){
		return colors(i);
	})
	.attr('width',xScale.rangeBand())
	.attr('height', 0)
	.attr('x', function(d,i){
		return xScale(i);
	})
	.attr('y', height)
	

//add events to the #chart
.on('mouseover', function(d, i) {
	tooltip.transition() //add the data to the tooltip
	.style('left', (d3.event.pageX-35)+'px')
	.style('top', (d3.event.pageY-40)+'px')
	.style('opacity', .9)
	tooltip.html(barlabel[i]+','+ bardata[i])
	
	tempColor = this.style.fill;
	d3.select(this)
		//.transition removed
	.style('opacity', .5)
	.style('fill','green')
})

.on('mouseout', function(d) {
	d3.select(this)
	//.transition removed
	.style('opacity', 1)
	.style('fill', tempColor)
})


myChart.transition()
//chart
.attr('height', function(d){
	return yScale(d);
})
.attr('y', function(d){
	return height - yScale(d);
})
.delay(function(d, i){
	return i*25
})
.duration(1000)
.ease('bounce')

var vGuideScale = d3.scale.linear()
.domain([0,179000])
.range([height,0])

//Using svg.axis() method to create a vertical axis
var xAxis = d3.svg.axis()
.scale(vGuideScale)
.orient('left')
.ticks(10)

var vGuide = d3.select('svg').append('g');

xAxis(vGuide);

vGuide.attr('transform', 'translate('+ margin.left +', '+ margin.top +')')

//being visible
vGuide.selectAll('path')
.style({fill:'none', stroke:'#000'})

//style line elements
vGuide.selectAll('line')
	.style({stroke:'#000'})
	
	
var hAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom')
	.tickFormat(function (d, i){return barlabel[i]})
	
var hGuide = d3.select('svg').append('g')

hAxis(hGuide)
hGuide.attr('transform','translate('+ margin.left +','+ (height+margin.top) +')')
	.selectAll('text')  
            .attr('transform', 'rotate(-90)')
			.attr('x', -10)
			.attr('y', -5)
			.style('text-anchor', 'end')
			.style('font-size', '10px');
			
hGuide.selectAll('path')
	.style({fill:'none', stroke:'#000'})
hGuide.selectAll('line')
	.style({stroke: '#000'})
	


var title = d3.select('svg').append('text')
	.attr('x', (width/2))
	.attr('y', (margin.top))
	.attr('text-anchor', 'middle')  
    .style('font-size', '20px') 
    .style('text-decoration', 'bold')  
    .text('Top Cities with Highest Average Number of Immigrants 2010-2017')
	
var yLabel = d3.select('svg').append('text')
	.attr('x', -270)
	.attr('y', ((margin.left/2)-8))
	.attr('text-anchor', 'middle')  
    .style('font-size', '12px') 
	.attr('transform', 'rotate(270)')
    .style('text-decoration', 'bold')  
    .text('Average Number')

var xLabel = d3.select('svg').append('text')
	.attr('x', (width/2)+10)
	.attr('y', (height+140))
	.attr('text-anchor', 'middle')  
    .style('font-size', '12px') 
    .style('text-decoration', 'bold')  
    .text('Cities-state')

});

	
	

	
	
	
	
	
	
	
	

