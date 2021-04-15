import React from "react";
import {withRouter} from "react-router-dom";
import './AlbumListHome.css';
import {Card} from "antd";
import {fileServiceInstance} from "../../network/AxiosInstances";
import intl from "react-intl-universal";
import Button from "react-bootstrap/Button";
import {RiAncientGateLine} from "react-icons/ri";

const {Meta} = Card;

class AlbumListHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            thumbnails: []
        }
    }

    componentDidMount() {
        this.loadAlbumList()
    }

    loadAlbumList() {
        fileServiceInstance.get("photo/albums.do")
            .then(response => {
                this.setState({
                    albums: response.data.albums,
                    thumbnails: response.data.thumbnails
                })
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
                <ul className="AlbumListFrame">
                    {this.state.albums.map((item, i) => (
                        <li className="Album" key={item}>
                            <Card
                                hoverable
                                onClick={() => this.onClickAlbum(thisPtr, item)}
                                style={{width: 160}}
                                cover={<img alt="Album"
                                            src={this.state.thumbnails[i]}/>}>
                                <Meta title={item} description="Click to browse"/>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default withRouter(AlbumListHome);