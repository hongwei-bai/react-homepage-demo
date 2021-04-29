import React from "react";
import {withRouter} from "react-router-dom";
import './AlbumListHome.css';
import {Card} from "antd";
import {fileServiceInstance} from "../../network/AxiosInstances";
import intl from "react-intl-universal";
import Button from "react-bootstrap/Button";
import {RiAncientGateLine} from "react-icons/ri";
import {loadingStatus} from "../../sharedUi/LoadingStatus";

const {Meta} = Card;

class AlbumListHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingStatus: loadingStatus.LOADING,
            message: "",
            albums: []
        }
    }

    componentDidMount() {
        this.loadAlbumList()
    }

    loadAlbumList() {
        this.setState({
            loadingStatus: loadingStatus.LOADING
        })
        fileServiceInstance.get("photo/albums.do")
            .then(response => {
                try {
                    this.setState({
                        loadingStatus: loadingStatus.SUCCESS,
                        albums: response.data.albums
                    })
                } catch (e) {
                    this.setState({
                        loadingStatus: loadingStatus.ERROR,
                        message: intl.get("genericError")
                    })
                }
            })
    }

    onClickAlbum(thisPtr, albumName) {
        thisPtr.props.history.push("/photo/gallery/" + albumName)
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
                {albumListContent(this.state.loadingStatus, thisPtr)}
            </div>
        )
    }
}

function albumListContent(loadingStatus, thisPtr) {
    switch (loadingStatus) {
        case loadingStatus.SUCCESS:
            return <ul className="AlbumListFrame">
                {this.state.albums.map((item, i) => (
                    <li className="Album" key={item.name}>
                        <Card
                            hoverable
                            onClick={() => this.onClickAlbum(thisPtr, item.nameByPath)}
                            style={{width: 160}}
                            cover={<img alt="Album"
                                        src={item.thumbnail}/>}>
                            <Meta title={item.name} description={item.description}/>
                        </Card>
                    </li>
                ))}
            </ul>
        case loadingStatus.LOADING:
            return <p>{intl.get("genericLoading")}</p>
        default:
        case loadingStatus.ERROR:
            return <p>{intl.get("genericError")}</p>
    }
}

export default withRouter(AlbumListHome);