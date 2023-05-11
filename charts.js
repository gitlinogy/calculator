const { useMemo } = React;
	const {	createRoot } = ReactDOM;

	const EPfile = "https://uploads-ssl.webflow.com/644d046850a16273b5c7ddbd/645bb8061d7593c3f7dc083b_EP.csv";
    const UPfile = "https://uploads-ssl.webflow.com/644d046850a16273b5c7ddbd/645bc7ca2d1c275c9bedf58c_UP.csv";

	class App extends React.Component {

		constructor() {
            super();
            this.state = {
                countries: [],
                serviceFee: 120,
                officialFeesEP: [],
                serviceFeesEP: [],
                officialFeesUP: [],
                serviceFeesUP: [],
            }
        }

        renderGraphs(){

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

        onServiceFeeChange(event){
			this.setState({serviceFee: 100 });
			this.renderGraphs();
        }

async componentDidMount(){
	var epDataArr = [];
	const upResponse = await fetch(EPfile);
	const epData = await upResponse.text();
	epDataArr = epData.split('\n');
    	epDataArr.slice(1,epDataArr.length).forEach(x => {
		var row = x.split(";");
		var sum = 0;
		row.slice(1, row.length).forEach(r => {
		    sum += parseInt(r);
		});
		this.state.officialFeesEP.push(sum);
	    });

            const countries = epDataArr[0].split(";");
            this.setState({countries: countries.slice(1,countries.length)});

            var upDataArr = [];
            const response = await fetch(UPfile);
            const data = await response.text();
            upDataArr = data.split('\n');
            upDataArr.slice(1,upDataArr.length).forEach(x => {
                var row = x.split(";");
                var sum = 0;
                row.slice(2, row.length - 1).forEach(r => {
                    sum += parseInt(r);
                });
                this.state.officialFeesUP.push(sum);
            });

            this.renderGraphs();
		}

	render() {
            return (
		<div className="row justify-content-center">
                    <div className="col-9">
                        <div className="row" style={{color:"black", display:"flex", backgroundColor:"#e0e0e0"}}>
                            <div className="col-3" style={{}}>
                                <div style={{margin:10}}>
                                    <div>
                                        <h5>Jurisdictions</h5>
                                        <p>Choose the jurisdictions you want to cover and refine your pruning strategy</p>
                                    </div>
                                <div style={{margin:5}}>
                                    <p>Add jurisdiction</p>
                                    <select className="form-select">
                                        <option>Select a value</option>
	                                    {this.state.countries.map(x => {
                                            return (
                                                <option key={x} value="x">{x}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div style={{margin:5}}>
                                    <p style={{backgroundColor:'grey'}}>placeholder for country components</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-9" style={{}}>
                            <div style={{margin:10}}>
                                <h3 style={{color:'rgb(107,114,128)'}}>Simulation</h3>
                                <p style={{color:'rgb(107,114,128)'}}>The graph below shows the evolution of the filing and maintenance costs during a patent's lifetime, as well as the difference in cost between the two filing strategies. This takes into account your patent characteristics, the jurisdictions you want to cover and also the pruning provisions.</p>
                                <div className="row">
                                    <div className="col-3">
                                        <p style={{color:'rgb(107,114,128)', fontWeight:'300', fontSize:16}}>Service fee</p>
                                        <input type="number" className="form-control" value={this.state.serviceFee} onChange={(e) => this.onServiceFeeChange(e)}/>
                                    </div>
	                                <div className="col-3">
                                        <p style={{color:'rgb(107,114,128)', fontWeight:'300', fontSize:16}}>Filing to Grant months</p>
                                        <input type="number" className="form-control"/>
                                    </div>
	                                <div className="col-3"></div>
	                                <div className="col-3"></div>

                                    <div className="col-6" >
                                        <div style={{margin:10}}>
                                            <div className="row" style={{ borderRadius:10, backgroundColor:'white', height:150}}>
                                                <div className="col-6" style={{height:'100%'}}>
                                                  <div style={{color:'rgb(134,194,63)',display:'flex', flexDirection:'column', justifyContent:'space-between', margin:5,height:'100%'}}>
                                                    <div>
	                                                    <h4 style={{color:'rgb(134,194,63)'}}>With EP validations</h4>
                                                    </div>
                                                    <div>
	                                                    <p>EUR</p>
	                                                    <h2 style={{marginBottom:10, marginTop:5, fontSize:36}}>36K</h2>
                                                    </div>
                                                  </div>

                                                </div>
                                                <div className="col-6">
                                                    <div id="pieChartroot1" style={{margin:5}}>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div style={{margin:10}}>
                                            <div className="row" style={{ borderRadius:10, backgroundColor:'rgb(16, 40, 24)', height:150}}>
                                                <div className="col-6" style={{ color:'white'}}>
                                                  <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', margin:5,height:'100%'}}>
                                                    <h4>With Unitary Patent</h4>
                                                    <p><span style={{backgroundColor:'white', color:'rgb(16, 40, 24)', padding:5, borderRadius:7}}>-20%</span></p>
                                                    <p>EUR</p>
                                                    <h2 style={{marginBottom:10, marginTop:5, fontSize:36}}>36K</h2>
                                                  </div>

                                                </div>
                                                <div className="col-6" id="pieChartroot2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="chartRoot" style={{backgroundColor:'white', borderRadius:10, padding:15}}>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
		);
	}
}

ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
