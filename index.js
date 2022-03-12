// 周星星：https://randomuser.me/api/portraits/men/3.jpg
// 王進：https://randomuser.me/api/portraits/men/19.jpg
// 唐伯虎：https://randomuser.me/api/portraits/men/4.jpg
// 光頭王：https://randomuser.me/api/portraits/men/5.jpg
const images = ['https://randomuser.me/api/portraits/men/3.jpg', 'https://randomuser.me/api/portraits/men/19.jpg', 'https://randomuser.me/api/portraits/men/4.jpg', 'https://randomuser.me/api/portraits/men/5.jpg'];

let data;
let person1 = 0;
let person2 = 0;
let person3 = 0;
let person4 = 0;

getData();

function getData() {
    axios({
        method: 'get',
        url: 'https://hexschool.github.io/escape-vote/vote.json'
    })
    .then(res => {
        data = res.data
        data.forEach(area => person1 += area.周星星);
        data.forEach(area => person2 += area.王進);
        data.forEach(area => person3 += area.唐伯虎);
        data.forEach(area => person4 += area.光頭王);
        renderChart();
    })
    .catch(err => console.log(err));
}

function renderChart() {
    new Chart(document.getElementById("myChart"), {
        type: "bar",
        plugins: [{
            afterDraw: chart => {      
            var ctx = chart.chart.ctx; 
            var xAxis = chart.scales['x-axis-0'];
            var yAxis = chart.scales['y-axis-0'];
            xAxis.ticks.forEach((value, index) => {  
                var x = xAxis.getPixelForTick(index);      
                var image = new Image();
                image.src = images[index],
                ctx.drawImage(image, x - 65, yAxis.bottom + 20);
            });      
            }
        }],
        data: {
            labels: ['周星星', '王進', '唐伯虎', '光頭王'],
            datasets: [{
            label: '大港市議員競選投票結果',
            data:  [ person1, person2, person3, person4 ],
            backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            legend: {
            display: true
            },
            scales: {
                yAxes: [{ 
                    ticks: {
                    beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                    padding: 140
                    }   
                }],
            }
        }
    });
}