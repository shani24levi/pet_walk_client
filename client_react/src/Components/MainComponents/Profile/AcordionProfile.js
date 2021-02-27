import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingBottom: '40%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const AcordionProfile = (props) => {
    const { details, hobis, bio } = props;


    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.root}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>Day Plan Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {details}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Hobbies</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {hobis}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>Bio</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {bio}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </React.Fragment>
    );
}

export default AcordionProfile