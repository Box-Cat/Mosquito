import React,{ useState }  from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>아이디</Form.Label>
        <Form.Control placeholder="아이디를 입력해주세요~"/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type="password" placeholder="비밀번호를 입력해주세요~" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="아이디 기억하기" />
      </Form.Group>
      <Button variant="primary" type="submit">
        로그인
      </Button>
      <Button>회원가입</Button>
    </Form>
  )
}

export default Login