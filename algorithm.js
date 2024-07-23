/**
 * Data Collection
 */
var urlParams = new URLSearchParams(window.location.search);
var formData = urlParams.get('data');
var resultsContainer = document.getElementById('results');

var userIdElement = document.getElementById('userId');
var userTimestampElement = document.getElementById('userTimestamp');

// Helper function to display form data
function displayFormData(formData, name = '', timestamp = '') {
    if (name) {
        userIdElement.textContent = name;
    }
    if (timestamp) {
        userTimestampElement.textContent = new Date(timestamp).toLocaleString();
    }

    formData.forEach(function(entry) {
        var resultHtml = '<div class="mb-3">';
        resultHtml += '<strong>Question Number:</strong> ' + entry.number + '<br>';
        resultHtml += '<strong>Answer:</strong> ' + entry.value + '<br>';
        resultHtml += '</div>';
        resultsContainer.innerHTML += resultHtml;
    });
}

var ID, Timestamp;

// Parse JSON data from URL and display results
if (formData) {
    try {
        var parsedData = JSON.parse(decodeURIComponent(formData));
        displayFormData(parsedData);
    } catch (error) {
        console.error("Failed to parse data from URL:", error);
        resultsContainer.innerHTML = '<p>Invalid data provided in URL.</p>';
    }
} else {
    // Fetch the latest form data from localStorage
    var latestUserData = null;
    var latestTimestamp = 0;
    var keyOfLatestData = null;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let parts = key.split('-_');
        if (parts.length === 2) {
            let timestamp = Date.parse(parts[1]);
            if (timestamp > latestTimestamp) {
                let userDataString = localStorage.getItem(key);
                if (userDataString) {
                    var userData = JSON.parse(userDataString);
                    latestUserData = userData;
                    latestTimestamp = timestamp;
                    keyOfLatestData = key;
                }
            }
        }
    }

    if (latestUserData) {
        // Display the latest form data
        parsedData = latestUserData.FormData;
        ID = latestUserData.ID;
        Timestamp = latestUserData.Timestamp;
        displayFormData(parsedData, ID, Timestamp);
    } else {
        resultsContainer.innerHTML = '<p>No data available.</p>';
    }
}

if(!ID || !Timestamp) {
    ID = null;
    Timestamp = Date.now();
}

// Function to trigger download of JSON and CSV files
document.getElementById('downloadJson').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Create a new object to hold both score and parsedData
    var dataWithScore = {
        dsm_mddh: dsm_mddh,
        d_mddh12: d_mddh12,
        data: parsedData
    };

    // Convert the combined data to JSON
    var jsonData = JSON.stringify(dataWithScore, null, 2);
    var blob = new Blob([jsonData], { type: 'application/json' });

    // Create a URL for the Blob
    var url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    var a = document.createElement('a');
    a.href = url;
    a.download = 'results.json';

    // Append the link to the document body, trigger the click, and then remove the link
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Function to generate CSV data
function generateCsv(data) {
    // Transpose the data
    let transposedData = transposeData(data);
    // Prepare CSV header
    let csv = '';
    // Add data rows
    transposedData.forEach(function(row) {
        let modifiedRow = row.map(item => String(item).replace(/,/g, '_'));
        csv += modifiedRow.join(',') + '\n'; // Add each row without the score column
    });
    return csv;
}

// Function to transpose data
function transposeData(data) {
    let transposedData = [];

    // add score into data before transposing
    data['dsm_mddh'] = dsm_mddh;
    data['d_mddh12'] = d_mddh12;

    // Iterate over each object in the data array
    data.forEach(function(obj) {
        // Iterate over each property in the object
        Object.entries(obj).forEach(function([key, value], index) {
            // Initialize a new array for each property if it doesn't exist
            transposedData[index] = transposedData[index] || [];
            // Push the property value to the corresponding index in the transposed array
            transposedData[index].push(value);
        });
    });
    
    return transposedData;
}

