import { AppBar, Container, CssBaseline, ThemeProvider, Link, Toolbar, Typography, Box, CircularProgress, Badge } from "@material-ui/core"
import Head from "next/head"
import { Fragment } from "react"
import { useStyles ,theme} from "../utils/styles"
import NextLink from 'next/link'

export default function Layout({
    children,
    commercePublicKey,
    title = 'ShopperApp'
}){
    const classes = useStyles();

    return(
        <Fragment>
            <Head>
            <meta charSet="utf-8" />
            <title>{`${title} - Shopper App`}</title>
            <link rel="icon" href="/favicon.ico" />
             <meta
             name="viewport"
             content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar
                position="static"
                color="default"
                elevation={0}
                className={classes.appBar}
                >
                    <Toolbar className={classes.toolbar}>
                    <NextLink href='/'>
                      <Link
                variant="h6"
                color="inherit"
                noWrap
                href="/"
                className={classes.toolbarTitle}
              >
                ShopperApp
                </Link>
                </NextLink>

                <nav>
              <NextLink href="/cart">
                <Link
                  variant="button"
                  color="textPrimary"
                  href="/cart"
                  className={classes.link}
                >
                  Cart
                </Link>
              </NextLink>
                </nav>
                </Toolbar>
                </AppBar>

            <Container component="main" className={classes.main}>
                {children}
            </Container>
            {/*  Footer */}
            <Container maxWidth="md" component="footer">
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'© '}
              ShopperApp 2021
              {'.'}
            </Typography>
          </Box>
        </Container>

            </ThemeProvider>
        </Fragment>
    )
}
