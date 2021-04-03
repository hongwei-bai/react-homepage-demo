import React, {Component} from 'react';
import {baseUrlFileServer} from "../../network/NetworkEndpoints";

class FileUploadPage extends Component {
    onFileChangeHandler = (e) => {
        let fileToUpload = e.target.files[0]
        alert("File selected: " + fileToUpload.name + ", len: " + fileToUpload.size)
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('path', "");
        fetch(baseUrlFileServer() + "/upload.do", {
            method: 'post',
            body: formData
        }).then(res => {
            if (res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        }).catch(error => {
            alert("File uploaded error." + error.code)
        });
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group files color">
                            <label>Upload Your File </label>
                            <input type="file" className="form-control" name="file"
                                   onChange={this.onFileChangeHandler}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileUploadPage;