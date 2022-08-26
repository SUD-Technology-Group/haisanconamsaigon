$(document).ready(function () {
    $('#addRow').click(function () {
        var html = ``;
        html += `<div id="inputFormRow" class="input-group mb-4">
        <input type="text" placeholder="Nhập kích thước" name="size[]"class="form-control" required>
        <button id="removeRow" type="button" class="btn btn-danger">Xóa</button>
        </div>`
        $('#newRow').append(html)
    })
    $(document).on('click', '#removeRow', function () {
        $(this).closest('#inputFormRow').remove();
    });
})