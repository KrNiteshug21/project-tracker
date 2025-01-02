import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import SectionWrapper from "../../wrapper/SectionWrapper";
import { Link } from "react-router-dom";
import SuccessModal from "../../Modal/SuccessModal";
import { Button } from "../ui/button";

const initModelObj = {
  header: "",
  msg: "",
  trigger: false,
};

const Signup = () => {
  const uri = process.env.REACT_APP_API_URL;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPwd, setShowPwd] = useState(false);
  const [modelObj, setModelObj] = useState(initModelObj);
  console.log("uri", uri);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("userdetail", name, email, password);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      };
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        options
      );

      const response = await data.json();
      if (response.status === 200) {
        console.log(response.message);
        setModelObj({
          header: "Success",
          msg: response.message,
          trigger: true,
        });
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
        <div className="place-items-center grid min-h-[90vh]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border-2 border-primary dark:border-gray-300 p-8 rounded-lg w-96"
          >
            <h1 className="mb-8 font-bold text-4xl text-center">Sign Up</h1>
            <div>
              <label className="hidden" htmlFor="email">
                Name
              </label>
              <input
                className="border-2 border-primary/70 p-2 rounded-lg w-full outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="name"
                id="name"
                placeholder="Your name..."
                name="name"
                required
              />
            </div>
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
            <Button className="font-semibold text-lg" type="submit">
              Signup
            </Button>

            <p className="text-center">or</p>
            <p className="text-center">
              <Link
                to={"/login"}
                className="text-blue-600 text-center hover:underline"
              >
                Click here{" "}
              </Link>
              login to your account
            </p>
          </form>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Signup;
