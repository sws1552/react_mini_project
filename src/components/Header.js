import React from "react";
import { Grid, Text, Button } from "../elements"


const Header = (props) => {
    return (
    // // 로그인 되어 있을 때
    //     <React.Fragment>
    //     <Grid is_flex>
    //       <Grid>
    //         <Text size="20px" bold>내 최애는?</Text>
    //       </Grid>

    //       <Grid is_flex>
    //         <Button margin="3px">내가찜한사진</Button>
    //         <Button margin="3px">로그아웃</Button>
    //       </Grid>
    //     </Grid>
    //   </React.Fragment>

    <React.Fragment>
    <Grid is_flex>
    <Grid>
        <Text size="20px" bold>내 최애는?</Text>
    </Grid>

    <Grid is_flex>
        <Button margin="3px">로그인</Button>
        <Button margin="3px">회원가입</Button>
    </Grid>
    </Grid>
    </React.Fragment>
    

    );
}


Header.defaultProps = () => {

}


export default Header;