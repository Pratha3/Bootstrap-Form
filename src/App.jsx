import { useEffect, useState } from "react";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import { BsEmojiExpressionlessFill } from "react-icons/bs";
import { BsEmojiAngryFill } from "react-icons/bs";
import { BsEmojiSmileFill } from "react-icons/bs";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
function App() {
  let [student, setStudent] = useState({});
  let [list, setList] = useState([]);
  let [index, setIndex] = useState(-1);
  let [error, setError] = useState({});
  let [hobby, setHobby] = useState([]);
  let [termsChecked, setTermsChecked] = useState(false);
  let [newColor, setNewColor] = useState(0);

  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem("studentList")) || [];
    setList(oldList);
  }, []);

  let handleInput = (e) => {
    let { name, value, checked } = e.target;
    let newHobby = [...hobby];

    if (name === "hobby") {
      if (checked) {
        newHobby.push(value);
      } else {
        newHobby = newHobby.filter((h) => h !== value);
      }
      value = newHobby;
      setHobby(newHobby);
    }

    if (name === "terms") {
      setTermsChecked(checked);
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  let emoji = (val) => {
    setStudent({ ...student, emoji: val });
    setNewColor(val);
  };
  let dataValidation = () => {
    let tempError = {};
    if (!student.firstname) tempError.firstname = "First Name is required.";
    if (!student.lastname) tempError.lastname = "Last Name is required.";
    if (!student.email) tempError.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(student.email))
      tempError.email = "Invalid Email.";

    if (!termsChecked) {
      tempError.terms = "You must agree to the Terms and Conditions.";
    }

    setError(tempError);
    return Object.keys(tempError).length === 0;
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!dataValidation()) return;

    let newList;
    if (index !== -1) {
      list[index] = student;
      newList = [...list];
      setIndex(-1);
    } else {
      newList = [...list, student];
    }

    setList(newList);
    localStorage.setItem("studentList", JSON.stringify(newList));
    setStudent({});
    setHobby([]);
    setTermsChecked(false);
    setNewColor(0);
  };

  let deleteData = (pos) => {
    list.splice(pos, 1);
    let newList = [...list];
    setList(newList);
    localStorage.setItem("studentList", JSON.stringify(newList));
  };

  let editData = (pos) => {
    let editStud = list[pos];
    setStudent(editStud);
    setIndex(pos);
    setHobby(editStud.hobby || []);
    setNewColor(editStud.emoji || 0);
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">User Registration Feedback</h1>
        <h4 className="text-center mb-4">
          We would love to hear your thoughts about your registration
          experience.
        </h4>
        <form
          className="bg-light p-4 rounded shadow"
          method="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                value={student.firstname || ""}
                onChange={(e) => handleInput(e)}
                placeholder="Enter your first name"
              />
              {error.firstname && (
                <span className="text-danger">{error.firstname}</span>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                value={student.lastname || ""}
                onChange={(e) => handleInput(e)}
                placeholder="Enter your last name"
              />
              {error.lastname && (
                <span className="text-danger">{error.lastname}</span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={student.email || ""}
                onChange={(e) => handleInput(e)}
                placeholder="Enter your email address"
              />
              {error.email && (
                <span className="text-danger">{error.email}</span>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                value={student.phone || ""}
                onChange={(e) => handleInput(e)}
                name="phone"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Hobby</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="hobby"
                value="dance"
                onChange={handleInput}
                checked={hobby.includes("dance")}
              />
              <label className="form-check-label">Dance</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="hobby"
                value="music"
                onChange={handleInput}
                checked={hobby.includes("music")}
              />
              <label className="form-check-label">Music</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="hobby"
                value="karate"
                onChange={handleInput}
                checked={hobby.includes("karate")}
              />
              <label className="form-check-label">Karate</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                name="hobby"
                value="yoga"
                onChange={handleInput}
                checked={hobby.includes("yoga")}
              />
              <label className="form-check-label">Yoga</label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">How did you hear about us?</label>
            <select
              className="form-select"
              name="how"
              value={student.how || ""}
              onChange={handleInput}
            >
              <option value="">Select an option</option>
              <option value="google">Internet Search</option>
              <option value="friend">Friend</option>
              <option value="advertisement">Advertisement</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="mb-4">
            <h6 className="fw-bold">Rate Your Experience</h6>
            <div className="mb-3">
              <h6>Registration Process</h6>
              <span>
                How would you rate your experience with the registration
                process?
              </span>
              <div className="d-flex align-items-center mt-2">
                <BsEmojiAngryFill
                  onMouseOver={() => emoji(1)}
                  color={newColor == 1 ? "red" : ""}
                  style={{ fontSize: "24px" }}
                />
                <BsFillEmojiFrownFill
                  onMouseOver={() => emoji(2)}
                  color={newColor == 2 ? "orange" : ""}
                  style={{ fontSize: "24px" }}
                />
                <BsEmojiExpressionlessFill
                  onMouseOver={() => emoji(3)}
                  color={newColor == 3 ? "yellow" : ""}
                  style={{ fontSize: "24px" }}
                />
                <BsEmojiSmileFill
                  onMouseOver={() => emoji(4)}
                  color={newColor == 4 ? "lightgreen" : ""}
                  style={{ fontSize: "24px" }}
                />
                <BsEmojiHeartEyesFill
                  onMouseOver={() => emoji(5)}
                  color={newColor == 5 ? "green" : ""}
                  style={{ fontSize: "24px" }}
                />
              </div>
            </div>
            <div className="mb-3">
              <h6>Website Navigation</h6>
              <span>How was your experience navigating our website?</span>
              <div className="d-flex align-items-center mt-2">
                <BsEmojiAngryFill
                  onMouseOver={() => emoji(1)}
                  color={newColor == 1 ? "red" : ""}
                  style={{ fontSize: "24px" }}
                />
                <BsFillEmojiFrownFill
                  onMouseOver={() => emoji(2)}
                  color={newColor == 2 ? "orange" : ""}
                  style={{ fontSize: "24px" }}
                />
                <BsEmojiExpressionlessFill
                  onMouseOver={() => emoji(3)}
                  color={newColor == 3 ? "yellow" : ""}
                  style={{ fontSize: "24px" }}
                />
                <BsEmojiSmileFill
                  onMouseOver={() => emoji(4)}
                  color={newColor == 4 ? "lightgreen" : ""}
                  style={{ fontSize: "24px" }}
                />
                <BsEmojiHeartEyesFill
                  onMouseOver={() => emoji(5)}
                  color={newColor == 5 ? "green" : ""}
                  style={{ fontSize: "24px" }}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label name="feedback" className="form-label">
              Feedback
            </label>
            <textarea
              className="form-control"
              name="feedback"
              rows="5"
              placeholder="Please provide any feedback you have about your experience"
            ></textarea>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="terms"
              id="terms"
              onChange={handleInput}
              checked={termsChecked}
            />
            <label className="form-check-label" htmlFor="terms">
              I agree to the Terms and Conditions and acknowledge the Privacy
              Policy.
            </label>
          </div>
          {error.terms && <span className="text-danger">{error.terms}</span>}{" "}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              {index !== -1 ? "Edit Data" : "Add Data"}
            </button>
          </div>
        </form>
      </div>
      <br /> <br />
      <div className="container mt-4">
        {list.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Heard About</th>
                <th>Registration Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((student, index) => (
                <tr key={index}>
                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.how}</td> {/* Display 'how' correctly */}
                  <td>
                    {/* Render the correct emoji */}
                    {student.emoji === 1 && <BsEmojiAngryFill />}
                    {student.emoji === 2 && <BsFillEmojiFrownFill />}
                    {student.emoji === 3 && <BsEmojiExpressionlessFill />}
                    {student.emoji === 4 && <BsEmojiSmileFill />}
                    {student.emoji === 5 && <BsEmojiHeartEyesFill />}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => editData(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
    </>
  );
}

export default App;
