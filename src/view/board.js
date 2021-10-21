
import React, { Component } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import { Card, Row, Col, Space } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import SelectBoard from "./selectBoard.js";
import CreateBoard from "./createBoard.js";


class Board extends Component {

    constructor(props) {
        super(props);

        // Initializing the state 
        this.state = {
            typeData: [],
            boardData: [],
            typeValue: 8,
            board: null,
            page: true,
            create: false,
        };
    }

    componentDidMount() {
        this.getType()
        this.getBoard()
    }

    changePage = () => {
        this.setState({ page: false })
        window.scrollTo(0, 0);
        
    }

    handleType = () => {
        this.setState({ page: true })
        setTimeout(() => {
            this.getBoard()
        }, 1000)
    }

    setCreate = () => {
        this.setState({ create: true })
        window.scrollTo(0, 0);
    }

    setCreateFalse = () => {
        this.setState({ create: false })
        setTimeout(() => {
            this.getBoard()
        }, 1000)
    }

    getType() {
        var url = "https://petdiaryintern.herokuapp.com/api/type"
        axios.get(url)
            .then(response => {
                var item = response.data
                this.setState({ typeData: item })
            })
    }

    getBoard() {
        var url = "https://petdiaryintern.herokuapp.com/api/board/show"
        axios.get(url)
            .then(response => {
                var item = response.data
                this.setState({ boardData: item })
            })
    }

    getBoardByType(e) {

        if (e.target.value === '8') {
            this.getBoard()
            this.setState({ page: true })
        }
        else {
            this.setState({ typeValue: e.target.value })
            var url = "https://petdiaryintern.herokuapp.com/api/board/type"
            var data = '/' + e.target.value
            axios.get(url + data)
                .then(response => {
                    var item = response.data
                    this.setState({ boardData: item })
                    this.setState({ page: true })

                })
        }
        this.setState({ create: false })
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
        console.log("page:" + this.state.page + " create:" + this.state.create + " board:" + this.state.board)
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
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                {
                                    this.state.page
                                    &&
                                    !this.state.create
                                    &&
                                    this.state.typeData.map(e => {
                                        return (
                                            <Grid item>
                                                <Box sx={{
                                                    bgcolor: 'primary.dark',
                                                }}>

                                                    <Button
                                                        variant="text"
                                                        sx={{
                                                            color: '#ffffff',
                                                            backgroundImage: 'url(/image/system/' + e.NameEng + '.png)',
                                                            backgroundSize: '200px 100px',
                                                            width: '200px',
                                                            height: '100px'
                                                        }}
                                                        value={e.Typeid}
                                                        onClick={event => this.getBoardByType(event)}
                                                    >
                                                        {e.Name + " / " + e.NameEng}

                                                    </Button>
                                                </Box>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            {
                                this.state.page
                                &&
                                !this.state.create
                                &&
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

                                            onClick={this.setCreate}
                                        >
                                            Create
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

                                            href="./myboard"
                                        >
                                            MyBoard
                                        </Button>
                                    </Space>
                                </div>

                            }
                            {
                                this.state.page
                                &&
                                !this.state.create
                                &&
                                <div style={{ marginTop: 10 }}>
                                    {
                                        this.state.boardData.map(e => {
                                            let k = e.Boardid
                                            console.log(e.Comments)
                                            return (
                                                <div
                                                    style={{
                                                        backgroundColor: '#66ffcc',
                                                        width: '100%',
                                                        height: '50px',
                                                        marginBottom: '10px',
                                                        alignContent: 'center',
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                    }}

                                                    value={k}
                                                    onClick={() => this.setBoardValue(k)}
                                                >
                                                    <div>
                                                        <a>{e.Title /*+ e.Comments[0].AddDate*/}</a>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }

                            {
                                !this.state.page
                                &&
                                !this.state.create
                                &&
                                <SelectBoard board={this.state.board} currentType={this.handleType} lastPage={window.location.pathname}></SelectBoard>
                            }

                            {
                                this.state.page
                                &&
                                this.state.create
                                &&
                                <CreateBoard currentType={this.setCreateFalse}></CreateBoard>
                            }
                        </Col>
                    </Row>

                </div>
            </>
        )
    }
}

export default Board;