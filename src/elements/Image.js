import styled from 'styled-components';
import React from "react";


const Image = (props) => {
    const {shape, src, size, width, _onClick} = props;

    const styles = {
        src: src,
        size: size,
        width: width,
    }

    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter {...styles}>
                <AspectInner onClick={_onClick} {...styles}></AspectInner>
            </AspectOutter>
        )
    }

}

Image.defaultProps = {
  shape: "rectangle",
  src: "https://thumb.mt.co.kr/06/2021/05/2021052009134127042_1.jpg/dims/optimize/",
  size: null,
  auto: null,
  radius: null,
  block: null,
  maxHeight: null,
  _onClick: () => {},
};

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
    // ${(props) => (props.hover? `&:hover: ba;` : '')}
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    // overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position: center;
    ${(props) => (props.width? `width: ${props.width};` : '')}
    border-radius: 5%;
    box-shadow: 3px 3px 3px 3px gray;

`;


const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${(props) => props.src}");
    background-size: cover;
    background-position: center;
    margin: 4px;
`;

export default Image;