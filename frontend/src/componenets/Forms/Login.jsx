import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import SectionWrapper from "../../wrapper/SectionWrapper";
import { Link, useNavigate } from "react-router-dom";
import SuccessModal from "../../Modal/SuccessModal";

const initModelObj = {
  header: "",
  msg: "",
  trigger: false,
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPwd, setShowPwd] = useState(false);
  const [modelObj, setModelObj] = useState(initModelObj);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        options
      );

      const response = await data.json();
      console.log("response", response);

      if (response.token) {
        console.log(response.message);
        setModelObj({
          header: "Success",
          msg: response.message,
          trigger: true,
        });
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.emp._id));
        setTimeout(navigate("/"), 1000);
        window.location.reload();
      } else {
        console.log(response.message);
        setModelObj({
          header: "Error",
          msg: response.message,
          trigger: true,
        });
      }
    } catch (error) {
      console.log(error.messsage);
      setModelObj({
        header: "Error",
        msg: error.message,
        trigger: true,
      });
    }
  };

  return (
    <>
      {modelObj.trigger && (
        <SuccessModal
          modalObj={modelObj}
          clickFunction={() => setModelObj(initModelObj)}
        />
      )}
      <SectionWrapper>
        <div className="place-items-center grid min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border-2 border-primary p-8 rounded-lg w-96"
          >
            <h1 className="mb-8 font-bold text-4xl text-center">Login</h1>
            <div>
              <label className="hidden" htmlFor="email">
                Email
              </label>
              <input
                className="border-2 border-primary/70 p-2 rounded-lg w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Your email..."
                name="email"
                required
              />
            </div>
            <div className="relative">
              <label className="hidden" htmlFor="password">
                Password
              </label>
              <input
                className="border-2 border-primary/70 p-2 rounded-lg w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPwd ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Your password..."
                required
              />
              <div
                onClick={() => setShowPwd(!showPwd)}
                className="top-1/2 right-0 absolute cursor-pointer"
                style={{
                  transform: "translate(-50%, -50%)",
                }}
              >
                {!showPwd ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
              </div>
            </div>
            <button
              className="bg-primary px-4 py-2 rounded-md text-white"
              type="submit"
            >
              Login
            </button>

            <p className="text-center">or</p>
            <p className="text-center">
              <Link
                to={"/signup"}
                className="text-blue-600 text-center hover:underline"
              >
                Click here{" "}
              </Link>
              to create account
            </p>
          </form>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Login;