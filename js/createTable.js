let tableSettings = document.querySelector('.table-settings');
let tableName = document.getElementById('tableName');
let numberRows = document.getElementById('numberRows');
let numberColumns = document.getElementById('numberColumns');
let moreSettings = document.getElementById('moreSettings');
let moreSettingsHidden = document.querySelectorAll('.more-settings__hidden');

let tableBorderWidth = document.getElementById('tableBorderWidth');
let tableBorderType = document.querySelector('.table-border-type');
let tableBorderColor = document.getElementById('tableBorderColor');

let tableDataPadding = document.getElementById('tableDataPadding');

let tableDataColor = document.getElementById('tableDataColor');
let tableFontSize = document.querySelector('.table-font-size');
let tableFontColor = document.getElementById('tableFontColor');

let tableDataWidth = document.getElementById('tableDataWidth');
let dataBorderType = document.querySelector('.data-border-type');
let dataBorderColor = document.getElementById('dataBorderColor');

let modal = document.querySelector('.modal');
let btnYes = modal.querySelector('.btn-yes');
let btnNo = modal.querySelector('.btn-no');

let btnCreate = document.querySelector('.btn-create');
let btnRemove = document.querySelector('.btn-remove');

let table, row, data;

let tableData = document.getElementsByClassName('table-data');

function createTable() {
    if(getTable()) {
        manageError('p', 'error', 'Таблица может быть только одна!');
    }
    else {
        modal.classList.add('modal-hidden');
        table = createElem('table', 'table');
        tableSettings.after(table);

        let caption = createElem('caption', 'table-name', tableName.value);
        table.append(caption);

        if (!moreSettings.checked) {
            let thead = createElem('thead', 'table-header');
            table.append(thead);
            createTheadTfoot(thead, 1, numberColumns);

            let tfoot = createElem('tfoot', 'table-footer');
            table.append(tfoot);
            createTheadTfoot(tfoot, 1, numberColumns);
        }
        else {
            table.style.border = tableBorderWidth.value + 'px ' + tableBorderType.value + tableBorderColor.value;
        }

        let tbody = createElem('tbody', 'table-body');    
        table.append(tbody);

        createTableContent(tbody, numberRows, numberColumns);
    }
    return table;
}

function manageError(tag, className, text) {
    modal.classList.add('modal-hidden');

    if(!document.querySelector('.error')) {
        let error = createElem(tag, className, text);
        tableSettings.after(error);

        setTimeout(() => {
            error.classList.add('error__display');
        }, 500);

        setTimeout(() => {
            error.remove();
        }, 2000);
    }
}

function createElem(tag, className, text) {
    let elem = document.createElement(tag);
    elem.classList.add(className);
    elem.textContent = text;

    return elem;
}

function createTheadTfoot(tableSection, rows, cols) {
    for (let i = 0; i < rows; i++) {
        row = createElem('tr', 'table-row');
        tableSection.append(row);

        for (let j = 0; j < cols.value; j++) {
            data = createElem('td', 'table-data', 'Lorem ipsum dolor sit amet.');
            row.append(data);
        }
    }
    return tableSection;
}

function createTableContent(tbody, rows, cols) {
    for(let i = 0; i < rows.value; i++) {
        row = createElem('tr', 'table-row');
        tbody.append(row);

        for(let j = 0; j < cols.value; j++) {
            data = createElem('td', 'table-data', 'Lorem ipsum dolor sit amet.');
            if (moreSettings.checked) {
                data.style.padding = tableDataPadding.value + 'px';
                data.style.backgroundColor = tableDataColor.value;
                data.className += ` ${tableFontSize.value}`;
                data.style.color = tableFontColor.value;
                data.style.border = `${tableDataWidth.value}px ${dataBorderType.value} ${dataBorderColor.value}`;
            }
            row.append(data);
        }
    }
}

function getTable() {
    return document.querySelector('.table');
}

function removeTable() {
    if(getTable()) {
        table.remove();
    }
    else {
        manageError('p', 'error', 'Удалять нечего!');
    }
}

btnCreate.addEventListener('click', function() {
    modal.classList.remove('modal-hidden');

    btnYes.addEventListener('click', function () {
        table = createTable();
    });

    btnNo.addEventListener('click', function () {
        modal.classList.add('modal-hidden');
    });

    document.addEventListener('keydown', function(event) {
        if(event.key == "Enter") {
            table = createTable();
        }
        if(event.key == "Escape") {
            modal.classList.add('modal-hidden');
        }
    });
});

btnRemove.addEventListener('click', function() {
    removeTable();
});

moreSettings.addEventListener('change', function() {
    for(let i = 0; i < moreSettingsHidden.length; i++) {
        moreSettingsHidden[i].classList.toggle('more-settings__hidden');
    }
});

tableBorderWidth.addEventListener('input', function() {
    table.style.borderWidth = tableBorderWidth.value + 'px';
});

tableBorderType.addEventListener('input', function () {
    table.style.borderStyle = tableBorderType.value;
});

tableBorderColor.addEventListener('input', function () {
    table.style.borderColor = tableBorderColor.value;
});

tableDataPadding.addEventListener('input', function () {
    for(let td of tableData) {
        td.style.padding = tableDataPadding.value + 'px';
    }
});

tableDataColor.addEventListener('input', function () {
    setTimeout(() => {
        for (let td of tableData) {
            td.style.backgroundColor = tableDataColor.value;
        }
    }, 3000);
});

tableFontSize.addEventListener('change', function () {
    for (let td of tableData) {
        td.className = 'table-data ' + tableFontSize.value;
    }
});

tableFontColor.addEventListener('input', function () {
    for (let td of tableData) {
        td.style.color = tableFontColor.value;
    }
});

tableDataWidth.addEventListener('input', function () {
    for (let td of tableData) {
        td.style.borderWidth = tableDataWidth.value + 'px';
    }
});

dataBorderType.addEventListener('change', function () {
    for (let td of tableData) {
        td.style.borderStyle = dataBorderType.value;
    }
});

dataBorderColor.addEventListener('input', function () {
    for (let td of tableData) {
        td.style.borderColor = dataBorderColor.value;
    }
});