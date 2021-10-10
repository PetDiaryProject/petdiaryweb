
import React, { Component } from 'react';
import { Typography, Input, Button, Card, Row, Col, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';

class createDiary extends Component {

    state = {
        diary: {
            Title: "",
            Detail: "",
            Userid: localStorage.getItem('userid')
        }
    }

    setDiaryValue = () => {
        var url = "https://petdiaryintern.herokuapp.com/api/diary/create"
        var data = this.state.diary
        console.log(data)
        axios.post(url, data)
            .then(reponse => {
                console.log(reponse)
            })
            .then(e => {
                this.goBack()
            })
    }

    goBack = () => {
        this.props.currentType()
    }

    render() {
        console.log(this.state)

        const { TextArea } = Input;

        const onChangeTitle = e => {
            var data = this.state.diary
            data.Title = e.target.value
            this.setState({ diary: data })
        };

        const onChangeDetail = e => {
            var data = this.state.diary
            data.Detail = e.target.value
            this.setState({ diary: data })
        };


        return (
            <>
                <div>
                    <Row></Row>
                    <Row justify='center'>
                        <Col span={12}>
                            <Form>
                                <Form.Item>
                                    <p><h1>CreateDiary</h1></p>
                                    <Typography>
                                        ชื่อไดอารี่
                                    </Typography>
                                    <Input placeholder="" allowClear onChange={onChangeTitle} />
                                </Form.Item>
                                <Form.Item>
                                    <Typography>
                                        รายละเอียด
                                    </Typography>
                                    <TextArea placeholder="" rows={10} allowClear onChange={onChangeDetail} />

                                </Form.Item>
                                <Form.Item>
                                    <Typography>
                                        เพิ่มรูปภาพ
                                    </Typography>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={this.setDiaryValue} >เพิ่มไดอารี่</Button>
                                    <Button onClick={this.goBack} >ย้อนกลับ</Button>
                                </Form.Item>
                            </Form>

                        </Col>

                    </Row>

                </div>

            </>
        )
    }
}

export default createDiary