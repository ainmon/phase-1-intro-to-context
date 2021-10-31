// Your code here
function createEmployeeRecord(array){
    let newObj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newObj;
}

function createEmployeeRecords(array){
    return array.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date
    })

    return employee;
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date
    })

    return employee;
}

let hoursWorkedOnDate = function(employee, dateStamp){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === dateStamp
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateStamp){
    let rawWage = hoursWorkedOnDate(employee, dateStamp)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}



let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
  }