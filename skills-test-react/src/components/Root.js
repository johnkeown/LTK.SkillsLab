import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Root = () => {
    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Test Root Component
            </Typography>
        </Box>
    );
};

export default Root;
