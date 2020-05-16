import React from 'react';
import './QuillDemo.css';

import Button from '@material-ui/core/Button';
import ReactQuill, {Quill} from 'react-quill';
import {ImageDrop} from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css';
import Delta from 'quill-delta';

// 在quill中注册quill-image-drop-module
Quill.register('modules/imageDrop', ImageDrop);

let editorInstance

class QuillDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: {
                "ops": [{"insert": "Search Results\n\nWeb results\n\n"}, {
                    "attributes": {"link": "https://www.youtube.com/channel/UCZuXjkFY00p1ga3UyCBbR2w"},
                    "insert": "Grim Reapers - YouTube"
                }, {"insert": "\n"}, {
                    "attributes": {"link": "https://www.youtube.com/channel/UCZuXjkFY00p1ga3UyCBbR2w"},
                    "insert": "www.youtube.com › channel"
                }, {"insert": "\n"}, {
                    "attributes": {"list": "ordered"},
                    "insert": "\n\n"
                }, {"insert": "We are a group of plane buddies, sharing our DCS WORLD, IL2 and Arma3 videos, Enjoy! "}, {
                    "attributes": {"bold": true},
                    "insert": "Grim Reapers"
                }, {"insert": " Discord is open to all and we have multiple servers ...\n\n"}, {
                    "attributes": {"link": "https://www.youtube.com/watch?v=2UnDsQ2NW3k"},
                    "insert": "FA-18C Hornet | Introducing The Hornet | DCS WORLD ..."
                }, {"insert": "\n"}, {
                    "attributes": {"link": "https://www.youtube.com/watch?v=2UnDsQ2NW3k"},
                    "insert": "www.youtube.com › watch"
                }, {"insert": "\n\n"}, {
                    "attributes": {"link": "https://www.youtube.com/watch?v=2UnDsQ2NW3k"},
                    "insert": {"image": "data:image/jpeg;base64,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"}
                }, {"insert": "\n"}, {
                    "attributes": {
                        "bold": true,
                        "link": "https://www.youtube.com/watch?v=2UnDsQ2NW3k"
                    }, "insert": "▶ 4:42"
                }, {"insert": "\n"}, {
                    "attributes": {"bold": true},
                    "insert": "FA"
                }, {"insert": "-"}, {
                    "attributes": {"bold": true},
                    "insert": "18C"
                }, {"insert": " Hornet | Introducing The Hornet | DCS WORLD. "}, {
                    "attributes": {"bold": true},
                    "insert": "Grim Reapers"
                }, {"insert": " ... PAYPAL(one-off donations): https ...\nMay 13, 2018 - Uploaded by Grim Reapers\n\n"}, {
                    "attributes": {"link": "https://www.youtube.com/watch?v=ZKwrlgHl4N4"},
                    "insert": "FA-18C Hornet: ToT Time On Target Navigation Tutorial | DCS ..."
                }, {"insert": "\n"}, {
                    "attributes": {"link": "https://www.youtube.com/watch?v=ZKwrlgHl4N4"},
                    "insert": "www.youtube.com › watch"
                }, {"insert": "\n\n"}, {
                    "attributes": {"link": "https://www.youtube.com/watch?v=ZKwrlgHl4N4"},
                    "insert": {"image": "data:image/jpeg;base64,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"}
                }, {"insert": "\n"}, {
                    "attributes": {
                        "bold": true,
                        "link": "https://www.youtube.com/watch?v=ZKwrlgHl4N4"
                    }, "insert": "▶ 5:50"
                }, {"insert": "\nTUTORIALS: https://"}, {
                    "attributes": {"bold": true},
                    "insert": "grimreapers"
                }, {"insert": ".net/tutorials PATREON(monthly donations): https://www.patreon.com ...\nSep 3, 2019 - Uploaded by Grim Reapers\n\n\n"}]
            },
            value1: Delta,
            deltaLog: String,
            htmlPreview: String,
        }
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
        let delta1 = JSON.stringify(editor.getContents(), null, 2);
        this.setState({deltaLog: delta1})
        this.setState({htmlPreview: content})
    };

    test() {
        let address,
            ifaces = require('os').networkInterfaces();
        for (let dev in ifaces) {
            ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address : undefined);
        }
        console.log(address);
    }

    render() {
        this.test()
        return <div className="DemoRoot">
            <div className="DemoContent">
                <h1>Quill</h1>
                <ReactQuill className="DemoInputArea"
                            theme="snow"
                            modules={this.modules}
                            formats={this.formats}
                            onChange={this.onQuillChange}
                            defaultValue={this.state.value}
                            placeholder="Please Input"
                />
                <br/>
                <Button variant="contained" color="primary" onClick={() => {
                    let delta = editorInstance.getContents()
                    this.setState({value: delta})
                }}>
                    Save
                </Button>&nbsp;
                <Button variant="contained" color="secondary" onClick={() => {
                    this.setState({value1: this.state.value})
                    // editorInstance.setContents(deltaOut, sourceInstance)
                }}>
                    Restore
                </Button>
                <p>
                    {this.state.deltaLog}
                </p><br/>
                <div className="DemoPreview" dangerouslySetInnerHTML={{__html: this.state.htmlPreview}}></div>
            </div>
        </div>
    }
}

export default QuillDemo;
