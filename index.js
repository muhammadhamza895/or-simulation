google.charts.load('current', {
    packages: ['corechart', 'line']
});


function fact(num) {
    if (num < 0) {
        return -1;
    }
    else if (num == 0) {
        return 1;
    }
    else {
        let result = 1;
        for (var i = num; i > 1; i--) {
            result *= i;
        };
        return result;
    }
};

function cpCalc(arrivalMean) {
    let cplookup = 0;
    let cp = 0;
    let count = 0;
    let cparray = [];
    let cplookuparray = [];


    while (cp < 1) {
        let calc = Math.pow(2.71828, -arrivalMean);
        calc = calc * Math.pow(arrivalMean, count);
        calc = calc / fact(count)


        cplookup = cp;
        cplookuparray[count] = cplookup;


        cp = calc + cplookup;
        cparray[count] = cp
        //    console.log(cp+'\n'+count)
        count = count + 1

    }

    cparray[cparray.length - 1] = 1
    let array = [cparray, cplookuparray]
    return array

}
function normalCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const c1 = 0.31938153;
    const c2 = -0.356563782;
    const c3 = 1.781477937;
    const c4 = -1.821255978;
    const c5 = 1.330274429;
    let probability = 1 - d * (c1 * t + c2 * t * t + c3 * t * t * t + c4 * t * t * t * t + c5 * t * t * t * t * t);

    if (x < 0) {
        probability = 1 - probability;
    }

    return probability;
}

function cpCalcUniform(mean, variance) {
    let cplookup = 0;
    let cp = 0;
    let count = 0;

    let cparray = [];
    let cplookuparray = [];
    cplookuparray[0] = 0

    while (cp < 1) {
        cp = normalCDF(count, mean, variance)


        cparray[count] = cp
        count = count + 1
        cplookup = cparray[count - 1];
        cplookuparray[count] = cplookup;

    }
    let array = [cparray, cplookuparray]
    return array



}

function setSelectedDistributionValue(distribution) {
    const selectElement = document.getElementById('queuing-model');
    selectElement.value = distribution
    Addvalues()
}

function Addvalues(value) {
    // setSelectedDistributionValue(value)
    var queuingModel = document.getElementById("queuing-model").value;
    console.log({ queuingModel })
    var serviceMinInput = document.getElementById('service_min');
    var serviceMaxInput = document.getElementById('service_max');
    var serviceMean = document.getElementById('service-mean');
    var meanArrival = document.getElementById("mean-arrival");
    var avgInterarrival = document.getElementById('avg_interarrival');
    var avgService = document.getElementById('avg_service');
    var varArrival = document.getElementById('var_arrival');
    var varService = document.getElementById('var_service');

    // Hide all elements by default
    serviceMinInput.style.display = "none";
    serviceMaxInput.style.display = "none";
    serviceMean.style.display = "none";
    meanArrival.style.display = "none";
    avgInterarrival.style.display = "none";
    avgService.style.display = "none";
    varArrival.style.display = "none";
    varService.style.display = "none";

    if (queuingModel === "M/G/1" || queuingModel === "M/G/2") {
        serviceMinInput.style.display = "block";
        serviceMaxInput.style.display = "block";
        meanArrival.style.display = "block";
    }

    if (queuingModel === "M/M/2" || queuingModel === "M/M/1") {
        serviceMean.style.display = "block";
        meanArrival.style.display = "block";
    }

    if (queuingModel === "G/G/1" || queuingModel === "G/G/2") {
        avgInterarrival.style.display = "block";
        avgService.style.display = "block";
        varArrival.style.display = "block";
        varService.style.display = "block";
    }
}

const generateGraphs=({
    arrival= [],
    service = [],
    turnAround = []
})=>{
    generateArrivalChart(arrival)
    generateServiceTimeChart(service)
    generateTurnAroundTimeChart(turnAround)
}

const generateArrivalChart = (arrivalTimes) => {
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var yValues = arrivalTimes
        var xValues = Array.from(Array(yValues.length).keys())

        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Customer');
        data.addColumn('number', 'Arrival Time');

        var chartData = xValues.map((x, index) => [x, yValues[index]]);
        data.addRows(chartData);

        var options = {
            title: 'Customer Arrival Time',
            curveType: 'function',
            legend: { position: 'bottom' },
            height: 500,
            chartArea: {
                top: 30,
                left: 40,
                bottom: 50,
                right: 20
            },
            backgroundColor: '#d1f2eb',
            hAxis: {
                title: 'Customer'
            },
            vAxis: {
                title: 'Arrival Time'
            },
        };



        lineChartContainer = document.getElementById('linechart')
        var chart = new google.visualization.LineChart(lineChartContainer);
        chart.draw(data, options);
    }
}

