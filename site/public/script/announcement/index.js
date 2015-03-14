// item index script
$().ready(function() {
    doDataRefresh();
    setInterval(doDataRefresh, 2000);
});

function doDataRefresh() {
    var url = '/data/item/list'
    $.get(url, function(data) {
        var items = data.docs;
        $('.item-list tbody').html('');
        updateList(items);
    });
}

function updateList(items) {
    var tableContent = $('.item-list tbody');
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var tableRow = '<tr>' +
            '<td>' + item.type + '</td>' +
            '<td>' + item.content + '</td>' +
            '<td>' + moment(item.create_date).format('MM/DD/YYYY hh:mm:ss') + '</td>' +
            '</tr>';
        tableContent.append(tableRow);
    }
}