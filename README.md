term project 코드 명세서
<table>
  <tr><td>Index</td><td>Method</td><td>URI</td><td>Description</td></tr>
  <tr><td>1</td><td>GET</td><td>termproject.html</td><td>로그인</td></tr>
  <tr><td>2</td><td>GET</td><td>signup.html</td><td>회원가입 페이지</td></tr>
  <tr><td>3</td><td>GET</td><td>sugang.html</td><td>수강신청 페이지</td></tr>
  <tr><td>4</td><td>POST</td><td>/sign</td><td>회원가입 시 아이디 중복체크</td></tr>
  <tr><td>5</td><td>POST</td><td>/tempsignin</td><td>아이디/패스워드 체크</td></tr>
  <tr><td>6</td><td>POST</td><td>suganginsert</td><td>수강신청 중복 체크</td></tr>
  <tr><td>7</td><td>GET</td><td>sugangprint</td><td>수강표 출력</td></tr>
 </table>
   
termproject.html
- 로그인 페이지인 첫 메인 화면이다.
- 아이디, 비밀번호 입력하는 input태그가 있고, 로그인, 회원가입 버튼이 있다.
- 태그들의 css는 style.css에 정의해 두었다.

signup.html
- 회원가입 페이지이다.
- 아이디, 비밀번호 입력하는 input태그가 있고, 회원가입 버튼이 있다.
- 태그들의 css는 style.css에 정의해 두었다.

sugang.html
- 수강신청 페이지이다.
- 수강신청 할 과목명, 강의 시작 시간, 강의 끝 시간을 입력하는 input 태그가 있고, 수강신청, 수강표 출력 버튼이 있다.
- 강의 시작 시간과 끝 시간은 시간:분 형태로 입력해야한다.
- 태그들의 css는 style.css에 정의해 두었다.

/sign
- post 방식으로 회원가입 시 입력한 id와 pw를 전송한다.
- info 객체배열(모든 회원의 회원가입 정보)을 이용해 해당 id가 존재하면 termproject.html(메인 페이지)로 이동, 존재하지 않는다면 알림창을 띄운 후 다시 회원가입 페이지로 이동한다.

/tempsignin
- post 방식으로 로그인 시 입력한 id와 pw를 전송한다.
- info 배열객체를 이용해 해당 id와 pw가 일치한 지 확인한 후 로그인이 성공할 시 sugang.html로 이동, 실패하면 알림창을 띄운 후 다시 로그인 페이지로 이동한다.

/suganginsert
- post 방식으로 수강 신청 시 입력한 과목명, 시작 시간, 끝 시간과 전역변수에 저장된 사용자의 id를 전송한다.
- subject 객체배열(모든 회원의 수강정보)을 이용해 현재 사용자의 id에 맞는 수강 정보를 확인하고, 과목명이 같거나, 강의 시간이 겹치는 경우 알림창을 띄우고 다시 수강신청 페이지로 이동한다.
- 이상이 없다면 subject 객체배열에 정보를 push한다.

/sugangprint
- get방식으로 전역변수로 저장해 두었던 id를 전송한다.
- subject 객체배열을 모두 탐색해서 해당 id에 맞는 수강 정보(과목명, 시작 시간, 끝 시간)를 받아와서 출력한다.
- css를 이용해 홀수번 째 row에는 하늘색 계열의 효과를, 짝수번 째 row에는 흰색의 효과를 설정했다.

