$(document).ready(function () {
    $('#addRow').click(function () {
        var html = ``;
        html += `<div id="inputFormRow" class="row">
        <div class="col-sm-4">
        <div class="form-group mb-4">
            <input type="number" placeholder="Nhập số lượng" name="quantity[]"
                class="form-control" required="">
                </div>
        </div>
        <div  class="col-sm-4">
            <div class="form-group">
                <div class="input-group">
                    <input type="number" placeholder="Nhập giá" name="price[]"
                        class="form-control" required="">
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="form-group">
                <div class="input-group">
                    <input type="text" placeholder="Nhập kích thước" name="size[]"
                        class="form-control" required="">
                    <button id="removeRow" type="button"
                        class="btn btn-danger">Xóa</button>
                </div>
            </div>
        </div>
    </div>`
        $('#newRow').append(html)
    })
    $(document).on('click', '#removeRow', function () {
        $(this).closest('#inputFormRow').remove();
    });
})