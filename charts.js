export function renderGraphs(){

	//Bar chart
	const root = document.getElementById("chartRoot");
    	const chart1 = document.getElementById("myChart");
    	if(chart1)
		root.removeChild(chart1);

	        const myChart = document.createElement("canvas");
	        myChart.setAttribute("id", "myChart")
	        root.appendChild(myChart);
	        const ctx = document.getElementById('myChart');
	        var labels = [];
	        for (let i = 0; i < this.state.officialFeesEP.length; i++) {
		        labels.push("Year "+(i+1));
                this.setState({serviceFeesUP: []});
                this.state.serviceFeesUP.push(this.state.serviceFee * (i+1));
	        }
	        const mixedChart = new Chart(ctx, {
			data: {
			        labels: labels,
			        datasets: [
				        {
					        type: 'bar',
					        label: 'Official fees',
					        data: this.state.officialFeesEP,
					        backgroundColor: 'rgb(235,243,220)',
					        stack: 0
				        },
				        {
					        type: 'bar',
					        label: 'Service fees',
					        data: [150, 200, 300, 1000],
					        backgroundColor: 'rgb(188,235,153)',
					        stack: 0
				        },
				        {
					        type: 'bar',
					        label: 'Official fees',
					        data: this.state.officialFeesUP,
					        backgroundColor: 'rgb(208,212,209)',
					        stack: 1
				        },
				        {
					        type: 'bar',
					        label: 'Service fees',
					        data: this.state.serviceFeesUP,
					        backgroundColor: 'rgb(115,126,117)',
					        stack: 1
				        }
			        ],
		        },
		        options: {
			        scales: {
				        x: {
					        stacked:true
				        },
				        y: {
					        stacked:true,
					        beginAtZero: true
				        }
			        },
			        plugins: {
				        legend: {
					        display: false
				        }
			        }
		        }
	        });

	        //Pie chart EP
	        const pieChart1Root = document.getElementById("pieChartroot1");
	        const chartp1 = document.getElementById("pieChart1");
	        if(chartp1)
                pieChart1Root.removeChild(chartp1);

	        const pieChart1 = document.createElement("canvas");
	        pieChart1.setAttribute("id", "pieChart1");
	        pieChart1Root.appendChild(pieChart1);
	        const pieChart1Ctx = document.getElementById("pieChart1");
            	var sumEPOFees = 0;
            	this.state.officialFeesEP.map(x => {
                	sumEPOFees += x;
            	});
	        var sumEPSFees = 0;
	        this.state.serviceFeesEP.map(x => {
                	sumEPSFees += x;
	        })
	        const pieChart = new Chart(pieChart1Ctx, {
		        data: {
			        labels: ['Official fees', 'Service fees'],
			        datasets: [
				        {
					        type: 'doughnut',
					        data: [sumEPSFees, sumEPOFees],
					        backgroundColor: ['rgb(235,243,220)','rgb(188,235,153)'],
				        }
			        ],
		        },
		        options: {
			        responsive: true,
			        plugins: {
				        legend: {
					        display: false
				        }
			        }
		        }
	        });

	        //Pie chart UP
	        const pieChart2Root = document.getElementById("pieChartroot2");
	        const chartp2 = document.getElementById("pieChart2");
	        if(chartp2)
                pieChart2Root.removeChild(chartp2);

	        const pieChart2 = document.createElement("canvas");
	        pieChart2.setAttribute("id", "pieChart2");
	        pieChart2Root.appendChild(pieChart2);
	        const pieChart2Ctx = document.getElementById("pieChart2");
	        var sumUPOFees = 0;
	        this.state.officialFeesUP.map(x => {
                sumUPOFees += x;
	        });

	        const pie2Chart = new Chart(pieChart2Ctx, {
		        data: {
			        labels: ['Official fees', 'Service fees'],
			        datasets: [
				        {
					        type: 'doughnut',
					        data: [sumUPOFees, this.state.serviceFeesUP],
					        backgroundColor: ['rgb(208,212,209)','rgb(115,126,117)'],
				        }
			        ],
		        },
		        options: {
			        responsive: true,
			        plugins: {
				        legend: {
					        display: false
				        }
			        }
		        }
	        });
}

