import React from "react";
import {withRouter} from "react-router-dom";
import './AlbumListHome.css';
import {Card} from "antd";
import {fileServiceInstance} from "../../network/AxiosInstances";
import intl from "react-intl-universal";
import Button from "react-bootstrap/Button";
import {RiAncientGateLine} from "react-icons/ri";
import {LoadingStatus} from "../../sharedUi/LoadingStatus";
import {logInBackgroundStore} from "../../reducers/store";
import {STATUS_REFRESHED} from "../../reducers/LoginBackgroundReducer";

const {Meta} = Card;

class AlbumListHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingStatus: LoadingStatus.LOADING,
            message: "",
            albums: []
        }
    }

    componentDidMount() {
        this.loadAlbumList()
        logInBackgroundStore.subscribe(() => {
            if (logInBackgroundStore.getState().refreshTokenStatus === STATUS_REFRESHED) {
                this.loadAlbumList()
            }
        })
    }

    loadAlbumList() {
        this.setState({
            loadingStatus: LoadingStatus.LOADING
        })
        fileServiceInstance.get("photo/albums.do")
            .then(response => {
                try {
                    this.setState({
                        loadingStatus: LoadingStatus.SUCCESS,
                        albums: response.data.albums
                    })
                } catch (e) {
                    this.setState({
                        loadingStatus: LoadingStatus.ERROR,
                        message: intl.get("genericError")
                    })
                }
            })
    }

    render() {
        const thisPtr = this
        return (
            <div className="AlbumListRoot">
                <Button variant="light" className="BackButton"
                        onClick={() => this.props.history.push("/")}>
                    <RiAncientGateLine className={"BlogListIcon"}/>
                    &nbsp;{intl.get("backHomeButton")}
                </Button>
                {albumListContent(this.state.loadingStatus, this.state.albums, thisPtr)}
            </div>
        )
    }
}

function onClickAlbum(thisPtr, albumName) {
    thisPtr.props.history.push("/photo/gallery/" + albumName)
}

function albumListContent(loadingStatus, albums, thisPtr) {
    switch (loadingStatus) {
        case LoadingStatus.SUCCESS:
            return <ul className="AlbumListFrame">
                {albums.map((item, i) => (
                    <li className="Album" key={item.name}>
                        <Card
                            hoverable
                            onClick={() => onClickAlbum(thisPtr, item.nameByPath)}
                            style={{width: 160}}
                            cover={<img alt="Album"
                                        src={item.thumbnail}/>}>
                            <Meta title={item.name} description={buildDescription(item)}/>
                        </Card>
                    </li>
                ))}
            </ul>
        case LoadingStatus.LOADING:
            return <p>{intl.get("genericLoading")}</p>
        default:
        case LoadingStatus.ERROR:
            return <p>{intl.get("genericError")}</p>
    }
}

function buildDescription(item) {
    return item.description + " (" + intl.get("noOfPhotos").replace("{no}", item.numberOfPhotos) + ")"
}

export default withRouter(AlbumListHome);