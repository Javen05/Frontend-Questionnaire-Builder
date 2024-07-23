document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const searchInput = document.getElementById('searchInput');
    const responseTableBody = document.getElementById('responseTableBody');
    const tableHeaders = document.getElementById('tableHeaders');
    const downloadCsvButton = document.getElementById('downloadCsvButton');
    const goToQuestionnaireButton = document.getElementById('goToQuestionnaireButton');
    const clearTableButton = document.getElementById('clearTableButton'); 

    var variables = {
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

    function fetchData() {
        let data = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const parts = key.split('-_');
            if (parts.length === 2) {
                const userDataString = localStorage.getItem(key);
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    userData.ID = key.split('-_')[0];
                    userData.Timestamp = key.split('-_')[1];
                    data.push(userData);
                }
            }
        }
        return data;
    }

    function getUniqueQuestions(data) {
        const questions = new Set();
        data.forEach(item => {
            item.FormData.forEach(entry => {
                questions.add(entry.number);
            });
        });
        return Array.from(questions).sort();
    }

    function generateHeaders() {
        const headers = ['ID', 'Date', 'MDD', 'MDD12'];
        for (const prop in variables) {
            if (variables[prop]) {
                headers.push(prop);
            }
        }
        headers.push('View Submission Form');
        headers.push('Delete Record');

        tableHeaders.innerHTML = '';
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tableHeaders.appendChild(th);
        });
    }

    function displayData(data) {
        responseTableBody.innerHTML = '';
        data.forEach(item => {
            const date = new Date(item.Timestamp).toLocaleString();
            const row = document.createElement('tr');
            let rowHtml = `
                <td>${item.ID}</td>
                <td>${date}</td>
                <td>${item.score || '.'}</td>
                <td>${item.score12 || '.'}</td>
            `;
            for (const prop in variables) {
                valueOfVariable = getValue(item, prop);
                if (valueOfVariable === '') {
                    valueOfVariable = '.';
                }
                rowHtml += `<td>${valueOfVariable}</td>`;
            }
            rowHtml += `
                <td>
                    <button class="btn btn-sm btn-info" onclick="openForm('${item.ID}', '${item.Timestamp}')">Open</button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteRow('${item.ID}', '${item.Timestamp}')">Delete</button>
                </td>
            `;
            row.innerHTML = rowHtml;
            responseTableBody.appendChild(row);
        });
        loadingOverlay.style.display = 'none';
    }

    function getValue(item, questionNumber) {
        const entry = item.FormData.find(entry => entry.number === questionNumber);
        return entry ? entry.value : '.';
    }

    function filterData(data, searchTerm) {
        return data.filter(item => {
            const date = new Date(item.Timestamp).toLocaleString();
            return item.ID.includes(searchTerm) || date.includes(searchTerm);
        });
    }

    function downloadCSV(data, uniqueQuestions) {
        const csvRows = [];
    
        // Extract headers from the first row of the table
        const headers = [];
        let headerCells = document.querySelectorAll('#tableHeaders th');
        // DROP View and Delete Record columns
        headerCells = Array.from(headerCells).slice(0, -1);
        headerCells.forEach(cell => {
            headers.push(cell.textContent);
        });
        csvRows.push(headers.join(','));
    
        // Extract data rows from the table body
        const rows = document.querySelectorAll('#responseTableBody tr');
        rows.forEach(row => {
            const csvRow = [];
            let cells = row.querySelectorAll('td');
            //stop at last 3rd cell
            cells = Array.from(cells).slice(0, -1);
            cells.forEach(cell => {
                csvRow.push(cell.textContent.replace(',', '_')); // Remove commas to avoid creating new columns
            });
            csvRows.push(csvRow.join(','));
        });
    
        // Convert CSV rows to string
        const csvString = csvRows.join('\n');
    
        // Create Blob and download CSV file
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'responses.csv';
        a.click();
        URL.revokeObjectURL(url);
    }    

    window.deleteRow = function(ID, Timestamp) {
        confirmDeleteRow = confirm(`Are you sure you want to delete ${ID}'s record?`);
        if (confirmDeleteRow) {
           localStorage.removeItem(`${ID}-_${Timestamp}`);
           location.reload();
        }
    };

    // openForm = set questionPool and QuestionValues in localstorage as per the Record's and then open index.html
    window.openForm = function(ID, Timestamp) {
        const selectedRecordKey = `${ID}-_${Timestamp}`;
        const selectedRecord = JSON.parse(localStorage.getItem(selectedRecordKey));
        localStorage.setItem('questionPool', JSON.stringify(selectedRecord.questionPool));
        localStorage.setItem('questionValues', JSON.stringify(selectedRecord.questionValues));
        window.location.href = 'index.html';
    };

    const data = fetchData();
    const uniqueQuestions = getUniqueQuestions(data);
    generateHeaders();
    displayData(data);

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value;
        const filteredData = filterData(data, searchTerm);
        displayData(filteredData);
    });

    downloadCsvButton.addEventListener('click', function() {
        const searchTerm = searchInput.value;
        const filteredData = filterData(data, searchTerm);
        downloadCSV(filteredData, uniqueQuestions);
    });

    goToQuestionnaireButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    clearTableButton.addEventListener('click', function() {
        deleteConfirmation = prompt("Are you sure? Enter 'PERMANENTLY DELETE' to confirm deletion. Once deleted, the data CANNOT be recovered!");
        if (deleteConfirmation == "PERMANENTLY DELETE") {
            localStorage.clear();
            responseTableBody.innerHTML = '';
        }
    });
});
