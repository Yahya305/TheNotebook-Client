import React, { useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { addProps } from "../store/slices/BlogProps";
import { useDispatch } from "react-redux";
import { addBlog, removeBlog } from "../store/slices/BlogsSlice";
import { useSelector } from "react-redux";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/CreateBlog.scss";

function ClientBlogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appContext = useContext(AuthContext);
  const blogs = useSelector((state) => {
    return state.blogs;
  });

  useEffect(() => {
    // fetch("http://192.168.18.54:5000/api/notes/fetchnotes", {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/notes/fetchnotes`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          // "eyJhbGciOiJIUzI1NiJ9.NjNmMjcyZDAyNTBhNDBhYjgxNzljMzFm.a6UR2SkxEco4pOZpNEKPQ7yoZ_ry5lD7Rbhv6X_p-wU",
          appContext.token,
        "User-Agent": "The-NoteBook",
        from: "0",
        to: "12",
      },
    })
      .then((res) => res.json())
      .then((f) => {
        Array.from(f).forEach((blogObj) => dispatch(addBlog(blogObj)));
      });
    // eslint-disable-next-line
  }, [appContext.token]);

  const deleteNote = (id) => {
    console.log("Deleting note with id :", id);
    // fetch(`http://192.168.18.54:5000/api/notes/deletenote/${id}`, {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/notes/deletenote/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${appContext.token}`,
      },
    })
      .then(((res) => res.json(), (rej) => rej.json()))
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          dispatch(removeBlog(id));
        }
      });
  };

  const toggleModal = (blg) => {
    dispatch(addProps({ editMode: true, edit: blg }));
    navigate("/createblog");
  };

  const handleCreate = () => {
    dispatch(addProps({ editMode: false, edit: {} }));
    console.log("DONEE");
    navigate("/createblog");
  };

  return (
    <>
      <div className="fab-container">
        <Fab className="fab-icn" aria-label="add" onClick={handleCreate}>
          <EditIcon className="add-btn" />
        </Fab>
      </div>
      <h2>
        <center>Your Blogs</center>
      </h2>
      <div className="blogs">
        {blogs
          ? blogs.map((blg) => {
              const plainTextContent = document.createElement("div");
              plainTextContent.innerHTML = blg.description;
              const plainDesc = plainTextContent.innerText;
              plainTextContent.innerHTML = blg.title;
              const plainTitle = plainTextContent.innerText;
              return (
                <div
                  key={blg._id}
                  className="card"
                  onClick={(e) => {
                    appContext.setReadBlog(blg);
                    navigate("/viewblog");
                  }}
                >
                  {/* <img src="blog-PH.png" alt="Card Img" /> */}
                  <img src={blg.description.indexOf("<img ")===-1?"blog-PH.png":blg.description.substring(blg.description.indexOf("<img")+10, blg.description.indexOf('alt="')-2)} alt="Card Img" />
                  <div className="card-content">
                    <h3 className="card-title">{plainTitle}</h3>
                    <p className={`card-tag ${blg.tags}`}>{blg.tags}</p>
                    <p className="card-description">
                      {blg.description
                        ? plainDesc.length > 10
                          ? plainDesc.substring(0,65) + "..."
                          : plainDesc
                        : null}
                    </p>
                    <p className="card-author">By : {blg.author}</p>
                  </div>
                  <div className="card-button">
                    <button
                      className="button-basic"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleModal(blg);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="button-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(blg._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

export default ClientBlogs;
