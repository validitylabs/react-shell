import React, { FunctionComponent } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = () =>
    createStyles({
        container: {
            width: '100%',
            height: '100%',
        },
    });

interface IClassItem {
    [item: string]: string;
}

interface IProps {
    [classes: string]: IClassItem;
}

const Shell: FunctionComponent<IProps> = (props) => {
    const dev = process.env.NODE_ENV === 'production' ? '' : 'DEV |';

    return (
        <div className={props.classes.container}>
            <Grid justify="center" alignItems="center" direction="row" container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2">
                        {dev} {process.env.APP_TITLE}
                    </Typography>
                    <Typography variant="body1">here we go...</Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(Shell);
