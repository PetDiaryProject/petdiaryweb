
import React, { Component } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import { Card, Row, Col, Space } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import SelectBoard from "./selectBoard.js";
import CreateBoard from "./createBoard.js";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookIcon from '@mui/icons-material/Book';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
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
    
    if (e === 8) {
      this.getBoard()
      this.setState({ page: true })
    }
    else {
      this.setState({ typeValue: e })
      var url = "https://petdiaryintern.herokuapp.com/api/board/type"
      var data = '/' + e
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

    const images = [
      {
        url: '/image/system/Terrestrial.png',
        title: 'สัตว์บก/TERRESTRIAL',
        width: '25%',
        value: 1,
      },
      {
        url: '/image/system/Fish.jpg',
        title: 'สัตว์น้ำ/AQUATIC',
        width: '25%',
        value: 2,
      },
      {
        url: '/image/system/Chicken.jpg',
        title: 'สัตว์ปีก/AVES',
        width: '25%',
        value: 3,
      },
      {
        url: '/image/system/Lizard.png',
        title: 'สัตว์เลื้อยคลาย/REPTILE',
        width: '25%',
        value: 4,
      },
      {
        url: '/image/system/Bug.jpg',
        title: 'แมลง/แมง/BUG',
        width: '35%',
        value: 5,
      },
      {
        url: '/image/system/Exotic.png',
        title: 'สัตว์แปลก/EXOTIC',
        width: '30%',
        value: 6,
      },
      {
        url: '/image/system/All.jpg',
        title: 'ทั้งหมด/ALL',
        width: '35%',
        value: 8,
      },
    ];

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
          opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
          opacity: 0,
        },
        '& .MuiTypography-root': {
          border: '4px solid currentColor',
        },
      },
    }));

    const ImageSrc = styled('span')({
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    }));

    console.log("page:" + this.state.page + " create:" + this.state.create + " board:" + this.state.board)
    return (
      <>
        <div style={{
          //backgroundColor: '#cfe8fc',
          //backgroundImage:`url(/image/system/Wood.png)`,
          backgroundImage:`url(/image/system/Grass2.png)`,
          opacity: "90%",
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
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                    {images.map((image) => {
                      var a = image
                      return (
                        <ImageButton
                          value={image.value}
                          onClick={e => this.getBoardByType(a.value)}
                          focusRipple
                          key={a.title}
                          style={{
                            width: a.width,
                          }}
                        >
                          <ImageSrc style={{ backgroundImage: `url(${a.url})` }} />
                          <ImageBackdrop className="MuiImageBackdrop-root" />
                          <Image>
                            <Typography
                              component="span"
                              variant="subtitle1"
                              color="inherit"
                              sx={{
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                              }}
                            >
                              {a.title}
                              <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                          </Image>

                        </ImageButton>
                      )
                    })
                    }
                  </Box>
                  
                  // this.state.typeData.map(e => {
                  //     return (

                  //         // <Grid item>
                  //         //     <Box sx={{
                  //         //         bgcolor: 'primary.dark',
                  //         //     }}>

                  //         //         <Button
                  //         //             variant="text"
                  //         //             sx={{
                  //         //                 color: '#ffffff',
                  //         //                 backgroundImage: 'url(/image/system/' + e.NameEng + '.png)',
                  //         //                 backgroundSize: '200px 100px',
                  //         //                 width: '200px',
                  //         //                 height: '100px'
                  //         //             }}
                  //         //             value={e.Typeid}
                  //         //             onClick={event => this.getBoardByType(event)}
                  //         //         >
                  //         //             {e.Name + " / " + e.NameEng}

                  //         //         </Button>
                  //         //     </Box>
                  //         // </Grid>
                  //     )
                  // })
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
                      marginTop: 1,
                      height: 50,
                      bgcolor: 'primary.dark',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                      },
                      color: '#ffffff',
                    }}
                      startIcon={<AddCircleIcon />}
                      onClick={this.setCreate}
                    >
                      Create
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
                      startIcon={<BookIcon />}
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

                        <Button
                          sx={{
                            height: 50,
                            width: "100%",
                            bgcolor: 'green',
                            opacity: "70%",
                            '&:hover': {
                              backgroundColor: 'primary.main',

                              opacity: [0.9, 0.8, 0.7],
                            },
                            marginBottom: 1,
                            color: '#ffffff',
                          }}

                          value={k}
                          onClick={() => this.setBoardValue(k)}
                        >

                          {e.Title /*+ e.Comments[0].AddDate*/}

                        </Button>
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