
import React, { Component } from 'react';
import { Container, Grid, Button } from "@mui/material";
import axios from 'axios';
import SeletetDiary from './selectDiary.js';
import CreateDiary from './createDiary.js';
import { Space, Card, Row, Col } from 'antd';
import 'antd/dist/antd.css';

class Diary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            diaryData: [],
            diary: null,
            page: true,
            regis: false,
            userid: localStorage.getItem('userid'),
        }
    }
    componentDidMount() {
        this.getDiary()
    }

    changePage = () => {
        this.setState({ page: false })
    }

    changePageTrue = () => {
        this.setState({ page: true })
        this.getDiary()
    }

    setRegis = () => {
        this.setState({ regis: true })
    }

    setRegisFalse = () => {
        this.setState({ regis: false })
        setTimeout(() => {
            this.getDiary()
        }, 1000)
    }



    getDiary() {
        var a
        var url = "https://petdiaryintern.herokuapp.com/api/diary/user/"
        var data = localStorage.getItem('userid')
        console.log(url + data)
        axios.get(url + data)
            .then(response => {
                var item = response.data
                a = item
            })
            .then(e => {
                this.setState({ diaryData: a })
            })
    }


    setDiaryValue(e) {
        var url = "https://petdiaryintern.herokuapp.com/api/diary/"
        var data = e
        axios.get(url + data)
            .then(response => {
                var item = response.data
                this.setState({ diary: item })
            })
            .then(() => {
                if (this.state.diary != null)
                    this.changePage()
            })
    }





    render() {
        console.log("page:" + this.state.page + " regis:" + this.state.regis)
        return (
            <>
                <div style={{
                    backgroundColor: '#cfe8fc',
                    height: "100vh",
                    "background-repeat": "no-repeat",
                    "background-attachment": "fixed",
                    "background-size": "100% 100%",
                }}>
                    <Row></Row>
                    <Row justify='center' style={{ marginTop: 15 }}>
                        <Col span={16}>
                            {
                                this.state.page &&
                                !this.state.regis &&
                                <div>
                                    <Space>
                                        <Button sx={{
                                            height: 50,
                                            bgcolor: 'primary.dark',
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                opacity: [0.9, 0.8, 0.7],
                                            },
                                            color: '#ffffff',
                                        }}
                                            onClick={this.setRegis}
                                        >
                                            Create Diary
                                        </Button>
                                        <Button sx={{
                                            height: 50,
                                            bgcolor: 'primary.dark',
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                opacity: [0.9, 0.8, 0.7],
                                            },
                                            color: '#ffffff',
                                        }}

                                            href="/picture"
                                        >
                                            Picture
                                        </Button>
                                    </Space>

                                </div>
                            }

                            {
                                this.state.diaryData.length === 0 &&
                                !this.state.regis &&
                                <h2>คุณยังไม่ได้สร้างไดอารี่เลย กดปุ่ม Create Diary เพื่อเริ่มต้นสร้างไดอารี่ของคุณ</h2>
                            }

                            {
                                this.state.page &&
                                !this.state.regis &&
                                <div style={{ marginTop: 10 }}>
                                    {
                                        this.state.diaryData.map(e => {
                                            let k = e.Diaryid
                                            return (

                                                <div
                                                    style={{
                                                        backgroundColor: '#66ffcc',
                                                        width: '100%',
                                                        height: '50px',
                                                        marginBottom: '2'
                                                    }}
                                                    value={e.Diaryid}
                                                    onClick={() => this.setDiaryValue(k)}
                                                >
                                                    <a>{e.Title + e.AddDate}</a>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                            }

                            {
                                !this.state.page && !this.state.regis && <SeletetDiary diary={this.state.diary} currentType={this.changePageTrue} />
                            }

                            {
                                this.state.page &&
                                this.state.regis &&
                                <CreateDiary currentType={this.setRegisFalse}></CreateDiary>
                            }
                        </Col>
                    </Row>
                </div>
            </>
        )
    }


}



export default Diary;