import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import SuccessModal from "./SuccessModal";

const initTask = {
  title: "",
  description: "",
  score: "",
};

const initModalObj = {
  header: "",
  msg: "",
  trigger: false,
};

const AddTask = ({ setOpenTaskForm, id }) => {
  const [task, setTask] = useState(initTask);
  const [modalObj, setModalObj] = useState(initModalObj);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("task addition", task);

    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...task, projectId: id }),
      };

      const resposne = await fetch(
        `${process.env.REACT_APP_API_URL}/projects/${id}`,
        options
      );
      const data = await resposne.json();
      console.log(data);

      setOpenTaskForm(false);
      if (data.status === "success") {
        console.log(data.message);
        setModalObj({
          header: "Success",
          msg: data.message,
          trigger: true,
        });
      } else {
        console.log(data.message);
        setModalObj({
          header: "Error",
          msg: data.message,
          trigger: true,
        });
      }
      window.location.reload();
    } catch (error) {
      console.log(error.message);
      setModalObj({
        header: "Error",
        msg: error.message,
        trigger: true,
      });
    }
  };

  return (
    <>
      {modalObj.trigger && (
        <SuccessModal
          modalObj={modalObj}
          clickFunction={() => setModalObj(initModalObj)}
        />
      )}
      <section>
        <div className="top-1/2 left-1/2 z-50 fixed flex justify-center items-center bg-black/50 p-4 w-full h-full -translate-x-1/2 -translate-y-1/2">
          <form>
            <div className="relative text-right space-y-4 bg-white p-8 rounded-lg w-[600px]">
              <h2 className="font-semibold text-2xl text-center text-slate-900 underline underline-offset-2 unde">
                Add Task
              </h2>

              <button className="top-2 right-6 absolute cursor-pointer">
                <IoMdClose onClick={() => setOpenTaskForm(false)} size={24} />
              </button>
              <div>
                <label className="hidden" htmlFor="title">
                  Title
                </label>
                <input
                  className="border-2 border-primary/70 p-2 rounded-lg w-full outline-none"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={task.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="hidden" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="border-2 border-primary/70 p-2 rounded-lg w-full outline-none"
                  rows={5}
                  name="description"
                  id="description"
                  placeholder="Description"
                  value={task.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div>
                <label className="hidden" htmlFor="score">
                  Score
                </label>
                <input
                  className="border-2 border-primary/70 p-2 rounded-lg w-full outline-none"
                  type="number"
                  id="score"
                  name="score"
                  placeholder="score"
                  value={task.score}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-secondary px-4 py-2 rounded-md text-white"
                  type="submit"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setOpenTaskForm(false)}
                  className="bg-red-600 hover:bg-red-900 mt-4 px-4 py-2 rounded-md text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddTask;
