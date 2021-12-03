import React from "react";
import { Button, Grid, Stack } from "@mui/material";

import Item from "@mui/material/List";
import { Box } from "@mui/system";

/*
Future Possible Feature - Drop Animation 
const DropDownAnimation = () => {
    return (
        <Stack direction='row' spacing={1}>
            <Item>hello</Item>
            <Item>hello</Item>
            <Item>hello</Item>
            <Item>hello</Item>
            <Item>hello</Item>
            <Item>hello</Item>
            <Item>hello</Item>
        </Stack>
    );
};
*/

const DiskHolder = (props) => {
    const winningPosition = props.winningPosition;
    const row = props.rowId;
    const col = props.colId;
    // console.log(row,col, winningPosition);

    return (
        <Box
            sx={{
                border:
                    winningPosition &&
                        winningPosition.findIndex(
                            (x) => x[0] === row && x[1] === col
                        ) >= 0
                        ? 1
                        : 0,
            }}
        >
            <Button
                variant={props.diskHolderProperties.variant}
                color={props.diskHolderProperties.color}
                sx={{ height: 63, width: 60, borderRadius: 100 }}
                onClick={() => props.onClick()}
            >
                {/* {props.value} */}
            </Button>
        </Box>
    );
};

const Board = (props) => {
    const matrix = props.matrix;
    // const numRows = matrix.length;
    const numCols = matrix[0].length;
    const winningPosition = props.winningPosition;

    // console.log(winningPosition);

    // Takes a row and col index and renders the disk using its matrix value
    const renderDiskHolder = (row, col) => {
        let color = "";
        let variant = "null";
        if (matrix[row][col] === 1) {
            color = "userRed";
            variant = "contained";
        } else if (matrix[row][col] === 2) {
            color = "userBlue";
            variant = "contained";
        } else {
            color = "userWhite";
            variant = "outlined";
        }

        const diskHolderProperties = {
            color: color,
            variant: variant,
        };

        return (
            <DiskHolder
                diskHolderProperties={diskHolderProperties}
                onClick={() => props.onClick(row, col)}
                color={color}
                winningPosition={winningPosition}
                rowId={row}
                colId={col}
                value={row * numCols + col}
            />
        );
    };

    // Takes a row index and renders the disks in that row
    const renderDiskHolderRow = (row) => {
        return (
            <Stack direction='row' spacing={1}>
                <Item>{renderDiskHolder(row, 0)}</Item>
                <Item>{renderDiskHolder(row, 1)}</Item>
                <Item>{renderDiskHolder(row, 2)}</Item>
                <Item>{renderDiskHolder(row, 3)}</Item>
                <Item>{renderDiskHolder(row, 4)}</Item>
                <Item>{renderDiskHolder(row, 5)}</Item>
                <Item>{renderDiskHolder(row, 6)}</Item>
            </Stack>
        );
    };

    return (
        <Grid>
            <Item>{renderDiskHolderRow(0)}</Item>
            <Item>{renderDiskHolderRow(1)}</Item>
            <Item>{renderDiskHolderRow(2)}</Item>
            <Item>{renderDiskHolderRow(3)}</Item>
            <Item>{renderDiskHolderRow(4)}</Item>
            <Item>{renderDiskHolderRow(5)}</Item>
        </Grid>
    );
};

export default Board;
