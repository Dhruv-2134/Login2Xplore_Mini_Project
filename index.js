var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var DBName = "SCHOOL-DB";
var RelName = "STUDENT-TABLE";
var connToken = "90931562|-31949333372220940|90960016";

$("#rollno").focus();

function saveRecno2LS(jsonObj) {
    var lvdata = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvdata.rec_no);    
}

function getrollnoAsJSONObj() {
    var rollno = $('#rollno').val();
    var jsonStr12 = {
        id: rollno
    };
    return JSON.stringify(jsonStr12);
}

function fillData(jsonObj) {
    saveRecno2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#firstName").val(record.name);
    $("#secondName").val(record.salary);
    $("#Class").val(record.Class);
    $("#birthdt").val(record.birthdt);
    $("#address").val(record.address);
    $("#enrollmentdt").val(record.enrollmentdt);
}

function validateData() {
    var rollno, firstName, secondName, Class, birthdt, address, enrollmentdt;
    rollno = $("#rollno").val();
    firstName = $("#firstName").val();
    secondName = $("#secondName").val();
    Class = $("#Class").val();
    birthdt = $("#birthdt").val();
    address = $("#address").val();
    enrollmentdt = $("#enrollmentdt").val();

    if (rollno === "") {
        alert("Employee ID Missing");
        $("#rollno").focus();
        return "";
    }
    if (firstName === "") {
        alert("Employee Name is Missing");
        $("#firstName").focus();
        return "";
    }
    if (secondName === "") {
        alert("Employee Salary is Missing");
        $("#secondName").focus();
        return "";
    }
    if (Class === "") {
        alert("Class is Missing");
        $("#Class").focus();
        return "";
    }
    if (birthdt === "") {
        alert("Birth-date is Missing");
        $("#birthdt").focus();
        return "";
    }
    if (address === "") {
        alert("Address is Missing");
        $("#address").focus();
        return "";
    }
    if (enrollmentdt === "") {
        alert("Enrollment Date is Missing");
        $("#enrollmentdt").focus();
        return "";
    }
    var jsonStrObj = {
        id: rollno,
        firstname: firstName,
        lastname: secondName,
        Class: Class,
        birthdt: birthdt,
        address: address,
        enrollmentdt: enrollmentdt
    };
    return JSON.stringify(jsonStrObj);
}

document.getElementById("save").addEventListener("click", function () {
    var jsonStrin = validateData();
    if (jsonStrin === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken, jsonStrin, DBName, RelName);
    alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#rollno").focus();
    console.log(1);
});

document.getElementById("change").addEventListener("click", function () {
    $('#change').prop('disabled', true);
    var jsonChng = validateData();
    var UpdateReq = createUPDATERecordRequest(connToken, jsonChng, DBName, RelName, localStorage.getItem("recno"));
    alert(UpdateReq);
    jQuery.ajaxSetup({ async: false });
    var resJSONObj = executeCommandAtGivenBaseUrl(UpdateReq, jpdbBaseURL, jpdbIML);
    alert(JSON.stringify(resJSONObj));
    jQuery.ajaxSetup({ async: true });
    console.log(resJSONObj);
    resetForm();
    $("#rollno").focus();
    console.log(2);
});

document.getElementById("reset").addEventListener("click", function () {
    $("#rollno").val("")
    $("#firstName").val("");
    $("#secondName").val("");
    $("#Class").val("");
    $("#birthdt").val("");
    $("#address").val("");
    $("#enrollmentdt").val("");
    $("#rollno").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollno").focus();
    console.log(3);
});

function resetForm() {
    $("#rollno").val("")
    $("#firstName").val("");
    $("#secondName").val("");
    $("#Class").val("");
    $("#birthdt").val("");
    $("#address").val("");
    $("#enrollmentdt").val("");
    $("#rollno").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollno").focus();
}

function saveData() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken, jsonStr, DBName, RelName);
    alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        jpdbBaseURL, jpdbIML);
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#rollno").focus();
}

function changeData() {
    $('#change').prop('disabled', true);
    var jsonChng = validateData();
    var UpdateReq = createUPDATERecordRequest(connToken, jsonChng, DBName, RelName, localStorage.getItem("recno"));
    alert(UpdateReq);
    jQuery.ajaxSetup({ async: false });
    var resJSONObj = executeCommandAtGivenBaseUrl(UpdateReq,
        jpdbBaseURL, jpdbIML);
    alert(JSON.stringify(resJSONObj));
    jQuery.ajaxSetup({ async: true });
    console.log(resJSONObj);
    resetForm();
    $("#rollno").focus();
}

function getStud() {
    var rollnoJSONObj = getrollnoAsJSONObj();
    var getrequest = createGET_BY_KEYRequest(connToken, DBName, RelName, rollnoJSONObj);
    jQuery.ajaxSetup({ async: false });
    var resObj = executeCommandAtGivenBaseUrl(getrequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({ async: true });
    if (resObj.status === 400)
    {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#firstName").focus();
    }
    else if (resObj.status === 200)
    {
        $("#rollno").prop("disabled", true);
        fillData(resObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#firstName").focus();
    }
}
