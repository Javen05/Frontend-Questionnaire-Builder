document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const searchInput = document.getElementById('searchInput');
    const responseTableBody = document.getElementById('responseTableBody');
    const tableHeaders = document.getElementById('tableHeaders');
    const downloadCsvButton = document.getElementById('downloadCsvButton');
    const goToQuestionnaireButton = document.getElementById('goToQuestionnaireButton');
    const clearTableButton = document.getElementById('clearTableButton');

    // Initialize variables object dynamically
    var variables = {};

    function fetchData() {
        const data = [];
        const keys = Object.keys(localStorage);
    
        keys.forEach(key => {
            const [ID, Timestamp] = key.split('-_');
            
            if (ID && Timestamp) {
                const userDataString = localStorage.getItem(key);
                if (!userDataString) return;
                
                const userData = JSON.parse(userDataString);
                userData.ID = ID;
                userData.Timestamp = Timestamp;
    
                // Update variables with formData keys
                userData.FormData.forEach(entry => {
                    if (!variables[entry.number]) {
                        variables[entry.number] = '';
                    }
                });
    
                data.push(userData);
            }
        });
    
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
        const headers = ['ID', 'Date'];
        headers.push(...Object.keys(variables));
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
            `;
            for (const prop in variables) {
                const valueOfVariable = getValue(item, prop) || '';
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
        return entry ? entry.value : '-';
    }

    function filterData(data, searchTerm) {
        return data.filter(item => {
            const date = new Date(item.Timestamp).toLocaleString();
            return item.ID.includes(searchTerm) || date.includes(searchTerm);
        });
    }

    function downloadCSV(data) {
        const csvRows = [];
    
        // Extract headers from the first row of the table
        const headers = [];
        let headerCells = document.querySelectorAll('#tableHeaders th');
        // DROP View and Delete Record columns
        headerCells = Array.from(headerCells).slice(0, -2);
        headerCells.forEach(cell => {
            headers.push(cell.textContent);
        });
        csvRows.push(headers.join(','));
    
        // Extract data rows from the table body
        const rows = document.querySelectorAll('#responseTableBody tr');
        rows.forEach(row => {
            const csvRow = [];
            let cells = row.querySelectorAll('td');
            // Stop at last 2 cells (View Submission Form and Delete Record)
            cells = Array.from(cells).slice(0, -2);
            cells.forEach(cell => {
                let cellContent = cell.textContent;
                cellContent = cellContent.replace(/"/g, '""'); // Escape double quotes
                csvRow.push(`"${cellContent}"`);
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
        const confirmDeleteRow = confirm(`Are you sure you want to delete ${ID}'s record?`);
        if (confirmDeleteRow) {
            localStorage.removeItem(`${ID}-_${Timestamp}`);
            location.reload();
        }
    };

    window.openForm = function(ID, Timestamp) {
        const selectedRecordKey = `${ID}-_${Timestamp}`;
        const selectedRecord = JSON.parse(localStorage.getItem(selectedRecordKey));
        localStorage.setItem('questionPool', JSON.stringify(selectedRecord.questionPool));
        localStorage.setItem('questionValues', JSON.stringify(selectedRecord.questionValues));
        window.location.href = 'index.html';
    };

    const data = fetchData();
    console.log(data);
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
        downloadCSV(filteredData);
    });

    goToQuestionnaireButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    clearTableButton.addEventListener('click', function() {
        const deleteConfirmation = prompt("Are you sure? Enter 'PERMANENTLY DELETE' to confirm deletion. Once deleted, the data CANNOT be recovered!");
        if (deleteConfirmation === "PERMANENTLY DELETE") {
            localStorage.clear();
            responseTableBody.innerHTML = '';
        }
    });
});
