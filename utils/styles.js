import { makeStyles } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";


export const theme = createTheme({
    typography: {
      h1: {
        fontSize: '2.2rem',
        fontWeight: 400,
        margin: '2rem 0',
      },
      h2: {
        fontSize: '1.8rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h3: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      palette: {
        primary: {
          light: '#757ce8',
          main: '#3f50b5',
          dark: '#002884',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff7961',
          main: '#f44336',
          dark: '#ba000d',
          contrastText: '#000',
        },
      },
      error: {
        main: '#f04000',
      },
      background: {
        default: '#ffffff',
      },
    },
  });

  export const useStyles = makeStyles((theme) => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontWeight: '600',
      fontSize: '1.2rem',
      
    },
    Card: {
        width: '300px',
        margin: 'auto'
    },
    Media: {
      height: '240px',
      width: '100%',
      objectFit: 'contain'
      },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: '1rem',
    },
    main: {
      padding: '1rem',
    },
    largeImage: {
      height: '540px'
    },
    mt1: {
      marginTop: '1rem !important',
    },
    p1: {
      padding: '1rem !important',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '100%',
    },
  }));
  