import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col, Layout, Form, Input, Select, Button, Tooltip, message } from 'antd';
import 'antd/dist/antd.css';

class Register extends Component {

    constructor(props) {
        super(props);

        // Initializing the state 
        this.state = {
            titleData: [],
            user: {
                Titleid: "",
                Username: "",
                Password: "",
                Firstname: "",
                Lastname: "",
                Email: "",
                Alias: ""
            },
            regis:false
        };
    }

    componentDidMount() {
        this.getTitle()
    }

    getTitle() {
        var url = "https://petdiaryintern.herokuapp.com/api/title"
        axios.get(url)
            .then(response => {
                var item = response.data
                this.setState({ titleData: item })
            })
    }

    Register = () => {
        console.log(this.state.user)
        var url = "https://petdiaryintern.herokuapp.com/api/user/register"
        var data = this.state.user
        axios.post(url , data)
            .then(response => {
                console.log(response)
                message.success('สมัครเสร็จสิ้น เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน', 2)
                .then( () => {
                    axios.post("http://localhost:8001/register" , response.data)
                        .then(response => {
                            console.log(response)
                            this.setState({regis:true})
                            setTimeout("",1000)
                        })
                })
            })
            .catch(() => {
                message.error('Username หรือ Email มีผู้อื่นใช้แล้ว')
            })
    }

    onChangeTitle(e) {
        var data = this.state.user
        data.Titleid = e
        this.setState({ user: data })

    }

    onChangeUsername(e) {
        var data = this.state.user
        data.Username = e.target.value
        this.setState({ user: data })
    }

    onChangePassword(e) {
        var data = this.state.user
        data.Password = e.target.value
        this.setState({ user: data })
    }

    onChangeFirstname(e) {
        var data = this.state.user
        data.Firstname = e.target.value
        this.setState({ user: data })
    }

    onChangeLastname(e) {
        var data = this.state.user
        data.Lastname = e.target.value
        this.setState({ user: data })
    }

    onChangeAlias(e) {
        var data = this.state.user
        data.Alias = e.target.value
        this.setState({ user: data })
    }

    onChangeEmail(e) {
        var data = this.state.user
        data.Email = e.target.value
        this.setState({ user: data })
    }

    render() {
        return (
            <>
                {
                    this.state.regis && <Redirect to='/login'></Redirect>
                }
                <div style={{
                    backgroundColor: '#cfe8fc',
                    height: "100vh",
                    "background-repeat": "no-repeat",
                    "background-attachment": "fixed",
                    "background-size": "100% 100%",
                }}>

                    <Card title="สมัครสมาชิก" bordered={false}
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
                            <Form.Item label="คำนำหน้า">
                                <Select onChange={(e) => this.onChangeTitle(e)}>
                                    {
                                        this.state.titleData.map(data => {
                                            return (
                                                <Select.Option value={data.Titleid}>{data.Name}</Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="ชื่อ">
                                <Input onChange={(e) => this.onChangeFirstname(e)} />
                            </Form.Item>
                            <Form.Item label="นามสกุล">
                                <Input onChange={(e) => this.onChangeLastname(e)} />
                            </Form.Item>
                            <Form.Item label="ชื่อที่ใช้แสดง">
                                <Input onChange={(e) => this.onChangeAlias(e)} />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input onChange={(e) => this.onChangeEmail(e)} />
                            </Form.Item>
                            <Form.Item style={{ justifyContent: 'center' }}>

                                {(this.state.user.Titleid !== "" &&
                                    this.state.user.Firstname !== "" &&
                                    this.state.user.Lastname !== "" &&
                                    this.state.user.Username !== "" &&
                                    this.state.user.Password !== "" &&
                                    this.state.user.Alias !== "" &&
                                    this.state.user.Email !== "")
                                    ?
                                    <Button onClick={this.Register}>สมัครสมาชิก</Button>
                                    : <Tooltip placement="top" title="ต้องกรอกข้อมูลให้ครบก่อนจึงจะสมัครได้">
                                        <Button disabled onClick={this.Register} >สมัครสมาชิก</Button>
                                    </Tooltip>
                                }
                                <Button style={{ marginLeft: 4 }} href='/login'>ย้อนกลับ</Button>
                            </Form.Item>
                        </Form>
                    </Card>

                </div>
            </>
        )
    }
}

export default Register;