const generateServiceTimeChart = (servieTimes) => {
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var yValues = servieTimes
        var xValues = Array.from(Array(yValues.length).keys())

        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Customer');
        data.addColumn('number', 'Service Time');

        var chartData = xValues.map((x, index) => [x, yValues[index]]);
        data.addRows(chartData);

        var options = {
            title: 'Customer Service Time',
            curveType: 'function',
            legend: { position: 'bottom' },
            height: 500,
            chartArea: {
                top: 30,
                left: 40,
                bottom: 50,
                right: 20
            },
            backgroundColor: '#d1f2eb',
            hAxis: {
                title: 'Customer'
            },
            vAxis: {
                title: 'Service Time'
            },
        };



        lineChartContainer = document.getElementById('linechart-service')
        var chart = new google.visualization.LineChart(lineChartContainer);
        chart.draw(data, options);
    }
}

const generateTurnAroundTimeChart = (turnAroundTimes) => {
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var yValues = turnAroundTimes
        var xValues = Array.from(Array(yValues.length).keys())

        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Customer');
        data.addColumn('number', 'Turn Around Time');

        var chartData = xValues.map((x, index) => [x, yValues[index]]);
        data.addRows(chartData);

        var options = {
            title: 'Customer Turn Around Time',
            curveType: 'function',
            legend: { position: 'bottom' },
            height: 500,
            chartArea: {
                top: 30,
                left: 40,
                bottom: 50,
                right: 20
            },
            backgroundColor: '#d1f2eb',
            hAxis: {
                title: 'Customer'
            },
            vAxis: {
                title: 'Turn Around Time'
            },
        };



        lineChartContainer = document.getElementById('linechart-turnAround')
        var chart = new google.visualization.LineChart(lineChartContainer);
        chart.draw(data, options);
    }
}

