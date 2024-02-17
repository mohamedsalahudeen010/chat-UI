import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import "./Login.css"
import { ChatContext } from "../../Context";


const emailValidation = yup.object({
  name: yup.string().required("Enter a Name"),
  password: yup.string().required("Enter Password").min(8,"Enter Minimum Eight Characters"),
});

const LogInPage = ({setName}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  
  const[loader,setLoader]=useState(false)
  const navigate = useNavigate();
  const {users,setUsers,user,setUser}=useContext(ChatContext)
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
      },
      validationSchema: emailValidation,
      onSubmit: (user) => {
        logInFunc(user);
      },
    });
    const logInFunc = (user) => {
      try {
       
        setUser(user.name) 
       setName(user.name)
          navigate("/chat");
          
      } catch (error) {
        console.log("User LogIn Error : ", error);
      
      }
  
    };

    const setLoaderFunction =()=>{
      if(!values.name ||
        !values.password || (errors.password && touched.password)){
       return setLoader(false)
      }
      else{
        return setLoader(true)
      };
    }
  
  return (
   
    <div className="loginPage">
      
      <div className="login-main">

      <div>
        <div>
          <form onSubmit={handleSubmit} className="form-signIn">
            <div className="title-login-user"
            onClick={()=>navigate("/")}>Chat</div>

          <div className="input-div">
                <label className="textlabel-signIn" for="name"
                >Name <span style={{color:"brown"}}>*</span></label>
              <input
                className="input-login-user"
                placeholder="User Name"
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
              ></input>
            </div>
            {errors.name && touched.name ? (
              <h6 style={{ color: "red" }}>{errors.name}</h6>
            ) : (
              ""
            )}

              <div className="input-div">
                <label className="textlabel-signIn" for="password">Password <span style={{color:"brown"}}>*</span></label>
              <input
                placeholder="Password"
                className="input-login-user"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              ></input>
            </div>
            {errors.password && touched.password ? (
              <h6 style={{ color: "red" }}>{errors.password}</h6>
            ) : (
              ""
            )}
            {showEmail?(
              <h6 style={{ color: "red" }}>
                Entered Email Is not available, please Signup before login
              </h6>
            ) : (
              ""
            )}
            {showPassword ? (
              <h6 style={{ color: "red" }}>
                Password is incorrect
              </h6>
            ) : (
              ""
            )}

            <div className="flex-container">
              <div className="w-100 m-1">
               
            <p
            className="forget-password-login-user"
            onClick={() => navigate("/forgetPassword/user")}
            
          >
            Forget Password
          </p>
              </div>
              <div className="w-100 m-1">
                <button type="" className="login-btn-land"
                onClick={()=>setLoaderFunction()}
                >
                  {loader?<Spinner animation="border" variant="secondary" size="md" />:"Login"}
                </button>
              </div>
            </div>
            <div>
        <p>Click Here To SignUp <button onClick={()=>navigate("/signUp")}
        className="signUpNavigate">SignUp</button></p>
        </div>
          </form>
        </div>
        
        
  
        
      </div>
      </div>
    
    </div>
   
    
  );
};

export default LogInPage;
