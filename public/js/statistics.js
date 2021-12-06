var plan = document.getElementById('plan').innerHTML;
plan = plan.split(',')
var users = document.getElementById('users').innerHTML; 
users = users.split(',')
var data = [
    {
      x: plan,
      y: users,
      type: 'bar'
    }
  ];
  
  Plotly.newPlot('myDiv', data);