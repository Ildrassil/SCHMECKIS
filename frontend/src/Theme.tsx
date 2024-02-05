import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#6cb6d9',
            light: '#9ff1ff',
            dark: '#5B98B5',
            contrastText: '#fff',
        },
        secondary: {
            main: '#f48fb1',
            light: '#ffc4ff',
            dark: '#bf5f82',
            contrastText: '#fff',
        },
        background: {
            default: '#000',
            paper: 'transparent',
        },
        text: {
            primary: '#6cb6d9',
            secondary: '#fff',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                }
            }
        },
    }
});


export default theme;