// -------------------------------------- M / M / 1 MODEL  ---------------------------------------------- // 
function generate_MM1_Table() {

    var arrivalMean = parseFloat(document.getElementById("mean-arrival").value);
    var queuingModel = document.getElementById("queuing-model").value;
    var serviceMean = parseFloat(document.getElementById("service-mean").value);
    let simulationTime = parseInt(document.getElementById("simulation-time").value)


    let interarrival = []

    let arraymain = cpCalc(arrivalMean)
    cparray = arraymain[0]
    cplookuparray = arraymain[1]
    // For calculating the inter arrival time 

    interarrival[0] = 0
    let totalTime = 0
    let interarrivalIndex = 1

    while (totalTime <= simulationTime) {
        random = Math.random();

        if (random == 0) {
            random = random + 0.1;
        }
        else {
            for (let j = 0; j < cplookuparray.length; j++) {
                if (random > cplookuparray[j] && random < cparray[j]) {
                    interarrival[interarrivalIndex] = j + 1;
                    interarrivalIndex++
                    totalTime += j+1
                }

            }
        }
    }

    interarrival.pop()

    // for (let i = 1; i < cparray.length; i++) {
    //     random = Math.random();

    //     if (random == 0) {
    //         random = random + 0.1;
    //     }
    //     else {
    //         for (let j = 0; j < cplookuparray.length; j++) {
    //             if (random > cplookuparray[j] && random < cparray[j]) {
    //                 interarrival[i] = j + 1;
    //                 totalTime += j+1
    //             }

    //         }
    //     }

    // }

    let currentTime = 0;
    let arrivalarray = [];
    let servicearray = [];
    let starttime = [];
    let endtime = []
    let turnaround = [];
    let waittime = [];
    let service = 0;
    // For calculating the Arrival time and Service Time.
    for (let i = 0; i < interarrival.length; i++) {
        currentTime = currentTime + interarrival[i]
        arrivalarray[i] = currentTime;
        service = exponentialRandom(serviceMean);
        if (Math.floor(service) == 0) {
            servicearray[i] = Math.ceil(service);
        }
        else {
            servicearray[i] = roundOff(service)
        }
    }

    // Now For The Gantt chart 
    let Ganttchart = [[]]
    let check = 0;
    let customer = 0
    let index = 0

    for (let k = 0; index < interarrival.length; k++) {

        if (arrivalarray[index] == check) {
            Ganttchart[k] = [check, check + servicearray[index], index + 1]
            starttime[index] = check;
            endtime[index] = check + servicearray[index]
            check = check + servicearray[index];
            customer = customer + 1;
            index = index + 1;
        }
        else if (arrivalarray[index] > check) {
            Ganttchart[k] = [check, arrivalarray[index], 0]
            check = arrivalarray[index]

        }
        else {
            Ganttchart[k] = [check, check + servicearray[index], index + 1]
            starttime[index] = check;
            endtime[index] = check + servicearray[index]
            check = check + servicearray[index]
            customer = customer + 1;
            index = index + 1;
        }


    }



    for (let i = 0; i < Ganttchart.length; i++) {
        for (let j = 0; j < 3; j++) {
            console.log(Ganttchart[i] + '\n')

        }

    }


    const table = document.getElementById("simulation_table");
    const cp_table = document.getElementById("cp_table");
    let previousEndTime = 0;

    // Clear previous table rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    while (cp_table.rows.length > 1) {
        cp_table.deleteRow(1);
    }

    // CRETAING COMMULATIVE TABLE
    for (let i= 0; i < cparray.length; i++) {
        const cumlookup = cplookuparray[i]
        const cum = cparray[i];
        const avgArrival = i;

        const row = cp_table.insertRow();

        row.insertCell(0).innerText = cumlookup;
        row.insertCell(1).innerText = cum;
        row.insertCell(2).innerText = avgArrival;
    }

    // CREATING DATA TABLE
    for (let i = 0; i < interarrival.length; i++) { // Simulate number of observations time slots
        const seqNumber = i + 1;
        // const cumlookup = cplookuparray[i]
        // const cum = cparray[i];
        // const avgArrival = i;
        const interArrivalRate = interarrival[i]
        currentTime = arrivalarray[i]
        const serviceTime = servicearray[i];
        const startTime = starttime[i]
        const endTime = endtime[i];
        const turnaroundTime = endTime - currentTime;
        turnaround[i] = turnaroundTime
        const waitTime = startTime - currentTime;
        waittime[i] = waitTime
        const responseTime = waitTime + serviceTime;

        // console.log(cum)

        const row = table.insertRow();
        row.insertCell(0).innerText = seqNumber;
        // row.insertCell(1).innerText = cumlookup;
        // row.insertCell(2).innerText = cum;
        // row.insertCell(3).innerText = avgArrival;
        row.insertCell(1).innerText = interArrivalRate;

        row.insertCell(2).innerText = roundOff(currentTime)+ ' min';
        row.insertCell(3).innerText = roundOff(serviceTime);
        row.insertCell(4).innerText = roundOff(startTime);
        row.insertCell(5).innerText = roundOff(endTime);
        row.insertCell(6).innerText = roundOff(turnaroundTime);
        row.insertCell(7).innerText = roundOff(waitTime);
        row.insertCell(8).innerText = roundOff(responseTime);
        row.insertCell(9).innerText = "Server 1";
        previousEndTime = endTime;
    }

    // For Average Wait time and turn Around time .
    let avgwait = 0;
    let countwait = 0;
    let avgturnaround = 0;
    let servicetime = 0
    for (let i = 0; i < interarrival.length; i++) {
        avgturnaround = turnaround[i] + avgturnaround
        servicetime = servicetime + servicearray[i]
        // console.log(avgturnaround)
        if (waittime[i] != 0) {
            avgwait = waittime[i] + avgwait;
            countwait = countwait + 1

        }


    }
    avgturnaround = avgturnaround / interarrival.length;
    if (avgwait == 0) {
        avgwait = 0
    }
    else {
        avgwait = avgwait / (countwait);

    }
    console.log(avgturnaround + "   " + avgwait)


    // Server utilization 
    let idle = 0
    for (let i = 0; i < Ganttchart.length; i++) {
        if (Ganttchart[i][2] == 0) {
            idle = idle + (Ganttchart[i][1] - Ganttchart[i][0])
        }

    }

    let serverutil = idle / check;
    console.log("serverutil" + serverutil)
    document.getElementsByClassName("cards-container")[0].style.display = 'grid';

    // const serverUtilization = document.getElementById("server-utlization");
    const avgTA = document.getElementById("avg-turnaround");
    const avgWT = document.getElementById("avg-wait");
    const avgRT = document.getElementById("avg-response");

    // serverUtilization.innerHTML = serverutil.toFixed(2) + '%';
    avgTA.innerHTML = avgturnaround.toFixed(2) + ' min';
    avgWT.innerHTML = avgwait.toFixed(2)+ ' min';


    function exponentialRandom(mean) {
        return -Math.log(1 - Math.random()) * mean;
    }

    function roundOff(value) {
        return Math.round(value);
    }

    generateGraphs({arrival : arrivalarray, service: servicearray, turnAround: turnaround})
    // generateArrivalChart(arrivalarray)
    // generateServiceTimeChart(servicearray)
    // generateTurnAroundTimeChart(turnaround)
}

