var ERROR = false;
$(document).ready(function(){
    $('#form').on('submit', function(){
        var d = $('#input').val(),
            b = /.бел$/,
            mes;

        if(d==''){
          mes = 'Введите кириллическое название домена';
            ERROR = true;
        }
        if(ERROR){
            $('#input').addClass('error');
            $('.error-box').text(mes).show();
            return false;
        }
        else{
            $('#input').val(d.toLowerCase().replace(b, ''));
        }

    })
})
function notLatin(input) {
    var value = input.value;
    var rep = /[_\\/!@$%^&*#?№()=+;~":a-zA-Z]/;
    if (rep.test(value)) {
        ERROR = true;
        value = value.replace(rep, '');
        input.value = value;
        $('#input').addClass('error');
        $('.error-box').text('Название не может содержать латинские буквы или спецсимволы').show();
    }
    else{
        ERROR = false;
        $('#input').removeClass('error');
        $('.error-box').fadeOut('fast');
    }
}