// Function to trigger download of CSV file
function downloadCsv(csvData) {
    var blob = new Blob([csvData], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Retry questionnaire button click event
document.getElementById('retryButton').addEventListener('click', function() {
    // Redirect to the questionnaire page
    window.location.href = 'index.html';
});

var variables = {
    ID: ID+'-_'+Timestamp,
    SC1: '.',
    SC21: '.',
    SC22: '.',
    SC23: '.',
    SC24: '.',
    SC25: '.',
    SC25a: '.',
    D1: '.',
    D1a: '.',
    D1b: '.',
    D2: '.',
    D9: '.',
    D9a: '.',
    D9a1: '.',
    D9a2: '.',
    D10: '.',
    D11: ".",
    D12: ".",
    D12a: ".",
    D13: ".",
    D14: 1,
    D14a: 5,
    D15: ".",
    D16: ".",
    D17: ".",
    D18: ".",
    D19: ".",
    D20: ".",
    D21: ".",
    D22: ".",
    D22a: ".",
    D22b: ".",
    D22b1: ".",
    D22c: ".",
    D22d: ".",
    D22d1: ".",
    D23: ".",
    D23a: ".",
    D23a01: ".",
    D23a02: ".",
    D23a03: ".",
    D23a04: ".",
    D23a05: ".",
    D23a06: ".",
    D23a07: ".",
    D23a08: ".",
    D23a09: ".",
    D23a10: ".",
    D23a11: ".",
    D23a12: ".",
    D23a13: ".",
    D23a14: ".",
    D23a15: ".",
    D23a16: ".",
    D24a: ".",
    D24b: ".",
    D24c: ".",
    D24d: ".",
    D24e: ".",
    D24f: ".",
    D25: ".",
    D26a: ".",
    D26b: ".",
    D26c: ".",
    D26c_1: ".",
    D26d: ".",
    D26e: ".",
    D26e_1: ".",
    D26f: ".",
    D26g: ".",
    D26h: ".",
    D26i: ".",
    D26j: ".",
    D26k: ".",
    D26l: ".",
    D26m: ".",
    D26n: ".",
    D26o: ".",
    D26p: ".",
    D26q: ".",
    D26r: ".",
    D26s: ".",
    D26t: ".",
    D26u: ".",
    D26v: ".",
    D26w: ".",
    D26w_1: ".",
    D26x: ".",
    D26y: ".",
    D26z: ".",
    D26aa: ".",
    D26bb: ".",
    D26cc: ".",
    D26dd: ".",
    D26ee: ".",
    D26ff: ".",
    D26gg: ".",
    D26hh: ".",
    D26ii: ".",
    D27: ".",
    D28: ".",
    D28a: ".",
    D29: ".",
    D29a: ".",
    D29b: ".",
    D29d: ".",
    D37: ".",
    D37a: ".",
    D37b: ".",
    D37b1: ".",
    D37b234: ".",
    D37b2: ".",
    D37b3: ".",
    D37b4: ".",
    D37c1: ".",
    D37c2: ".",
    D37d: ".",
    D37e: ".",
    D37f: ".",
    D37f_1: ".",
    D37f_2: ".",
    D37f_3: ".",
    D37g: ".",
    D37h_1: ".",
    D37h_2: ".",
    D37i_1: ".",
    D37i_2: ".",
    D37k: ".",
    D37l: ".",
    D37m_1: ".",
    D37m_2: ".",
    D37n_1: ".",
    D37n_2: ".",
    D37p: ".",
    D38: ".",
    D38_1: ".",
    D38a: ".",
    D38a_1: ".",
    D38a_2: ".",
    D38a_3_5: ".",
    D38a_3a_5: ".",
    D38a_5: ".",
    D38a_6: ".",
    D38a_7a: ".",
    D38a_7b: ".",
    D38a_8: ".",
    D38a_9: ".",
    D38b: ".",
    D38b_1: ".",
    D38c: ".",
    D39: ".",
    D39a: ".",
    D40: ".",
    D41: ".",
    D41a: ".",
    D42: ".",
    D42_1: ".",
    D43: ".",
    D44: ".",
    D45: ".",
    D46: ".",
    D47: ".",
    D48: ".",
    D49: ".",
    D50: ".",
    D54: ".",
    D55: ".",
    D56: ".",
    D57: ".",
    D58: ".",
    D59: ".",
    D59a: ".",
    D60: ".",
    D61: ".",
    D62_1: ".",
    D62_2: ".",
    D62_3: ".",
    D64: ".",
    D64a: ".",
    D64b: ".",
    D64c: ".",
    D64d: ".",
    D64e: ".",
    D64f: ".",
    D64g: ".",
    D64h: ".",
    D64i: ".",
    D64j: ".",
    D64k: ".",
    D64l: ".",
    D64m: ".",
    D64n: ".",
    D66a: ".",
    D66b: ".",
    D66c: ".",
    D66d: ".",
    D67: ".",
    D68: ".",
    D72: ".",
    D72a: ".",
    D84: ".",
    D84a: ".",
    D84b: ".",
    D84c: ".",
    D86: ".",
    D87: ".",
    D87a: ".",
    D87_1: ".",
    D88: ".",
    D89: ".",
    D90: ".",
    D29c: ".",
    D29c1: ".",
}
if (parsedData) {
    // Update the variables object based on formData
    parsedData.forEach(function(entry) {
        if (variables.hasOwnProperty(entry.number) && entry.value !== null && entry.value !== undefined && entry.value !== "") {
            variables[entry.number] = entry.value;
        }
    });
} else if (latestUserData) {
    // Update the variables object based on latestUserData
    latestUserData.FormData.forEach(function(entry) {
        if (variables.hasOwnProperty(entry.number) && entry.value !== null && entry.value !== undefined && entry.value !== "") {
            variables[entry.number] = entry.value;
        }
    });
}

// Initialize the variables in the global scope
for (let [key, value] of Object.entries(variables)) {
    if (/^\d+$/.test(value)) {
        variables[key] = parseInt(value);
    }
    window[key] = variables[key];
}

// for each item in D23a, seperated by ',', add to D23a01 all the way to 16
if (D23a != "." && D23a != "") {
    var D23aArray = String(D23a).split(',');
    for (var i = 0; i < D23aArray.length; i++) {
        if (i < 9) {
            window['D23a0' + (i + 1)] = D23aArray[i];
        } else {
            window['D23a' + (i + 1)] = D23aArray[i];
        }
    }
}

if (D37b234 != "." && D37b234 != "") {
    var D37b234Array = String(D37b234).split(',');
    for (var i = 0; i < D37b234Array.length; i++) {
        window['D37b' + (i + 2)] = D37b234Array[i];
    }
}

// split D29c BY ',' and count how many items and assign D29c with that value
if (D29c != "." && D29c != "") {
    D29c1 = String(D29c).split(',').length;
}

/**
 * ALGORITHM LOGIC BELOW
 */

/**
 * File 05
 */
function tdy_mde(part1, part2) {
    if (part1 == "." || part2 == ".") {
        return ".";
    }
    // parse as int
    part1 = parseInt(part1);
    part2 = parseInt(part2);

    if (part1 < 998) {
        if (part2==1) newvar = part1 //[days]
        if (part2==2) newvar = part1*7 //[weeks]
        if (part2==3) newvar = part1*30 //[months]
        if (part2==4) newvar = part1*365 //[years]
        if (newvar >= 99998) newvar = 99995;
    }
    if (part1 == 0) newvar = 0; 
	if (part1 == 998) newvar = 99998;
	if (part1 == 999) newvar = 99999;
    return newvar
}

function totmass(part1, part2) {
    if (part1 == "." || part2 == ".") {
        return ".";
    }
    // parse as int
    part1 = parseInt(part1);
    part2 = parseInt(part2);

    if (![998, 999].includes(part1)) {
		if (part2 == 1) newvar = part1 //pounds
		if (part2 == 2) newvar = 2.2*part1 //kilos
        if (newvar >= 998) newvar = 995
    }
    else {
        newvar = part1
    }
	return newvar
}

// Criteria A Part 1
D22bt = tdy_mde(D22b, D22b1);  /* Calculate total time for variables */
D22dt = tdy_mde(D22d, D22d1);
D39t = tdy_mde(D39, D39a);
D26dm = totmass(D26d,D26c_1);   /* Calculate total mass for variables */
D26fm = totmass(D26f,D26e_1);

function find_dsmmdea(D22bt, D22b1, D22dt, D22d1, D39t, D39a, D24a, D24b, D24c, 
    D24d, D24e, D24f, D26a, D26b, D26c, D26dm, D26d, D26f, 
    D26fm, D26g, D26h, D26j, D26l, D26m, D26n, D26o, D26p, D26r, D26s, D26u, 
    D26v, D26aa, D26bb, D26cc, D26dd, D26ee) {

    // make into var to console log and see which criteria failed
    var dsmmdea1, dsmmdea2, d_mdea1, d_mdea2, d_mdea3, d_mdea4, d_mdea5, d_mdea6, d_mdea7, d_mdea8, d_mdea9;

    // * Either D22b or D22d answered; find dsmmdea1
    if ((14 <= D22bt && D22bt < 99998) || (14 <= D22dt && D22dt < 99998) || (14 <= D39t && D39t < 99998)) {
        if (D24a == 1 || D24b == 1 || D24c == 1 || D24d == 1 || D24e == 1 || D24f == 1) {
            dsmmdea1 = 1; // Yes
        } else {
            dsmmdea1 = 5; // No
        }
    } else if (((0 <= D22bt && D22bt < 14) || (0 <= D22dt && D22dt < 14)) && (0 <= D39t && D39t < 14)) {
        if (D24a == 5 && D24c == 5 && D24e == 5 && D24f == 5) {
            dsmmdea1 = 5; // No
        }
    } else if (
        D22b1 == 9 || D22bt == 99999 || D22d1 == 9 || D22dt == 99999 || D39t == 99999 || 
        D39a == 9 || D24a == 9 || D24b == 9 || D24c == 9 || D24d == 9 || D24e == 9 || D24f == 9
    ) {
        dsmmdea1 = 9; // Don't know
    } else if (
        D22b1 == 8 || D22bt == 99998 || D22d1 == 8 || D22dt == 99998 || D39t == 99998 || 
        D39a == 8 || D24a == 8 || D24b == 8 || D24c == 8 || D24d == 8 || D24e == 8 || D24f == 8
    ) {
        dsmmdea1 = 8; // Refuse
    }

    // find dsmmdea2
    // Symptom 1: depressed mood
    if (D24a == 1 || D24b == 1 || D24c == 1 || D24d == 1) {
        d_mdea1 = 1;
    } else if (D24a == 5 && D24c == 5) {
        d_mdea1 = 5;
    } else if (D24a == 9 || D24b == 9 || D24c == 9 || D24d == 9) {
        d_mdea1 = 9;
    } else if (D24a == 8 || D24b == 8 || D24c == 8 || D24d == 8) {
        d_mdea1 = 8;
    }

    // Symptom 2: diminished interest in hobbies/activities
    if (D24e == 1 || D24f == 1) {
        d_mdea2 = 1;
    } else if (D24e == 5 && D24f == 5) {
        d_mdea2 = 5;
    } else if (D24e == 9 || D24f == 9) {
        d_mdea2 = 9;
    } else if (D24e == 8 || D24f == 8) {
        d_mdea2 = 8;
    }

    // Symptom 3: significant weight loss/gain or change in appetite
    if (D26a == 1 || (10 <= D26fm && D26fm < 998) || D26b == 1 || (10 <= D26dm && D26dm < 998)) {
        d_mdea3 = 1;
    } else if (
        D26a == 5 && D26b == 5 && (0 <= D26dm && D26dm < 10 || 0 <= D26fm && D26fm < 10 || 
        (D26c == 5 && D26e == 5) || D26c == 7 || D26e == 7)
    ) {
        d_mdea3 = 5;
    } else if (D26a == 9 || D26b == 9 || D26c == 9 || D26d == 999 || D26e == 9 || D26f == 999) {
        d_mdea3 = 9;
    } else if (D26a == 8 || D26b == 8 || D26c == 8 || D26d == 998 || D26e == 8 || D26f == 998) {
        d_mdea3 = 8;
    }

    // Symptom 4: insomnia or hypersomnia
    if (D26g == 1 || D26h == 1) {
        d_mdea4 = 1;
    } else if (D26g == 5 && D26h == 5) {
        d_mdea4 = 5;
    } else if (D26g == 9 || D26h == 9) {
        d_mdea4 = 9;
    } else if (D26g == 8 || D26h == 8) {
        d_mdea4 = 8;
    }

    // Symptom 5: psychomotor agitation or retardation
    if (D26m == 1 || D26o == 1) {
        d_mdea5 = 1;
    } else if (
        (D26l == 5 || D26l == 8 || D26l == 9) && 
        ((D26n == 5 || D26n == 8 || D26n == 9) || D26o == 5) || D26m == 5
    ) {
        d_mdea5 = 5;
    } else if (D26l == 9 || D26m == 9 || D26n == 9 || D26o == 9) {
        d_mdea5 = 9;
    } else if (D26l == 8 || D26m == 8 || D26n == 8 || D26o == 8) {
        d_mdea5 = 8;
    }

    // Symptom 6: fatigue or loss of energy
    d_mdea6 = D26j;

    // Symptom 7: feelings of worthlessness
    if (D26v == 1) {
        d_mdea7 = 1;
    } else if (D26u == 5 || D26u == 8 || D26u == 9 || D26v == 5) {
        d_mdea7 = 5;
    } else {
        d_mdea7 = D26v;
    }

    // Symptom 8: diminished ability to think or concentrate
    if (D26p == 1 || D26r == 1 || D26s == 1) {
        d_mdea8 = 1;
    } else if (D26p == 5 && D26r == 5 && D26s == 5) {
        d_mdea8 = 5;
    } else if (D26p == 9 || D26r == 9 || D26s == 9) {
        d_mdea8 = 9;
    } else if (D26p == 8 || D26r == 8 || D26s == 8) {
        d_mdea8 = 8;
    }

    // Symptom 9: recurrent thoughts of death
    if (D26aa == 1 || D26bb == 1 || D26cc == 1 || D26dd == 1 || D26ee == 1) {
        d_mdea9 = 1;
    } else if (D26aa == 5 && D26bb == 5 && D26cc == 5) {
        d_mdea9 = 5;
    } else if (D26aa == 9 || D26bb == 9 || D26cc == 9 || D26dd == 9 || D26ee == 9) {
        d_mdea9 = 9;
    } else if (D26aa == 8 || D26bb == 8 || D26cc == 8 || D26dd == 8 || D26ee == 8) {
        d_mdea9 = 8;
    }

    // Combine symptoms
    var symptomSum = 0;
    symptomSum += d_mdea1 == 1 ? 1 : 0;
    symptomSum += d_mdea2 == 1 ? 1 : 0;
    symptomSum += d_mdea3 == 1 ? 1 : 0;
    symptomSum += d_mdea4 == 1 ? 1 : 0;
    symptomSum += d_mdea5 == 1 ? 1 : 0;
    symptomSum += d_mdea6 == 1 ? 1 : 0;
    symptomSum += d_mdea7 == 1 ? 1 : 0;
    symptomSum += d_mdea8 == 1 ? 1 : 0;
    symptomSum += d_mdea9 == 1 ? 1 : 0;    

    var symptomSum2 = 0
    symptomSum2 += (d_mdea1 == 1 || d_mdea1 == 8 || d_mdea1 == 9) ? 1 : 0;
    symptomSum2 += (d_mdea2 == 1 || d_mdea2 == 8 || d_mdea2 == 9) ? 1 : 0;
    symptomSum2 += (d_mdea3 == 1 || d_mdea3 == 8 || d_mdea3 == 9) ? 1 : 0;
    symptomSum2 += (d_mdea4 == 1 || d_mdea4 == 8 || d_mdea4 == 9) ? 1 : 0;
    symptomSum2 += (d_mdea5 == 1 || d_mdea5 == 8 || d_mdea5 == 9) ? 1 : 0;
    symptomSum2 += (d_mdea6 == 1 || d_mdea6 == 8 || d_mdea6 == 9) ? 1 : 0;
    symptomSum2 += (d_mdea7 == 1 || d_mdea7 == 8 || d_mdea7 == 9) ? 1 : 0;
    symptomSum2 += (d_mdea8 == 1 || d_mdea8 == 8 || d_mdea8 == 9) ? 1 : 0;
    symptomSum2 += (d_mdea9 == 1 || d_mdea9 == 8 || d_mdea9 == 9) ? 1 : 0;

    if (symptomSum >= 5) {
        dsmmdea2 = 1; // Yes
    } else if (symptomSum2 < 5 && symptomSum > 0) {
        dsmmdea2 = 5; // No
    } else if (d_mdea1 == 9 || d_mdea2 == 9 || d_mdea3 == 9 || d_mdea4 == 9 || d_mdea5 == 9 || d_mdea6 == 9 || d_mdea7 == 9 || d_mdea8 == 9 || d_mdea9 == 9) {
        dsmmdea2 = 9; // Don't know
    } else if (d_mdea1 == 8 || d_mdea2 == 8 || d_mdea3 == 8 || d_mdea4 == 8 || d_mdea5 == 8 || d_mdea6 == 8 || d_mdea7 == 8 || d_mdea8 == 8 || d_mdea9 == 8) {
        dsmmdea2 = 8; // Refuse
    }

    // Criteria A: combine parts 1 and 2; finding dsmmdea
    if (dsmmdea1 == 1 && dsmmdea2 == 1) {
        return 1; // Yes
    } else if (dsmmdea1 == 5 || dsmmdea2 == 5) {
        return 5; // No
    } else if (dsmmdea1 == 9 || dsmmdea2 == 9) {
        return 9; // Don't know
    } else if (dsmmdea1 == 8 || dsmmdea2 == 8) {
        return 8; // Refuse
    }
}

function find_dsmmdec(D17, D18, D19, D20, D21, D24a, D24b, D28, D28a, D62_1, D66a, D66b, D66c, D66d) {
    let dsmmdec1, dsmmdec2;
    // Criteria C Part 1: The symptoms cause clinically significant distress
    // D17 is (2,3,4) OR D18 is (1,2) OR D19 is (1,2,3) OR D24b is Yes(1)
    // Note: If D20 = 1 or D21 IN(5,8,9) or D24a IN(5,8,9) then D24b is skipped;
    if ([2, 3, 4].includes(D17) || [1, 2].includes(D18) || [1, 2, 3].includes(D19) || D24b == 1) {
        dsmmdec1 = 1; // Yes
    } else if (
        D17 == 1 && [3, 4].includes(D18) && D19 == 4 &&
        (D20 == 1 || [5, 8, 9].includes(D21) || [5, 8, 9].includes(D24a) || D24b == 5)
    ) {
        dsmmdec1 = 5; // No
    } else if (D17 == 9 || D18 == 9 || D19 == 9 || D24b == 9) {
        dsmmdec1 = 9; // Don't know
    } else if (D17 == 8 || D18 == 8 || D19 == 8 || D24b == 8) {
        dsmmdec1 = 8; // Refuse
    }

    // Criteria C Part 2: The symptoms cause impairment in social, occupational or other important areas of functioning
    // D28 IN(3,4,5) OR D28a IN(1,2,3) OR (At least 1 of D66a-D66d is between 4 and 10)

    var D66NUM = 0;
    if ([4, 5, 6, 7, 8, 9, 10].includes(D66a) || [4, 5, 6, 7, 8, 9, 10].includes(D66b) || [4, 5, 6, 7, 8, 9, 10].includes(D66c) || [4, 5, 6, 7, 8, 9, 10].includes(D66d)) {
        D66NUM = 1; // Yes
    } else if (
        ([0, 1, 2, 3, 97].includes(D66a) || D66a == 98 || D66a == 99) &&
        ([0, 1, 2, 3, 97].includes(D66b) || D66b == 98 || D66b == 99) &&
        ([0, 1, 2, 3, 97].includes(D66c) || D66c == 98 || D66c == 99) &&
        ([0, 1, 2, 3, 97].includes(D66d) || D66d == 98 || D66d == 99)
    ) {
        D66NUM = 5; // No
    } else if ([98, 99].includes(D66a) || [98, 99].includes(D66b) || [98, 99].includes(D66c) || [98, 99].includes(D66d)) {
        D66NUM = 9; // Don't know
    } else if (D66a == 97 || D66b == 97 || D66c == 97 || D66d == 97) {
        D66NUM = 8; // Refuse
    }

    if ([3, 4, 5].includes(D28) || [1, 2, 3].includes(D28a) || D66NUM == 1) {
        dsmmdec2 = 1; // Yes
    } else if ((D28 == 1 || (D28 == 2 && D28a == 4)) && (D62_1 == 2 || D66NUM == 5)) {
        dsmmdec2 = 5; // No
    } else if ([9].includes(D28) || [9].includes(D28a) || D66NUM == 9) {
        dsmmdec2 = 9; // Don't know
    } else if ([8].includes(D28) || [8].includes(D28a) || D66NUM == 8) {
        dsmmdec2 = 8; // Refuse
    }

    // Criteria C: combine Parts 1 and 2
    if ([1].includes(dsmmdec1) || [1].includes(dsmmdec2)) {
        return 1; // Yes
    } else if ([5].includes(dsmmdec1) && [5].includes(dsmmdec2)) {
        return 5; // No
    } else if ([9].includes(dsmmdec1) || [9].includes(dsmmdec2)) {
        return 9; // Don't know
    } else if ([8].includes(dsmmdec1) || [8].includes(dsmmdec2)) {
        return 8; // Refuse
    }
}

function find_dsmmded(D29a, D29b, D29c1) {
// Criteria D: The symptoms are not due to the direct physiological effects of a substance (e.g., a drug of abuse, a medication),
// or are not due to a general medical condition
// D29a is NOT missing AND D29c1 is NOT (.,1,7,8,9)
    if (D29b == 1 && [".", 1].includes(D29c1)) {
        return 5; // No
    } else if (D29a == "." || D29c1 >= 7) {
        return 9; // Don't know
    } else {
        return 1; // Yes
    }
}

function find_dsmmdee(D23a01, D23a02, D23a03, D23a04, D23a05, D23a06, D23a07, D23a08, D23a09, D23a10, D23a11, D23a12, D23a13, D23a14, D23a15, D23a16,
     D22bt, D22dt, D66a, D66b, D66c, D66d, D62_1, D68, D19, D28, D28a, D26v, D26cc, D26dd, D26ee, D26l, D26m) {
    let dsmmdee1, dsmmdee2, dsmmdee3, mdee3a, mdee3b, mdee3c, mdee3e, D66XNUM;

    if (
        D23a01 != 3 &&
        D23a02 != 3 &&
        D23a03 != 3 &&
        D23a04 != 3 &&
        D23a05 != 3 &&
        D23a06 != 3 &&
        D23a07 != 3 &&
        D23a08 != 3 &&
        D23a09 != 3 &&
        D23a10 != 3 &&
        D23a11 != 3 &&
        D23a12 != 3 &&
        D23a13 != 3 &&
        D23a14 != 3 &&
        D23a15 != 3 &&
        D23a16 != 3
      ) {
        dsmmdee1 = 1; // Yes
      } else if (
        D23a01 == 3 ||
        D23a02 == 3 ||
        D23a03 == 3 ||
        D23a04 == 3 ||
        D23a05 == 3 ||
        D23a06 == 3 ||
        D23a07 == 3 ||
        D23a08 == 3 ||
        D23a09 == 3 ||
        D23a10 == 3 ||
        D23a11 == 3 ||
        D23a12 == 3 ||
        D23a13 == 3 ||
        D23a14 == 3 ||
        D23a15 == 3 ||
        D23a16 == 3
      ) {
        dsmmdee1 = 5; // No
      }

    // Code for Criteria E part 2
    if ((D22bt > 60 && D22bt < 99998) || (D22dt > 60 && D22dt < 99998)) {
        dsmmdee2 = 1; // Yes
    } else if ((D22bt >= 0 && D22bt <= 60) || (D22dt >= 0 && D22dt <= 60)) {
        dsmmdee2 = 5; // No
    }

    // Code for Criteria E part 3
    if ((D66a >= 7 && D66a <= 10) || (D66b >= 7 && D66b <= 10) || (D66c >= 7 && D66c <= 10) || (D66d >= 7 && D66d <= 10)) {
        D66XNUM = 1; // Yes
    } else if (((D66a >= 0 && D66a <= 6) || D66a == 97) &&
               ((D66b >= 0 && D66b <= 6) || D66b == 97) &&
               ((D66c >= 0 && D66c <= 6) || D66c == 97) &&
               ((D66d >= 0 && D66d <= 6) || D66d == 97)) {
        D66XNUM = 5; // No
    } else if (D66a == 99 || D66b == 99 || D66c == 99 || D66d == 99) {
        D66XNUM = 9; // Don't know
    } else if (D66a == 98 || D66b == 98 || D66c == 98 || D66d == 98) {
        D66XNUM = 8; // Refuse
    }

    if (D19 == 1 || [4, 5].includes(D28) || [1, 2].includes(D28a) || D66XNUM == 1 || (10 <= D68 && D68 < 998)) {
        mdee3a = 1; // Yes
    } else if ([2, 3, 4].includes(D19) && (D28 == 1 || (D28 == 2 && [3, 4].includes(D28a))) &&
               (D62_1 == 2 || (D66a == 0 && D66b == 0 && D66c == 0 && D66d == 0) ||
               (D66XNUM == 5 && 0 <= D68 && D68 < 10))) {
        mdee3a = 5; // No
    } else if (D19 == 4 && (D28 == 1 || (D28 == 2 && [3, 4].includes(D28a))) &&
               D66XNUM == 5 && 0 <= D68 && D68 < 10) {
        mdee3a = 5; // No
    } else if ([9, 9, 9, 9, 999].includes(D19) || [9, 9, 9, 9, 999].includes(D28) ||
               [9, 9, 9, 9, 999].includes(D28a) || [9, 9, 9, 9, 999].includes(D66XNUM) || D68 == 999) {
        mdee3a = 9; // Don't know
    } else if ([8, 8, 8, 8, 998].includes(D19) || [8, 8, 8, 8, 998].includes(D28) ||
               [8, 8, 8, 8, 998].includes(D28a) || [8, 8, 8, 8, 998].includes(D66XNUM) || D68 == 998) {
        mdee3a = 8; // Refuse
    }

    mdee3b = D26v;

    if (D26cc == 1 || D26dd == 1 || D26ee == 1) {
        mdee3c = 1;
    } else if (D26cc == 5) {
        mdee3c = 5; // If D26cc is No, D26dd and D26ee are skipped
    } else if (D26cc == 9 || D26dd == 9 || D26ee == 9) {
        mdee3c = 9;
    } else if (D26cc == 8 || D26dd == 8 || D26ee == 8) {
        mdee3c = 8;
    }

    if (D26l == 1 || D26m == 1) {
        mdee3e = 1;
    } else if (D26l == 5) {
        mdee3e = 5;
    } else if (D26l == 9 || D26m == 9) {
        mdee3e = 9;
    } else if (D26l == 8 || D26m == 8) {
        mdee3e = 8;
    }

    if (mdee3a == 1 || mdee3b == 1 || mdee3c == 1 || mdee3e == 1) {
        dsmmdee3 = 1;
    } else if (mdee3a == 5 && mdee3b == 5 && mdee3c == 5 && mdee3e == 5) {
        dsmmdee3 = 5;
    } else if (mdee3a == 9 || mdee3b == 9 || mdee3c == 9 || mdee3e == 9) {
        dsmmdee3 = 9;
    } else if (mdee3a == 8 || mdee3b == 8 || mdee3c == 8 || mdee3e == 8) {
        dsmmdee3 = 8;
    }

    if (dsmmdee1 == 1 || dsmmdee2 == 1 || dsmmdee3 == 1) {
        return 1;
    } else if (dsmmdee1 == 5 && dsmmdee2 == 5 && dsmmdee3 == 5) {
        return 5;
    } else if (dsmmdee1 == 9 || dsmmdee2 == 9 || dsmmdee3 == 9) {
        return 9;
    } else if (dsmmdee1 == 8 || dsmmdee2 == 8 || dsmmdee3 == 8) {
        return 8;
    }
}

// find Criteria A,C,D,E
dsmmdea = find_dsmmdea(D22bt, D22b1, D22dt, D22d1, D39t, D39a, D24a, D24b, D24c, 
    D24d, D24e, D24f, D26a, D26b, D26c, D26dm, D26d, D26f, 
    D26fm, D26g, D26h, D26j, D26l, D26m, D26n, D26o, D26p, D26r, D26s, D26u, 
    D26v, D26aa, D26bb, D26cc, D26dd, D26ee);

dsmmdec = find_dsmmdec(D17, D18, D19, D20, D21, D24a, D24b, D28, D28a, D62_1, D66a, D66b, D66c, D66d);

dsmmded = find_dsmmded(D29a, D29b, D29c1);

dsmmdee = find_dsmmdee(D23a01, D23a02, D23a03, D23a04, D23a05, D23a06, D23a07, D23a08, D23a09, D23a10, D23a11, D23a12, D23a13, D23a14, D23a15, D23a16, D22bt, D22dt, D66a, D66b, D66c, D66d, D62_1, D68, D19, D28, D28a, D26v, D26cc, D26dd, D26ee, D26l, D26m);

// Combine Criteria A,C,D,E; find dsm_mde
if (dsmmdea == 1 && dsmmdec == 1 && dsmmded == 1 && dsmmdee == 1) {
    dsm_mde = 1;
} else {
    dsm_mde = 5;
}

dsm_mddh = dsm_mde

/*
find d_mddh12
*/
var dep_on, dep_rec;

// calculate a standardized time into years
function tyr_12m(part1,part2) {
    // parse part1 and part2
    part1 = parseInt(part1);
    part2 = parseInt(part2);

    if (part1 < 998) {
        if (part2 == 1) {
            return part1 / 365;
        } else if (part2 == 2) {
            return part1 / 52;
        } else if (part2 == 3) {
            return part1 / 12;
        } else if (part2 == 4) {
            return part1;
        }
    } else if (part1 == 998 || part1 == 999) {
        return '.';
    }
}

D22by = tyr_12m(D22b, D22b1);
D22dy = tyr_12m(D22d, D22d1);
D37cy = tyr_12m(D37c1, D37c2);
D37hy = tyr_12m(D37h_1, D37h_2);
D37iy = tyr_12m(D37i_1, D37i_2);
D37my = tyr_12m(D37m_1, D37m_2);
D37ny = tyr_12m(D37n_1, D37n_2);

if (D22by == 999 || D22by == 998) {
    D22by = '.';
}
if (D22dy == 999 || D22dy == 998) {
    D22dy = '.';
}
if (D37cy == 999 || D37cy == 998) {
    D37cy = '.';
}
if (D37hy == 999 || D37hy == 998) {
    D37hy = '.';
}
if (D37iy == 999 || D37iy == 998) {
    D37iy = '.';
}
if (D37my == 999 || D37my == 998) {
    D37my = '.';
}
if (D37ny == 999 || D37ny == 998) {
    D37ny = '.';
}

// finding dep_on
if (D22 == 1) {
    dep_on = Math.min(D22a, D37a, D37b, D37b1); // Major Depression onset
} else if (D22 == 5 || D22 == 8 || D22 == 9) {
    dep_on = Math.min(D22c, D37a, D37b, D37b1);
}

// finding dep_rec
if (D38 == 1) {
    dep_rec = SC1; // Major Depression recency
} else if (D38 == 5 || D38 == 8 || D38 == 9) {
    dep_rec = D38c;
}

/* Depression recency for 1 lifetime episode */
if ((D38 == 5 || D38 == 8 || D38 == 9) && D29 == 1 && D38c == '.') {
    if (D22 == 1) {
        dep_rec = Math.floor(dep_on + D22by);
    } else if (D22 == 5 || D22 == 8 || D22 == 9) {
        dep_rec = Math.floor(dep_on + D22dy);
    }
    if (dep_on == SC1) {
        dep_rec = SC1;
    }
    if (dep_rec > SC1 + 1) {
        dep_rec = '.';
    }
}

/* Depression recency for 2 lifetime episodes */
if ((D38 == 5 || D38 == 8 || D38 == 9) && D29 == 2 && D38c == '.') {
    if (D37a !== '.' && D37a !== 998 && D37a !== 999) {
        dep_rec = Math.floor(D37a + D37cy + D37hy + D37iy);
    } else if (D37b !== '.' && D37b !== 998 && D37b !== 999) {
        dep_rec = Math.floor(D37b + D37cy + D37hy + D37iy);
    }
    if (dep_on == SC1) {
        dep_rec = SC1;
    }
    if (dep_rec > SC1 + 1) {
        dep_rec = '.';
    }
}

/* Depression recency for 3 lifetime episodes */
if ((D38 == 5 || D38 == 8 || D38 == 9) && D29 == 3 && D38c == '.') {
    if (D37a !== '.' && D37a !== 998 && D37a !== 999) {
        dep_rec = Math.floor(D37a + D37cy + D37hy + D37iy + D37my + D37ny);
    } else if (D37b !== '.' && D37b !== 998 && D37b !== 999) {
        dep_rec = Math.floor(D37b + D37cy + D37hy + D37iy + D37my + D37ny);
    }
    if (dep_on == SC1) {
        dep_rec = SC1;
    }
    if (dep_rec > SC1 + 1) {
        dep_rec = '.';
    }
}

if (dep_rec == 998 || dep_rec == 999) {
    dep_rec = '.';
}

if (dsm_mddh == 1 && (D38 == 1 || (SC1 !== 998 && SC1 !== 999 && SC1 !== '.' && (D37a == SC1 || D37b == SC1 || D38c == SC1 || dep_on == SC1 || dep_rec == SC1)))) {
    d_mddh12 = 1;
} else {
    d_mddh12 = 5;
}

var scoreElement = document.getElementById('score');
if (scoreElement) {
    scoreElement.textContent = (dsm_mddh == 1) ? 'Yes (1)' : 'No (5)';
}
var score12Element = document.getElementById('score12');
if (score12Element) {
    score12.textContent = (d_mddh12 == 1) ? 'Yes (1)' : 'No (5)';
}

// add score to localStorage value under the same key
if (keyOfLatestData) {
    var latestData = JSON.parse(localStorage.getItem(keyOfLatestData));

    let transformedFormData = [];
    for (let key in variables) {
        if (variables.hasOwnProperty(key) && (key != 'ID' || variables[key] != ".")) {
            transformedFormData.push({
                number: key,
                value: variables[key]
            });
        }
    }

    // Modify latestData
    latestData['FormData'] = transformedFormData; // replace FormData with transformedFormData
    latestData['score'] = dsm_mddh;
    latestData['score12'] = d_mddh12;

    // Save back to localStorage
    localStorage.setItem(keyOfLatestData, JSON.stringify(latestData));
}

document.getElementById('downloadCsv').addEventListener('click', function(event) {
    event.preventDefault();
    // make variables dict into an array of [key, value]
    var csvData = Object.entries(variables);
    var csvData = generateCsv(csvData);
    downloadCsv(csvData); // Download CSV file
});

// BUTTON TO GO TO DASHBOARD.HTML
document.getElementById('gotoDashboardButton').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'dashboard.html';
});

document.getElementById("loadingOverlay").style.display = "none"; // Hide the loading after page is loaded