// ------------------------------------ M / M / 2 MODEL  ---------------------------------------------- //

function generate_MM2_Table() {
    const arrivalMean = parseFloat(document.getElementById('mean-arrival').value);
    const serviceMean = parseFloat(document.getElementById('service-mean').value);
    let simulationTime = parseInt(document.getElementById("simulation-time").value)

    let cparray = []
    let cplookuparray = []
    let interarrival = []

    arraymain = cpCalc(arrivalMean);
    cparray = arraymain[0]
    cplookuparray = arraymain[1]

    // For calculating the inter arrival time 

    interarrival[0] = 0
    let totalTime = 0
    let interarrivalIndex = 1

    while (totalTime <= simulationTime) {
        random = Math.random();

        if (random == 0) {
            random = random + 0.1;
        }
        else {
            for (let j = 0; j < cplookuparray.length; j++) {
                if (random > cplookuparray[j] && random < cparray[j]) {
                    interarrival[interarrivalIndex] = j + 1;
                    interarrivalIndex++
                    totalTime += j+1
                }

            }
        }
    }

    interarrival.pop()

    // for (let i = 1; i < cparray.length; i++) {
    //     random = Math.random();

    //     if (random == 0) {
    //         random = random + 0.1;
    //     }
    //     else {
    //         for (let j = 0; j < cplookuparray.length; j++) {
    //             if (random > cplookuparray[j] && random < cparray[j]) {
    //                 interarrival[i] = j + 1;
    //             }

    //         }
    //     }

    // }
    let currentTime = 0;
    let arrivalarray = [];
    let servicearray = [];
    let starttime = [];
    let endtime = []
    let turnaround = [];
    let waittime = [];
    let service = 0;
    // For calculating the Arrival time and Service Time.
    for (let i = 0; i < interarrival.length; i++) {
        currentTime = currentTime + interarrival[i]
        arrivalarray[i] = currentTime;
        service = exponentialRandom(serviceMean);
        if (Math.floor(service) == 0) {
            servicearray[i] = Math.ceil(service);
        }
        else {
            servicearray[i] = roundOff(service)
        }
    }


    const table = document.getElementById('simulation_table');
    const cp_table = document.getElementById("cp_table");
    // let currentTime = 0;
    let previousEndTimes = [0, 0];
    let server = []


    // Clear previous table rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    while (cp_table.rows.length > 1) {
        cp_table.deleteRow(1);
    }

    // CRETAING COMMULATIVE TABLE
    for (let i= 0; i < cparray.length; i++) {
        const cumlookup = cplookuparray[i]
        const cum = cparray[i];
        const avgArrival = i;

        const row = cp_table.insertRow();

        row.insertCell(0).innerText = cumlookup;
        row.insertCell(1).innerText = cum;
        row.insertCell(2).innerText = avgArrival;
    }

    for (let i = 0; i < interarrival.length; i++) { // Simulate number of observations time slots


        const seqNumber = i + 1;
        // const cumlookup = cplookuparray[i]
        // const cum = cparray[i];
        // const avgArrival = i;
        const interArrivalRate = interarrival[i]
        currentTime = arrivalarray[i]
        serviceTime = servicearray[i];


        // const startTimes = [
        //     Math.max(currentTime, Math.max(previousEndTimes[0], previousEndTimes[1])), currentTime
        // ];

        const startTimes = [
            Math.max(currentTime, previousEndTimes[0]) , Math.max(currentTime, previousEndTimes[1])
        ]


        // Find the server with the minimum end time
        let serverIndex = 0;
        if (previousEndTimes[0] <= currentTime && previousEndTimes[1] <= currentTime) {
            serverIndex = 0; // Prefer server 1
        } else if (previousEndTimes[1] < previousEndTimes[0]) {
            serverIndex = 1; // Use server 2 if it has a lower end time
        }

        const endTime = startTimes[serverIndex] + serviceTime;
        endtime[i] = endTime
        const turnaroundTime = endTime > currentTime ? endTime - currentTime : 0;
        turnaround[i] = turnaroundTime
        const waitTime = startTimes[serverIndex] > currentTime ? startTimes[serverIndex] - currentTime : 0;
        waittime[i] = waitTime
        const responseTime = waitTime + serviceTime;


        const row = table.insertRow();
        row.insertCell(0).innerText = seqNumber;
        // row.insertCell(1).innerText = cumlookup;
        // row.insertCell(2).innerText = cum;
        // row.insertCell(3).innerText = avgArrival;
        row.insertCell(1).innerText = interArrivalRate;

        row.insertCell(2).innerText = roundOff(currentTime) + ' min';
        row.insertCell(3).innerText = roundOff(serviceTime);
        row.insertCell(4).innerText = roundOff(startTimes[serverIndex])
        starttime[i] = roundOff(startTimes[serverIndex])
        row.insertCell(5).innerText = roundOff(endTime);
        row.insertCell(6).innerText = roundOff(turnaroundTime);
        row.insertCell(7).innerText = roundOff(waitTime);
        row.insertCell(8).innerText = roundOff(responseTime);
        row.insertCell(9).innerText = "Server " + (serverIndex + 1);
        server[i] = serverIndex + 1;
        previousEndTimes[serverIndex] = endTime;
    }
    // For Average Wait time and turn Around time .
    let avgwait = 0;
    let countwait = 0;
    let avgturnaround = 0;
    let servicetime = 0
    for (let i = 0; i < interarrival.length; i++) {
        avgturnaround = turnaround[i] + avgturnaround
        servicetime = servicetime + servicearray[i]
        // console.log(endtime[i])
        if (waittime[i] != 0) {
            avgwait = waittime[i] + avgwait;
            countwait = countwait + 1

        }


    }
    avgturnaround = avgturnaround / interarrival.length;
    if (avgwait == 0) {
        avgwait = 0
    }
    else {
        avgwait = avgwait / (countwait);

    }
    console.log(avgturnaround + "   " + avgwait)


    let serverutil1 = 0;
    let serverutil2 = 0;
    let serverutilization1 = [];
    let serverutilization2 = [];
    for (let i = 0; i < server.length; i++) {
        if (server[i] == 1) {
            serverutilization1.push(i);
        }
        else {
            serverutilization2.push(i);
        }
    }
    let idle = 0
    for (let k = 0; k < serverutilization1.length - 1; k++) {
        // console.log(starttime[serverutilization1[k+1]] + "    " +  endtime[serverutilization1[k]] )
        if (starttime[serverutilization1[k + 1]] > endtime[serverutilization1[k]])
            idle = idle + (starttime[serverutilization1[k + 1]] - endtime[serverutilization1[k]])

    }
    idle = previousEndTimes[0] - idle
    serverutil1 = idle / previousEndTimes[0]
    console.log("Server utilized 1 " + serverutil1)


    idle = 0
    for (let k = 0; k < serverutilization2.length - 1; k++) {
        // console.log(starttime[serverutilization2[k+1]] + "    " +  endtime[serverutilization2[k]] )
        if (starttime[serverutilization2[k + 1]] > endtime[serverutilization2[k]])
            idle = idle + (starttime[serverutilization2[k + 1]] - endtime[serverutilization2[k]])

    }
    idle = previousEndTimes[0] - idle
    serverutil2 = idle / previousEndTimes[0]
    console.log("Server utilized  2  " + serverutil2)

    // console.log(serverutilization)

    document.getElementsByClassName("cards-container")[0].style.display = 'grid';
    // const serverUtilization = document.getElementById("server-utlization");
    const avgTA = document.getElementById("avg-turnaround");
    const avgWT = document.getElementById("avg-wait");
    const avgRT = document.getElementById("avg-response");

    // serverUtilization.innerHTML = `<span><b>Server utilization 1 </b> : ${serverutil1}</span> &nbsp <span><b>Server utilization 2 </b> : ${serverutil2}</span>`;
    avgTA.innerHTML = avgturnaround.toFixed(2)+ ' min';
    avgWT.innerHTML = avgwait.toFixed(2)+ ' min';


    function exponentialRandom(mean) {
        let value = -Math.log(1 - Math.random()) * mean;
        return value >= 0 ? value : 0;
    }

    function roundOff(value) {
        return Math.round(value);
    }

    generateGraphs({arrival : arrivalarray, service: servicearray, turnAround: turnaround})
}

