import React from "react";
import {withRouter} from "react-router-dom";
import './PhotoGallery.css';
import ImageGallery from 'react-image-gallery';
import {fileServiceInstance} from "../../network/AxiosInstances";
import intl from "react-intl-universal";
import Button from "react-bootstrap/Button";
import {RiArrowLeftSLine} from "react-icons/ri";
import {logInBackgroundStore} from "../../reducers/store";
import {STATUS_REFRESHED} from "../../reducers/LoginBackgroundReducer";

class PhotoGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albumName: "",
            res: "",
            data: []
        }
    }

    componentDidMount() {
        this.loadPhotos(this.props.match.params.name)
        logInBackgroundStore.subscribe(() => {
            if (logInBackgroundStore.getState().refreshTokenStatus === STATUS_REFRESHED) {
                this.loadPhotos(this.props.match.params.name)
            }
        })
    }

    loadPhotos(album) {
        const params = new URLSearchParams([['album', album], ['resolution', 'medium']]);
        fileServiceInstance.get("photo/photos.do?", {params})
            .then(response => {
                try {
                    this.setState({
                        data: response.data.images
                    })
                } catch (e) {

                }
            })
    }

    render() {
        return (
            <div>
                <Button variant="light" className="BackButton"
                        onClick={() => this.props.history.push("/photo")}>
                    <RiArrowLeftSLine className={"BlogListIcon"}/>
                    &nbsp;{intl.get("backButton")}</Button>
                <ImageGallery items={this.state.data} thumbnailPosition="bottom"/>
            </div>
        )
    }
}

export default withRouter(PhotoGallery);