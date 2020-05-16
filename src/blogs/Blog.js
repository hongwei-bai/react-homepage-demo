import React from 'react';
import './Blog.css';
import Button from "@material-ui/core/Button";

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Untitled post",
            created: "",
            modified: "",
            owner: "",
            htmlContent: ""
        }
        this.goBack = this.goBack.bind(this);
    }

    fetchBlogEntry(id) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(window.baseUrl + "/blog/" + id + "/entry.do?owner=1", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    this.setState({
                        title: result.data.title,
                        htmlContent: result.data.content,
                        created: new Date(result.data.createDate).toLocaleDateString(),
                        modified: new Date(result.data.modifyDate).toLocaleString(),
                        owner: result.data.owner
                    })
                }
            )
            .catch(error => {
                console.log('error', error)
                this.setState({title: "Not avail"})
            });
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.fetchBlogEntry(id)
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        return <div className="BlogRoot">
            <br/>
            <h3>{this.state.title}</h3>
            <p>created by {this.state.owner} on {this.state.created},  last modified: {this.state.modified}</p>
            <br/>
            <br/>
            <div className="Container" dangerouslySetInnerHTML={{__html: this.state.htmlContent}}></div>
            <br/>

            <Button variant="contained" color="primary" onClick={() => {
                this.goBack()
            }}>
                Back
            </Button>&nbsp;
            <br/><br/>
        </div>
    }
}

export default Blog;
