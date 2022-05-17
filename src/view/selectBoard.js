import React, { Component } from 'react';
import { Paper, Container, Button, Grid, Stack } from '@mui/material';
import axios from "axios";
import { Typography, Input, message, Switch } from 'antd';
import 'antd/dist/antd.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BackspaceIcon from '@mui/icons-material/Backspace';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

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
        board: null

    }


    componentDidMount() {
        this.getComment()
        this.setState({ board: this.props.board })
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

    getComment1(e) {
        var a = []
        var url = "https://petdiaryintern.herokuapp.com/api/comment/byBoard/"
        var data = e
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
        this.setState({ board: data })
        var url = "https://petdiaryintern.herokuapp.com/api/board/update"
        axios.put(url, data)
            .then(response => {
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
            })
            .then(() => {
                message.success('เพิ่มคอมเมนต์เสร็จสิ้น', 2)
                setTimeout(this.getComment1(this.props.board.Boardid), 1000);
            })

    }

    deleteComment = (e) => {
        var url = "https://petdiaryintern.herokuapp.com/api/comment/delete"
        var data = e.Commentid
        axios.delete(url + "/" + data)
            .then(response => {
                var item = response
                message.error('ลบคอมเมนต์เสร็จสิ้น', 2)
                setTimeout(this.getComment1(this.props.board.Boardid), 1000);
            })

    }

    onChangeTitle = (e) => {
        var a = this.state.board
        a.Title = e.target.value
        this.setState({ board: a })
    }

    onChangeDetail = (e) => {
        var a = this.state.board
        a.Comments.map(comment => {
            if (comment.IsOwner == true)
                comment.Text = e.target.value
        })
        this.setState({ board: a })
    }

    updateBoard = () => {
        var data = this.state.board
        var url = "https://petdiaryintern.herokuapp.com/api/board/update"
        axios.put(url, data)
            .then(response => {
                var c = null
                this.state.board.Comments.map(comment => {
                    if (comment.IsOwner == true)
                        c = comment
                })
                console.log(c)
                var url = "https://petdiaryintern.herokuapp.com/api/Comment/update"
                axios.put(url, c)
                    .then(response => {
                        message.success('แก้ไขคอมเมนต์เสร็จสิ้น', 2)
                        setTimeout(this.getComment1(this.props.board.Boardid), 1000);
                        this.changeUpdateTrue()

                    })
            })
    }



    render() {
        console.log(this.state)

        const { TextArea } = Input;

        return (
            <>
                <Container key={this.props.board.Boardid}>
                    <Grid Container>
                        <Stack direction="row" spacing={2}
                            justifyContent="flex-start"
                        >
                            <Button sx={{
                                height: 50,
                                marginTop: 1,
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
                            {
                                this.state.ownerid == this.state.userid
                                &&
                                <div>
                                    <Stack direction="row" spacing={2}
                                        alignItems="center">
                                        <Button sx={{
                                            height: 50,
                                            marginTop: 1,
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
                                        {/* <div> */}
                                        {/* <Stack direction="row" spacing={2} */}

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
                                            <Switch onChange={(e) => this.onChangeIsShow()} />
                                        }
                                        {/* </div> */}
                                    </Stack>
                                </div>

                            }
                        </Stack>
                    </Grid>
                    {
                        this.state.update
                        &&
                        <Grid >
                            <Grid item>
                                <Card sx={{
                                    width: '100%',
                                    marginTop: 1,
                                }}
                                >
                                    <CardContent>
                                        <Typography>
                                            ชื่อบอร์ด :  {this.props.board.Title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                {
                                    this.state.comment.map(data => {
                                        var a = data
                                        return (
                                            <div>
                                                <Card sx={{
                                                    width: "100%",
                                                    marginBottom: 1,
                                                }}
                                                >
                                                    <CardContent>
                                                        <Typography>
                                                            {data.Text}
                                                        </Typography>
                                                        <Divider />
                                                        <p> วันที่ : {data.AddDate + "\nผู้ใช้ : " + data.User.Alias}</p>
                                                        {
                                                            !data.IsOwner
                                                            &&
                                                            data.Userid == this.state.userid
                                                            &&
                                                            <Button variant="outlined"

                                                                startIcon={<BackspaceIcon />}
                                                                onClick={() => this.deleteComment(a)}>
                                                                ลบคอมเมนต์
                                                            </Button>

                                                        }
                                                    </CardContent>
                                                </Card>

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
                            <Input allowClear defaultValue={this.state.board.Title} onChange={this.onChangeTitle}></Input>
                            <Typography>
                                ข้อความ
                            </Typography>
                            <TextArea rows={10} allowClear defaultValue={this.state.board.Comments.map(e => {
                                if (e.IsOwner == true) {
                                    return (e.Text)
                                }
                            })} onChange={this.onChangeDetail}></TextArea>
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
                                onClick={this.updateBoard}>
                                    แก้ไขบอร์ด
                            </Button>
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
                                startIcon={<CloseIcon />}
                                onClick={this.changeUpdateTrue} >
                                    ยกเลิก
                            </Button>
                            
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
                            <Button variant="contained"
                                sx={{ marginTop: 1, }}

                                startIcon={<AddCommentIcon />}
                                onClick={() => this.creteNewComment()}>เพิ่มคอมเมนต์</Button>

                        </div>
                    }
                </Container>
            </>
        )
    }
}

export default selectBoard;