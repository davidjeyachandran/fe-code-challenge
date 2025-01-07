import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#216637',
        },
        secondary: {
            // Using a complementary coral color that works well with the teal primary
            main: '#FF6B5B',
        },
    },
});

export default theme; 