var express = require("express");
var app = express();
const { parse } = require("querystring");
const querystring = require('querystring');
const path = require('path');
const bodyParser = require('body-parser');
const { stringify } = require("querystring");
var msg = require('dialog');


app.use('/views', express.static(path.join(__dirname, '/views')));
app.use('*/img', express.static(path.join(__dirname, '/img')));
app.use('*/css', express.static(path.join(__dirname, '/css')));
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
let current_id;
let info = [];
let subject = new Array(1000);
let exist_id;
for (let i = 0; i < 1000; i++) {
    subject[i] = new Array(4);
}
let subjectsize = 0;


app.get('/', function (req, res) {
    res.render('termproject.html');
});

app.get('/signup', function (req, res) {
    res.render('signup.html');
});

app.get('/sugang', function (req, res) {
    res.render('sugang.html');
});

app.get('/print', function (req, res) {
    res.render('print.html');
});

app.post('/sign', function (req, res) {
    const id = req.body.signup_id;
    const pw = req.body.signup_pw;

    console.log(id + ", " + pw);
    exist_id = false;
    for (let i of info) {
        if (i.id == id) {
            exist_id = true;
            break;
        }
    }
    if (exist_id == true) {
        res.write(" <head><meta charset=\"UTF-8\"></head>");
        res.write("<script>alert('이미 존재하는 id입니다. 다시 입력해주세요.')</script>");
        res.write("<script>window.location=\"/signup\"</script>");
    }
    else {
        info.push({ id: id, pw: pw });
        res.write(" <head><meta charset=\"UTF-8\"></head>");
        res.write("<script>alert('회원가입에 성공했습니다. 로그인 페이지로 넘어갑니다.')</script>");
        res.write("<script>window.location=\"/\"</script>");
    }
});

app.post('/tempsignin', function (req, res) {
    const id = req.body.input_id;
    const pw = req.body.input_pw;
    let check_id = false;
    for (let i of info) {
        if (i.id == id) {
            check_id = true;
            if (i.pw == pw) {
                current_id = id;
                res.write(" <head><meta charset=\"UTF-8\"></head>");
                res.write("<script>alert('로그인 완료. 수강정보 사이트로 넘어갑니다.')</script>");
                res.write("<script>window.location=\"/sugang\"</script>");
                break;
            }
            else {
                res.write(" <head><meta charset=\"UTF-8\"></head>");
                res.write("<script>alert('패스워드가 다릅니다. 다시 입력하세요.')</script>");
                res.write("<script>window.location=\"/\"</script>");
                break;
            }
        }
    }
    console.log(check_id);
    if (!check_id) {
        res.write(" <head><meta charset=\"UTF-8\"></head>");
        res.write("<script>alert('회원가입 정보에 입력한 id가 존재하지 않습니다. 다시 입력하세요.')</script>");
        res.write("<script>window.location=\"/\"</script>");
    }
});

app.post('/suganginsert', function (req, res) {
    const id = current_id;
    console.log(current_id);
    const subjectname = req.body.subject_name;
    const starttime = req.body.subject_start_time;
    const endtime = req.body.subject_end_time;
    console.log(id + "\n" + subjectname + "\n" + starttime + "\n" + endtime);
    let start = Number(starttime.toString('utf8').split(":")[0]) * 60 + Number(starttime.toString('utf8').split(":")[1]);
    let end = Number(endtime.toString('utf8').split(":")[0]) * 60 + Number(endtime.toString('utf8').split(":")[1]);
    console.log(start + ", " + end);
    console.log(subject);
    let check_sugang = true;
    for (let i = 0; i < subjectsize; i++) {
        if (subject[i][0] == id) {
            if (subject[i][1] == subjectname) {
                check_sugang = false;
                res.write(" <head><meta charset=\"UTF-8\"></head>");
                res.write("<script>alert('이미 등록된 교과목입니다. 다시 입력하세요.')</script>");
                res.write("<script>window.location=\"/sugang\"</script>");
                break;
            }
            let start_temp = Number(subject[i][2].toString('utf8').split(":")[0]) * 60 + Number(subject[i][2].toString('utf8').split(":")[1]);
            let end_temp = Number(subject[i][3].toString('utf8').split(":")[0]) * 60 + Number(subject[i][3].toString('utf8').split(":")[1]);
            console.log(start + "\n" + end + "\n" + start_temp + "\n" + end_temp);
            if ((start >= start_temp && start < end_temp) || (end > start_temp && end <= end_temp)) {
                check_sugang = false;
                res.write(" <head><meta charset=\"UTF-8\"></head>");
                res.write("<script>alert(\"시간이 겹치는 교과목이 존재합니다.\")</script>");
                res.write("<script>window.location=\"/sugang\"</script>");
                break;
            }
            if (start_temp > end_temp) {
                check_sugang = false;
                res.write(" <head><meta charset=\"UTF-8\"></head>");
                res.write("<script>alert('교과목 시작 시간이 종료 시간보다 큽니다. 다시 입력하세요.')</script>");
                res.write("<script>window.location=\"/sugang\"</script>");
                break;
            }
        }
    }
    if (check_sugang) {
        subject[subjectsize][0] = id;
        subject[subjectsize][1] = subjectname;
        subject[subjectsize][2] = starttime;
        subject[subjectsize][3] = endtime;
        subjectsize++;
        res.write(" <head><meta charset=\"UTF-8\"></head>");
        res.write("<script>alert('수강신청이 완료되었습니다.')</script>");
        res.write("<script>window.location=\"/sugang\"</script>");
    };
});

app.get('/sugangprint', function (req, res) {
    let output = '';
    output += '<html><head><meta charset = \"UTF - 8\">';
    output += '<link rel="stylesheet" href="/css/table.css" /></head>'
    output += '<body><table border = \"1\" align = \"center\"><tr><td>수강과목</td><td>시작시간</td><td>종료시간</td></tr>';
    for (let i = 0; i < subjectsize; i++) {
        if (subject[i][0] == current_id) {
            output += '<tr><td>' + subject[i][1] + '</td><td>' + subject[i][2] + '</td><td>' + subject[i][3] + '</td></tr>';
        }
    }
    output += '</table></body></html>';
    console.log(output);
    res.send(output);
});

app.listen(9999);