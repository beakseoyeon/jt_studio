var messages = {
    success: '신청이 완료되었습니다.',
    error: '전송에 실패했습니다. 다시 시도해주세요.',
    validation: '모든 항목을 올바르게 입력해주세요.'
};

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function escapeSpecialChars(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function sendAjaxRequest(url, data, successCallback, errorCallback) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: successCallback,
        error: errorCallback
    });
}

function submitFixedForm(event) {
    event.preventDefault();
    var submitButton = document.getElementById("consultation_submit");
    var name = escapeSpecialChars(document.getElementById("client_name").value);
    var email = escapeSpecialChars(document.getElementById("client_email").value);
    var detail = escapeSpecialChars(document.getElementById("client_detail").value);

    if (name && validateEmail(email) && detail) {
        submitButton.disabled = true;
        submitButton.innerText = '전송 중...';

        sendAjaxRequest(
            "https://script.google.com/macros/s/AKfycbw7NPBj8e0KJvP5oLbadz0oG0wlkrD34T__HYgObspwM8jxjo5Z9iyGelWNWGGWSvR7Gw/exec",
            { "name": name, "email": email, "detail": detail },
            function(response) {
                alert(messages.success);
                location.reload();
            },
            function() {
                alert(messages.error);
                submitButton.disabled = false;
                submitButton.innerText = '상담신청';
            }
        );
    } else {
        alert(messages.validation);
    }
}