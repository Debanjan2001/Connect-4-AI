import React from "react";

import { Alert, Link, Modal, Stack, Switch } from "@mui/material";
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
import CheckIcon from "@mui/icons-material/Check";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import connect4Image from "./static/images/connect-4.png";

import BasicModalStyle from "./style/BasicModalStyle";
import { Box } from "@mui/system";
import DiscreteSlider from "./style/DiscreteSlider";

const difficultyToText = {
    1: "Easy",
    2: "Medium",
    3: "Hard",
};

const Actions = (props) => {
    const { gameText, gameTextMUIBackground } = props.gameTextObject;

    const handleGameModeSelection = props.handleGameModeSelection;
    const handleDifficultyChange = props.handleDifficultyChange;
    const openConfirmGameModal = props.openConfirmGameModal;
    const handleCloseConfirmGameModal = props.handleCloseConfirmGameModal;
    const gameStarted = props.gameStarted;
    const gameReset = props.gameReset;
    const gameModeCPU = props.gameModeCPU;
    const handleGameStart = props.handleGameStart;
    const difficulty = props.difficulty;

    return (
        <Card sx={{ maxWidth: 450, mt: 3 }}>
            <CardActionArea>
                <CardMedia
                    component='img'
                    height='175'
                    image={connect4Image}
                    alt='Connect-4'
                />
                <CardContent>
                    <Typography gutterBottom variant='h6' component='div'>
                        Connect-4
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Connect Four is a two-player board game, in which the
                        players take turns dropping colored discs into a 6-row
                        7-column grid as shown. The discs fall straight down to
                        the lowest available space within the column. The
                        objective of the game is to be the first to form a
                        horizontal, vertical, or diagonal line of four of one's
                        own discs.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Stack>
                    {!gameStarted && (
                        <Stack>
                            <Stack direction='row' spacing={2}>
                                <Item>
                                    <Typography>Select Game Mode :</Typography>
                                </Item>
                                <Item>
                                    <Typography>Multiplayer </Typography>
                                </Item>

                                <Switch
                                    checked={gameModeCPU}
                                    onChange={handleGameModeSelection}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                                <Item>
                                    <Typography>CPU</Typography>
                                </Item>
                            </Stack>
                            {gameModeCPU && (
                                <Stack direction='row' spacing={5}>
                                    <Item>
                                        <Typography>
                                            Select Difficulty :{" "}
                                        </Typography>
                                    </Item>
                                    <DiscreteSlider
                                        handleDifficultyChange={
                                            handleDifficultyChange
                                        }
                                    />
                                </Stack>
                            )}
                        </Stack>
                    )}

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
                        open={openConfirmGameModal}
                        onClose={handleCloseConfirmGameModal}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={BasicModalStyle}>
                            <Typography
                                id='modal-modal-title'
                                variant='h6'
                                component={"span"}
                            >
                                Confirm your choice
                            </Typography>

                            <Typography
                                component={"span"}
                                id='modal-modal-description'
                                sx={{ mt: 2 }}
                            >
                                <Stack>
                                    <Item>
                                        •{" "}
                                        {gameModeCPU
                                            ? "You have selected CPU-" +
                                              difficultyToText[difficulty] +
                                              " Mode"
                                            : "You have selected Multiplayer Mode"}
                                    </Item>
                                    {gameModeCPU && (
                                        <Item>
                                            • CPU can be Player 1 or 2 (Random)
                                        </Item>
                                    )}
                                    {!gameModeCPU && (
                                        <Item>
                                            • Player 1 is Red & Player 2 is Blue
                                        </Item>
                                    )}
                                </Stack>
                            </Typography>

                            <Stack direction='row' spacing={2}>
                                <Item>
                                    <Fab
                                        variant='extended'
                                        onClick={() => {
                                            // pass 1 to denote as multiplayer battle
                                            handleGameStart();
                                        }}
                                    >
                                        <CheckIcon sx={{ mr: 1 }} />
                                        Confirm
                                    </Fab>
                                </Item>

                                <Item>
                                    <Fab
                                        variant='extended'
                                        onClick={() => {
                                            handleCloseConfirmGameModal();
                                        }}
                                    >
                                        <KeyboardReturnIcon sx={{ mr: 1 }} />
                                        Return
                                    </Fab>
                                </Item>
                            </Stack>
                        </Box>
                    </Modal>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default Actions;
