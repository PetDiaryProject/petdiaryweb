import React, { Component } from 'react';
import axios from "axios";
import { Grid, Container } from '@mui/material';
import { Button, Row, Col } from 'antd'
import SelectBoard from "./selectBoard.js";
import 'antd/dist/antd.css';
class listBoard extends Component {

    state = {
        boardData: [],
        userid: localStorage.getItem('userid'),
        board: "",
        page: true
    }

    componentDidMount() {
        this.getListBoard()
    }

    changePage() {
        this.setState({ page: false })
    }

    handleType = () => {
        this.setState({ page: true })
    }

    getListBoard() {
        var url = "https://petdiaryintern.herokuapp.com/api/board/user/"
        var data = this.state.userid
        axios.get(url + data)
            .then(response => {
                var item = response.data
                this.setState({ boardData: item })
            })

    }

    setBoardValue(e) {
        var url = "https://petdiaryintern.herokuapp.com/api/board/"
        var data = e
        console.log(data)
        axios.get(url + data)
            .then(response => {
                var item = response.data
                this.setState({ board: item })
            })
            .then(() => {
                if (this.state.board != null)
                    this.changePage()
            })
    }

    render() {
        return (
            <>
                <div style={{
                    backgroundColor: '#cfe8fc',
                    height: "100vh",
                    "background-repeat": "no-repeat",
                    "background-attachment": "fixed",
                    "background-size": "100% 100%",
                }}>
                    <Row justify='center'>
                        <Col span={16}>
                            <p><h1>บอร์ดของฉัน</h1></p>
                            {
                                this.state.page
                                &&
                                <Grid mt={2}>
                                    {
                                        this.state.boardData.map(e => {
                                            let k = e.Boardid
                                            return (
                                                < Grid item >
                                                    <Button sx={{
                                                        width: '100%',
                                                        bgcolor: '#66ffcc',
                                                        justifyContent: 'flex-start'
                                                    }}
                                                        value={k}
                                                        onClick={() => this.setBoardValue(k)}
                                                    >
                                                        <p>{e.Title + e.Comments[0].AddDate}</p>
                                                    </Button>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            }

                            {
                                !this.state.page
                                &&
                                <SelectBoard board={this.state.board} currentType={this.handleType}  lastPage={window.location.pathname} ></SelectBoard>
                            }

                        </Col>
                    </Row>
                </div>

            </>
        )
    }
}

export default listBoard;
