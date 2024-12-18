// import react
import React, { useEffect, useState } from 'react'

// import api
import api from "../services/apiService";

// * import css *
import '../css/detail.css'
// import bootstrap
import { InputGroup, Form, Row, Col } from 'react-bootstrap';

// import icon
import { RiExpandLeftFill, RiDeleteBin7Fill } from "react-icons/ri";
import { IoMdSave } from "react-icons/io";

function UserDetail({ userId, setUserId }) {

  // * define state *
  const [user, setUser] = useState({}); // user
  const [isSaveUser, setIsSaveUser] = useState(false); // check on click save user
  const [validated, setValidated] = useState(false); // validate
  const [err, setErr] = useState('');

  // fetch user function
  const fetchUser = async () => {
    api.getUserById(userId)
      .then(res => {
        setUser(res);
      })
  }

  // fetch
  useEffect(() => {
    fetchUser(); // call fetchUsers
    setIsSaveUser(false);
    setValidated(false);
  }, [userId]);

  // handle on save
  const handleOnSaveUser = (e) => {
    e.preventDefault(); // prevent default
    e.stopPropagation(); // stop propagation

    const form = e.currentTarget;
    console.log(user);
    if (form.checkValidity() === true) { // check validate
      if (isSaveUser) {
        api.createUser(user) // create user
          .then((res) => {
            if (res.status === 400) {
              setErr(res.response.data.message);
              return setValidated(false);
            }
            alert("Create user success");
            window.location.reload();
          })
      } else {
        api.updateUser(user) // update user
          .then((res) => {
            if (res.status === 400) {
              alert("Update user failed");
              return setValidated(false);
            }
            alert("Update user success");
            localStorage.setItem('userUpdated', JSON.stringify({ success: true, userId: user._id }));
            window.location.reload();
          })
      }
    }
    setValidated(true);
  }

  // handle on add user
  const handleOnAddUser = () => {
    if (isSaveUser) {
      setIsSaveUser(false);
      setValidated(false);
      return fetchUser();
    }

    setIsSaveUser(true);
    setUser({});
  }

  return (
    <div className='ms-4'>
      <div className='fs-4 mb-2'>เจ้าของ</div>
      <div className='user-detail'>
        <Form noValidate validated={validated} className='container' onSubmit={(e) => handleOnSaveUser(e)}>
          {/* Row 1 */}
          <Row className="mt-3">
            {/* HN */}
            <Col xs={2} className="mb-3 p-0 ">
              <InputGroup>
                <InputGroup.Text id="inputGroup-sizing-default">HN{isSaveUser && <span className='ms-1 text-danger'>*</span>}</InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={user.hn || ""}
                  placeholder='HN'
                  disabled={!isSaveUser}
                  onChange={(e) => {
                    if (isSaveUser) {
                      setUser({
                        ...user, hn: e.target.value
                      })
                    }
                  }}
                  pattern='^\d{6}$'
                  type='text'
                  required
                />
              </InputGroup>
            </Col>

            {/* First Name */}
            <Col xs={5} className="mb-3">
              <InputGroup>
                <InputGroup.Text id="inputGroup-sizing-default">
                  ชื่อ<span className='ms-1 text-danger'>*</span>
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={user.firstname || ""}
                  placeholder='ชื่อ'
                  onChange={(e) => setUser({
                    ...user, firstname: e.target.value
                  })}
                  type='text'
                  required
                />
              </InputGroup>
            </Col>

            {/* Last Name */}
            <Col xs={5} className="mb-3 p-0 ">
              <InputGroup>
                <InputGroup.Text id="inputGroup-sizing-default">
                  นามสกุล<span className='ms-1 text-danger'>*</span>
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={user.lastname || ""}
                  placeholder='นามสกุล'
                  onChange={(e) => {
                    setUser({
                      ...user, lastname: e.target.value
                    })
                  }}
                  type='text'
                  required
                />
              </InputGroup>
            </Col>
          </Row>

          {/* Row 2 */}
          <Row>
            {/* Phone */}
            <Col xs={6} className="mb-3 py-0 ps-0">
              <InputGroup>
                <InputGroup.Text id="inputGroup-sizing-default">
                  เบอร์ติดต่อ<span className='ms-1 text-danger'>*</span>
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={user.phone || ""}
                  placeholder='เบอร์ติดต่อ เช่น 555-555-5555'
                  onChange={(e) => {
                    setUser({
                      ...user, phone: e.target.value
                    })
                  }}
                  pattern='^\d{3}-\d{3}-\d{4}$'
                  type='text'
                  required
                />
              </InputGroup>
            </Col>
            {/* Email */}
            <Col xs={6} className="mb-3 py-0 pe-0">
              <InputGroup>
                <InputGroup.Text id="inputGroup-sizing-default">
                  อีเมล<span className='ms-1 text-danger'>*</span>
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={user.email || ""}
                  placeholder='อีเมล'
                  onChange={(e) => {
                    setUser({
                      ...user, email: e.target.value
                    })
                  }}
                  type='email'
                  required
                />
              </InputGroup>
            </Col>
          </Row>
          {/* Error */}
          <Row className='mb-3'>
            <div className='text-danger text-center'>{err && err}</div>
          </Row>
          {/* button */}
          <div className='d-flex justify-content-center align-items-center mb-3'>
            <div className='px-1'>
              <button type="button" className="btn btn-secondary"
                onClick={() => {
                  setUserId(null);
                  setIsSaveUser(false);
                }}>
                <RiExpandLeftFill className='me-2' />Cancel
              </button>
            </div>
            <div className='px-1'>
              <button type="button" className="btn btn-primary"
                onClick={() => handleOnAddUser()}>
                <IoMdSave className='me-2' />{isSaveUser ? 'Return' : 'Add New'}
              </button>
            </div>
            <div className='px-1'>
              <button type="submit" className="btn btn-success">
                <IoMdSave className='me-2' />Save
              </button>
            </div>
            <div className='px-1'>
              <button type="button" className="btn btn-danger"
                onClick={() => {
                  const confirm = window.confirm('Are you sure to delete?');
                  if (confirm) {
                    api.deleteUser(user._id)
                      .then(res => {
                        window.location.reload();
                      })
                  }
                }}>
                <RiDeleteBin7Fill className='me-2' />Delete
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default UserDetail