// ------------------------------------ M / M / 3 MODEL  ---------------------------------------------- //

const generate_MM3_Table=()=>{
    const arrivalMean = parseFloat(document.getElementById('mean-arrival').value);
    const serviceMean = parseFloat(document.getElementById('service-mean').value);
    let simulationTime = parseInt(document.getElementById("simulation-time").value)

    let cparray = []
    let cplookuparray = []
    let interarrival = []

    arraymain = cpCalc(arrivalMean);
    cparray = arraymain[0]
    cplookuparray = arraymain[1]

    // For calculating the inter arrival time 

    interarrival[0] = 0
    let totalTime = 0
    let interarrivalIndex = 1

    while (totalTime <= simulationTime) {
        random = Math.random();

        if (random == 0) {
            random = random + 0.1;
        }
        else {
            for (let j = 0; j < cplookuparray.length; j++) {
                if (random > cplookuparray[j] && random < cparray[j]) {
                    interarrival[interarrivalIndex] = j + 1;
                    interarrivalIndex++
                    totalTime += j+1
                }

            }
        }
    }

    interarrival.pop()

    let currentTime = 0;
    let arrivalarray = [];
    let servicearray = [];
    let starttime = [];
    let endtime = []
    let turnaround = [];
    let waittime = [];
    let service = 0;
    // For calculating the Arrival time and Service Time.
    for (let i = 0; i < interarrival.length; i++) {
        currentTime = currentTime + interarrival[i]
        arrivalarray[i] = currentTime;
        service = exponentialRandom(serviceMean);
        if (Math.floor(service) == 0) {
            servicearray[i] = Math.ceil(service);
        }
        else {
            servicearray[i] = roundOff(service)
        }
    }


    const table = document.getElementById('simulation_table');
    const cp_table = document.getElementById("cp_table");
    // let currentTime = 0;
    let previousEndTimes = [0, 0, 0];
    let server = []


    // Clear previous table rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    while (cp_table.rows.length > 1) {
        cp_table.deleteRow(1);
    }

    // CRETAING COMMULATIVE TABLE
    for (let i= 0; i < cparray.length; i++) {
        const cumlookup = cplookuparray[i]
        const cum = cparray[i];
        const avgArrival = i;

        const row = cp_table.insertRow();

        row.insertCell(0).innerText = cumlookup;
        row.insertCell(1).innerText = cum;
        row.insertCell(2).innerText = avgArrival;
    }

    for (let i = 0; i < interarrival.length; i++) { // Simulate number of observations time slots
        const seqNumber = i + 1;
        const interArrivalRate = interarrival[i]
        currentTime = arrivalarray[i]
        serviceTime = servicearray[i];
        const startTimes = [
            Math.max(currentTime, previousEndTimes[0]), 
            Math.max(currentTime, previousEndTimes[1]),
            Math.max(currentTime, previousEndTimes[2])
        ]


        // Find the server with the minimum end time
        let serverIndex = 0;
        if (previousEndTimes[0] <= currentTime) {
            serverIndex = 0; 
        } else if (previousEndTimes[1] <= currentTime) {
            serverIndex = 1; 
        } else if (previousEndTimes[2] <= currentTime) {
            serverIndex = 2; 
        } else {
            const index = previousEndTimes.indexOf(Math.min(...previousEndTimes))
            serverIndex = index
        }

        const endTime = startTimes[serverIndex] + serviceTime;
        endtime[i] = endTime
        const turnaroundTime = endTime > currentTime ? endTime - currentTime : 0;
        turnaround[i] = turnaroundTime
        const waitTime = startTimes[serverIndex] > currentTime ? startTimes[serverIndex] - currentTime : 0;
        waittime[i] = waitTime
        const responseTime = waitTime + serviceTime;


        const row = table.insertRow();
        row.insertCell(0).innerText = seqNumber;
        // row.insertCell(1).innerText = cumlookup;
        // row.insertCell(2).innerText = cum;
        // row.insertCell(3).innerText = avgArrival;
        row.insertCell(1).innerText = interArrivalRate;

        row.insertCell(2).innerText = roundOff(currentTime) + ' min';
        row.insertCell(3).innerText = roundOff(serviceTime);
        row.insertCell(4).innerText = roundOff(startTimes[serverIndex])
        starttime[i] = roundOff(startTimes[serverIndex])
        row.insertCell(5).innerText = roundOff(endTime);
        row.insertCell(6).innerText = roundOff(turnaroundTime);
        row.insertCell(7).innerText = roundOff(waitTime);
        row.insertCell(8).innerText = roundOff(responseTime);
        row.insertCell(9).innerText = "Server " + (serverIndex + 1);
        server[i] = serverIndex + 1;
        previousEndTimes[serverIndex] = endTime;
    }

    // For Average Wait time and turn Around time .
    let avgwait = 0;
    let countwait = 0;
    let avgturnaround = 0;
    let servicetime = 0
    for (let i = 0; i < interarrival.length; i++) {
        avgturnaround = turnaround[i] + avgturnaround
        servicetime = servicetime + servicearray[i]
        // console.log(endtime[i])
        if (waittime[i] != 0) {
            avgwait = waittime[i] + avgwait;
            countwait = countwait + 1

        }


    }
    avgturnaround = avgturnaround / interarrival.length;
    if (avgwait == 0) {
        avgwait = 0
    }
    else {
        avgwait = avgwait / (countwait);

    }
    console.log(avgturnaround + "   " + avgwait)

    document.getElementsByClassName("cards-container")[0].style.display = 'grid';
    const avgTA = document.getElementById("avg-turnaround");
    const avgWT = document.getElementById("avg-wait");

    avgTA.innerHTML = avgturnaround.toFixed(2)+ ' min';
    avgWT.innerHTML = avgwait.toFixed(2)+ ' min';

    function exponentialRandom(mean) {
        let value = -Math.log(1 - Math.random()) * mean;
        return value >= 0 ? value : 0;
    }

    function roundOff(value) {
        return Math.round(value);
    }

    generateGraphs({arrival : arrivalarray, service: servicearray, turnAround: turnaround})
}

