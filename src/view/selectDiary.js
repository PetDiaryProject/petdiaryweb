import React, { Component } from 'react';
import { Paper, Container, Grid } from '@mui/material';
import { Typography, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Redirect } from 'react-router';

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
                this.changeUpdateTrue()
                this.setState({dairy:data})
            })

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
                <Container>
                    <Grid Container>
                        <Button sx={{
                            height: 50,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                            color: '#ffffff',
                        }} onClick={this.goBack}>
                            ย้อนกลับ
                        </Button>
                        <Button sx={{
                            height: 50,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                            color: '#ffffff',
                        }} onClick={this.changeUpdate}>
                            แก้ไข
                        </Button>
                    </Grid>
                    {
                        this.state.update
                        &&
                        <Paper sx={{
                            width: "100%",
                        }}
                        >
                            <Typography>
                                {this.state.diary.Title}
                            </Typography>
                            <p>
                                {this.state.diary.Detail}
                            </p>
                        </Paper>
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
                            <Button onClick={this.changeUpdateTrue} >ยกเลิก</Button>
                            <Button onClick={this.setDiaryValue}>แก้ไขไดอารี่</Button>
                        </div>
                    }
                </Container>
            </>
        )
    }
}

export default selectDiary;