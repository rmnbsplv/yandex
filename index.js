var fio = $("#fio");
var email = $("#email");
var phone = $("#phone");
var result = $("#resultContainer");

var MyForm = {
	validate: function () {
		var isValid, errorFields = [];
		function validateFIO() {
			var regexp =  /^[A-Za-zА-Яа-яЁё ]+$/i;
			if (fio.val().match(regexp)) {
				var inputFIO = [];
				var inputFIO = fio.val().split(" ");
				if (inputFIO.length == 3) {
					return true;
				}
			}
		}
		function validateEMAIL() {
			var regexp = /^[0-9._A-Za-zА-Яа-яЁё-]+@((ya|yandex).(ru|com|kz|by|ua))$/i;
			if (email.val().match(regexp)) {
				return true;
			}
		}
		function validatePHONE() {
			var regexp = /^\+7\(\d{3}\)\d{3}(?:-\d{2}){2}$/;
			var strPhone = $("#phone").val().split("");
			var sum = 0;
			for (var i = 0; i < strPhone.length; i++) {
				if (!isNaN(strPhone[i])) {
					sum += +strPhone[i];
				}
			}
			if ((phone.val().match(regexp)) && (sum <= 30)) {
				return true;
			}
		}
		if (!validateFIO()) {
			fio.addClass("error");
			errorFields.push("FIO");
		} else {
			fio.removeClass("error");
		}
		if (!validateEMAIL()) {
			email.addClass("error");
			errorFields.push("EMAIl");
		} else {
			email.removeClass("error");
		}
		if (!validatePHONE()) {
			phone.addClass("error");
			errorFields.push("PHONE");
		} else {
			phone.removeClass("error");
		}
		if ((validateFIO()) && (validateEMAIL()) && (validatePHONE())) {
			return {
				isValid: true,
				errorFields: errorFields
			};
		} else return {
			isValid: false,
			errorFields: errorFields
		};
	},
	getData: function() {
		var data = [];
		data.fio = fio.val();
		data.email = email.val();
		data.phone = fio.phone();
		return data;
	},
	setData: function(data) {
		if (data.fio) {
			fio.val() = data.fio;
		}
		if (data.email) {
			email.val() = data.email;
		}
		if (data.phone) {
			phone.val() = data.phone;
		}
	},
	submit: function () {
		if (MyForm.validate().isValid) {
			$.ajax({
				url: "ajax/success.json",
				dataType: "json",
				success: function (data) {
				}
			});
			$("#submitButton").attr("disabled", "disabled");
		} else {
			$.ajax({
				url: "ajax/error.json",
				dataType: "json",
				success: function (data) {
				}
			});
		}
	}
};
$('#submitButton').click(function () {
	event.preventDefault();
	MyForm.submit();
});