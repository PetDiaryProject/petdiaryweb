
import React, { Component } from 'react';
import { Typography, Input,  Card, Row, Col, Form, Select, Switch, Space , message} from 'antd';
import { Button } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

class createBoard extends Component {

    state = {
        typeData: [],
        boardid: "",
        board: {
            Title: "",
            Detail: "",
            Typeid: "",
            IsShow: true,
        },
        comment: {
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

    buildBoard = () => {
        var url = "https://petdiaryintern.herokuapp.com/api/board/create"
        var data = this.state.board
        axios.post(url, data)
            .then(response => {
                var item = response.data
                url = "https://petdiaryintern.herokuapp.com/api/comment/create"
                data = this.state.comment
                data.Boardid = item
                console.log(data)
                axios.post(url, data)
                    .then(response => {
                        
                        message.success('สร้างบอร์ดเสร็จสิ้น', 2)
                        this.goBack()
                    })
            })
    }

    createComment = (e) => {
        console.log(e)
        var url = "https://petdiaryintern.herokuapp.com/api/comment/create"
        var data = this.state.comment
        data.Boardid = e
        console.log(data)
        axios.post(url, data)
            .then(response => {
                this.goBack()
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

    onChangeTitle(e) {
        var data = this.state.board
        data.Title = e
        this.setState({ board: data })
    }

    onChangeDetail(e) {
        var data = this.state.board
        data.Detail = e
        this.setState({ board: data })
        var data = this.state.comment
        data.Text = e
        this.setState({ comment: data })

    }

    onChangeBoardid(e) {
        var data = this.state.comment
        data.Boardid = e
        this.setState({ comment: data })
    }

    render() {
        //console.log(this.state.board)

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
                                    <Typography>
                                        หมวดหมู่
                                    </Typography>
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
                                    <Input placeholder="" allowClear onChange={(e) => this.onChangeTitle(e.target.value)} />
                                </Form.Item>
                                <Form.Item>
                                    <Typography>
                                        เนื้อหา
                                    </Typography>
                                    <TextArea placeholder="" rows={10} allowClear onChange={(e) => this.onChangeDetail(e.target.value)} />
                                </Form.Item>
                                <Form.Item>
                                    {/* <Typography>
                                        เพิ่มรูปภาพ
                                    </Typography>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
                                </Form.Item>
                                <Form.Item>
                                    <Button sx={{
                                        marginTop: 1,
                                        height: 50,
                                        marginRight: 1,
                                        bgcolor: 'primary.dark',
                                        '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                        },
                                        color: '#ffffff',
                                        }}
                                        startIcon={<AddIcon />}
                                        onClick={this.buildBoard}
                                        >
                                        เพิ่มบอร์ด
                                    </Button>
                                    <Button sx={{
                                        marginTop: 1,
                                        height: 50,
                                        bgcolor: 'primary.dark',
                                        '&:hover': {
                                        backgroundColor: 'primary.main',
                                        opacity: [0.9, 0.8, 0.7],
                                        },
                                        color: '#ffffff',
                                        }}
                                        startIcon={<ArrowBackIosIcon />}
                                        onClick={this.goBack}
                                    >
                                        ย้อนกลับ
                                    </Button>
                                    
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