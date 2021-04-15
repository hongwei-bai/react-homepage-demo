import React, {Component} from 'react';
import {fileServiceInstance} from "../../network/AxiosInstances";

class FileUploadPage extends Component {
    onFileChangeHandler = (e) => {
        let fileToUpload = e.target.files[0]
        alert("File selected: " + fileToUpload.name + ", len: " + fileToUpload.size)
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('path', "");
        fileServiceInstance.post("/upload.do", {
            formData
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