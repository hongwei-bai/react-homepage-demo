import React from 'react';
import './BlogEntryEdit.css';

import Button from '@material-ui/core/Button';
import ReactQuill, {Quill} from 'react-quill';
import {ImageDrop} from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css';
import Delta from 'quill-delta';
import TextField from "@material-ui/core/TextField";

// 在quill中注册quill-image-drop-module
Quill.register('modules/imageDrop', ImageDrop);

let editorInstance
let title
let htmlContent

class BlogEntryEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draft: {
                "ops": []
            }
        }
        this.goBack = this.goBack.bind(this);
    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
            ['link', 'image'],
            ['clean'],
        ],
        imageDrop: true,
    };

    formats = [
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
    ];

    onQuillChange = (content, delta, source, editor) => {
        // content 是真实的DOM节点
        // delta 记录了修改的对象，下篇文章详述
        // source 值为user或api
        // editor 文本框对象，可以调用函数获取content, delta值

        editorInstance = editor
        htmlContent = content
    };

    fetchBlogEntry(id) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(window.baseUrl + "/blog/entry/" + id + ".do?owner=1", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    let deltaOps = result.data.content
                    this.setState({draft: deltaOps})
                }
            )
            .catch(error => {
                console.log('error', error)
            });
    }

    componentDidMount() {
        const id = this.props.match.params.id

        if (id != undefined) {
            this.fetchBlogEntry(id)
        }
    }

    goBack() {
        this.props.history.goBack();
    }

    post(e, thisPtr) {
        let delta = editorInstance.getContents()
        console.log("html: " + htmlContent)

        let params = {
            owner: '1',
            title: title,
            content: htmlContent,
            delta: delta
        };

        let formData = new FormData();
        for (let k in params) {
            formData.append(k, params[k]);
        }

        console.log("bodyStr: " + formData)

        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: formData
        };

        fetch(window.baseUrl + "/blog/entry.do", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    console.log("post result: " + result)
                }
            )
            .catch(error => {
                console.log('error', error)
            });
    }

    render() {
        const thisPtr = this
        let titleByDefault = "New post on " + new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '')

        return <div className="DemoRoot">
            <div className="DemoContent">
                <br/>
                <TextField required id="standard-required" label="Title" fullWidth="true" defaultValue={titleByDefault}
                           onChange={e => title = e.target.value}/>
                <br/>
                <br/>
                <ReactQuill className="DemoInputArea"
                            theme="snow"
                            modules={this.modules}
                            formats={this.formats}
                            onChange={this.onQuillChange}
                            value={this.state.draft}
                            placeholder="Please Input"
                /><br/>

                <Button variant="contained" color="primary" onClick={e => {
                    this.post(e, thisPtr)
                }}>
                    Post
                </Button>&nbsp;
                <Button onClick={() => {
                    this.goBack()
                }}>Cancel</Button>
                <br/><br/>
            </div>
        </div>
    }
}

export default BlogEntryEdit;
