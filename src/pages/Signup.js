import React from "react";
import { Text, Input, Grid, Button } from "../elements";

import {useDispatch} from "react-redux"
import {actionCreators as userActions} from "../redux/modules/user"

const Signup = (props) => {
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Grid>

            </Grid>
        </React.Fragment>

    )


}


Signup.defaultProps = {};

export default Signup;