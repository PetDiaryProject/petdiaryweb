import React, { Component } from 'react';
import { Paper, Container, Grid } from '@mui/material';
import axios from "axios";
import { Typography, Input, Button, message, Switch } from 'antd';
import 'antd/dist/antd.css';

class selectBoard extends Component {

    state = {
        update: true,
        goBack: false,
        comment: [],
        userid: localStorage.getItem('userid'),
        ownerid: null,
        newComment: {
            "Userid": localStorage.getItem('userid'),
            "Boardid": this.props.board.Boardid,
            "Text": "",
            "IsOwner": false,
        },
        board : null

    }


    componentDidMount() {
        this.getComment()
        this.setState({board : this.props.board})
    }

    getComment() {
        var a = []
        var url = "https://petdiaryintern.herokuapp.com/api/comment/byBoard/"
        var data = this.props.board.Boardid
        axios.get(url + data)
            .then(response => {
                var item = response.data
                item.map(e => {
                    a.push(e)
                })
            })
            .then(e => {
                this.setState({ comment: a })
            })
            .then(e => {
                this.getOwnerid()
            })
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

    onChangeText(e) {
        var data = this.state.newComment
        data.Text = e.target.value
        this.setState({ newComment: data })
    }

    onChangeIsShow = (e) => {
        var data = this.state.board
        data.IsShow = !(data.IsShow)
        this.setState({board : data})
        var url = "https://petdiaryintern.herokuapp.com/api/board/update"
        axios.put(url , data)
            .then(response => {
                console.log(response)
            })
    }

    getOwnerid() {
        this.state.comment.map(e => {
            if (e.IsOwner == true)
                this.setState({ ownerid: e.Userid.toString() })
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

    

    creteNewComment = () => {
        var url = "https://petdiaryintern.herokuapp.com/api/comment/create"
        var data = this.state.newComment
        axios.post(url, data)
            .then(response => {
                var item = response
                console.log(item)
            })
            .then(() => {
                setTimeout(() => {
                    message.success('เพิ่มคอมเมนเสร็จสิ้น', 2)
                }, 1000);
            })

    }

    deleteComment = (e) => {
        var url = "https://petdiaryintern.herokuapp.com/api/comment/delete"
        var data = e.Commentid
        axios.delete(url + "/" + data)
            .then(response => {
                var item = response
                console.log(item)
            })

    }


    render() {
        console.log(this.state)

        const { TextArea } = Input;

        return (
            <>
                <Container key={this.props.board.Boardid}>
                    <Grid Container>
                        <Button sx={{ bgcolor: '#66ffcc' }} onClick={this.goBack}>
                            ย้อนกลับ
                        </Button>
                        {
                            this.state.ownerid == this.state.userid
                            &&
                            <div>
                                <Button sx={{ bgcolor: '#66ffcc' }} onClick={this.changeUpdate}>
                                    แก้ไข
                                </Button>
                                <Typography>
                                    แสดงเป็นสาธารณะหรือไม่:
                                </Typography>
                                {
                                    this.state.board.IsShow 
                                    &&
                                    <Switch defaultChecked onChange={(e) => this.onChangeIsShow()} />
                                }
                                {
                                    !this.state.board.IsShow
                                    &&
                                    <Switch  onChange={(e) => this.onChangeIsShow()} />
                                }
                                
                            </div>

                        }

                    </Grid>
                    {
                        this.state.update
                        &&
                        <Grid >
                            <Grid item>
                                <Paper sx={{ width: '100%', bgcolor: '#ffffff' }}>
                                    <Typography>
                                        {this.props.board.Title}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item>
                                {
                                    this.state.comment.map(data => {
                                        var a = data
                                        return (
                                            <div>
                                                <Paper sx={{
                                                    width: "100%",
                                                    mt: '2',
                                                    mb: '2'
                                                }}
                                                >
                                                    <Typography>
                                                        {data.Text}
                                                    </Typography>
                                                    <p> {data.AddDate + "\n" + data.User.Alias}</p>
                                                    {
                                                        !data.IsOwner
                                                        &&
                                                        data.Userid == this.state.userid
                                                        &&
                                                        <Button onClick={() => this.deleteComment(a)}>
                                                            ลบคอมเมน
                                                        </Button>
                                                    }
                                                </Paper>

                                            </div>

                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                    }
                    {
                        !this.state.update
                        &&
                        <div>
                            <Typography>
                                ชื่อบอร์ด
                            </Typography>
                            <Input allowClear></Input>
                            <Typography>
                                ข้อความ
                            </Typography>
                            <TextArea rows={10} allowClear ></TextArea>
                            <br></br>
                            <Button onClick={this.changeUpdateTrue} >ยกเลิก</Button>
                            <Button >แก้ไขบอร์ด</Button>
                        </div>
                    }
                    {
                        this.state.update
                        &&
                        <div>
                            <Typography>
                                Comment
                            </Typography>
                            <TextArea defaultValue={this.state.comment.Text} rows={5} allowClear onChange={(e) => this.onChangeText(e)}></TextArea>
                            <br></br>
                            <Button onClick={this.creteNewComment}>เพิ่มคอมเมน</Button>
                        </div>
                    }
                </Container>
            </>
        )
    }
}

export default selectBoard;