import React, { Component } from 'react';
import { ImageList, ImageListItem, } from "@mui/material";
import { Row, Col, Typography, Button, Divider } from 'antd';
import 'antd/dist/antd.css';

class listImage extends Component {

    state = {
        userid: localStorage.getItem('userid')
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
                    <Row></Row>
                    <Row justify='center' style={{ marginTop: 15 }}>
                        <Col span={12} offset={3}>
                            <Typography.Title level={2}>
                                รูปภาพทั้งหมด
                            </Typography.Title>
                        </Col>
                        <Col span={4} offset={3}>
                            <Button>
                                upload
                            </Button>
                        </Col>
                    </Row>

                    <Row justify='center' style={{ marginTop: 15 }}>
                        <ImageList sx={{ width: '70%', height: 450 }} cols={5} rowHeight={164}>
                            {
                                itemData.map(item => {
                                    return (
                                        <ImageListItem key={item.img}>
                                            <img
                                                width={100}
                                                height={100}
                                                src={item.img}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    )
                                })
                            }
                        </ImageList>
                    </Row>
                </div>
            </>
        )
    }


}


const itemData = [
    {
        img: "image/user/1/cat1.png",
        title: "cat1",
    },
    {
        img: "image/user/1/cat2.png",
        title: "cat2",
    },
    {
        img: 'image/user/1/fox1.png',
        title: 'fox1',
    },
    {
        img: 'image/user/1/fox2.png',
        title: 'fox2',
    },
    {
        img: 'image/user/1/dog1.png',
        title: 'dog1',

    },
    {
        img: 'image/user/1/dog2.png',
        title: 'dog2',
    },
];

export default listImage;
