$(function () {
    let tableSettings = $('.table-settings');
    let tableName = $('#tableName');
    let numberRows = $('#numberRows');
    let numberColumns = $('#numberColumns');
    let moreSettings = $('#moreSettings');
    let moreSettingsHidden = $('.more-settings__hidden');

    let tableBorderWidth = $('#tableBorderWidth');
    let tableBorderType = $('.table-border-type');
    let tableBorderColor = $('#tableBorderColor');

    let tableDataPadding = $('#tableDataPadding');

    let tableDataColor = $('#tableDataColor');
    let tableFontSize = $('.table-font-size');
    let tableFontColor = $('#tableFontColor');

    let tableDataWidth = $('#tableDataWidth');
    let dataBorderType = $('.data-border-type');
    let dataBorderColor = $('#dataBorderColor');

    let modal = $('.modal');
    let btnYes = $('.btn-yes');
    let btnNo = $('.btn-no');

    let btnCreate = $('.btn-create');
    let btnRemove = $('.btn-remove');

    let table, row, data;

    function createTable() {
        if (getTable()) {
            manageError('p', 'error', 'Таблица может быть только одна!');
        }
        else {
            modal.addClass('modal-hidden');
            table = createElem('table', 'table');

            tableSettings.after(table);

            let caption = createElem('caption', 'table-name', tableName.val());
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
                table.style.border = tableBorderWidth.val() + 'px ' + tableBorderType.val() + tableBorderColor.val();
            }

            let tbody = createElem('tbody', 'table-body');
            table.append(tbody);

            createTableContent(tbody, numberRows, numberColumns);
        }
        return table;
    }

    function manageError(tag, className, text) {
        let error;
        modal.addClass('modal-hidden');

        if (!error) {
            error = createElem(tag, className, text);
            tableSettings.after(error);

            error = $('.error');

            setTimeout(() => { error.addClass('error__display'); }, 500);
            setTimeout(() => { error.remove(); }, 2000);
        }
    }

    function createElem(tag, className, text) {
        let elem = document.createElement(tag);

        elem.classList.add(className);
        if (text) {
            elem.textContent = text;
        }

        return elem;
    }

    function createTheadTfoot(tableSection, rows, cols) {
        for (let i = 0; i < rows; i++) {
            row = createElem('tr', 'table-row');
            tableSection.append(row);

            for (let j = 0; j < cols.val(); j++) {
                data = createElem('td', 'table-data', 'Lorem ipsum dolor sit amet.');
                row.append(data);
            }
        }
        return tableSection;
    }

    function createTableContent(tbody, rows, cols) {
        for (let i = 0; i < rows.val(); i++) {
            row = createElem('tr', 'table-row');
            tbody.append(row);

            for (let j = 0; j < cols.val(); j++) {
                data = createElem('td', 'table-data', 'Lorem ipsum dolor sit amet.');
                row.append(data);

                data = $('.table-data');
                if (moreSettings.prop("checked")) {
                    data.css({
                        'padding': tableDataPadding.val() + 'px',
                        'backgroundColor': tableDataColor.val(),
                        'color': tableFontColor.val(),
                        'border': `${tableDataWidth.val() + 'px'} ${dataBorderType.val()} ${dataBorderColor.val()}`
                    });

                    data.addClass(tableFontSize.val());
                }
            }
        }
    }

    function getTable() {
        return $('.table').hasClass('table');
    }

    function removeTable() {
        getTable() ? $('.table').remove() : manageError('p', 'error', 'Удалять нечего!');
    }

    function getTableData() {
        return $('.table-data');
    }

    btnCreate.on('click', function () {
        modal.removeClass('modal-hidden');

        btnYes.on('click', () => { table = createTable(); });
        btnNo.on('click', () => { modal.addClass('modal-hidden'); });

        document.addEventListener('keydown', function (event) {
            if (event.key == "Enter") {
                table = createTable();
            }
            if (event.key == "Escape") {
                modal.addClass('modal-hidden');
            }
        });
    });

    btnRemove.on('click', () => { removeTable(); });

    moreSettings.on('change', () => { moreSettingsHidden.toggleClass('more-settings__hidden'); });

    tableBorderWidth.on('input', () => { $('.table').css('border-width', tableBorderWidth.val() + 'px'); });
    tableBorderType.on('input', () => { $('.table').css('border-style', tableBorderType.val()); });
    tableBorderColor.on('input', () => { $('.table').css('border-color', tableBorderColor.val()); });

    tableDataPadding.on('input', () => { getTableData().css('padding', tableDataPadding.val() + 'px'); });
    tableDataColor.on('input', () => { getTableData().css('background-color', tableDataColor.val()); });
    tableFontSize.on('change', () => { getTableData().attr('class', 'table-data ' + tableFontSize.val()); });
    tableFontColor.on('input', () => { getTableData().css('color', tableFontColor.val()); });

    tableDataWidth.on('input', () => { getTableData().css('border-width', tableDataWidth.val()); });
    dataBorderType.on('change', () => { getTableData().css('border-style', dataBorderType.val()); });
    dataBorderColor.on('input', () => { getTableData().css('border-color', dataBorderColor.val()); });
});