// ------------------------------------ M / M / 4 MODEL  ---------------------------------------------- //

const generate_MM4_Table=()=>{
    const arrivalMean = parseFloat(document.getElementById('mean-arrival').value);
    const serviceMean = parseFloat(document.getElementById('service-mean').value);
    let simulationTime = parseInt(document.getElementById("simulation-time").value)

    let cparray = []
    let cplookuparray = []
    let interarrival = []

    arraymain = cpCalc(arrivalMean);
    cparray = arraymain[0]
    cplookuparray = arraymain[1]

    // For calculating the inter arrival time 

    interarrival[0] = 0
    let totalTime = 0
    let interarrivalIndex = 1

    while (totalTime <= simulationTime) {
        random = Math.random();

        if (random == 0) {
            random = random + 0.1;
        }
        else {
            for (let j = 0; j < cplookuparray.length; j++) {
                if (random > cplookuparray[j] && random < cparray[j]) {
                    interarrival[interarrivalIndex] = j + 1;
                    interarrivalIndex++
                    totalTime += j+1
                }

            }
        }
    }

    interarrival.pop()

    let currentTime = 0;
    let arrivalarray = [];
    let servicearray = [];
    let starttime = [];
    let endtime = []
    let turnaround = [];
    let waittime = [];
    let service = 0;
    // For calculating the Arrival time and Service Time.
    for (let i = 0; i < interarrival.length; i++) {
        currentTime = currentTime + interarrival[i]
        arrivalarray[i] = currentTime;
        service = exponentialRandom(serviceMean);
        if (Math.floor(service) == 0) {
            servicearray[i] = Math.ceil(service);
        }
        else {
            servicearray[i] = roundOff(service)
        }
    }


    const table = document.getElementById('simulation_table');
    const cp_table = document.getElementById("cp_table");
    // let currentTime = 0;
    let previousEndTimes = [0, 0, 0, 0];
    let server = []


    // Clear previous table rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    while (cp_table.rows.length > 1) {
        cp_table.deleteRow(1);
    }

    // CRETAING COMMULATIVE TABLE
    for (let i= 0; i < cparray.length; i++) {
        const cumlookup = cplookuparray[i]
        const cum = cparray[i];
        const avgArrival = i;

        const row = cp_table.insertRow();

        row.insertCell(0).innerText = cumlookup;
        row.insertCell(1).innerText = cum;
        row.insertCell(2).innerText = avgArrival;
    }

    for (let i = 0; i < interarrival.length; i++) { // Simulate number of observations time slots
        const seqNumber = i + 1;
        const interArrivalRate = interarrival[i]
        currentTime = arrivalarray[i]
        serviceTime = servicearray[i];
        const startTimes = [
            Math.max(currentTime, previousEndTimes[0]), 
            Math.max(currentTime, previousEndTimes[1]),
            Math.max(currentTime, previousEndTimes[2]),
            Math.max(currentTime, previousEndTimes[3])
        ]


        // Find the server with the minimum end time
        let serverIndex = 0;
        if (previousEndTimes[0] <= currentTime) {
            serverIndex = 0; 
        } else if (previousEndTimes[1] <= currentTime) {
            serverIndex = 1; 
        } else if (previousEndTimes[2] <= currentTime) {
            serverIndex = 2; 
        } else if (previousEndTimes[3] <= currentTime) {
            serverIndex = 3; 
        } else {
            const index = previousEndTimes.indexOf(Math.min(...previousEndTimes))
            serverIndex = index
        }

        const endTime = startTimes[serverIndex] + serviceTime;
        endtime[i] = endTime
        const turnaroundTime = endTime > currentTime ? endTime - currentTime : 0;
        turnaround[i] = turnaroundTime
        const waitTime = startTimes[serverIndex] > currentTime ? startTimes[serverIndex] - currentTime : 0;
        waittime[i] = waitTime
        const responseTime = waitTime + serviceTime;


        const row = table.insertRow();
        row.insertCell(0).innerText = seqNumber;
        // row.insertCell(1).innerText = cumlookup;
        // row.insertCell(2).innerText = cum;
        // row.insertCell(3).innerText = avgArrival;
        row.insertCell(1).innerText = interArrivalRate;

        row.insertCell(2).innerText = roundOff(currentTime) + ' min';
        row.insertCell(3).innerText = roundOff(serviceTime);
        row.insertCell(4).innerText = roundOff(startTimes[serverIndex])
        starttime[i] = roundOff(startTimes[serverIndex])
        row.insertCell(5).innerText = roundOff(endTime);
        row.insertCell(6).innerText = roundOff(turnaroundTime);
        row.insertCell(7).innerText = roundOff(waitTime);
        row.insertCell(8).innerText = roundOff(responseTime);
        row.insertCell(9).innerText = "Server " + (serverIndex + 1);
        server[i] = serverIndex + 1;
        previousEndTimes[serverIndex] = endTime;
    }

    // For Average Wait time and turn Around time .
    let avgwait = 0;
    let countwait = 0;
    let avgturnaround = 0;
    let servicetime = 0
    for (let i = 0; i < interarrival.length; i++) {
        avgturnaround = turnaround[i] + avgturnaround
        servicetime = servicetime + servicearray[i]
        // console.log(endtime[i])
        if (waittime[i] != 0) {
            avgwait = waittime[i] + avgwait;
            countwait = countwait + 1

        }


    }
    avgturnaround = avgturnaround / interarrival.length;
    if (avgwait == 0) {
        avgwait = 0
    }
    else {
        avgwait = avgwait / (countwait);

    }
    console.log(avgturnaround + "   " + avgwait)

    document.getElementsByClassName("cards-container")[0].style.display = 'grid';
    const avgTA = document.getElementById("avg-turnaround");
    const avgWT = document.getElementById("avg-wait");

    avgTA.innerHTML = avgturnaround.toFixed(2)+ ' min';
    avgWT.innerHTML = avgwait.toFixed(2)+ ' min';

    function exponentialRandom(mean) {
        let value = -Math.log(1 - Math.random()) * mean;
        return value >= 0 ? value : 0;
    }

    function roundOff(value) {
        return Math.round(value);
    }

    generateGraphs({arrival : arrivalarray, service: servicearray, turnAround: turnaround})
}

