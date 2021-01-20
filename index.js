function createEmployeeRecord(ele){
    return {
        firstName: ele[0],
        familyName: ele[1],
        title: ele[2],
        payPerHour: ele[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateStamp){
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employee
}
function createTimeOutEvent(employee, dateStamp){
    let date = dateStamp.split(" ")[0]
    let hour = dateStamp.split(" ")[1]
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, date){
    let workDate = date.split(" ")[0]
    let clockIn = employee.timeInEvents.find(e => e.date === workDate)
    let clockOut = employee.timeOutEvents.find(e => e.date === workDate)
    return (clockOut.hour - clockIn.hour) / 100
}   

function wagesEarnedOnDate(employee, date){
    let hoursWorked = hoursWorkedOnDate(employee,date)
    return (employee.payPerHour * hoursWorked)
}

function allWagesFor(employee){
    let allDaysWorked = employee.timeInEvents.map(function(e){
        return wagesEarnedOnDate(employee, e.date)
    })
    return allDaysWorked.reduce(function(total, pay){
        return total += pay
    }, 0)
}

function findEmployeeByFirstName(allEmployees, firstName){
    return allEmployees.find(e => e.firstName === firstName)
}

function calculatePayroll(employees){
    let totalPayroll = employees.map(allWagesFor)
    return totalPayroll.reduce(function(total, pay){
        return total += pay
    }, 0)
}

