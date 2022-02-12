import styled from 'styled-components';
import React from "react";


const Image = (props) => {
    const {shape, src, size, radius, auto} = props;

    const styles = {
        src: src,
        size: size,
        radius: radius,
        auto: auto,
    }

    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    return (
        <React.Fragment>
            
        </React.Fragment>
    )
}

Image.defaultProps = {
  shape: "circle",
  src: "https://thumb.mtstarnews.com/06/2021/05/2021050511312249749_1.jpg/dims/optimize",
  size: null,
  auto: "auto",
  radius: null,
};

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
    
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    // overflow: hidden;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    // background-position: center;
    ${(props) => (props.radius? `border-radius: ${props.radius};` : '')}
    ${(props) => (props.auto? `height: auto;` : '')}


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