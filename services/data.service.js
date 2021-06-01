let current_user;
let AccountDetails = {
    1000: { acno: 1000, username: "userone", password: "userone", balance: 50000 },
    1001: { acno: 1001, username: "usertwo", password: "usertwo", balance: 5000 },
    1002: { acno: 1002, username: "userthree", password: "userthree", balance: 10000 },
    1003: { acno: 1003, username: "userfour", password: "userfour", balance: 6000 }
}
const register = (uname, acno, pswd) => {
    let user = AccountDetails
    if (acno in user) {
        return {
            statusCode: 422,
            status: false,
            message: "User Exists please login"
        }
    }
    else {
        user[acno] = {
            acno,
            username: uname,
            password: pswd,
            balance: 0
        }
        return {
            statusCode: 200,
            status: true,
            message: "Successfully Registered"
        }
    }
}
const login = (req, acno, pswd) => {
    let users = AccountDetails
    if (acno in users) {
        if (pswd == users[acno]["password"]) {
            req.session.current_user = users[acno]
            return {
                statusCode: 200,
                status: true,
                message: "succcessfull login"
            }
        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: "incorrect password"
            }
        }
    }
    else {
        return {
            statusCode: 422,
            status: false,
            message: "Invalid Account"
        }
    }
}
const deposit = (acno, pswd, amt) => {
    var amount = parseInt(amt)
    let users = AccountDetails
    if (acno in users) {
        if (pswd == users[acno]["password"]) {
            users[acno]["balance"] += amount
            return {
                statusCode: 200,
                status: true,
                balance: users[acno]["balance"],
                message: amount + "credited and new balance is " + users[acno]["balance"]
            }
        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: "Incorrect Password"
            }
        }
    }
    else {
        return {
            statusCode: 422,
            status: false,
            message: "Invalid Account"
        }
    }

}
const withdraw = (acno, pswd, amount) => {
    var Wamt = parseInt(amount)
    let users = AccountDetails
    if (acno in users) {
        if (pswd == users[acno]["password"]) {
            if (users[acno]["balance"] > Wamt) {
                users[acno]["balance"] -= Wamt
                return {
                    statusCode: 200,
                    status: true,
                    balance: users[acno]["balance"],
                    message: Wamt + "debited and new balance is " + users[acno]["balance"]
                }
            }
            else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "Insufficient Balance"
                }
            }
        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: "Incorrect Password"
            }
        }
    }
    else {
        return {
            statusCode: 422,
            status: false,
            message: "Invalid Account"
        }
    }
}


module.exports = {
    register,
    login,
    deposit,
    withdraw
}