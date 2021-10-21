
import React, { Component } from 'react';
import { Typography, Input, Button, Card, Row, Col, Form , message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';

class createDiary extends Component {

    state = {
        selectedFile: null,
        diary: {
            Title: "",
            Detail: "",
            Userid: localStorage.getItem('userid')
        }
    }

    setDiaryValue = () => {
        var url = "http://petdiaryintern.herokuapp.com/api/diary/create"
        var data = this.state.diary
        var a = null
        console.log(data)
        axios.post(url, data)
            .then(response => {
                a = response
                this.uploadFiletoServer(a)
            })
            .then(e => {
                message.success('สร้างไดอารี่เสร็จสิ้น', 2)
                this.goBack()
            })
    }

    goBack = () => {
        this.props.currentType()
    }

    fileSelectHandle = (e) => {
        const reader = new FileReader()

        reader.onloadend = () => {

        }

        this.setState({ selectedFile: e.target.files[0] })
    }

    uploadFiletoServer = (e) => {
        console.log(e.data.Diaryid)

        const formData = new FormData(); 
     
        var image = this.state.selectedFile
        // Update the formData object 
        formData.append( 
          "file",  
          image ,
          e.data.Diaryid
        ); 

       
        axios.post("http://localhost:8001/upload/diary", formData)
        .then(response => {
            console.log(response)
        });
    }

    render() {


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
                                    <input
                                        type="file"
                                        onChange={this.fileSelectHandle}
                                       
                                    />
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