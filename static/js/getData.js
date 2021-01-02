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
            var stats = JSON.parse(text);
            for (const obj in stats) {
                var element = stats[obj];
                var html = document.getElementById(obj);
                html.innerHTML = "";
                switch (obj) {
                    case "ip_addresses": // TODO: Test with multiple ips (should work)
                        for (const property in element) {
                            var oen = element[property];
                            var newLi = document.createElement('li');
                            appendTo(newLi, JSON.stringify(oen["interface"]) + " = ");
                            appendTo(newLi, JSON.stringify(oen["ip"]));
                            html.appendChild(newLi);
                        }
                        break;
                    case "cpu_temp": // finished i think
                        for (const property in element) {
                            var oen = element[property];
                            var newLi = document.createElement('li');
                            newLi.id = property;
                            appendTo(newLi, "CPU-Temp = ");
                            appendTo(newLi, JSON.stringify(oen));
                            html.appendChild(newLi);
                            html.style.color = "#000000";
                            var styleElem = document.head.appendChild(document.createElement("style"));
                            styleElem.innerHTML = "#" + property + ":after {width: " + oen.replace("°C", "") + "%;}";
                        }
                        break;
                    case "current_ram": // also finished i think
                        for (const property in element) {
                            var oen = element[property];
                            var newLi = document.createElement('li');
                            appendTo(newLi, JSON.stringify(property) + " = ");
                            appendTo(newLi, JSON.stringify(oen));
                            newLi.id = property;
                            html.appendChild(newLi);
                            html.style.color = "#000000";
                            if (property == "used") {
                                var styleElem = document.head.appendChild(document.createElement("style"));
                                var used = element["used"] / (element["total"] / 100);
                                styleElem.innerHTML = "#" + property + ":after {width: " + used + "%;}";
                            }
                        }
                        break;
                    case "general_info": // also finished i think
                        for (const property in element) {
                            var oen = element[property];
                            if (property == "Server Time") {
                                var newLi = document.createElement('li');
                                appendTo(newLi, JSON.stringify(property) + " = ");
                                appendTo(newLi, JSON.stringify(oen));
                                newLi.id = property;
                                html.appendChild(newLi);
                            } else if (property == "Uptime") {
                                var newLi = document.createElement('li');
                                appendTo(newLi, JSON.stringify(property) + " = ");
                                appendTo(newLi, JSON.stringify(oen));
                                newLi.id = property;
                                html.appendChild(newLi);
                            }
                        }
                        break;
                    case "cpu_intensive_processes":
                        // TODO: DO THIS IN TABLE FORM and add button for more info?
                        var newLi = document.createElement('li');
                        newLi.style.fontSize = "25px";
                        newLi.style.padding = "7px";
                        appendTo(newLi, "cpu intensive processes");
                        html.appendChild(newLi);
                        for (const property in element) {
                            var eon = element[property];
                            var newLi = document.createElement('li');
                            for (const interior in eon) {
                                // OPTIONS:: pid ; user ; cpu% ; rss ; vsz ; cmd
                                if (interior == "cpu%") {
                                    appendTo(newLi, JSON.stringify(interior) + "=");
                                    appendTo(newLi, JSON.stringify(eon[interior]) + " | ");
                                } else if (interior == "rss") {
                                    appendTo(newLi, JSON.stringify(interior) + "=");
                                    appendTo(newLi, JSON.stringify(eon[interior]) + "KB | ");
                                } else if (interior == "vsz") {
                                    appendTo(newLi, JSON.stringify(interior) + "=");
                                    appendTo(newLi, JSON.stringify(eon[interior]) + "KB | ");
                                } else if (interior == "cmd") {
                                    appendTo(newLi, JSON.stringify(interior) + "=");
                                    appendTo(newLi, JSON.stringify(eon[interior]));
                                }
                            }
                            html.appendChild(newLi);
                        }
                        break;
                    case "ram_intensive_processes":
                        // TODO: DO THIS IN TABLE FORM and add button for more info?
                        var newLi = document.createElement('li');
                        newLi.style.fontSize = "25px";
                        newLi.style.padding = "7px";
                        appendTo(newLi, "ram intensive processes");
                        html.appendChild(newLi);
                        for (const property in element) {
                            var eon = element[property];
                            var newLi = document.createElement('li');
                            for (const interior in eon) {
                                // OPTIONS:: pid ; user ; mem% ; rss ; vsz ; cmd
                                if (interior == "mem%") {
                                    appendTo(newLi, JSON.stringify(interior) + "=");
                                    appendTo(newLi, JSON.stringify(eon[interior]) + " | ");
                                } else if (interior == "rss") {
                                    appendTo(newLi, JSON.stringify(interior) + "=");
                                    appendTo(newLi, JSON.stringify(eon[interior]) + "KB | ");
                                } else if (interior == "vsz") {
                                    appendTo(newLi, JSON.stringify(interior) + "=");
                                    appendTo(newLi, JSON.stringify(eon[interior]) + "KB | ");
                                } else if (interior == "cmd") {
                                    appendTo(newLi, JSON.stringify(interior) + "=");
                                    appendTo(newLi, JSON.stringify(eon[interior]));
                                }
                            }
                            html.appendChild(newLi);
                        }
                        break;
                    default:
                        for (const property in element) {
                            var newLi = document.createElement('li');
                            newLi.appendChild(document.createTextNode(JSON.stringify(property) + " = "));
                            newLi.appendChild(document.createTextNode(JSON.stringify(element[property])));
                            html.appendChild(newLi);
                        }
                        break;
                }
            }
        });
    });
}

function appendTo(Thing, newstuff) {
    newstuff = newstuff.replaceAll('"', '');
    Thing.appendChild(document.createTextNode(JSON.stringify(newstuff).replaceAll('"', '')));
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

// fetches a ruffly 5KB sized File every second
// setInterval(fetchData, 1000);
fetchData();