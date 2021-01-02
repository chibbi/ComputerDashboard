function fetchData() {
    fetch("http://" + window.location.host + "/api", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
    }).then(function(response) {
        response.text().then(function(text) {
            console.log(text);
        });
    });
}

function sendCmd(cmd) {
    fetch("http://" + window.location.host + "/api", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify({
            "cmd": cmd
        }) // body data type must match "Content-Type" header
    });
}

setInterval(fetchData, 10000);