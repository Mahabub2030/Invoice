//   // Save the table state to localStorage
  function saveTableState() {
    const tableData = [];
    document.querySelectorAll('#comparisonTable tbody tr').forEach(row => {
        const rowData = [];
        row.querySelectorAll('td').forEach(cell => {
            if (cell.children.length > 0 && cell.children[0].tagName === "SELECT") {
                // If it's a select dropdown, save the selected value
                rowData.push(cell.children[0].value);
            } else {
                rowData.push(cell.innerHTML);
            }
        });
        tableData.push(rowData);
    });
    localStorage.setItem('tableState', JSON.stringify(tableData));
}

// Load the table state from localStorage
function loadTableState() {
    const tableData = JSON.parse(localStorage.getItem('tableState'));
    if (tableData) {
        document.querySelector('#comparisonTable tbody').innerHTML = ''; // Clear existing rows
        tableData.forEach((rowData, index) => {
            addRow(false); // Add a new row but don't update totals yet
            const row = document.querySelector('#comparisonTable tbody tr:last-child');
            row.querySelectorAll('td').forEach((cell, i) => {
                if (cell.children.length > 0 && cell.children[0].tagName === "SELECT") {
                    // If it's a select dropdown, set the selected value
                    cell.children[0].value = rowData[i];
                } else {
                    cell.innerHTML = rowData[i];
                }
            });
        });
        updateTotals();
    }
}

// Add a new row to the table
function addRow(updateTotalsFlag = true) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="border px-4 py-2">${document.querySelectorAll('#comparisonTable tbody tr').length + 1}</td>
        <td class="border px-4 py-2">
            <select class="w-full" onchange="saveTableState()">


                <option value="6840l352683">6840l352683</option>
                <option value="6840L413853">6840L413853</option>
                <option value="8720L107601">8720L107601</option>
                <option value="8720L107602">8720L107602</option>



            </select>
        </td>
        <td class="border px-4 py-2">
            <select class="w-full" onchange="saveTableState()">


                <option value="B-Nine plant growth reg. SWG 1KG">B-Nine plant growth reg. SWG 1KG</option>
                <option value="B-Nine plant growth reg. SWG 1KG">B-Nine plant growth reg. SWG 1KG</option>
                <option value="B-Nine plant growth reg. SWG 1KG">B-Nine plant growth reg. SWG 1KG</option>
                <option value="B-Nine plant growth reg. SWG 1KG">B-Nine plant growth reg. SWG 1KG</option>
                
                
            </select>
        </td>
        <td class="border px-4 py-2" contenteditable="true" oninput="updateRow(this)">IT</td>
        <td class="border px-4 py-2" contenteditable="true" oninput="updateRow(this)">0</td>
        <td class="border px-4 py-2" contenteditable="true" oninput="updateRow(this)">0</td>
        <td class="border px-4 py-2 total-price">0.00</td>
        <td class="border px-4 py-2" contenteditable="true" oninput="updateRow(this)">0</td>
        <td class="border px-4 py-2 total-price">0.00</td>
        <td class="border px-4 py-2" contenteditable="true" oninput="updateRow(this)">0</td>
        <td class="border px-4 py-2 total-price">0.00</td>
        <td class="border px-4 py-2"><button class="text-red-500" onclick="removeRow(this)">Remove</button></td>
    `;
    document.querySelector('#comparisonTable tbody').appendChild(row);
    if (updateTotalsFlag) updateTotals();
}

// Remove a specific row
function removeRow(button) {
    button.closest('tr').remove();
    updateTotals();
}

// Remove all rows
function removeAllRows() {
    document.querySelector('#comparisonTable tbody').innerHTML = '';
    updateTotals();
}

// Update row calculations and totals
function updateRow(cell) {
    const row = cell.closest('tr');
    const qty = parseFloat(row.cells[4].innerText) || 0;
    const unitPrice1 = parseFloat(row.cells[5].innerText) || 0;
    const totalPrice1 = qty * unitPrice1;
    row.cells[6].innerText = totalPrice1.toFixed(2);

    const unitPrice2 = parseFloat(row.cells[7].innerText) || 0;
    const totalPrice2 = qty * unitPrice2;
    row.cells[8].innerText = totalPrice2.toFixed(2);

    const unitPrice3 = parseFloat(row.cells[9].innerText) || 0;
    const totalPrice3 = qty * unitPrice3;
    row.cells[10].innerText = totalPrice3.toFixed(2);

    updateTotals();
}

// Update all totals
function updateTotals() {
    let subtotal = 0;
    let subtotal2 = 0;
    let subtotal3 = 0;

    document.querySelectorAll('#comparisonTable tbody tr').forEach(row => {
        subtotal += parseFloat(row.cells[6].innerText) || 0;
        subtotal2 += parseFloat(row.cells[8].innerText) || 0;
        subtotal3 += parseFloat(row.cells[10].innerText) || 0;
    });

    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    const vat2 = subtotal2 * 0.15;
    const total2 = subtotal2 + vat2;

    const vat3 = subtotal3 * 0.15;
    const total3 = subtotal3 + vat3;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('vat').innerText = vat.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);

    document.getElementById('subtotal2').innerText = subtotal2.toFixed(2);
    document.getElementById('vat2').innerText = vat2.toFixed(2);
    document.getElementById('total2').innerText = total2.toFixed(2);

    document.getElementById('subtotal3').innerText = subtotal3.toFixed(2);
    document.getElementById('vat3').innerText = vat3.toFixed(2);
    document.getElementById('total3').innerText = total3.toFixed(2);

    saveTableState();
}

// Download table as Excel
function downloadExcel() {
    const table = document.getElementById('comparisonTable');
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, 'comparison_table.xlsx');
}

//   Download table data as PDF file
  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape', 'pt', 'a3');
    doc.setFontSize(18);
    doc.text('Dammam Airport Company (DACO)', 40, 40);
    doc.setFontSize(12);
    doc.text('Supply Chain Department - Commercial Comparison', 40, 60);

    // Get selected option from the dropdown

    doc.autoTable({
        html: '#comparisonTable',
        startY: 80,
        theme: 'grid',
        styles: { cellPadding: 3, fontSize: 10 },
        headStyles: { fillColor: [0, 0, 0] }
    });
    doc.save('comparison.pdf');
}

// Submit a comment with edit and delete functionalities
function submitComment() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();
    if (commentText) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'bg-gray-100 border border-gray-300 p-2 mb-2 rounded flex justify-between items-center';
        
        const commentTextNode = document.createElement('span');
        commentTextNode.contentEditable = true;
        commentTextNode.innerText = commentText;
        commentTextNode.className = 'flex-grow mr-4';
        
        const editButton = document.createElement('button');
        editButton.className = 'bg-yellow-500 text-white px-2 py-1 rounded mr-2';
        editButton.innerText = 'Edit';
        editButton.onclick = () => {
            commentTextNode.focus();
            document.execCommand('selectAll', false, null);
        };

        const deleteButton = document.createElement('button');
        deleteButton.className = 'bg-red-500 text-white px-2 py-1 rounded';
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => commentDiv.remove();
        
        commentDiv.appendChild(commentTextNode);
        commentDiv.appendChild(editButton);
        commentDiv.appendChild(deleteButton);
        
        document.getElementById('comments').appendChild(commentDiv);
        commentInput.value = '';
    }
}

// Clear the comment input field
function clearComment() {
    document.getElementById('commentInput').value = '';
}

// Load table state on page load
document.addEventListener('DOMContentLoaded', loadTableState);




// Random code in dawon side




