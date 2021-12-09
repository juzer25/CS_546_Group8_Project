var plan = document.getElementById('plan').innerHTML;
// if (!plan) {
//     return
// }
plan = plan.split(',')
var users = document.getElementById('users').innerHTML;
// if (!users) {
//     return
// }
users = users.split(',')
var data = [{
    x: plan,
    y: users,
    type: 'bar'
}];

Plotly.newPlot('myDiv', data);