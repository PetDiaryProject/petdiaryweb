
import React, { Component } from 'react';
import { Typography, Input, Button, Card, Row, Col, Form, Select, Switch, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';


class createBoard extends Component {

    state = {
        typeData: [],
        board: {
            Boardid: "",
            Title: "",
            Detail: "",
            Typeid: "",
            IsShow: true,
        },
        comment: {
            Commentid: "",
            Userid: localStorage.getItem('userid'),
            Boardid: "",
            Text: "",
            IsOwner: true,
        }
    }

    goBack = () => {
        this.props.currentType()
    }

    componentDidMount() {
        this.getType()
    }

    getType() {
        var url = "https://petdiaryintern.herokuapp.com/api/type"
        axios.get(url)
            .then(response => {
                var item = response.data
                console.log(item)
                this.setState({ typeData: item })
            })
    }

    onChangeType(e) {
        var data = this.state.board
        data.Typeid = e
        this.setState({ board: data })

    }

    onChangeIsShow(e) {
        var data = this.state.board
        data.IsShow = e
        this.setState({ board: data })
    }

    render() {
        console.log(this.state)

        const { TextArea } = Input;

        return (
            <>

                <div>
                    <Row></Row>
                    <Row justify='center' style={{ marginTop: 20 }}>
                        <Col span={12}>
                            <Form>
                                <Form.Item>
                                    <p><h1>สร้างบอร์ด</h1></p>
                                </Form.Item>
                                <Form.Item >

                                    <Select onChange={(e) => this.onChangeType(e)}>
                                        {
                                            this.state.typeData.map(data => {
                                                return (
                                                    <Select.Option value={data.Typeid}>{data.Name + " / " + data.NameEng}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Space>
                                        <Typography>
                                            แสดงเป็นสาธารณะหรือไม่:
                                        </Typography>
                                        <Switch defaultChecked onChange={(e) => this.onChangeIsShow(e)} />
                                    </Space>
                                </Form.Item>
                                <Form.Item>
                                    <Typography>
                                        ชื่อบอร์ด
                                    </Typography>
                                    <Input placeholder="" allowClear />
                                </Form.Item>
                                <Form.Item>
                                    <Typography>
                                        เนื้อหา
                                    </Typography>
                                    <TextArea placeholder="" rows={10} allowClear />

                                </Form.Item>
                                <Form.Item>
                                    <Typography>
                                        เพิ่มรูปภาพ
                                    </Typography>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button >เพิ่มไดอารี่</Button>
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

export default createBoard