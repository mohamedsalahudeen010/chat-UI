import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import "./SignUp.css";
import Spinner from "react-bootstrap/esm/Spinner";
import { ChatContext } from "../../Context";

const signUpValidation = yup.object({
  name: yup.string().required("Enter Your Name"),
  email: yup.string().required("Enter an Email"),
  phone: yup
    .string()
    .required("Enter your Phone Number")
    .min(10, "Enter Valid Phone Number"),
  password: yup
    .string()
    .required("Enter Password")
    .min(8, "Enter Minimum eight Characters"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {users,setUsers}=useContext(ChatContext)
  const [showSignUp, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
        password: "",
      },
      validationSchema: signUpValidation,
      onSubmit: (user) => {
        addUser(user);
      },
    });

  const addUser = (user) => {
    try {


      const response = users.filter((ele)=>ele.email===user.email)
    
      console.log(response);
      if (response.length===0) {
        let updatedData=[...users,user]
        setUsers(updatedData)
        navigate("/");
      } else if (response) {
        setShow(true);
        setLoader(false);
      } 
    } catch (error) {
      console.log("Admin LogIn Error : ", error);
    }
  };

  const setLoaderFunction = () => {
    if (
      !values.name ||
      !values.email ||
      !values.phone ||
      !values.password
    ) {
      return setLoader(false);
    } else if (
      (errors.phone && touched.phone) ||
      (errors.password && touched.password)
    ) {
      return setLoader(false);
    } else {
      return setLoader(true);
    }
  };

  return (
      <div className="signUpPage">
        <div className="signUp-user-main">
          <div className="Sign_up">
            <form onSubmit={handleSubmit} className="form-signup-user">
            <div className="title-login-user"
            onClick={()=>navigate("/")}>IMDB</div>
              <div className="input-div input1">
                <label className="textlabel" htmlFor="firstName">
                 Name
                  <span style={{ color: "brown" }}> *</span>
                </label>
                <input
                  className="input-signUp-user "
                  placeholder="Name"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                ></input>
              </div>
              <div className="input-div input2">
                <label className="textlabel" htmlFor="email">
                  E.mail
                  <span style={{ color: "brown" }}> *</span>
                </label>
                <input
                  className="input-signUp-user"
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                ></input>
              </div>
    
              {(errors.name && touched.name)||(errors.email && touched.email) ? (
                <div
                  className="row"
                  style={{
                    width: "100%",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  {errors.name && touched.name ? (
                    <h6
                      className="form-alert-signUp"
                      style={{
                        color: "red",
                        position: "absolute",
                        left: "-25%",
                      }}
                    >
                      {errors.name}
                    </h6>
                  ) : (
                    ""
                  )}
                  {errors.email && touched.email ? (
                    <h6
                      className="form-alert-signUp"
                      style={{
                        color: "red",
                        position: "absolute",
                        left: "25%",
                      }}
                    >
                      {errors.email}
                    </h6>
                  ) : (
                    ""
                  )}

                 
                </div>
              ) : (
                ""
              )}
              <div className="input-div input1">
                <label className="textlabel" htmlFor="phone">
                  Phone Number
                  <span style={{ color: "brown" }}> *</span>
                </label>
                <input
                  className="input-signUp-user"
                  placeholder="Phone Number"
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                  onBlur={handleBlur}
                ></input>
              </div>

            
              <div className="input-div input2">
                <label className="textlabel" htmlFor="password">
                  Password
                  <span style={{ color: "brown" }}> *</span>
                </label>
                <input
                  className="input-signUp-user"
                  placeholder="Password"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                ></input>
              </div>
              { 
              (errors.phone && touched.phone)||errors.password && touched.password ? (
                <div
                  className="row"
                  style={{
                    width: "100%",
                    position: "relative",
                    display: "inline-block",
                   
                  }}
                >
                  {errors.phone && touched.phone ? (
                    <h6
                      className="form-alert-signUp"
                      style={{
                        color: "red",
                        float: "left",
                        position: "absolute",
                        left: "-25%",
                      }}
                    >
                      {errors.phone}
                    </h6>
                  ) : (
                    ""
                  )}

                  {errors.password && touched.password  ? (
                    <h6
                      className="form-alert-signUp"
                      style={{
                        color: "red",
                        float: "left",
                        position: "absolute",
                       left:"25%"
                      }}
                    >
                      {errors.password}
                    </h6>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              <div>
                <button
                  type="submit"
                  className="signUp-btn"
                  onClick={() => setLoaderFunction()}
                >
                  {loader ? (
                    <Spinner animation="border" variant="secondary" size="md" />
                  ) : (
                    "Register"
                  )}
                </button>
                {showSignUp && showSignUp ? (
                  <h6 style={{ color: "red" }}>
                    You have Already Registered, login to enter
                  </h6>
                ) : (
                  ""
                )}
              </div>

              <div className="foot-signUp">
            <p>
              Already have an account? Click Here{" "}
              <span
                onClick={() => {
                  navigate("/logIn");
                }}
                className="sup-login"
              >
                Sign in !
              </span>{" "}
              for go to signIn page
            </p>
          </div>
            </form>
          </div>
          
        </div>
      </div>

  );
};

export default SignUpPage;