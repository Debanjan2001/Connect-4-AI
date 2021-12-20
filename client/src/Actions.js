import React from "react";

import { Alert, Link, Modal, Stack, Switch, TextField } from "@mui/material";
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
import AddIcon from '@mui/icons-material/Add';

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
    const isLocalGame = props.isLocalGame;
    const handleMultiplayerGameModeSelection = props.handleMultiplayerGameModeSelection;
    
    const playerName = props.playerName;
    const handleChangePlayerName = props.handleChangePlayerName;
    const roomId = props.roomId;
    const handleChangeRoomId = props.handleChangeRoomId;
    const inputFieldError = props.inputFieldError;

    const getRandomRoom = () => {
        return Math.random().toString(36).substring(2,11);
    }

    return (
        <Card sx={{ maxWidth: 450, mt: 3,  border:3,borderColor:'#808080' }}>
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
                            {gameModeCPU ? (
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
                            ): (
                                <Stack direction='row' spacing={2}>
                                    <Item>
                                        <Typography>Choose sub-mode : </Typography>
                                    </Item>
                                    <Item>
                                        <Typography>Play Online</Typography>
                                    </Item>
                                    
                                    <Switch
                                        checked={isLocalGame}
                                        onChange={handleMultiplayerGameModeSelection}
                                        inputProps={{ "aria-label": "controlled" }}
                                    />

                                    <Item>
                                        <Typography>Play Locally</Typography>
                                    </Item> 
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
                                    {gameModeCPU && (
                                        <>
                                        <Item>
                                            • You have selected CPU-{difficultyToText[difficulty]} Mode
                                        </Item>
                                        <Item>
                                            • CPU can be Player 1 or 2 (Random)
                                        </Item>
                                        </>
                                    )}
                                    { (!gameModeCPU && isLocalGame) && (
                                        <>
                                        <Item>
                                        • You have selected Local Multiplayer Mode
                                        </Item>
                                        <Item>
                                            • Player 1 is Red & Player 2 is Blue
                                        </Item>
                                        </>
                                    )}
                                    { (!gameModeCPU && !isLocalGame) && (
                                        <>
                                        <Item>
                                            • Create a room or enter a room-id.
                                        </Item>
                                        <Item>
                                            • Share the Id with your friend.
                                        </Item>
                                        <Item>
                                            <TextField 
                                                required 
                                                fullWidth 
                                                label="Enter your Name"
                                                error={(!playerName && inputFieldError)} 
                                                id="username" 
                                                value={playerName}
                                                onChange={(event)=>{
                                                    const name = event.target.value;
                                                    handleChangePlayerName(name);
                                                }}
                                            />
                                        </Item>
                                        <Item>
                                            <TextField 
                                                label="Enter a Room-ID to join a game" 
                                                id="roomId" 
                                                error={(!roomId && inputFieldError)} 
                                                fullWidth 
                                                value={roomId}
                                                onChange={(event)=>{
                                                    handleChangeRoomId(event.target.value);
                                                }}
                                            />
                                        </Item>
                                        <Stack direction="row" spacing={1}>
                                            <Item>
                                                <Fab variant="extended" color="primary" aria-label="add"
                                                    onClick = {()=>{
                                                        const randomRoom = getRandomRoom();
                                                        handleChangeRoomId(randomRoom);
                                                    }}
                                                >
                                                    <AddIcon sx={{ mr: 1 }} /> Create a new Game Room
                                                </Fab>
                                            </Item>
                                        </Stack>
                                        </>
                                    )}
                                </Stack>
                            </Typography>

                            <Stack direction='row' spacing={2}>
                                <Item>
                                    <Fab
                                        variant='extended'
                                        color="primary"
                                        onClick={() => {
                                            handleGameStart();
                                        }}
                                    >
                                        <CheckIcon sx={{ mr: 1 }} />
                                        Start
                                    </Fab>
                                </Item>

                                <Item>
                                    <Fab
                                        variant='extended'
                                        color="secondary"
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