// ------------------------------ Calculate Button  ------------------------------------------------ // 
const showToast=(msg = '')=>{
    Toastify({
        text: msg || "Invalid Error Occured",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

const errorFunctionsObj = {
    'missingInputs': () => showToast('Please Fill All The Fields'),
    'invalidInputs': () => showToast('Invalid Inputs'),
};

const errorFunctions = (errorType) => {
    const func = errorFunctionsObj[errorType];
    if (func) func();
    else showToast();
};

const simulationFunctionsObj = {
    "M/M/1" : ()=> generate_MM1_Table(),
    "M/M/2" : ()=> generate_MM2_Table(),
    "M/M/3" : ()=> generate_MM3_Table(),
    "M/M/4" : ()=> generate_MM4_Table()
}

const sumulationFuntions =(simulationType)=>{
    const func = simulationFunctionsObj[simulationType]
    if (func) func();
    else showToast();
}


function Calculate() {
    var queuingModel = document.getElementById("queuing-model").value;
    const arrivalMean = parseFloat(document.getElementById('mean-arrival').value);
    const serviceMean = parseFloat(document.getElementById('service-mean').value);
    let simulationTime = parseInt(document.getElementById("simulation-time").value)

    const missingInputsCondition = queuingModel == 'None' || !arrivalMean || !serviceMean || !simulationTime ? 'missingInputs' : ''
    const invalidInputCondition = arrivalMean < 0 || serviceMean < 0 || simulationTime < 0 ? 'invalidInputs' : ''
    const errorCondition = missingInputsCondition || invalidInputCondition

    if (errorCondition) {
        errorFunctions(errorCondition)
        return
    }

    sumulationFuntions(queuingModel)
}