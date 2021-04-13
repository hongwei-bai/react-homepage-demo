import React from "react";
import {withRouter} from "react-router-dom";
import './PhotoDemo.css';
import ImageGallery from 'react-image-gallery';

const images = [
    {
        original: "https://hongwei-test1.top/media/1080/photo/test/IMG_20190508_155740.jpg",
        thumbnail: "https://hongwei-test1.top/media/240/photo/test/IMG_20190508_155740.jpg"
    },
    {
        original: "https://hongwei-test1.top/media/1080/photo/test/IMG_20190505_145103.jpg",
        thumbnail: "https://hongwei-test1.top/media/240/photo/test/IMG_20190505_145103.jpg"
    },
    {
        original: "https://hongwei-test1.top/media/1080/photo/test/IMG_20190508_155745.jpg",
        thumbnail: "https://hongwei-test1.top/media/240/photo/test/IMG_20190508_155745.jpg"
    },
];

class PhotoDemo extends React.Component {

    render() {
        return (
            <ImageGallery items={images} thumbnailPosition="top" />
        )
    }
}

export default withRouter(PhotoDemo);