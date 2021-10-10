import React, { Component } from 'react';
import { Typography, Paper, Container, Grid, Button } from '@mui/material';
import axios from "axios";

class selectBoard extends Component {

    state = {
        comment: [],
        userid: localStorage.getItem('userid'),
        ownerid:null,
    }


    componentDidMount() {
        this.getComment()
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

    getOwnerid(){
        this.state.comment.map(e =>{
            if(e.IsOwner == true)
                this.setState({ownerid:e.Userid.toString()})
        })

    }


    render() {
        console.log(this.state)
        return (
            <>
                <Container key={this.props.board.Boardid}>
                    <Grid Container>
                        <Button sx={{ bgcolor: '#66ffcc' }} onClick={this.goBack}>
                            back
                        </Button>
                    </Grid>
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
                                    console.log(data)
                                    return (
                                        <Paper sx={{
                                            width: "100%",
                                            mt: '2',
                                            mb: '2'
                                        }}
                                        >
                                            <Typography>
                                                {data.Text}
                                            </Typography>
                                            <p>{data.AddDate + "\n" + data.User.Alias}</p>
                                        </Paper>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Container>
            </>
        )
    }
}

export default selectBoard;