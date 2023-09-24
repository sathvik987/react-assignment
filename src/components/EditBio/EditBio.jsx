import { useState, Fragment, useRef } from "react";
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import "./edit-bio.css"

function EditBio(props) {
    const [aboutMe, setAboutMe] = useState(props.aboutMe);
    const [resume, setResume] = useState(props.resume)
    const [bloodGroup, setBloodGroup] = useState(props.bloodGroup);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const fileInputRef = useRef(null);
    let disableSave = true;


    const onFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size <= 5 * 1024 * 1024) { // 5 MB limit
                setResume(selectedFile)
            } else {
                fileInputRef.current.value = null;
                alert('Selected file exceeds 5 MB size limit.');
            }
        }
    }

    const save = () => {
        props.setAboutMe(aboutMe)
        props.setResume(resume)
        props.setBloodGroup(bloodGroup)
        props.setRoute("My Bio")
    }



    if ((aboutMe.trim().length >= 3 && aboutMe.trim().length <= 500) && bloodGroup && resume) {
        disableSave = false
    }

    if (showDeleteConfirm) {
        return (
            <Fragment>
                <div className="confirm">
                    <Col className="text-center mt-2">
                        <FontAwesomeIcon icon={["fas", "trash-alt"]} className="mt-2" style={{
                            fontSize: "2em", color: "red"
                        }} />
                    </Col>
                    <Col className="text-center mt-2">
                        Are you sure you want to delete your resume ?
                    </Col>
                    <Col className="text-center mt-2">
                        <Button variant="secondary" size="sm" className="action-button" style={{ marginRight: "2em" }} onClick={() => { setShowDeleteConfirm(false) }} >
                            Cancel
                        </Button>
                        <Button variant="danger" size="sm" className="action-button" onClick={() => {
                            setShowDeleteConfirm(false); setResume(null);
                        }} >
                            Delete
                        </Button>
                    </Col>
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>


            <Col className="mt-4">
                <span style={{ fontWeight: 600 }}>Write something about yourself</span>
                <textarea className="bio-textarea mt-2" rows="5" cols="50" value={aboutMe} placeholder="Write something here..."
                    style={{ backgroundColor: "#8080800d", width: "100%" }} onChange={(e) => { setAboutMe(e.target.value) }} ></textarea>
            </Col>
            <Col>
                <div style={{ fontSize: "0.5em", float: "right" }}>
                    {aboutMe.trim().length}/500
                </div>
            </Col>
            {
                resume ?
                    <Col className="mt-4">
                        <iframe
                            title="PDF Viewer"
                            src={URL.createObjectURL(resume)}
                            width="100%"
                            style={{ height: "30vh", width: "100%" }}
                        />
                        <div className="mt-1 flex-center-space-between" >
                            <span>
                                <FontAwesomeIcon icon={["fas", "file-pdf"]} style={{ marginRight: "0.5em", fontSize: "1em" }} />
                                <span>{resume.name}</span>
                            </span>
                            <span>
                                <FontAwesomeIcon className='cursor-pointer' icon={["fas", "trash-alt"]} style={{
                                    marginRight: "0.5em",
                                    fontSize: "1em", color: "red"
                                }} onClick={() => { setShowDeleteConfirm(true) }} />
                            </span>
                        </div>
                    </Col> :


                    <Col className="mt-4 upload-resume cursor-pointer" onClick={() => { fileInputRef.current.click(); }}>
                        <div className="text-center">
                            <FontAwesomeIcon icon={["fas", "image"]} color="lightblue" style={{ fontSize: "3em" }} />
                        </div>
                        <div className="text-center">
                            <span style={{ fontWeight: 600 }}>Upload Resume</span>
                        </div>
                    </Col>
            }
            <input type="file" id="fileInput" multiple={false} ref={fileInputRef} accept=".pdf" onChange={onFileSelect} style={{ display: "none" }}></input>
            <Col className="mt-4">
                <div>
                    <span style={{ fontWeight: 600 }}>Blood group</span>
                </div>
                <div>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle variant="Secondary" id="dropdown-basic" className="blood-group-dropdown flex-center-space-between">
                            {bloodGroup ? bloodGroup : "Select blood group"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setBloodGroup("A positive (A+)") }} > A positive (A+)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setBloodGroup("A negative (A-)") }} > A negative (A-)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setBloodGroup("B positive (B+)") }} > B positive (B+)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setBloodGroup("B negative (B-)") }} > B negative (B-)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setBloodGroup("AB positive (AB+)") }} > AB positive (AB+)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setBloodGroup("AB negative (AB-)") }} > AB negative (AB-)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setBloodGroup("O positive (O+)") }} > O positive (O+)</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setBloodGroup("O negative (O-)") }} > O negative (O-)</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Col>

            <Col className="mt-4 text-center">
                <Button variant="danger" size="sm" className="mt-4 save" disabled={disableSave} onClick={save}>
                    Save
                </Button>
            </Col>

        </Fragment >
    );


}

export default EditBio;