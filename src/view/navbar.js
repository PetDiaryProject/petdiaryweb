
import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";


class navbar extends Component {
    state = {
        userid: localStorage.getItem('userid')
    }

    logout() {
        localStorage.setItem('userid', null)
    }

    userdate() {

    }

    render() {

        return (
            <>
                <AppBar position="sticky">
                    <Toolbar>
                        <Grid container spacing={3} direction="row">
                            <Grid item >
                                <Typography className="mr-5" variant="h6" color="inherit" component="div">
                                    Pet Diary
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Button color="inherit" href="/diary">
                                    Diary
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button color="inherit" href="/board">
                                    Board
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button color="inherit" href="/login" onClick={this.logout}>
                                    Logout
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </>
        );
    }
}

export default navbar;