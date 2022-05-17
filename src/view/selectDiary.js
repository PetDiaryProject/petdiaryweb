import React, { Component } from 'react';
import { Paper, Container, Grid, Button } from '@mui/material';
import { Typography, Input, message } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Icon from '@mui/material/Icon';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

class selectDiary extends Component {

    state = {
        update: true,
        goBack: false,
        diary: {
            Diaryid: this.props.diary.Diaryid,
            Title: this.props.diary.Title,
            Detail: this.props.diary.Detail
        }
    }


    goBack = () => {
        this.props.currentType()
    }

    changeUpdate = () => {
        this.setState({ update: false })
    }

    changeUpdateTrue = () => {
        this.setState({ update: true })
    }

    setDiaryValue = () => {
        var url = "https://petdiaryintern.herokuapp.com/api/diary/update"
        var data = this.state.diary
        console.log(data)
        axios.put(url, data)
            .then(reponse => {
                message.success('แก้ไขไดอารี่เสร็จสิ้น', 2)
                this.setState({ dairy: data })
                setTimeout(this.changeUpdateTrue(), 1000)

            })

    }

    fileSelectHandle = (e) => {
        const reader = new FileReader()

        reader.onloadend = () => {

        }

        this.setState({ selectedFile: e.target.files[0] })
    }

    uploadFiletoServer = () => {
        console.log(this.state.selectedFile)

        const formData = new FormData();

        var image = this.state.selectedFile
        // Update the formData object 
        formData.append(
            "file",
            image
        );

        // Details of the uploaded file 
        console.log(image);

        axios.post("http://localhost:8001/upload", formData);
    }

    deleteDiary = () => {
        var url = "https://petdiaryintern.herokuapp.com/api/diary/delete"
        var data = this.state.diary.Diaryid
        console.log(data)
        axios.delete(url + "/" + data)
            .then(reponse => {
                this.goBack()
            })

    }

    render() {
        console.log(this.props.diary)
        //console.log(this.state)
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
                <Container>
                    <Grid Container>
                        <Button sx={{
                            height: 50,
                            marginBottom: 1,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                            color: '#ffffff',
                        }}
                            startIcon={<ArrowBackIosIcon />}
                            onClick={this.goBack}>
                            ย้อนกลับ
                        </Button>
                        <Button sx={{
                            height: 50,
                            marginLeft: 1,
                            marginRight: 1,
                            marginBottom: 1,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                            color: '#ffffff',
                        }}
                            startIcon={<BorderColorIcon />}
                            onClick={this.changeUpdate}>
                            แก้ไข
                        </Button>
                        <Button sx={{
                            height: 50,
                            marginBottom: 1,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                            color: '#ffffff',
                        }}
                            startIcon={<DeleteIcon />}
                            onClick={this.deleteDiary}>
                            ลบ
                        </Button>
                    </Grid>
                    {
                        this.state.update
                        &&
                        <Card sx={{ Width: "50%" }}
                        >
                            <CardContent>

                                <Typography >
                                    ชื่อไดอารี่ : {this.state.diary.Title}
                                </Typography>
                                <Divider />

                                <p>
                                    เนื้อหาไดอารี่ : {this.state.diary.Detail}
                                </p>
                                <Divider />
                                <p>
                                    วันที่เขียนไดอารี่ : {this.props.diary.AddDate}

                                </p>
                            </CardContent>
                        </Card>
                    }
                    {
                        !this.state.update
                        &&
                        <div>
                            <Typography>
                                ชื่อไดอารี่
                            </Typography>
                            <Input defaultValue={this.state.diary.Title} allowClear onChange={onChangeTitle}></Input>
                            <Typography>
                                รายละเอียด
                            </Typography>
                            <TextArea defaultValue={this.state.diary.Detail} rows={10} allowClear onChange={onChangeDetail}></TextArea>

                            <br></br>
                            <Button sx={{
                                height: 50,
                                marginTop: 1,
                                marginRight: 1,
                                bgcolor: 'primary.dark',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                                color: '#ffffff',
                            }}
                                startIcon={<CheckIcon />}
                                onClick={this.setDiaryValue}>
                                แก้ไขไดอารี่
                            </Button>
                            <Button sx={{
                                height: 50,
                                marginTop: 1,
                                bgcolor: 'primary.dark',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                                color: '#ffffff',
                            }}
                                startIcon={<CloseIcon />}
                                onClick={this.changeUpdateTrue}>
                                ยกเลิก
                            </Button>


                        </div>
                    }
                </Container>
            </>
        )
    }
}

export default selectDiary;