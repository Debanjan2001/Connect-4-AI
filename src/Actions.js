import React from "react";

import { Alert, Link, Modal, Stack } from "@mui/material";
import Item from "@mui/material/List";
import Fab from "@mui/material/Fab";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ComputerIcon from "@mui/icons-material/Computer";
import PeopleIcon from "@mui/icons-material/People";

import connect4Image from "./static/images/connect-4.png";

import BasicModalStyle from "./style/BasicModalStyle";
import { Box } from "@mui/system";

const Actions = (props) => {
    const { gameText, gameTextMUIBackground } = props.gameTextObject;
    const gameStarted = props.gameStarted;
    const gameReset = props.gameReset;
    const openStartGameModal = props.openStartGameModal;
    const handleCloseStartGameModal = props.handleCloseStartGameModal;

    const handleGameModeSelection = props.handleGameModeSelection;

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
                <CardMedia
                    component='img'
                    height='200'
                    image={connect4Image}
                    alt='Connect-4'
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        Connect-4
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Connect Four is a two-player board game, in which the
                        players take turns dropping colored discs into a
                        seven-column, six-row vertically suspended grid. The
                        pieces fall straight down, occupying the lowest
                        available space within the column. The objective of the
                        game is to be the first to form a horizontal, vertical,
                        or diagonal line of four of one's own discs.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Stack>
                    <Stack direction='row' spacing={2}>
                        <Item>
                            {!gameStarted || gameReset ? (
                                <Fab
                                    variant='extended'
                                    onClick={() => {
                                        props.onStartGame();
                                    }}
                                >
                                    <PlayCircleFilledIcon sx={{ mr: 1 }} />
                                    Start Game
                                </Fab>
                            ) : (
                                (gameStarted || !gameReset) && (
                                    <Fab
                                        variant='extended'
                                        onClick={() => {
                                            props.onResetGame();
                                        }}
                                    >
                                        <RestartAltIcon sx={{ mr: 1 }} />
                                        Reset Game
                                    </Fab>
                                )
                            )}
                        </Item>

                        <Item>
                            <Link
                                target='_blank'
                                rel='noopener'
                                href='https://en.wikipedia.org/wiki/Connect_Four'
                            >
                                <Fab color='secondary' variant='extended'>
                                    <LightbulbIcon sx={{ mr: 1 }} />
                                    Learn More
                                </Fab>
                            </Link>
                        </Item>
                    </Stack>

                    <Modal
                        open={openStartGameModal}
                        onClose={handleCloseStartGameModal}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={BasicModalStyle}>
                            <Typography
                                id='modal-modal-title'
                                variant='h6'
                                component={"span"}
                            >
                                Select Game Mode
                            </Typography>

                            <Typography
                                component={"span"}
                                id='modal-modal-description'
                                sx={{ mt: 2 }}
                            >
                                <Stack>
                                    <Item>
                                        • Player 1 is Red & Player 2 is Blue
                                    </Item>
                                    <Item>
                                        • CPU can be Player 1 or 2 (Random)
                                    </Item>
                                </Stack>
                            </Typography>

                            <Stack direction='row' spacing={2}>
                                <Item>
                                    <Fab
                                        variant='extended'
                                        onClick={() => {
                                            // pass 1 to denote as multiplayer battle
                                            handleGameModeSelection(1);
                                        }}
                                    >
                                        <PeopleIcon sx={{ mr: 1 }} />
                                        Multiplayer
                                    </Fab>
                                </Item>

                                <Item>
                                    <Fab
                                        variant='extended'
                                        onClick={() => {
                                            // pass 2 to denote as AI battle
                                            handleGameModeSelection(2);
                                        }}
                                    >
                                        <ComputerIcon sx={{ mr: 1 }} />
                                        vs. CPU
                                    </Fab>
                                </Item>
                            </Stack>
                        </Box>
                    </Modal>

                    {/* if else logic based display */}
                    {gameStarted && (
                        <Item>
                            <Alert
                                sx={{ borderRadius: 100 }}
                                variant='filled'
                                severity={gameTextMUIBackground}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {gameText}
                                </Typography>
                            </Alert>
                        </Item>
                    )}
                </Stack>
            </CardActions>
        </Card>
    );
};

export default Actions;
