import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from "axios";
import { Card, Form, Button, Input, message} from "antd"
import 'antd/dist/antd.css';


class Login extends Component {

    state = {
        username: "",
        password: "",
        checkLogin: false,
    }



    login() {
        axios.post("https://petdiaryintern.herokuapp.com/api/User/login", [this.state][0])
            .then(e => {
                if (e.data != null)
                    localStorage.setItem("userid", e.data.Userid);

            }).then(e => {
                if (localStorage.getItem('userid') !== null)
                    this.setState({ checkLogin: true })
                    

            }).catch(e => {
                message.error('Username หรือ Password ผิด',2)
            })

    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <>
                {
                    this.state.checkLogin && <Redirect to='/'></Redirect>
                }
                <div style={{
                    backgroundColor: '#cfe8fc',
                    height: "100vh",
                    "background-repeat": "no-repeat",
                    "background-attachment": "fixed",
                    "background-size": "100% 100%",
                }}>

                    <Card title="เข้าสู่ระบบ" bordered={false}
                        style={{
                            margin: 0,
                            position: "absolute",
                            top: "50%",
                            width: '50%',
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}>
                        <Form
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                        >
                            <Form.Item label="Username">
                                <Input onChange={(e) => this.onChangeUsername(e)} />
                            </Form.Item>
                            <Form.Item label="Password">
                                <Input.Password onChange={(e) => this.onChangePassword(e)} />
                            </Form.Item>
                            <Form.Item style={{justifyContent:'center'}}>
                                <Button sx={{ bgcolor: '#cfe8fc' }} onClick={(e) => this.login()}>
                                    Login
                                </Button>
                                <Button href='/register'>
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </>
        )
    }
}

export default Login;